// @flow
import qs from 'query-string';

import type {Env} from 'types';

export default function isDebugMode(environment: Env, queryString: string): boolean {
  return Boolean(environment !== 'production' || qs.parse(queryString)['ub-debug']);
}
