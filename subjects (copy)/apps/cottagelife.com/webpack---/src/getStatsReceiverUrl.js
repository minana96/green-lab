// @flow
import type {UbCode, Env, Url} from 'types';

const envSuffixes: {[key: Env]: string} = {
  development: '-integration',
  integration: '-integration',
  production: ''
};

// eslint-disable-next-line no-unused-vars
const getStatsReceiverUrl = (ubCode: UbCode, env: Env): Url =>
  `//${ubCode}.events${envSuffixes[env || 'integration']}.ubembed.com`;

export default getStatsReceiverUrl;
