// @flow
import { getBreakpointToDisplay, getViewport } from 'screen';

import type { Device, Embeddable } from 'types';

export default function dimensionsFilter(device: Device, embeddable: Embeddable) {
  const { display, pageSize } = embeddable;
  const { desktop, mobile } = pageSize;

  if (desktop.width === 0 && desktop.height === 0 && mobile.width === 0 && mobile.height === 0) {
    // We don't know the dimensions, so preload it and decide whether to activate when the content
    // loads and we receive the dimensions from the iframe.
    return true;
  }

  return getBreakpointToDisplay(display.name, pageSize, getViewport(), device.isMobile) !== null;
}
