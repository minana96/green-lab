// @flow

import {h, Component} from 'preact';
import noop from 'noop';
import IframeWrapper from 'components/IframeWrapper';
import Overlay from 'components/Overlay';
import StickyBar from 'components/StickyBar';
import actions from 'actions';
import {overlayFadeOutSpeed, stickyBarSlideOutSpeed} from 'cssVariables';

import type {Dispatch} from 'createDispatcher';
import type {Embeddable, State} from 'types';

type Props = {
  dispatch: Dispatch,
  state: State
};

const transitionOutSpeeds = {
  overlay: overlayFadeOutSpeed,
  stickyBar: stickyBarSlideOutSpeed,
};

export default class App extends Component {
  props: Props;

  handleClose(emb: Embeddable): void {
    this.props.dispatch(actions.closeEmb({displayType: emb.display.name}));
    global.setTimeout(
      () => this.props.dispatch(actions.closeEmbComplete({id: emb.id})),
      parseInt(transitionOutSpeeds[emb.display.name], 10)
    );
  }

  render() {
    const {state, dispatch} = this.props;

    const embs = state.embeddables
      .filter(emb => emb.status !== 'cancelled')
      .map(emb => {
        const {
          closedAt,
          display,
          id,
          isMobile,
          pageSrc,
          showConfirmation
        } = emb;

        const embPageSize = emb.pageSize[isMobile ? 'mobile' : 'desktop'];
        const embConfirmationSize0 = emb.confirmationSize[isMobile ? 'mobile' : 'desktop'];

        const embPageSizeCss = {
          height: `${embPageSize.height}px`,
          width: display.name === 'stickyBar' ? '100%' : `${embPageSize.width}px`,
        };

        const embConfirmationSizeCss = {
          height: `${embConfirmationSize0.height}px`,
          width: display.name === 'stickyBar' ? '100%' : `${embConfirmationSize0.width}px`,
        };

        const EmbeddableComponent = {
          overlay: Overlay,
          stickyBar: StickyBar,
        }[display.name];

        const visibleEmbOfType = state.visibleEmbIds[display.name];

        return (
          <EmbeddableComponent
            // We incorporate the emb's URL into the key so that if changes, for some reason,
            // Preact will remove and re-add the Overlay component (including its iframes) to the
            // DOM. This would cause the new URL to be preloaded and the state of the Overlay
            // component to reset.
            key={`${id}-${pageSrc}`}

            device={state.device}
            emb={emb}
            isVisible={visibleEmbOfType === id}
            onClose={() => this.handleClose(emb)}
            scrollPosition={state.scrollPosition}
            size={embPageSize}
            viewport={state.viewport}
          >
            <IframeWrapper
              // Main emb content
              isMobile={isMobile}
              isVisible={!showConfirmation}
              size={embPageSizeCss}
              hostPageUrl={state.locationHref || global.location.href}
              // We append the closedAt time to the src URL so that when the emb is closed, the
              // iframe reloads. This prevents embedded videos from continuing to play, but leaves
              // the iframe in a loaded state, ready to be triggered again.
              src={`${pageSrc}${/\?/.test(pageSrc) ? '&' : '?'}closedAt=${closedAt}`}
              onClose={() => this.handleClose(emb)}
              onFormConfirmation={(confirmationSize, confirmationSrc) =>
                dispatch(actions.embFormConfirmation({id, confirmationSize, confirmationSrc}))}
              onFormSubmit={isConversion => dispatch(actions.formSubmitEvent({id, isConversion}))}
              onLinkClick={(isConversion, linkUrl = '', shouldRedirect = false) =>
                dispatch(actions.linkClickEvent({id, isConversion, linkUrl, shouldRedirect}))}
              onLoad={pageSize => dispatch(actions.embLoaded({id, pageSize}))}
            />

            <IframeWrapper
              // Form confirmation dialog
              isMobile={isMobile}
              isVisible={showConfirmation}
              size={embConfirmationSizeCss}
              hostPageUrl={state.locationHref || global.location.href}
              src={emb.confirmationSrc}
              onClose={() => this.handleClose(emb)}
              onFormConfirmation={noop}
              onFormSubmit={noop}
              onLinkClick={(isConversion, linkUrl = '', shouldRedirect = false) =>
                dispatch(actions.linkClickEvent({id, isConversion, linkUrl, shouldRedirect}))}
              onLoad={noop}
            />
          </EmbeddableComponent>
        );
      });

    return (
      <div>
        {embs}
      </div>
    );
  }
}
