// @flow
import isMobile from 'ismobilejs';
import getIOSVersion from 'ios-version';
import scriptVersion from 'scriptVersion';

import type {
  Env,
  GeoData,
  State,
  UbCode
} from 'types';

type Args = {
  environment: Env,
  geoData: ?GeoData,
  previewMode: boolean,
  ubCode: UbCode,
};

export default function createInitialState(args: Args): State {
  const iOSVersion = getIOSVersion(window.navigator.userAgent);

  return {
    previewMode: args.previewMode,
    embeddables: [],
    environment: args.environment,
    geoData: args.geoData,
    device: {
      isIOS: isMobile.apple.device,
      isOldIOS: isMobile.apple.device && iOSVersion && iOSVersion.major < 10,
      isMobile: isMobile.any,
    },
    lifecycleEvents: [],
    logMessages: [],
    viewport: {
      pageWidth: 0,
      pageHeight: 0,
      width: 0,
      height: 0,
    },
    locationHref: window.location.href,
    locationSearch: window.location.search,
    referrer: window.document.referrer,
    scrollPosition: {
      top: 0,
      left: 0,
    },
    scriptVersion,
    timestamp: Date.now(),
    ubCode: args.ubCode,
    visibleEmbIds: {
      overlay: undefined,
      stickyBar: undefined,
    },
    visitorId: '',
  };
}
