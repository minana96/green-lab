// @flow
import scriptVersion from 'scriptVersion';
import createLogger from 'logger';

import type {OriginServerInputs} from 'types';

export default (initFunction: OriginServerInputs => void) => {
  let count = 0;

  return (inputs: OriginServerInputs): void => {
    count += 1;

    if (count === 1) {
      initFunction(inputs);
    } else {
      createLogger(inputs.environment, window.location.search).warn(
        `Unbounce Universal Script ${scriptVersion} attempted to run ${count} times.`,
        'Script is possibly embedded in page more than once.'
      );
    }
  };
};
