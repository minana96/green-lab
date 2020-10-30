// @flow
import actions from 'actions';
import { findIndex } from 'utils';
import { getBreakpointToDisplay } from 'screen';
import createUuid from 'createUuid';
import getPublishedUrl from 'getPublishedUrl';
import resolveStatus from 'resolveStatus';
import sortRules from 'sortRules';
import selectVariant from 'selectVariant';
import * as embeddableHelpers from 'embeddableHelpers';
import { DEFAULT_VISITOR_DATA } from 'visitorTracking';
import * as visitorDataHelpers from 'visitorDataHelpers';
import isDebugMode from 'isDebugMode';

import type { Action } from 'actions';
import type { Embeddable, State } from 'types';

const pluralizeRules = rules =>
  `activation ${rules.length === 1 ? 'rule' : 'rules'}`;

function logStatusResolutionResults(state: State): State {
  if (!isDebugMode(state.environment, state.locationSearch)) {
    return state;
  }

  const { embeddables, locationHref } = state;

  const logPrefix = 'Rule matching';

  const rejected = embeddables
    .reduce((acc, embeddable) => (
      embeddable.disqualifier ? {
        ...acc,
        [embeddable.disqualifier]: [
          ...(acc[embeddable.disqualifier] || []),
          embeddable,
        ]
      } : acc
    ), {});

  const accepted = embeddables.filter(embeddable => !embeddable.disqualifier);

  const logMessages = [
    ...state.logMessages,

    [logPrefix, `Matching against ${locationHref}...`],

    ...Object.keys(rejected).map(disqualifier => [
      logPrefix,
      `${rejected[disqualifier].length} of ${embeddables.length} ${pluralizeRules(embeddables)} ` +
        `failed ${disqualifier} requirement:`,
      rejected[disqualifier],
    ]),

    [
      logPrefix,
      `${accepted.length} of ${embeddables.length} ${pluralizeRules(embeddables)} ` +
        'passed all requirements:',
      accepted,
    ],

    ...accepted
      .filter(embeddable => embeddable.activationRule.variants.length > 1)
      .map(embeddable => [embeddable.id, `Selected variant ${embeddable.variantLetter} from ` +
        `${embeddable.activationRule.variants.length} variants`
      ]),

    ...embeddables
      .filter(embeddable => embeddable.status === 'preloading')
      .map(embeddable => [embeddable.id, 'Preloading']),
  ];

  return { ...state, logMessages };
}

function resolveEmbeddableStatuses(state: State): State {
  const { device, geoData, locationHref, referrer, timestamp, visibleEmbIds } = state;

  const embeddables = state.embeddables.reduce((accEmbeddables, embeddable) => {
    const { disqualifier, logVisit, status } = resolveStatus({
      device,
      embeddable,
      geoData,
      locationHref,
      precedingEmbeddables: accEmbeddables.filter(emb => !emb.disqualifier),
      referrer,
      timestamp,
      visibleEmbIds,
    });

    // This condition prevents currently visible embeddables from being cancelled and disappearing
    // when the URL changes
    if (embeddableHelpers.isVisible(embeddable, visibleEmbIds)) {
      return [...accEmbeddables, { ...embeddable, disqualifier }];
    }

    return [
      ...accEmbeddables,
      {
        ...embeddable,
        disqualifier,
        status,
        visitorData: logVisit
          ? visitorDataHelpers.addHostPageVisit(embeddable.visitorData)
          : embeddable.visitorData,
      }
    ];
  }, []);

  return logStatusResolutionResults({ ...state, embeddables, locationHref });
}

function createInitialEmb(
  activationRule,
  locationSearch,
  environment,
  randomSeed,
  visitorData
): Embeddable {
  const { clientUuid, embUuid, id, integrations, ubCode, variants } = activationRule;

  const variantFromVisitorData = variants.filter(v =>
    v.letter === visitorData.variantLetter && v.weight > 0)[0];

  // If there is no variant letter in localStorage, if that variant doesn't currently exist (e.g. a
  // new set of variants has been published since the last visit), or if its weight has been set to
  // zero (e.g. discarded), do a weighted random variant selection.
  const variant = variantFromVisitorData || selectVariant(randomSeed, variants);

  return {
    activationRule,
    display: variant.display,
    clientUuid,
    closedAt: 0,
    confirmationSrc: '',
    correlationId: '',
    disqualifier: null,
    embUuid,
    id,
    integrations,
    isMobile: false,
    pageSize: {
      desktop: variant.dimensions.desktop,
      mobile: variant.dimensions.mobile,
    },
    confirmationSize: {
      desktop: {
        width: 0,
        height: 0
      },
      mobile: {
        width: 0,
        height: 0
      }
    },
    pageSrc: getPublishedUrl(ubCode, embUuid, variant.letter, environment) + locationSearch,
    showConfirmation: false,
    status: 'preloading',
    trackingId: variant.trackingId,
    trigger: activationRule.trigger.parameters[0],
    variantLetter: variant.letter,
    visitorData: {
      ...visitorData,
      variantLetter: variant.letter,
    },
  };
}

