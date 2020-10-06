// @flow
import type { ActivationRule } from 'types';

export default (timestamp: number, activationRule: ActivationRule) => {
  const { enabled } = activationRule.scheduling;
  const startTime = activationRule.scheduling.startTime || 0;
  const endTime = activationRule.scheduling.endTime || Infinity;

  return !enabled || (timestamp >= startTime && timestamp <= endTime);
};
