export const IS_US = !window.location.pathname.match( /\/au($|\/)/ );

// graphql

export const AU_GRAPHQL_SERVER_BASE_URL = process.env.REACT_APP_GRAPHQL_SERVER_BASE_URL_AU;
export const US_GRAPHQL_SERVER_BASE_URL = process.env.REACT_APP_GRAPHQL_SERVER_BASE_URL_US;
export const GRAPHQL_SERVER_BASE_URL = IS_US
  ? US_GRAPHQL_SERVER_BASE_URL : AU_GRAPHQL_SERVER_BASE_URL;

// stripe
export const AU_STRIPE_KEY = process.env.REACT_APP_STRIPE_API_KEY_AU;
export const US_STRIPE_KEY = process.env.REACT_APP_STRIPE_API_KEY_US;
export const STRIPE_KEY = IS_US ? US_STRIPE_KEY : AU_STRIPE_KEY;

// shvimply check
export const IS_SHVIMPLY = window.location.hostname.match( /.*shvimply.*/ );
// export const IS_SHVIMPLY = window.location.hostname.match( /.*localhost.*/ ); // for testing

// Socket
export const US_SOCKET_URL = process.env.REACT_APP_US_SOCKET_URL;
export const AU_SOCKET_URL = process.env.REACT_APP_AU_SOCKET_URL;
export const SOCKET_URL = IS_US ? US_SOCKET_URL : AU_SOCKET_URL;

export const HEADER_IMG = '../img/shvimplyImages/header_img.jpeg';
export const HEADER_IMG_MOBILE = '../img/shvimplyImages/mobile_header_img.jpeg';
export const BECOME_A_HOST = IS_SHVIMPLY ? '../img/shvimplyImages/become_a_host.jpg' : '../img/listpool_banner.jpg';
export const NOT_JUST_POOL = IS_SHVIMPLY ? `${window.location.origin}/img/shvimplyImages/not_just_a_pool.png` : `${window.location.origin}/img/assest.png`;
export const DISCOUNT_POPUP_IMG = IS_SHVIMPLY ? '/img/shvimplyImages/not_just_a_pool.png' : '/img/leave_us_email_popup.jpg';
export const LOGO_IMAGE = IS_SHVIMPLY ? `${window.location.origin}/img/shvimplyImages/shvimply_logo_blue.png` : `${window.location.origin}/img/Swimply-logo-blue.png`;

// firebase dynamic link
export const FB_DYNAMIC_LINK = 'https://swimply.page.link/app';

export const timeArray = [
  {
    time: '7AM', displayFormattedTime: '7:00 AM', displayTime: '7 am', activeClass: '', instaBookingClass: '', disable: false, time_insert: '07:00:00', timeNumber: 7,
  },
  {
    time: '8AM', displayFormattedTime: '8:00 AM', displayTime: '8 am', activeClass: '', instaBookingClass: '', disable: false, time_insert: '08:00:00', timeNumber: 8,
  },
  {
    time: '9AM', displayFormattedTime: '9:00 AM', displayTime: '9 am', activeClass: '', instaBookingClass: '', disable: false, time_insert: '09:00:00', timeNumber: 9,
  },
  {
    time: '10AM', displayFormattedTime: '10:00 AM', displayTime: '10 am', activeClass: '', instaBookingClass: '', disable: false, time_insert: '10:00:00', timeNumber: 10,
  },
  {
    time: '11AM', displayFormattedTime: '11:00 AM', displayTime: '11 am', activeClass: '', instaBookingClass: '', disable: false, time_insert: '11:00:00', timeNumber: 11,
  },
  {
    time: '12PM', displayFormattedTime: '12:00 PM', displayTime: '12 pm', activeClass: '', instaBookingClass: '', disable: false, time_insert: '12:00:00', timeNumber: 12,
  },
  {
    time: '1PM', displayFormattedTime: '1:00 PM', displayTime: '1 pm', activeClass: '', instaBookingClass: '', disable: false, time_insert: '13:00:00', timeNumber: 13,
  },
  {
    time: '2PM', displayFormattedTime: '2:00 PM', displayTime: '2 pm', activeClass: '', instaBookingClass: '', disable: false, time_insert: '14:00:00', timeNumber: 14,
  },
  {
    time: '3PM', displayFormattedTime: '3:00 PM', displayTime: '3 pm', activeClass: '', instaBookingClass: '', disable: false, time_insert: '15:00:00', timeNumber: 15,
  },
  {
    time: '4PM', displayFormattedTime: '4:00 PM', displayTime: '4 pm', activeClass: '', instaBookingClass: '', disable: false, time_insert: '16:00:00', timeNumber: 16,
  },
  {
    time: '5PM', displayFormattedTime: '5:00 PM', displayTime: '5 pm', activeClass: '', instaBookingClass: '', disable: false, time_insert: '17:00:00', timeNumber: 17,
  },
  {
    time: '6PM', displayFormattedTime: '6:00 PM', displayTime: '6 pm', activeClass: '', instaBookingClass: '', disable: false, time_insert: '18:00:00', timeNumber: 18,
  },
  {
    time: '7PM', displayFormattedTime: '7:00 PM', displayTime: '7 pm', activeClass: '', instaBookingClass: '', disable: false, time_insert: '19:00:00', timeNumber: 19,
  },
  {
    time: '8PM', displayFormattedTime: '8:00 PM', displayTime: '8 pm', activeClass: '', instaBookingClass: '', disable: false, time_insert: '20:00:00', timeNumber: 20,
  },
  {
    time: '9PM', displayFormattedTime: '9:00 PM', displayTime: '9 pm', activeClass: '', instaBookingClass: '', disable: false, time_insert: '21:00:00', timeNumber: 21,
  },
  {
    time: '10PM', displayFormattedTime: '10:00 PM', displayTime: '10 pm', activeClass: '', instaBookingClass: '', disable: false, time_insert: '22:00:00', timeNumber: 22,
  },
  {
    time: '11PM', displayFormattedTime: '11:00 PM', displayTime: '11 pm', activeClass: '', instaBookingClass: '', disable: false, time_insert: '23:00:00', timeNumber: 23,
  },
  {
    time: '12AM', displayFormattedTime: '12:00 AM', displayTime: '12 am', activeClass: '', instaBookingClass: '', disable: false, time_insert: '00:00:00', timeNumber: 24,
  },
];

export const defaultDays = [
  {
    day: 'SU', active: false, day_name: 'Sun', day_number: 0,
  },
  {
    day: 'M', active: false, day_name: 'Mon', day_number: 1,
  },
  {
    day: 'T', active: false, day_name: 'Tue', day_number: 2,
  },
  {
    day: 'W', active: false, day_name: 'Wed', day_number: 3,
  },
  {
    day: 'TH', active: false, day_name: 'Thu', day_number: 4,
  },
  {
    day: 'F', active: false, day_name: 'Fri', day_number: 5,
  },
  {
    day: 'SA', active: false, day_name: 'Sat', day_number: 6,
  },
];

export const FB_APP_ID = process.env.REACT_APP_FB_APP_ID;
export const APPLE_CLIENT_ID = process.env.REACT_APP_APPLE_CLIENT_ID;

export const APP_URL = process.env.REACT_APP_URL;

export default {
  IS_US,
  STRIPE_KEY,
  GRAPHQL_SERVER_BASE_URL,
  FB_APP_ID,
  APPLE_CLIENT_ID,
  APP_URL,
};
