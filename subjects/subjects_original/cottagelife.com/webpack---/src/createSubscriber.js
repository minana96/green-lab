// @flow

import { Subscriber } from 'rxjs';

type ReportError = (err?: Error | string) => void;

// eslint-disable-next-line flowtype/no-weak-types
export default function (next: any => void, report: ReportError) {
  const wrappedNext = obj => {
    try {
      next(obj);
    } catch (err) {
      report(err);
    }
  };

  return Subscriber.create(
    wrappedNext,
    report
  );
};
