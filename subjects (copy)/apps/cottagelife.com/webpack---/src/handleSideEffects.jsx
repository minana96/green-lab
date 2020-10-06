// @flow
import { h, render } from 'preact';
import { timer, merge } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';

import { setVisitorId } from 'visitorId';
import { setVisitorData } from 'visitorTracking';
import * as visitorDataHelpers from 'visitorDataHelpers';
import StatsEventSender from 'StatsEventSender';
import App from 'components/App';
import createLogger from 'logger';
import fetchUserApiConfig from 'fetchUserApiConfig';
import integrations from 'integrations';
import createViewportChanges from 'createViewportChanges';
import { createCurrentScrollPosition } from 'createScrollPositionChanges';
import viewportMeta from 'viewportMeta';
import { find } from 'utils';

import type { Dispatch } from 'createDispatcher';
import type { State, LifecycleEvent } from 'types';

const handleRedirect = (event: LifecycleEvent) => {
  if (event.type === 'LINK_CLICKED' && event.shouldRedirect === true) {
    window.location = event.linkUrl;
  }
};

export default function handleSideEffects(dispatch: Dispatch) {
  const wrapper = document.createElement('div');
  wrapper.className = 'ub-emb-container';

  if (document.body) {
    document.body.appendChild(wrapper);
  }

  return ({ prev, next }: { prev: State, next: State }): void => {
    window.ube.__embeddables = next.embeddables;

    const { log } = createLogger(next.environment, next.locationSearch);

    const showingOverlay = !prev.visibleEmbIds.overlay && next.visibleEmbIds.overlay;
    const hidingOverlay = prev.visibleEmbIds.overlay && !next.visibleEmbIds.overlay;

    const showingStickyBar = !prev.visibleEmbIds.stickyBar && next.visibleEmbIds.stickyBar;
    const hidingStickyBar = prev.visibleEmbIds.stickyBar && !next.visibleEmbIds.stickyBar;

    const showingEmb = showingOverlay || showingStickyBar;
    const hidingEmb = hidingOverlay || hidingStickyBar;

    next.logMessages
      .slice(prev.logMessages.length, next.logMessages.length)
      .forEach(logMessages => log(...logMessages));

    if (!next.previewMode) {
      if (prev.visitorId !== next.visitorId) {
        setVisitorId(window.localStorage, next.visitorId);
      }

      next.embeddables
        .filter(
          (embeddable, i) =>
            !prev.embeddables[i] || embeddable.visitorData !== prev.embeddables[i].visitorData
        )
        .forEach(embeddable =>
          setVisitorData(window.localStorage, embeddable.embUuid, embeddable.visitorData)
        );
    }

    if (!next.previewMode) {
      const newEvents = next.lifecycleEvents
        .slice(prev.lifecycleEvents.length, next.lifecycleEvents.length);

      newEvents.forEach(event => {
        const emb = next.embeddables.filter(item => event.embId && item.id === event.embId)[0];

        if (!emb) {
          return;
        }

        const statsSenderContext = {
          ubCode: next.ubCode,
          clientUuid: emb.clientUuid,
          trackingId: emb.trackingId,
          hostPageUrl: next.locationHref,
          hostPageReferrerUrl: next.referrer,
          hostPageCorrelationId: emb.correlationId,
          visitorId: next.visitorId,
          env: next.environment,
        };

        const handleStatsResponse = (...logMessages) => {
          log(emb.id, ...logMessages);
          handleRedirect(event);
        };

        // TODO: make StatsEventSender more functional
        const statsSender = new StatsEventSender(statsSenderContext, handleStatsResponse);

        switch (event.type) {
          case 'EMB_ACTIVATED': {
            const isFirstTime =
              visitorDataHelpers.getEmbeddableActivationCount(emb.visitorData) === 1;
            statsSender.embeddableActivated(isFirstTime);
            break;
          }

          case 'EMB_SHOWN': {
            const isFirstTime = visitorDataHelpers.getEmbeddableVisitCount(emb.visitorData) === 1;
            statsSender.embeddableViewed(isFirstTime);
            break;
          }

          case 'FORM_SUBMITTED': {
            const isFirstConversion = visitorDataHelpers.getConversionCount(emb.visitorData) === 1;
            statsSender.formSubmitted(event.isConversion, isFirstConversion);
            break;
          }

          case 'LINK_CLICKED': {
            const isFirstConversion = visitorDataHelpers.getConversionCount(emb.visitorData) === 1;
            statsSender.linkClicked(event.isConversion, isFirstConversion);
            break;
          }

          default:
            // eslint-disable-next-line no-unused-expressions
            event.flowExhaustiveSwitchCheck_doNotRemove;
            break;
        }

        if (event.isConversion) {
          fetchUserApiConfig().onConversion(event.embId);
          fetchUserApiConfig().onConvert(emb.embUuid);
          integrations(emb.integrations).onConversion(emb, log.bind(null, event.embId));
        }
      });
    }

    viewportMeta.setEnabled(next.device.isMobile && Boolean(next.visibleEmbIds.overlay));

    if (showingOverlay && next.device.isIOS) {
      // iOS Safari seems to not always fire resize and scroll events after the viewport change that
      // appending the above meta tag causes, so we dispatch a quick series of setViewport and
      // setScrollPosition actions to ensure the state's viewport and scrollPosition properties are
      // up-to-date. This is important because in some cases on iOS, we use those values to position
      // the overlay.
      timer(0, 100).pipe(
        take(4),
        mergeMap(() => merge(createViewportChanges(), createCurrentScrollPosition()))
      )
        .subscribe(dispatch);
    }

    if (hidingEmb && next.device.isIOS) {
      // If a form input on the content page is focused when the Convertable is closed, iOS will
      // leave the keyboard open. If the user re-triggers the Convertable afterwards, they will be
      // left in a broken state where they cannot focus any of the inputs. To avoid this we shift
      // the focus away from the iframe's input to a hidden input on the host page, and then remove
      // that input, which hides the keyboard. Since we cannot detect whether an Iframe input was
      // actually focused prior to dismiss, we need to do this every time a Convertable is
      // dismissed. In the case where an input was not focused prior to dismiss, using
      // `input.autofocus=true` rather than input.focus() seems to prevent the scroll position from
      // changing. But in the case where an input *was* focused, the scroll position does change, to
      // centre our input in view. This is dependent on the positioning of the input, but it also
      // differs between iOS devices, because the size of the on-screen keyboard relative to the
      // viewport varies. The following positioning achieves a minimal scroll position change on all
      // iOS device sizes.
      const input = document.createElement('input');
      input.style.position = 'fixed';
      input.style.top = '18%';
      input.style.left = '50%';
      input.style.width = '5px';
      input.style.opacity = '0';
      input.autofocus = true;
      if (document.body) { document.body.appendChild(input); }
      window.setTimeout(() => {
        if (document.body) { document.body.removeChild(input); }
      }, 1);
    }

    if (showingEmb) {
      const embId = showingOverlay ? next.visibleEmbIds.overlay : next.visibleEmbIds.stickyBar;
      const embToShow = find(next.embeddables, emb => emb.id === embId);

      fetchUserApiConfig().onConvertableShow(embId);

      if (embToShow && !next.previewMode) {
        fetchUserApiConfig().onShow(embToShow.embUuid);
        integrations(embToShow.integrations).onTrigger(embToShow, log.bind(null, embId));
      }
    } else if (hidingEmb) {
      const embId = hidingOverlay ? prev.visibleEmbIds.overlay : prev.visibleEmbIds.stickyBar;
      const embToHide = find(prev.embeddables, emb => emb.id === embId);

      fetchUserApiConfig().onConvertableDismiss(embId);
      if (embToHide) {
        fetchUserApiConfig().onDismiss(embToHide.embUuid);
      }
    }

    render(<App state={next} dispatch={dispatch} />, wrapper, wrapper.children[0]);
  };
}
