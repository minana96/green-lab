// @flow
import { map } from 'rxjs/operators';

import { hrefChange$ } from './domEvents';
import actions from './actions';

export default function createLocationHrefChanges() {
  return hrefChange$.pipe(map(locationHref => actions.setLocationHref({ locationHref })));
}
