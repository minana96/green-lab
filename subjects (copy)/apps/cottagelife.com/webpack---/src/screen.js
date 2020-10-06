// @flow
import { overlayPadding } from 'cssVariables';

import type { EmbeddableDisplayType, PageSize, Viewport, ScrollPosition } from 'types';

const MOBILE_DEVICE_WIDTH = 600;
const DESKTOP_OVERLAY_PADDING = parseInt(overlayPadding, 10) * 2;

export function getViewport(): Viewport {
  const pageWidth = document.documentElement
    ? Math.min(window.innerWidth, document.documentElement.clientWidth)
    : window.innerWidth;

  const pageHeight = window.innerHeight;

  // We consider screen size in calculating the viewport because mobile devices report the
  // document size misleadingly if the host page doesn't contain a responsive <meta> viewport
  // tag. e.g. iPhone will report the width as 980px instead of the expected ~375px.
  return {
    pageWidth,
    pageHeight,
    width: window.screen ? Math.min(window.screen.width, pageWidth) : pageWidth,
    height: window.screen ? Math.min(window.screen.height, pageHeight) : pageHeight,
  };
}

export function getScrollPosition(): ScrollPosition {
  return {
    left: window.pageXOffset,
    top: window.pageYOffset,
  };
}

export function getDocumentHeight(): number {
  // http://stackoverflow.com/questions/1145850/how-to-get-height-of-entire-document-with-javascript
  const {body, documentElement} = document;

  if (!body || !documentElement) {
    return 0;
  }

  return Math.max(
    body.scrollHeight,
    body.offsetHeight,
    documentElement.clientHeight,
    documentElement.scrollHeight,
    documentElement.offsetHeight
  );
}

export function getBreakpoint(
  displayType: EmbeddableDisplayType,
  pageSize: PageSize,
  viewport: Viewport,
  isMobileDevice: boolean
): 'desktop' | 'mobile' {
  // Mobile-only Convertables are a special case where we show iff the viewport is less than 600px
  if (!pageSize.desktop.width) {
    return viewport.width <= MOBILE_DEVICE_WIDTH ? 'mobile' : 'desktop';
  }

  switch (displayType) {
    case 'overlay': {
      // We consider the smallest viewport dimension (i.e. not just width) on mobile devices so that
      // if the user starts on landscape and switches to portrait they aren't stuck with the desktop
      // overlay (see EM-1147).
      const viewportWidth = isMobileDevice
        ? Math.min(viewport.width, viewport.height)
        : viewport.width - DESKTOP_OVERLAY_PADDING;

      return viewportWidth < pageSize.desktop.width ? 'mobile' : 'desktop';
    }

    case 'stickyBar':
    default:
      // Sticky bars do not have horizontal padding, and should never be taller than the viewport
      // in any orientation.
      return viewport.pageWidth < pageSize.desktop.width ? 'mobile' : 'desktop';
  }
}

export function getBreakpointToDisplay(
  displayType: EmbeddableDisplayType,
  pageSize: PageSize,
  viewport: Viewport,
  isMobileDevice: boolean
): 'desktop' | 'mobile' | null {
  const breakpoint = getBreakpoint(displayType, pageSize, viewport, isMobileDevice);

  return pageSize[breakpoint].width > 0 && pageSize[breakpoint].height > 0 ? breakpoint : null;
}
