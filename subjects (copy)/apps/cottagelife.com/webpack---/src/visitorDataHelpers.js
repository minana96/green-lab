// @flow
import type { VisitorData, VisitorEventType } from 'types';

const HOST_PAGE_VISIT: VisitorEventType = 'HOST_PAGE_VISIT';
const EMBEDDABLE_ACTIVATION: VisitorEventType = 'EMBEDDABLE_ACTIVATION';
const EMBEDDABLE_VISIT: VisitorEventType = 'EMBEDDABLE_VISIT';
const EMBEDDABLE_FORM_SUBMIT: VisitorEventType = 'EMBEDDABLE_FORM_SUBMIT';
const EMBEDDABLE_LINK_CLICK: VisitorEventType = 'EMBEDDABLE_LINK_CLICK';

function addEvent(visitorData, type, metadata) {
  return {
    ...visitorData,
    events: [
      ...visitorData.events,
      {
        timestamp: Date.now(),
        type,
        ...metadata,
      },
    ],
  };
}

function getEventCountByType(data, type) {
  return data.events.filter(ev => ev.type === type).length;
}

export function addHostPageVisit(data: VisitorData): VisitorData {
  return addEvent(data, HOST_PAGE_VISIT);
}

export function addEmbeddableActivation(data: VisitorData): VisitorData {
  return addEvent(data, EMBEDDABLE_ACTIVATION);
}

export function addEmbeddableVisit(data: VisitorData): VisitorData {
  return addEvent(data, EMBEDDABLE_VISIT);
}

export function addEmbeddableFormSubmit(data: VisitorData, conversion: boolean): VisitorData {
  return addEvent(data, EMBEDDABLE_FORM_SUBMIT, { conversion });
}

export function addEmbeddableLinkClick(data: VisitorData, conversion: boolean): VisitorData {
  return addEvent(data, EMBEDDABLE_LINK_CLICK, { conversion });
}

export function getConversionCount(visitorData: VisitorData): number {
  return visitorData.events
    .filter(ev =>
      (ev.type === EMBEDDABLE_FORM_SUBMIT || ev.type === EMBEDDABLE_LINK_CLICK) &&
      ev.conversion === true
    )
    .length;
}

export function getHostPageVisitCount(visitorData: VisitorData): number {
  return getEventCountByType(visitorData, HOST_PAGE_VISIT);
}

export function getEmbeddableActivationCount(visitorData: VisitorData): number {
  return getEventCountByType(visitorData, EMBEDDABLE_ACTIVATION);
}

export function getEmbeddableVisitCount(visitorData: VisitorData): number {
  return getEventCountByType(visitorData, EMBEDDABLE_VISIT);
}
