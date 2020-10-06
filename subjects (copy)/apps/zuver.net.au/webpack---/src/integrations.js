const identify = function () {
  if (window.Shopify && window.Shopify.checkout && window.Shopify.checkout.email) {
    _dcq.push(["identify", {
      email: window.Shopify.checkout.email,
      drip_unknown_status: true
    }]);
  }
};

module.exports = {
  identify: identify
};