export default function reducer(state: State, action: Action) {
  switch (action.type) {
    case actions.SET_ACTIVATION_RULES: {
      const { ruleData } = action.payload;
      const { environment, locationSearch } = state;

      const embeddables = [...ruleData]
        .sort((a, b) => sortRules(a.activationRule, b.activationRule))
        .map(({ activationRule, randomSeed, visitorData }) => ({
          ...createInitialEmb(activationRule, locationSearch, environment, randomSeed, visitorData),
          correlationId: createUuid(),
        }));

      return resolveEmbeddableStatuses({ ...state, embeddables });
    }

    case actions.SET_VISITOR_ID: {
      return {
        ...state,
        visitorId: state.previewMode ? '' : action.payload.visitorId,
      };
    }

    case actions.SET_ACTIVATION_RULES_PREVIEW: {
      const { environment, locationSearch } = state;

      const embeddables = action.payload.ruleSrcPairs.map(([activationRule, src]) => ({
        // In preview the UI will always pass in a rule with one variant, so we don't need to pass
        // in a real random seed value here.
        ...createInitialEmb(activationRule, locationSearch, environment, 0, DEFAULT_VISITOR_DATA),
        pageSrc: src,
        trackingId: '',
      }));

      return {
        ...state,
        previewMode: true,
        embeddables,
      };
    }

    case actions.SET_LOCATION_HREF: {
      const { locationHref } = action.payload;

      return locationHref === state.locationHref
        ? state
        : resolveEmbeddableStatuses({ ...state, locationHref });
    }

    case actions.TRIGGER_EMB: {
      const { id } = action.payload;
      const embIndex = findIndex(state.embeddables, emb => emb.id === id);

      let { logMessages, lifecycleEvents, visibleEmbIds } = state;

      const emb = {
        ...state.embeddables[embIndex],
      };

      let { showConfirmation } = emb;

      const visibleEmbId = visibleEmbIds[emb.display.name];

      if (emb.status === 'cancelled') {
        return state;
      }

      if (emb.status === 'preloading') {
        logMessages = logMessages.concat([[id, 'Triggered, waiting to load']]);
        emb.status = 'pretriggered';
      } else if (emb.status === 'ready' && visibleEmbId) {
        if (visibleEmbId === emb.id) {
          logMessages = logMessages.concat([[id, 'Triggered, already visible']]);
        } else {
          emb.status = 'cancelled';

          logMessages = logMessages.concat([[
            id,
            'Triggered, suppressed because another embeddable of the same display type is visible'
          ]]);
        }
      } else if (emb.status === 'ready' && !visibleEmbId) {
        emb.visitorData = visitorDataHelpers.addEmbeddableVisit(emb.visitorData);

        visibleEmbIds = {
          ...visibleEmbIds,
          [emb.display.name]: id,
        };

        lifecycleEvents = lifecycleEvents.concat({ type: 'EMB_SHOWN', embId: id });

        logMessages = logMessages.concat([[id, 'Triggered, displaying']]);
        showConfirmation = false;
      }

      const embeddables = [...state.embeddables];
      embeddables[embIndex] = {
        ...emb,
        showConfirmation,
      };

      return {
        ...state,
        logMessages,
        embeddables,
        lifecycleEvents,
        visibleEmbIds,
      };
    }

    case actions.EMB_LOADED: {
      const { id, pageSize } = action.payload;
      const embIndex = findIndex(state.embeddables, emb => emb.id === id);
      const emb0 = state.embeddables[embIndex];

      const breakpointToDisplay = getBreakpointToDisplay(
        emb0.display.name,
        pageSize,
        state.viewport,
        state.device.isMobile
      );

      const emb = {
        ...emb0,
        isMobile: breakpointToDisplay === 'mobile',
        pageSize,
      };

      let { logMessages, lifecycleEvents, visibleEmbIds } = state;

      if (breakpointToDisplay === null) {
        emb.status = 'cancelled';

        logMessages = logMessages.concat([
          [id, 'Suppressed because embeddable is not mobile-enabled'],
        ]);
      } else {
        lifecycleEvents = lifecycleEvents.concat({ type: 'EMB_ACTIVATED', embId: id });
        emb.visitorData = visitorDataHelpers.addEmbeddableActivation(emb.visitorData);

        if (emb.status === 'preloading') {
          emb.status = 'ready';
          logMessages = logMessages.concat([[id, 'Loaded']]);
        } else if (emb.status === 'pretriggered' && visibleEmbIds[emb.display.name]) {
          emb.status = 'cancelled';
          logMessages = logMessages.concat([[
            id,
            'Loaded, suppressed because another embeddable of the same display type is visible'
          ]]);
        } else if (emb.status === 'pretriggered' && !visibleEmbIds[emb.display.name]) {
          emb.status = 'ready';
          emb.visitorData = visitorDataHelpers.addEmbeddableVisit(emb.visitorData);

          visibleEmbIds = {
            ...visibleEmbIds,
            [emb.display.name]: id,
          };

          lifecycleEvents = lifecycleEvents.concat({type: 'EMB_SHOWN', embId: id});

          logMessages = logMessages.concat([[id, 'Loaded, displaying']]);
        }
      }

      const embeddables = [...state.embeddables];
      embeddables[embIndex] = emb;

      return {
        ...state,
        logMessages,
        embeddables,
        lifecycleEvents,
        visibleEmbIds,
      };
    }

    case actions.CLOSE_EMB: {
      const visibleEmbId = state.visibleEmbIds[action.payload.displayType];

      if (visibleEmbId) {
        const embeddables = [...state.embeddables];
        const index = findIndex(embeddables, emb => emb.id === visibleEmbId);
        const emb = { ...embeddables[index] };

        emb.status = 'dismissed';
        embeddables[index] = emb;

        const logMessages = state.logMessages.concat([
          [visibleEmbId, 'Closing']
        ]);

        return {
          ...state,
          embeddables,
          logMessages,
          visibleEmbIds: {
            ...state.visibleEmbIds,
            [action.payload.displayType]: undefined,
          },
        };
      } else {
        return state;
      }
    }

    case actions.CLOSE_EMB_COMPLETE: {
      const { id } = action.payload;
      const embeddables = [...state.embeddables];
      const embIndex = findIndex(embeddables, emb => emb.id === id);
      const emb0 = embeddables[embIndex];
      let logMessages = [...state.logMessages];

      const emb = {
        ...emb0,
        closedAt: Date.now(),
        status: embeddableHelpers.canBeShownMultipleTimes(emb0) ? 'ready' : 'cancelled'
      };

      if (emb.status === 'cancelled') {
        logMessages = logMessages.concat([[emb.id, 'Removing from page']]);
      } else {
        logMessages = logMessages.concat([[emb.id, 'Reloading']]);
      }

      embeddables[embIndex] = emb;

      return {
        ...state,
        embeddables,
        logMessages,
      };
    }

    case actions.FORM_SUBMIT_EVENT: {
      const { id, isConversion } = action.payload;

      return {
        ...state,
        lifecycleEvents: [
          ...state.lifecycleEvents,
          {
            type: 'FORM_SUBMITTED',
            embId: id,
            isConversion,
          },
        ],
        embeddables: state.embeddables.map(embeddable => (
          embeddable.id === id
            ? {
              ...embeddable,
              visitorData:
                visitorDataHelpers.addEmbeddableFormSubmit(embeddable.visitorData, isConversion),
            }
            : embeddable
        )),
      };
    }

    case actions.LINK_CLICK_EVENT: {
      const { id, isConversion, linkUrl, shouldRedirect } = action.payload;

      return {
        ...state,
        lifecycleEvents: [
          ...state.lifecycleEvents,
          {
            type: 'LINK_CLICKED',
            embId: id,
            isConversion,
            linkUrl,
            shouldRedirect,
          },
        ],
        embeddables: state.embeddables.map(embeddable => (
          embeddable.id === id
            ? {
              ...embeddable,
              visitorData:
                visitorDataHelpers.addEmbeddableLinkClick(embeddable.visitorData, isConversion),
            }
            : embeddable
        )),
      };
    }

    case actions.EMB_FORM_CONFIRMATION: {
      const embeddables = [...state.embeddables];
      const { id, confirmationSize, confirmationSrc } = action.payload;
      const index = findIndex(embeddables, emb => emb.id === id);

      embeddables[index] = {
        ...embeddables[index],
        confirmationSize,
        confirmationSrc,
        showConfirmation: true,
      };

      return {
        ...state,
        embeddables,
      };
    }

    case actions.LOG: {
      return {
        ...state,
        logMessages: [
          ...state.logMessages,
          action.payload.messages
        ],
      };
    }

    case actions.SET_VIEWPORT: {
      const { viewport } = action.payload;

      return {
        ...state,
        viewport,
        embeddables: state.embeddables.map(embeddable => {
          if (embeddableHelpers.shouldRespondToViewportChanges(embeddable)) {
            const newBreakpoint = getBreakpointToDisplay(
              embeddable.display.name,
              embeddable.pageSize,
              viewport,
              state.device.isMobile
            );

            return {
              ...embeddable,
              isMobile: newBreakpoint ? newBreakpoint === 'mobile' : embeddable.isMobile,
            };
          } else {
            return embeddable;
          }
        }),
      };
    }

    case actions.SET_SCROLL_POSITION: {
      if (state.device.isIOS && state.visibleEmbIds.overlay && action.payload.fromScrollEvent) {
        // In the case where an overlay is taller than the viewport, on iOS we absolutely position
        // the scrollWrapper based on the user's scroll position (see comment in Overlay.jsx).
        // In this case, while the overlay is open we want to avoid repositioning it based on user
        // scroll changes, so the user can scroll around the overlay without it moving with their
        // scroll.
        return state;
      }

      return {
        ...state,
        scrollPosition: action.payload.scrollPosition,
      };
    }

    default:
      return state;
  }
}
