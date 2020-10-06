/* Find pool */
const ACCESS_TOKEN = "swimply::access_token";
const REFRESH_TOKEN = "swimply::refresh_token";
const EMAIL = "swimply::email";
const ACCESS_TOKEN_FORGOT_PASSWORD = "swimply::access_token_forgot_password";
const USER_ROLE = "swimply::user_role";
const USER_COUNTRY = "swimply::user_country";
const CARD_COUNTRY = "swimply::card_country";
const USER_ID = "swimply::user_id";
const ADDRESS = "swimply::address";
const AVAILABLE_DATE = "swimply::available_date";
const AVALABLE_TIME_FROM = "swimply::available_time_from";
const AVALABLE_TIME_TO = "swimply::available_time_to";
const FLEXIBLE_HOURS = "swimply::flexible_hours";
const INSTANT_BOOKING = "swimply::instant_booking";
const ADULT_COUNT = "swimply::adult_count";
const CHILD_COUNT = "swimply::child_count";
const INFANT_COUNT = "swimply::infant_count";
const SET_TIMER_MIN = "swimply::set_timer_min";
const SET_TIMER_MAX = "swimply::set_timer_max";
const START_TIME = "swimply::start_time";
const END_TIME = "swimply::end_time";
const POOL_ID = "swimply::pool_id";
const LAST_POOL_ID = "swimply::last_pool_id";
const CARD_BRAND = "swimply::card_brand";
const CARD_LAST_FOUR = "swimply::card_last_four";
const RESET_PASSWORD = "swimply::reset_password";
const POOL_BOOKING_STATUS = "swimply::pool_booking_status";
const MESSAGE_RECEIVER_ID = "swimply::message_receiver_id";
const PAYMENT_FROM_ID = "swimply::payment_from_id";
const BACK_BTN_LINK = "swimply::back_btn_link";
const PAYMENT_REASON = "swimply::payment_reason";
const REFERRAL_ID = "swimply::referral_id";
const REFERRAL_ID_STATUS = "swimply::referral_id_status";
const SEARCH_POOL_PAGE = "swimply::search_pool_page";
const HOST_POOL_ID = "swimply::host_pool_id";
const CREATE_HOST_POOL_ID = "swimply::create_host_pool_id";
const HOST_POOL_CREATION_TIME_START = "swimply::host_pool_creation_time_start";
const HOST_POOL_STATUS = "swimply::host_pool_status";
const REVIEW_TYPE = "swimply::host_pool_status";
const VERIFY_EMAIL_ID = "swimply::verify_email_id";
const PREVIOUS_URL = "swimply::previous_url";
const IS_PREVIOUS_URL = "swimply::is_previous_url";
const PREVIOUS_SEARCH_URL = "swimply::previous_search_url";
const START_TUTORIAL = "swimply::start_tutorial";
const CURRENT_REGION = "swimply::current_region";
// const SHOW_DISCOUNT_POPUP_NOW = "show_discount_popup";
const START_PRICE = "swimply::start_price";
const END_PRICE = "swimply::end_price";
const FILTERING_AMENITIES = "swimply::filtering_amenities";
const INCOMPLETE_HOST_INFO = "swimply::host_incomplete";
const REFERRAL_TOKEN = "swimply::referral_token";
const VERIFICATION_GET_STARTED = "swimply::verification_get_started";
const PRESAVED_CHATS = 'swimply::presaved_chats';
const LATEST_CHATS = 'swimply::latest_chats';

