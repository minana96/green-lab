// @flow

import type {
  ActivationRule,
  EmbeddableDisplayType,
  Size,
  Viewport,
  VisitorData,
  ScrollPosition,
  PageSize,
} from 'types';

type $Action<T: string, P> = {
  type: T,
  payload: P
};

type ActionCreator<T: string, P> = (payload: P) => $Action<T, P>;

type EmbIdPayload = {
  id: string
};

const createAction =
  <T: string, P>(type: T): ActionCreator<T, P> => (payload: P) => ({type, payload});

type CloseEmbPayload = {
  displayType: EmbeddableDisplayType,
};

export type CloseEmbAction = $Action<'CLOSE_EMB', CloseEmbPayload>;
const CLOSE_EMB = 'CLOSE_EMB';
const closeEmb: ActionCreator<'CLOSE_EMB', CloseEmbPayload> =
  createAction(CLOSE_EMB);

export type CloseEmbCompleteAction = $Action<'CLOSE_EMB_COMPLETE', EmbIdPayload>;
const CLOSE_EMB_COMPLETE = 'CLOSE_EMB_COMPLETE';
const closeEmbComplete: ActionCreator<'CLOSE_EMB_COMPLETE', EmbIdPayload> =
  createAction(CLOSE_EMB_COMPLETE);

type SetActivationRulesPayload = {|
  ruleData: {
    activationRule: ActivationRule,
    randomSeed: number,
    visitorData: VisitorData,
  }[],
|};
export type SetActivationRulesAction = $Action<'SET_ACTIVATION_RULES', SetActivationRulesPayload>;
const SET_ACTIVATION_RULES = 'SET_ACTIVATION_RULES';
const setActivationRules: ActionCreator<'SET_ACTIVATION_RULES', SetActivationRulesPayload> =
  createAction(SET_ACTIVATION_RULES);

type SetActivationRulesPreviewPayload = {| ruleSrcPairs: [ActivationRule, string][] |};
export type SetActivationRulesPreviewAction =
  $Action<'SET_ACTIVATION_RULES_PREVIEW', SetActivationRulesPreviewPayload>;
const SET_ACTIVATION_RULES_PREVIEW = 'SET_ACTIVATION_RULES_PREVIEW';
const setActivationRulesPreview:
  ActionCreator<'SET_ACTIVATION_RULES_PREVIEW', SetActivationRulesPreviewPayload> =
  createAction(SET_ACTIVATION_RULES_PREVIEW);

type SetLocationHrefPayload = {| locationHref: string |};
type SetLocationHrefAction = $Action<'SET_LOCATION_HREF', SetLocationHrefPayload>;
const SET_LOCATION_HREF = 'SET_LOCATION_HREF';
const setLocationHref: ActionCreator<'SET_LOCATION_HREF', SetLocationHrefPayload> =
  createAction(SET_LOCATION_HREF);

type FormConfirmationPayload = {
  id: string,
  confirmationSrc: string,
  confirmationSize: {
    desktop: Size,
    mobile: Size
  }
};
export type EmbFormConfirmationAction = $Action<'EMB_FORM_CONFIRMATION', FormConfirmationPayload>;
const EMB_FORM_CONFIRMATION = 'EMB_FORM_CONFIRMATION';
const embFormConfirmation: ActionCreator<'EMB_FORM_CONFIRMATION', FormConfirmationPayload> =
  createAction(EMB_FORM_CONFIRMATION);

type FormSubmitEventPayload = {
  id: string,
  isConversion: boolean
};
export type FormSubmitEventAction = $Action<'FORM_SUBMIT_EVENT', FormSubmitEventPayload>;
const FORM_SUBMIT_EVENT = 'FORM_SUBMIT_EVENT';
const formSubmitEvent: ActionCreator<'FORM_SUBMIT_EVENT', FormSubmitEventPayload> =
  createAction(FORM_SUBMIT_EVENT);

