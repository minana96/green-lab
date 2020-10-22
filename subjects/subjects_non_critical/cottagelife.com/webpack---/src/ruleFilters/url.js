// @flow
import escapeStringRegexp from 'escape-string-regexp';
import Url from 'url-parse';

import {
  toLower,
  isPresent,
  startsWith,
  endsWith,
  some,
} from 'utils';

import type {ActivationRule, UrlTargetRuleType} from 'types';

const urlMatcher = (url: string, type: UrlTargetRuleType, token?: string = '') => {
  const {pathname: pathname0, query: query0, hash: hash0} = new Url(url);
  const pathname = toLower(pathname0);
  const fullPath = pathname + toLower(query0) + toLower(hash0);
  const targetValue = toLower(token);
  const escapedValue = escapeStringRegexp(targetValue);

  switch (type) {
    case 'exact': {
      const noSlashes = escapedValue.replace(/(^\/*|\/*$)/g, '');
      const optionalSlashes = new RegExp(`^/?${noSlashes}/?$`);

      return isPresent(targetValue) && (
          optionalSlashes.test(fullPath) ||
          optionalSlashes.test(pathname)
        );
    }

    case 'contains':
      return (
        isPresent(targetValue) &&
        (new RegExp(escapedValue)).test(fullPath)
      );

    case 'startswith':
      return (
      isPresent(targetValue) && (
        startsWith(fullPath, targetValue) ||
        startsWith(fullPath, `/${targetValue}`)
      ));

    case 'endswith':
      return (
      isPresent(targetValue) && (
        endsWith(fullPath, targetValue) ||
        endsWith(fullPath, `${targetValue}/`)
      ));

    case 'homepage':
      return (
        pathname === '/' ||
        pathname === ''
      );

    case 'everywhere':
      return true;

    default:
      return false;
  }
};

const urlTargetRuleMatch = (url: string) => (activationRule: ActivationRule) => {
  const {rules} = activationRule.urlTargets;
  const matcher = rule => urlMatcher(url, rule.type, rule.value);
  const includes = rules.filter(rule => rule.visibility === 'show');
  const excludes = rules.filter(rule => rule.visibility === 'hide');

  const negativeMatch = some(excludes, matcher);

  if (negativeMatch) {
    return false;
  }

  return some(includes, matcher);
};

export default urlTargetRuleMatch;