export default {
  init( context ) {
    this.context = context;
  },
  /* Autherization */
  setAccessToken(access_token) {
    localStorage.setItem(ACCESS_TOKEN, access_token);
  },
  getAccessToken() {
    return localStorage.getItem(ACCESS_TOKEN);
  },
  removeAccessToken() {
    localStorage.removeItem(ACCESS_TOKEN);
  },
  setRefreshToken(refresh_token) {
    localStorage.setItem(REFRESH_TOKEN, refresh_token);
  },
  getRefreshToken() {
    return localStorage.getItem(REFRESH_TOKEN);
  },
  removeRefreshToken() {
    localStorage.removeItem(REFRESH_TOKEN);
  },
  setEmail(email) {
    if (email) {
      localStorage.setItem(EMAIL, email);
    }
  },
  getEmail() {
    return localStorage.getItem(EMAIL);
  },
  removeEmail() {
    localStorage.removeItem(EMAIL);
  },
  setAccessTokenForgotPassword(access_token_forgot_password) {
    localStorage.setItem(
      ACCESS_TOKEN_FORGOT_PASSWORD,
      access_token_forgot_password
    );
  },
  setVerificationGetStarted(status) {
    localStorage.setItem(
      VERIFICATION_GET_STARTED,
      status || ''
    );
  },
  getVerificationGetStarted() {
    return localStorage.getItem(VERIFICATION_GET_STARTED) || '';
  },
  setReferralToken(token) {
    sessionStorage.setItem(
      REFERRAL_TOKEN,
      token || ''
    );
  },
  getReferralToken() {
    return sessionStorage.getItem(REFERRAL_TOKEN) || '';
  },
  removeReferralToken() {
    sessionStorage.removeItem(REFERRAL_TOKEN);
  },
  getAccessTokenForgotPassword() {
    return localStorage.getItem(ACCESS_TOKEN_FORGOT_PASSWORD);
  },
  removeAccessTokenForgotPassword() {
    localStorage.removeItem(ACCESS_TOKEN_FORGOT_PASSWORD);
  },
  setUserRole(user_role) {
    localStorage.setItem(USER_ROLE, user_role);
  },
  getUserRole() {
    return localStorage.getItem(USER_ROLE);
  },
  removeUserRole() {
    localStorage.removeItem(USER_ROLE);
  },
  setUserID(user_id) {
    localStorage.setItem(USER_ID, user_id);
  },
  getUserID() {
    return localStorage.getItem(USER_ID);
  },
  removeUserID() {
    localStorage.removeItem(USER_ID);
  },
  setUserCountry (user_country) {
    localStorage.setItem(USER_COUNTRY, user_country);
  },
  getUserCountry () {
    return localStorage.getItem(USER_COUNTRY);
  },
  setSwimmerCountry (card_country) {
    localStorage.setItem(CARD_COUNTRY, card_country);
  },
  getSwimmerCountry () {
    return localStorage.getItem(CARD_COUNTRY);
  },

  async setCurrentRegion (region) {
    await sessionStorage.setItem(CURRENT_REGION, region);
  },

  getCurrentRegion () {
    return sessionStorage.getItem(CURRENT_REGION);
  },

  /* Find pool */
  setAddress(address) {
    localStorage.setItem(ADDRESS, address);
  },
  getAddress() {
    return localStorage.getItem(ADDRESS);
  },
  removeAddress() {
    localStorage.removeItem(ADDRESS);
  },
  setAvailableDate(available_date) {
    localStorage.setItem(AVAILABLE_DATE, available_date);
  },
  checkAvailableDate() {
    return localStorage.getItem(AVAILABLE_DATE);
  },
  getAvailableDate() {
    let currentDate = new Date();
    let date = localStorage.getItem(AVAILABLE_DATE);
    date = new Date(date) < currentDate ? currentDate.toString() : date;
    return date;
  },
  removeAvailableDate() {
    localStorage.removeItem(AVAILABLE_DATE);
  },
  setAvailableTimeFrom(available_time_from) {
    localStorage.setItem(AVALABLE_TIME_FROM, available_time_from);
  },
  getAvailableTimeFrom() {
    return localStorage.getItem(AVALABLE_TIME_FROM);
  },
  removeAvailableTimeFrom() {
    localStorage.removeItem(AVALABLE_TIME_FROM);
  },
  setAvailableTimeTo(available_time_from) {
    localStorage.setItem(AVALABLE_TIME_TO, available_time_from);
  },
  getAvailableTimeTo() {
    return localStorage.getItem(AVALABLE_TIME_TO);
  },
  removeAvailableTimeTo() {
    localStorage.removeItem(AVALABLE_TIME_TO);
  },
  setFlexibleHours(flexible_hours) {
    localStorage.setItem(FLEXIBLE_HOURS, flexible_hours);
  },
  getFlexibleHours() {
    return localStorage.getItem(FLEXIBLE_HOURS);
  },
  removeFlexibleHours() {
    localStorage.removeItem(FLEXIBLE_HOURS);
  },
  setStartTime(start_time) {
    localStorage.setItem(START_TIME, start_time);
  },
  getStartTime() {
    return localStorage.getItem(START_TIME);
  },
  removeStartTime() {
    localStorage.removeItem(START_TIME);
  },
  setEndTime(end_time) {
    localStorage.setItem(END_TIME, end_time);
  },
  getEndTime() {
    return localStorage.getItem(END_TIME);
  },
  removeEndTime() {
    localStorage.removeItem(END_TIME);
  },
  setInstantBooking(instant_booking) {
    localStorage.setItem(INSTANT_BOOKING, instant_booking);
  },
  getInstantBooking() {
    return localStorage.getItem(INSTANT_BOOKING);
  },
  removeInstantBooking() {
    localStorage.removeItem(INSTANT_BOOKING);
  },
  setAdultCount(adult_count) {
    localStorage.setItem(ADULT_COUNT, adult_count);
  },
  getAdultCount() {
    return localStorage.getItem(ADULT_COUNT);
  },
  removeAdultCount() {
    localStorage.removeItem(ADULT_COUNT);
  },
  setChildCount(child_count) {
    localStorage.setItem(CHILD_COUNT, child_count);
  },
  getChildCount() {
    return localStorage.getItem(CHILD_COUNT);
  },
  removeChildCount() {
    localStorage.removeItem(CHILD_COUNT);
  },
  setInfantCount(infant_count) {
    localStorage.setItem(INFANT_COUNT, infant_count);
  },
  getInfantCount() {
    return localStorage.getItem(INFANT_COUNT);
  },
  removeInfantCount() {
    localStorage.removeItem(INFANT_COUNT);
  },
  setTimerMin(set_timer_min) {
    localStorage.setItem(SET_TIMER_MIN, set_timer_min);
  },
  getTimerMin() {
    return localStorage.getItem(SET_TIMER_MIN);
  },
  removeTimeMin() {
    localStorage.removeItem(SET_TIMER_MIN);
  },
  setTimerMax(set_timer_max) {
    localStorage.setItem(SET_TIMER_MAX, set_timer_max);
  },
  getTimerMax() {
    return localStorage.getItem(SET_TIMER_MAX);
  },
  removeTimeMax() {
    localStorage.removeItem(SET_TIMER_MAX);
  },
  setPoolId(pool_id) {
    localStorage.setItem(POOL_ID, pool_id);
  },
  getPoolId() {
    return localStorage.getItem(POOL_ID);
  },
  removePoolId() {
    localStorage.removeItem(POOL_ID);
  },

  setLastPoolId(pool_id) {
    localStorage.setItem(LAST_POOL_ID, pool_id);
  },

  getLastPoolId() {
    return localStorage.getItem(LAST_POOL_ID);
  },

  setCardBrand(card_brand) {
    localStorage.setItem(CARD_BRAND, card_brand);
  },
  getCardBrand() {
    return localStorage.getItem(CARD_BRAND);
  },
  removeCardBrand() {
    localStorage.removeItem(CARD_BRAND);
  },
  setCardLastFourDigit(card_last_four) {
    localStorage.setItem(CARD_LAST_FOUR, card_last_four);
  },
  getCardLastFourDigit() {
    return localStorage.getItem(CARD_LAST_FOUR);
  },
  removeCardLastFourDigit() {
    localStorage.removeItem(CARD_LAST_FOUR);
  },
  setResetPassword(reset_password) {
    localStorage.setItem(RESET_PASSWORD, reset_password);
  },
  getResetPassword() {
    return localStorage.getItem(RESET_PASSWORD);
  },
  removeResetPassword() {
    localStorage.removeItem(RESET_PASSWORD);
  },
  setPoolBookingStatus(status) {
    localStorage.setItem(POOL_BOOKING_STATUS, status);
  },
  getPoolBookingStatus() {
    return localStorage.getItem(POOL_BOOKING_STATUS);
  },
  removePoolBookingStatus() {
    localStorage.removeItem(POOL_BOOKING_STATUS);
  },
  setMessageReceiverId(message_receiver_id) {
    localStorage.setItem(MESSAGE_RECEIVER_ID, message_receiver_id);
  },
  getMessageReceiverId() {
    return localStorage.getItem(MESSAGE_RECEIVER_ID);
  },
  removeMessageReceiverId() {
    localStorage.removeItem(MESSAGE_RECEIVER_ID);
  },
  setPaymentFromId(payment_from_id) {
    localStorage.setItem(PAYMENT_FROM_ID, payment_from_id);
  },
  getPaymentFromId() {
    return localStorage.getItem(PAYMENT_FROM_ID);
  },
  removePaymentFromId() {
    localStorage.removeItem(PAYMENT_FROM_ID);
  },
  setBackBtnLink(back_btn_link) {
    localStorage.setItem(BACK_BTN_LINK, back_btn_link);
  },
  getBackBtnLink() {
    return localStorage.getItem(BACK_BTN_LINK);
  },
  removeBackBtnLink() {
    localStorage.removeItem(BACK_BTN_LINK);
  },
  setPaymentReason(payment_reason) {
    localStorage.setItem(PAYMENT_REASON, payment_reason);
  },
  getPaymentReason() {
    return localStorage.getItem(PAYMENT_REASON);
  },
  removePaymentReason() {
    localStorage.removeItem(PAYMENT_REASON);
  },
  setReferralId(referral_id) {
    localStorage.setItem(REFERRAL_ID, referral_id);
  },
  getReferralId() {
    return localStorage.getItem(REFERRAL_ID);
  },
  removeReferralId() {
    localStorage.removeItem(REFERRAL_ID);
  },
  setReferralIdStatus(referral_id_status) {
    localStorage.setItem(REFERRAL_ID_STATUS, referral_id_status);
  },
  getReferralIdStatus() {
    return localStorage.getItem(REFERRAL_ID_STATUS);
  },
  removeReferralIdStatus() {
    localStorage.removeItem(REFERRAL_ID_STATUS);
  },
  setPoolSearchPage(page) {
    localStorage.setItem(SEARCH_POOL_PAGE, page);
  },
  getPoolSearchPage() {
    return +localStorage.getItem(SEARCH_POOL_PAGE);
  },

  /* Host Module */
  setHostPoolID(host_pool_id) {
    localStorage.setItem(HOST_POOL_ID, host_pool_id);
  },
  getHostPoolID() {
    return localStorage.getItem(HOST_POOL_ID);
  },
  removeHostPoolID() {
    localStorage.removeItem(HOST_POOL_ID);
  },
  setCreatePoolTime(time) {
    localStorage.setItem(HOST_POOL_CREATION_TIME_START, time);
  },
  getCreatePoolTime() {
    return localStorage.getItem(HOST_POOL_CREATION_TIME_START);
  },
  removeCreatePoolTime() {
    localStorage.removeItem(HOST_POOL_CREATION_TIME_START);
  },
  setCreatePoolIDEvent(host_pool_id) {
    localStorage.setItem(CREATE_HOST_POOL_ID, host_pool_id);
  },
  getCreatePoolIDEvent() {
    return localStorage.getItem(CREATE_HOST_POOL_ID);
  },
  removeCreatePoolIDEvent() {
    localStorage.removeItem(CREATE_HOST_POOL_ID);
  },
  setEditPoolStatus(host_pool_status) {
    localStorage.setItem(HOST_POOL_STATUS, host_pool_status);
  },
  getEditPoolStatus() {
    return localStorage.getItem(HOST_POOL_STATUS);
  },
  removeEditPoolStatus() {
    localStorage.removeItem(HOST_POOL_STATUS);
  },

  setReviewType(review_type) {
    localStorage.setItem(REVIEW_TYPE, review_type);
  },
  getReviewType() {
    return localStorage.getItem(REVIEW_TYPE);
  },
  removeReviewType() {
    localStorage.removeItem(REVIEW_TYPE);
  },

  setVerifyEmailId(verify_email_id) {
    localStorage.setItem(VERIFY_EMAIL_ID, verify_email_id);
  },
  getVerifyEmailId() {
    return localStorage.getItem(VERIFY_EMAIL_ID);
  },
  removeVerifyEmailId() {
    localStorage.removeItem(VERIFY_EMAIL_ID);
  },


  setPreviousUrl(previous_url) {
    localStorage.setItem(PREVIOUS_URL, previous_url);
  },
  getPreviousUrl() {
    return localStorage.getItem(PREVIOUS_URL);
  },
  removePreviousUrl() {
    localStorage.removeItem(PREVIOUS_URL);
  },

  setIsPreviousUrl(is_previous_url) {
    localStorage.setItem(IS_PREVIOUS_URL, is_previous_url);
  },
  getIsPreviousUrl() {
    return localStorage.getItem(IS_PREVIOUS_URL);
  },
  removeIsPreviousUrl() {
    localStorage.removeItem(IS_PREVIOUS_URL);
  },

  setPreviousSearchUrl(previous_search_url) {
    localStorage.setItem(PREVIOUS_SEARCH_URL, previous_search_url);
  },
  getPreviousSearchUrl() {
    return localStorage.getItem(PREVIOUS_SEARCH_URL);
  },
  removePreviousSearchUrl() {
    localStorage.removeItem(PREVIOUS_SEARCH_URL);
  },

  setStartTutorial(start_tutorial) {
    localStorage.setItem(START_TUTORIAL, start_tutorial);
  },
  getStartTutorial() {
    return localStorage.getItem(START_TUTORIAL);
  },
  removeStartTutorial() {
    localStorage.removeItem(START_TUTORIAL);
  },

  setStartPrice(params) {
    localStorage.setItem(START_PRICE, params);
  },

  setEndPrice(params) {
    localStorage.setItem(END_PRICE, params);
  },

  setAmenities(params) {
    localStorage.setItem(FILTERING_AMENITIES, params);
  },

  getStartPrice() {
    let value = localStorage.getItem(START_PRICE);
    if (value) {
      return parseInt(value, 10);
    } else {
      return null
    }
  },

  getEndPrice() {
    let value = localStorage.getItem(END_PRICE);
    if (value) {
      return parseInt(value, 10);
    } else {
      return null
    }
  },

  getAmenities() {
    let value = localStorage.getItem(FILTERING_AMENITIES);
    if (value) {
      value = value.split(',')
    }
    return value
  },

  removeStartPrice() {
    localStorage.removeItem(START_PRICE)
  },

  removeEndPrice() {
    localStorage.removeItem(END_PRICE)
  },

  removeAmenities() {
    localStorage.removeItem(FILTERING_AMENITIES)
  },

  setHostDataIncomplete() {
    localStorage.setItem(INCOMPLETE_HOST_INFO, true)
  },

  getHostDataIncomplete() {
    return localStorage.getItem(INCOMPLETE_HOST_INFO)
  },

  removeHostDataIncomplete() {
    localStorage.removeItem(INCOMPLETE_HOST_INFO)
  },

  setChatsList(chats) {
    chats = JSON.stringify(chats)
    localStorage.setItem(PRESAVED_CHATS, chats)
  },

  getChatsList() {
    return JSON.parse(localStorage.getItem(PRESAVED_CHATS)) || []
  },

  setLatestChats(chats) {
    chats = JSON.stringify(chats)
    localStorage.setItem(LATEST_CHATS, chats)
  },

  getLatestChats() {
    return JSON.parse(localStorage.getItem(LATEST_CHATS)) || []
  },

  /* Logout */
  logout() {
    //localStorage.clear();
    /* Autherization */
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
    localStorage.removeItem(USER_ID);
    localStorage.removeItem(USER_ROLE);
    localStorage.getItem(ACCESS_TOKEN_FORGOT_PASSWORD);
    localStorage.removeItem('popupShowed');
    localStorage.removeItem('swimply::email')

    /* Find pool */
    localStorage.removeItem(ADDRESS);
    localStorage.removeItem(AVAILABLE_DATE);
    localStorage.removeItem(AVALABLE_TIME_FROM);
    localStorage.removeItem(AVALABLE_TIME_TO);
    localStorage.removeItem(FLEXIBLE_HOURS);
    localStorage.removeItem(INSTANT_BOOKING);
    localStorage.removeItem(ADULT_COUNT);
    localStorage.removeItem(CHILD_COUNT);
    localStorage.removeItem(INFANT_COUNT);
    localStorage.removeItem(START_TIME);
    localStorage.removeItem(END_TIME);
    localStorage.removeItem(SET_TIMER_MIN);
    localStorage.removeItem(SET_TIMER_MAX);
    localStorage.removeItem(POOL_ID);
    localStorage.removeItem(CARD_BRAND);
    localStorage.removeItem(CARD_LAST_FOUR);
    localStorage.removeItem(RESET_PASSWORD);
    localStorage.removeItem(POOL_BOOKING_STATUS);
    localStorage.removeItem(MESSAGE_RECEIVER_ID);
    localStorage.removeItem(BACK_BTN_LINK);
    localStorage.removeItem(PAYMENT_REASON);
    localStorage.removeItem('searched_zip_codes');
    localStorage.removeItem(PRESAVED_CHATS);
    localStorage.removeItem(LATEST_CHATS);
    /* Host module */
    localStorage.removeItem(HOST_POOL_ID);
    localStorage.removeItem(REVIEW_TYPE);
    localStorage.removeItem(INCOMPLETE_HOST_INFO);
    localStorage.removeItem(VERIFICATION_GET_STARTED);
    if ( this.context && this.context.echo ) {
      this.context.echo.leave( `chat.${this.context.user.id}` );
    }
  },

  logoutAndSetPreviousUrl (history, location) {
    this.logout()
    this.setPreviousUrl(location.pathname)
    this.setPreviousSearchUrl(location.search)
    this.setIsPreviousUrl('yes')
    history.push('/')
  },
  
  // Leave-us-email (Discount) popup
  // getShowDiscountPopup() {
  //   return localStorage.getItem(SHOW_DISCOUNT_POPUP_NOW)
  // },

  // showDiscountPopup(show = false) {
  //   localStorage.setItem(SHOW_DISCOUNT_POPUP_NOW, show)
  // },

  // onPopupClose() {
  //   localStorage.removeItem(SHOW_DISCOUNT_POPUP_NOW)
  // }
};
