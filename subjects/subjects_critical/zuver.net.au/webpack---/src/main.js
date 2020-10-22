import Client from "./base_client";
import Jsonp from "./jsonp";
import getQueryVariable from "./get_query_variable";
import Location from "./location";
import Widget from "./widget";
import Dom from "./dom";
import Util from "./util";
import Time from "./time";
import Criteria from "./criteria";
import Integrations from "./integrations";

window._dc = Client.make_dc(
  window,
  document,
  window.jQuery,
  navigator,
  Jsonp,
  getQueryVariable,
  Location,
  Widget,
  Dom,
  Util,
  Time,
  Criteria,
  Integrations
);

window._dc.initialize(window._dcs, window._dcq);