type LinkClickEventPayload = {
  id: string,
  isConversion: boolean,
  linkUrl: string,
  shouldRedirect: boolean
};
export type LinkClickEventAction = $Action<'LINK_CLICK_EVENT', LinkClickEventPayload>;
const LINK_CLICK_EVENT = 'LINK_CLICK_EVENT';
const linkClickEvent: ActionCreator<'LINK_CLICK_EVENT', LinkClickEventPayload> =
  createAction(LINK_CLICK_EVENT);

type LogPayload = {
  messages: mixed[]
};
export type LogAction = $Action<'LOG', LogPayload>;
const LOG = 'LOG';
const log: ActionCreator<'LOG', LogPayload> =
  createAction(LOG);

type EmbLoadedPayload = { id: string, pageSize: PageSize };
export type EmbLoadedAction = $Action<'EMB_LOADED', EmbLoadedPayload>;
const EMB_LOADED = 'EMB_LOADED';
const embLoaded: ActionCreator<'EMB_LOADED', EmbLoadedPayload> =
  createAction(EMB_LOADED);

export type TriggerEmbAction = $Action<'TRIGGER_EMB', EmbIdPayload>;
const TRIGGER_EMB = 'TRIGGER_EMB';
const triggerEmb: ActionCreator<'TRIGGER_EMB', EmbIdPayload> =
  createAction(TRIGGER_EMB);

type SetViewportPayload = {
  viewport: Viewport,
};
export type SetViewportAction = $Action<'SET_VIEWPORT', SetViewportPayload>;
const SET_VIEWPORT = 'SET_VIEWPORT';
const setViewport: ActionCreator<'SET_VIEWPORT', SetViewportPayload> =
  createAction(SET_VIEWPORT);

type SetScrollPositionPayload = {
  scrollPosition: ScrollPosition,
  fromScrollEvent: boolean,
};
export type SetScrollPositionAction = $Action<'SET_SCROLL_POSITION', SetScrollPositionPayload>;
const SET_SCROLL_POSITION = 'SET_SCROLL_POSITION';
const setScrollPosition: ActionCreator<'SET_SCROLL_POSITION', SetScrollPositionPayload> =
  createAction(SET_SCROLL_POSITION);

type SetVisitorIdPayload = {
  visitorId: string,
};
export type SetVisitorIdAction = $Action<'SET_VISITOR_ID', SetVisitorIdPayload>;
const SET_VISITOR_ID = 'SET_VISITOR_ID';
const setVisitorId: ActionCreator<'SET_VISITOR_ID', SetVisitorIdPayload> =
  createAction(SET_VISITOR_ID);

export type Action =
  CloseEmbAction |
  CloseEmbCompleteAction |
  SetActivationRulesAction |
  SetLocationHrefAction |
  EmbLoadedAction |
  EmbFormConfirmationAction |
  FormSubmitEventAction |
  LinkClickEventAction |
  LogAction |
  SetViewportAction |
  SetScrollPositionAction |
  TriggerEmbAction |
  SetActivationRulesPreviewAction |
  SetVisitorIdAction;

export default {
  CLOSE_EMB,
  closeEmb,

  CLOSE_EMB_COMPLETE,
  closeEmbComplete,

  SET_ACTIVATION_RULES,
  setActivationRules,

  SET_ACTIVATION_RULES_PREVIEW,
  setActivationRulesPreview,

  SET_VISITOR_ID,
  setVisitorId,

  SET_LOCATION_HREF,
  setLocationHref,

  EMB_FORM_CONFIRMATION,
  embFormConfirmation,

  EMB_LOADED,
  embLoaded,

  FORM_SUBMIT_EVENT,
  formSubmitEvent,

  LINK_CLICK_EVENT,
  linkClickEvent,

  LOG,
  log,

  SET_VIEWPORT,
  setViewport,

  SET_SCROLL_POSITION,
  setScrollPosition,

  TRIGGER_EMB,
  triggerEmb,
};
