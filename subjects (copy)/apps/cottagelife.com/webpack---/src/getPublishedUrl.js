// @flow
import type { UbCode, Uuid, Env, Url } from 'types';

const envSuffixes: { [Env]: string } = {
  development: '-integration',
  integration: '-integration',
  production: '',
};

export default function getPublishedUrl(
  ubCode: UbCode,
  embUuid: Uuid,
  variantLetter: string = 'a',
  environment: Env
): Url {
  if (environment === 'development' && embUuid.indexOf('mock') === 0) {
    return `${embUuid}?variant=${variantLetter}`;
  }

  const envSuffix = envSuffixes[environment || 'integration'];

  return `//${ubCode}.pages${envSuffix}.ubembed.com/${embUuid}/${variantLetter}.html`;
}
