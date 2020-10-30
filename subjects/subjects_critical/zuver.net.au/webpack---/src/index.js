'use strict';

require('jquery');

require('./styles/main/style.scss');

var _Router = require('./util/Router');

var _Router2 = _interopRequireDefault(_Router);

var _common = require('./routes/common');

var _common2 = _interopRequireDefault(_common);

var _home = require('./routes/home');

var _home2 = _interopRequireDefault(_home);

var _pageTemplateWordpressHosting = require('./routes/page-template-wordpress-hosting');

var _pageTemplateWordpressHosting2 = _interopRequireDefault(_pageTemplateWordpressHosting);

var _pageTemplateCustomHosting = require('./routes/page-template-custom-hosting');

var _pageTemplateCustomHosting2 = _interopRequireDefault(_pageTemplateCustomHosting);

var _pageTemplateDomains = require('./routes/page-template-domains');

var _pageTemplateDomains2 = _interopRequireDefault(_pageTemplateDomains);

var _pageTemplatePayInvoice = require('./routes/page-template-pay-invoice');

var _pageTemplatePayInvoice2 = _interopRequireDefault(_pageTemplatePayInvoice);

var _pageTemplateContactUs = require('./routes/page-template-contact-us');

var _pageTemplateContactUs2 = _interopRequireDefault(_pageTemplateContactUs);

var _pageTemplateTransferHosting = require('./routes/page-template-transfer-hosting');

var _pageTemplateTransferHosting2 = _interopRequireDefault(_pageTemplateTransferHosting);

var _singleDomainname = require('./routes/single-domainname');

var _singleDomainname2 = _interopRequireDefault(_singleDomainname);

var _pageTemplateDomainsRego = require('./routes/page-template-domains-rego');

var _pageTemplateDomainsRego2 = _interopRequireDefault(_pageTemplateDomainsRego);

var _pageTemplateDomainsPricing = require('./routes/page-template-domains-pricing');

var _pageTemplateDomainsPricing2 = _interopRequireDefault(_pageTemplateDomainsPricing);

var _pageTemplateDomainsTransfer = require('./routes/page-template-domains-transfer');

var _pageTemplateDomainsTransfer2 = _interopRequireDefault(_pageTemplateDomainsTransfer);

var _pageTemplateDomainsNames = require('./routes/page-template-domains-names');

var _pageTemplateDomainsNames2 = _interopRequireDefault(_pageTemplateDomainsNames);

var _pageTemplatePlesk = require('./routes/page-template-plesk');

var _pageTemplatePlesk2 = _interopRequireDefault(_pageTemplatePlesk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Populate Router instance with DOM routes
 * @type {Router} routes - An instance of our router
 */
var routes = new _Router2.default({
  common: _common2.default,
  home: _home2.default,
  pageTemplateWordpressHosting: _pageTemplateWordpressHosting2.default,
  pageTemplateCustomHosting: _pageTemplateCustomHosting2.default,
  pageTemplateDomains: _pageTemplateDomains2.default,
  pageTemplatePayInvoice: _pageTemplatePayInvoice2.default,
  pageTemplateContactUs: _pageTemplateContactUs2.default,
  pageTemplateTransferHosting: _pageTemplateTransferHosting2.default,
  singleDomainname: _singleDomainname2.default,
  pageTemplateDomainsRego: _pageTemplateDomainsRego2.default,
  pageTemplateDomainsPricing: _pageTemplateDomainsPricing2.default,
  pageTemplateDomainsTransfer: _pageTemplateDomainsTransfer2.default,
  pageTemplateDomainsNames: _pageTemplateDomainsNames2.default,
  pageTemplatePlesk: _pageTemplatePlesk2.default
});

/** Load Events */
jQuery(document).ready(function () {
  return routes.loadEvents();
});


//////////////////
// WEBPACK FOOTER
// ./src/index.js
// module id = 544
// module chunks = 0