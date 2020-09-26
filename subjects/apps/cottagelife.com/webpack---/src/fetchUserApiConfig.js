// @flow
import type {UserApiConfiguration} from 'types';
import {isObject} from 'utils';

const defaults: UserApiConfiguration = {
  // Legacy hooks using activation rule ID
  shouldShowOverlay() { return true; },
  onConvertableShow() {},
  onConvertableDismiss() {},
  onConversion() {},

  // New hooks using emb UUID
  shouldShow() { return true; },
  onShow() {},
  onDismiss() {},
  onConvert() {},
};

const fetchGlobal = (): $Shape<UserApiConfiguration> =>
  (isObject(global._ubeConfig) ? global._ubeConfig : {});

export default (): UserApiConfiguration => (
  {
    ...defaults,
    ...fetchGlobal()
  }
);
