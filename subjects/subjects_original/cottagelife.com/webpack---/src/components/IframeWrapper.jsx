// @flow

import {h, Component} from 'preact';
import {stripExtraWhiteSpace} from 'utils';

import 'components/IframeWrapper.css';

import type {IncomingMessage, ReportPageSizeMessage, PageSize} from '../types';

type Props = {
  isVisible: boolean,
  isMobile: boolean,
  size: {
    height: string,
    width: string,
  },
  hostPageUrl: string,
  src: string,
  onClose: () => void,
  onFormConfirmation: (confirmationSize: PageSize, src: string) => void,
  onFormSubmit: (isConversion: boolean) => void,
  onLinkClick: (isConversion: boolean, linkUrl: string, shouldRedirect: boolean) => void,
  onLoad: (pageSize: PageSize) => void
};

type State = {
  loaded: boolean,
  pageSize: ?PageSize,
}

function normalizePageSize(sizes): PageSize {
  return {
    desktop: sizes.desktop || {
      width: sizes.width || 0,
      height: sizes.height || 0,
    },
    mobile: sizes.mobile || {
      width: 0,
      height: 0,
    }
  };
}

export default class IframeWrapper extends Component {
  props: Props;
  state: State;

  iframe: ?HTMLIFrameElement;
  handleFirstLoad: () => void;
  sendAddSubmitHeadersMessage: () => void;
  handleMessage: (ev: MessageEvent) => void;

  constructor(props: Props) {
    super(props);

    // We track load status and size data in state so that we can only call the onLoad prop once the
    // Iframe's load event has fired AND we have received the reportPageSize message. These two
    // events can happen before or after each other, so it's important that we handle both orders.
    this.state = {
      loaded: false,
      pageSize: null,
    };

    this.iframe = null;
    this.handleMessage = this.handleMessage.bind(this);
    this.handleFirstLoad = this.handleFirstLoad.bind(this);
    this.sendAddSubmitHeadersMessage = this.sendAddSubmitHeadersMessage.bind(this);
  }

  componentDidMount() {
    window.addEventListener('message', this.handleMessage);

    // Working around what is probably a bug in flow. Flow type checking reports that
    // `this.iframe` is undefined/or null on the second call to
    // `this.iframe.addEventListener()` unless this is assigned to a local value
    const { iframe } = this;
    if (iframe) {
      iframe.addEventListener('load', this.handleFirstLoad);
      iframe.addEventListener('load', this.sendAddSubmitHeadersMessage);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('message', this.handleMessage);
  }

  sendAddSubmitHeadersMessage() {
    if (this.iframe && this.iframe.contentWindow) {
      this.iframe.contentWindow.postMessage(
        {
          type: "addSubmitHeaders",
          headers: { "X-Ub-Host-Page-Url": this.props.hostPageUrl }
        },
        "*"
      );
    }
  }

  handleFirstLoad() {
    this.setState({loaded: true});

    if (this.state.pageSize) {
      // If we have already received size data, we are ready to call the onLoad prop.
      this.props.onLoad(this.state.pageSize);
    }

    if (this.iframe) {
      this.iframe.removeEventListener('load', this.handleFirstLoad);
    }
  }

  handleReportPageSize(message: ReportPageSizeMessage) {
    if (this.state.pageSize) {
      // We have already handled this event, and do not want to call onLoad multiple times.
      return;
    }

    const pageSize = normalizePageSize(message);

    this.setState({ pageSize });

    if (this.state.loaded) {
      // If we have already received size data, we are ready to call the onLoad prop.
      this.props.onLoad(pageSize);
    }
  }

  handleMessage(ev: MessageEvent) {
    if (this.iframe && ev.source === this.iframe.contentWindow && typeof ev.data === 'string') {
      const message: IncomingMessage = JSON.parse(ev.data);

      switch (message.type) {
        case 'reportPageSize':
          this.handleReportPageSize(message);
          break;

        case 'linkClick':
          this.props.onLinkClick(
            message.isConversion,
            message.linkUrl,
            message.shouldRedirect
          );
          break;

        case 'formSubmit':
          this.props.onFormSubmit(message.isConversion);
          break;

        case 'openOverlay':
          this.props.onFormConfirmation(
            normalizePageSize(message.size),
            message.url.replace(/^https?:\/\//, '//')
          );
          break;

        case 'closeOverlay':
          this.props.onClose();
          break;

        default:
          // eslint-disable-next-line no-unused-expressions
          message.flowExhaustiveSwitchCheck_doNotRemove;
          break;
      }
    }
  }

  render() {
    const {isMobile, isVisible, onClose, size, src} = this.props;

    const wrapperClassName = stripExtraWhiteSpace(`
      ub-emb-iframe-wrapper
      ${isMobile ? 'ub-emb-mobile' : ''}
      ${isVisible ? 'ub-emb-visible' : ''}
    `);

    // Needs to be a string as React/Preact doesn't support !important in a style object, and we
    // want to protect against host page CSS.
    // https://github.com/yannickcr/eslint-plugin-react/issues/816 prevents just using `size` here
    const iframeStyle = `
      width: ${this.props.size.width} !important;
      height: ${this.props.size.height} !important;
    `;

    return (
      <div className={wrapperClassName} style={size}>
        <button className="ub-emb-close" type="button" onClick={onClose}>
          &#215;
        </button>

        <iframe
          ref={c => { this.iframe = c; }}
          className="ub-emb-iframe"
          src={src}
          style={iframeStyle}
        />
      </div>
    );
  }
}
