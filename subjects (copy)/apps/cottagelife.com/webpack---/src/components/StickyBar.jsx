// @flow
/* eslint jsx-a11y/no-static-element-interactions: 0 */

import {h, Component} from 'preact';
import {stripExtraWhiteSpace} from 'utils';
import {stickyBarSlideInSpeed, stickyBarSlideOutSpeed} from 'cssVariables';

import 'components/StickyBar.css';

import type {Device, Embeddable} from '../types';

type Props = {
  emb: Embeddable,
  device: Device,
  isVisible: boolean,
  children?: Element[],
};

type State = {
  isVisible: boolean,
};

export default class StickyBar extends Component {
  props: Props;
  static defaultProps: {children: Element[]};
  state: State;

  componentWillReceiveProps({isVisible}: Props) {
    if (isVisible && !this.props.isVisible) {
      process.nextTick(() => this.setState({isVisible})); // nextTick is ponyfilled by webpack
    } else if (!isVisible && this.props.isVisible) {
      this.setState({isVisible});
    }
  }

  render() {
    const {emb, children, device} = this.props;

    if (emb.display.name !== 'stickyBar') return null; // satisfies Flow

    const {isVisible} = this.state;
    const {display, isMobile, pageSize} = emb;
    const {height} = pageSize[isMobile ? 'mobile' : 'desktop'];

    const barFrameStyle = height > 0 ? {
      [display.position]: isVisible ? 0 : -height,
    } : {}; // initial value should be undefined, to avoid a bouncing transition

    const containerClassName = stripExtraWhiteSpace(`
      ub-emb-bar
      ${isVisible ? 'ub-emb-visible' : ''}
      ${isMobile ? 'ub-emb-mobile' : ''}
      ${device.isIOS ? 'ub-emb-ios' : ''}
    `);

    const bodySlideSpeed = isVisible ? stickyBarSlideInSpeed : stickyBarSlideOutSpeed;

    const bodyBaseStyle = `
      html body {
        transition: margin ${bodySlideSpeed} ease-in-out;
      }
      .lp-pom-body {
        position: relative;
      }
      `; // lp-pom-body style is for correcting position:absolute jank on unbounce LPs

    const bodyMarginStyle = `
      html body {
        margin-${display.position}: ${height}px !important;
      }`; // push the rest of the page content down, below the bar

    // LPs have height:100%, which doesn't support creating extra space below the page content via
    // the above margin style. Give the bar container an explicit height instead:
    const lpFooterStyle = display.position === 'bottom' ? `
      .lp-pom-body .ub-emb-bar.ub-emb-visible {
        height: ${height}px;
      }` : '';
    // The .ub-emb-visible selector is necessary in conjunction with the isVisible? condition so
    // that any other (hidden) bars aren't affected by the style block added by this instance.

    const additionalStyles = bodyMarginStyle + lpFooterStyle;

    return (
      <div className={containerClassName}>
        <style>{bodyBaseStyle}</style>
        { isVisible ?
          <style>{additionalStyles}</style> : <noscript />
        }
        <div
          className="ub-emb-bar-frame"
          style={barFrameStyle}
        >
          {children}
        </div>
      </div>
    );
  }
}

StickyBar.defaultProps = {
  children: [],
};
