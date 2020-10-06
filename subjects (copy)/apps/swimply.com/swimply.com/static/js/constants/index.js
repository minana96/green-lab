export const SWIMMER_CANCEL_REASONS = [
  'Entered wrong info, will request again',
  'Host didn\'t reply quickly enough',
  'Made alternate plans',
  'Poor weather',
  'Found a different pool',
  'Just trying out the site',
  'Other',
];

export const SWIMMER_CANCEL_CONFIRMED_REASONS = [
  'Can no longer attend',
  'Poor weather',
  'Found a different pool',
  'Host won\'t provide for my specific needs',
  'Made alternate plans',
  'Other',
];

export const HOST_DECLINE_REASONS = [
  'Need the pool for personal use',
  'Need more advance notice',
  'Too many guests',
  'Guest was unresponsive in chat',
  'Pool currently under maintenance',
  'Won\'t be home at the time',
  'Not enough info about reservation',
  'Not enough adults',
  'Not my ideal booking',
  'Other',
];

export const HOST_CANCEL_CONFIRMED_REASONS = [
  'Guest has changed details of reservation',
  'Guest asked to reschedule',
  'Pool maintenance issues',
  'Need the pool for personal use',
  'Other',
];

export const PAUSE_POOL_REASONS = [
  'Just need some time to update my account',
  'No longer own this pool',
  'Didn\'t feel like I was earning enough',
  'I use my pool too often to rent it out',
  'I had a bad experience',
  'Need a quick break',
  'Other',
];

export const ADVANCE_NOTICES = [
  { key: 1, value: '1 hour in advance' },
  { key: 3, value: '3 hours in advance' },
  { key: 24, value: '24 hours in advance' },
  { key: 72, value: '3 days in advance' },
];

export const AVAILABILITY_WINDOW = [
  { key: 7, value: '1 week' },
  { key: 14, value: '2 weeks' },
  { key: 28, value: '1 month' },
  { key: 84, value: '3 months' },
  { key: 168, value: '6 months' },
  { key: 336, value: '1 year' },
];

export const INSTANT_GROUP_SIZE = [
  5,
  10,
  15,
  20,
  25,
  30,
];

export const POOL_PRICE_LIST = [
  { key: 15, value: '15 - Standard' },
  { key: 30, value: '30 - Comfort' },
  { key: 45, value: '45 - Lux' },
  { key: 60, value: '60 - Vip' },
];

export const POOL_PRICE_LIST_US = [
  { key: 15, value: '15 - Standard' },
  { key: 30, value: '30 - Comfort' },
  { key: 45, value: '45 - Lux' },
  { key: 60, value: '60 - Vip' },
];

export const PRICE_PER_GUEST = [
  1,
  3,
  5,
  10,
];

export const PRICE_PER_GUEST_MIN_CAPACITY = [
  5,
  10,
  15,
  20,
  25,
  30,
];

export const MAX_GUESTS = [
  5,
  10,
  15,
  20,
  25,
  30,
  35,
  40,
  45,
  50,
];

export const FILTER_AMENITIES = [
  'diving board',
  'heated pool',
  'restroom',
  'bbq grill',
  'pet friendly',
  'hot tub',
];

export const STRIPE_SUPPORT_COUNTRIES_CODES = [
  'US', 'CA', 'GB', 'FR', 'AT', 'BE', 'BR', 'DK', 'FI',
  'DE', 'HK', 'IE', 'JP', 'LU', 'MX', 'NL',
  'NZ', 'NO', 'SG', 'ES', 'SE', 'CH', 'IT', 'PT',
];

export const TIME_DETAILS = [
  '12 AM',
  '1 AM',
  '2 AM',
  '3 AM',
  '4 AM',
  '5 AM',
  '6 AM',
  '7 AM',
  '8 AM',
  '9 AM',
  '10 AM',
  '11 AM',
  '12 PM',
  '1 PM',
  '2 PM',
  '3 PM',
  '4 PM',
  '5 PM',
  '6 PM',
  '7 PM',
  '8 PM',
  '9 PM',
  '10 PM',
  '11 PM',
];

export const FULL_TIME_ARRAY = [
  {
    time: '1AM', displayFormattedTime: '1:00 AM', displayTime: '1 am', activeClass: '', instaBookingClass: '', disable: false, time_insert: '01:00:00', timeNumber: 1, timeFormat: 'am', displayTimeNumber: '1',
  },
  {
    time: '2AM', displayFormattedTime: '2:00 AM', displayTime: '2 am', activeClass: '', instaBookingClass: '', disable: false, time_insert: '02:00:00', timeNumber: 2, timeFormat: 'am', displayTimeNumber: '2',
  },
  {
    time: '3AM', displayFormattedTime: '3:00 AM', displayTime: '3 am', activeClass: '', instaBookingClass: '', disable: false, time_insert: '03:00:00', timeNumber: 3, timeFormat: 'am', displayTimeNumber: '3',
  },
  {
    time: '4AM', displayFormattedTime: '4:00 AM', displayTime: '4 am', activeClass: '', instaBookingClass: '', disable: false, time_insert: '04:00:00', timeNumber: 4, timeFormat: 'am', displayTimeNumber: '4',
  },
  {
    time: '5AM', displayFormattedTime: '5:00 AM', displayTime: '5 am', activeClass: '', instaBookingClass: '', disable: false, time_insert: '05:00:00', timeNumber: 5, timeFormat: 'am', displayTimeNumber: '5',
  },
  {
    time: '6AM', displayFormattedTime: '6:00 AM', displayTime: '6 am', activeClass: '', instaBookingClass: '', disable: false, time_insert: '06:00:00', timeNumber: 6, timeFormat: 'am', displayTimeNumber: '6',
  },
  {
    time: '7AM', displayFormattedTime: '7:00 AM', displayTime: '7 am', activeClass: '', instaBookingClass: '', disable: false, time_insert: '07:00:00', timeNumber: 7, timeFormat: 'am', displayTimeNumber: '7',
  },
  {
    time: '8AM', displayFormattedTime: '8:00 AM', displayTime: '8 am', activeClass: '', instaBookingClass: '', disable: false, time_insert: '08:00:00', timeNumber: 8, timeFormat: 'am', displayTimeNumber: '8',
  },
  {
    time: '9AM', displayFormattedTime: '9:00 AM', displayTime: '9 am', activeClass: '', instaBookingClass: '', disable: false, time_insert: '09:00:00', timeNumber: 9, timeFormat: 'am', displayTimeNumber: '9',
  },
  {
    time: '10AM', displayFormattedTime: '10:00 AM', displayTime: '10 am', activeClass: '', instaBookingClass: '', disable: false, time_insert: '10:00:00', timeNumber: 10, timeFormat: 'am', displayTimeNumber: '10',
  },
  {
    time: '11AM', displayFormattedTime: '11:00 AM', displayTime: '11 am', activeClass: '', instaBookingClass: '', disable: false, time_insert: '11:00:00', timeNumber: 11, timeFormat: 'am', displayTimeNumber: '11',
  },
  {
    time: '12PM', displayFormattedTime: '12:00 PM', displayTime: '12 pm', activeClass: '', instaBookingClass: '', disable: false, time_insert: '12:00:00', timeNumber: 12, timeFormat: 'pm', displayTimeNumber: '12',
  },
  {
    time: '1PM', displayFormattedTime: '1:00 PM', displayTime: '1 pm', activeClass: '', instaBookingClass: '', disable: false, time_insert: '13:00:00', timeNumber: 13, timeFormat: 'pm', displayTimeNumber: '1',
  },
  {
    time: '2PM', displayFormattedTime: '2:00 PM', displayTime: '2 pm', activeClass: '', instaBookingClass: '', disable: false, time_insert: '14:00:00', timeNumber: 14, timeFormat: 'pm', displayTimeNumber: '2',
  },
  {
    time: '3PM', displayFormattedTime: '3:00 PM', displayTime: '3 pm', activeClass: '', instaBookingClass: '', disable: false, time_insert: '15:00:00', timeNumber: 15, timeFormat: 'pm', displayTimeNumber: '3',
  },
  {
    time: '4PM', displayFormattedTime: '4:00 PM', displayTime: '4 pm', activeClass: '', instaBookingClass: '', disable: false, time_insert: '16:00:00', timeNumber: 16, timeFormat: 'pm', displayTimeNumber: '4',
  },
  {
    time: '5PM', displayFormattedTime: '5:00 PM', displayTime: '5 pm', activeClass: '', instaBookingClass: '', disable: false, time_insert: '17:00:00', timeNumber: 17, timeFormat: 'pm', displayTimeNumber: '5',
  },
  {
    time: '6PM', displayFormattedTime: '6:00 PM', displayTime: '6 pm', activeClass: '', instaBookingClass: '', disable: false, time_insert: '18:00:00', timeNumber: 18, timeFormat: 'pm', displayTimeNumber: '6',
  },
  {
    time: '7PM', displayFormattedTime: '7:00 PM', displayTime: '7 pm', activeClass: '', instaBookingClass: '', disable: false, time_insert: '19:00:00', timeNumber: 19, timeFormat: 'pm', displayTimeNumber: '7',
  },
  {
    time: '8PM', displayFormattedTime: '8:00 PM', displayTime: '8 pm', activeClass: '', instaBookingClass: '', disable: false, time_insert: '20:00:00', timeNumber: 20, timeFormat: 'pm', displayTimeNumber: '8',
  },
  {
    time: '9PM', displayFormattedTime: '9:00 PM', displayTime: '9 pm', activeClass: '', instaBookingClass: '', disable: false, time_insert: '21:00:00', timeNumber: 21, timeFormat: 'pm', displayTimeNumber: '9',
  },
  {
    time: '10PM', displayFormattedTime: '10:00 PM', displayTime: '10 pm', activeClass: '', instaBookingClass: '', disable: false, time_insert: '22:00:00', timeNumber: 22, timeFormat: 'pm', displayTimeNumber: '10',
  },
  {
    time: '11PM', displayFormattedTime: '11:00 PM', displayTime: '11 pm', activeClass: '', instaBookingClass: '', disable: false, time_insert: '23:00:00', timeNumber: 23, timeFormat: 'pm', displayTimeNumber: '11',
  },
  {
    time: '12AM', displayFormattedTime: '12:00 AM', displayTime: '12 am', activeClass: '', instaBookingClass: '', disable: false, time_insert: '00:00:00', timeNumber: 24, timeFormat: 'am', displayTimeNumber: '12',
  },
];

export const OBJECT_TIME_ARRAY = {
  time_insert: {
    '01:00:00': {
      time: '1AM', displayFormattedTime: '1:00 AM', displayTime: '1 am', activeClass: '', instaBookingClass: '', disable: false, time_insert: '01:00:00', timeNumber: 1, timeFormat: 'am', displayTimeNumber: '1',
    },
    '02:00:00': {
      time: '2AM', displayFormattedTime: '2:00 AM', displayTime: '2 am', activeClass: '', instaBookingClass: '', disable: false, time_insert: '02:00:00', timeNumber: 2, timeFormat: 'am', displayTimeNumber: '2',
    },
    '03:00:00': {
      time: '3AM', displayFormattedTime: '3:00 AM', displayTime: '3 am', activeClass: '', instaBookingClass: '', disable: false, time_insert: '03:00:00', timeNumber: 3, timeFormat: 'am', displayTimeNumber: '3',
    },
    '04:00:00': {
      time: '4AM', displayFormattedTime: '4:00 AM', displayTime: '4 am', activeClass: '', instaBookingClass: '', disable: false, time_insert: '04:00:00', timeNumber: 4, timeFormat: 'am', displayTimeNumber: '4',
    },
    '05:00:00': {
      time: '5AM', displayFormattedTime: '5:00 AM', displayTime: '5 am', activeClass: '', instaBookingClass: '', disable: false, time_insert: '05:00:00', timeNumber: 5, timeFormat: 'am', displayTimeNumber: '5',
    },
    '06:00:00': {
      time: '6AM', displayFormattedTime: '6:00 AM', displayTime: '6 am', activeClass: '', instaBookingClass: '', disable: false, time_insert: '06:00:00', timeNumber: 6, timeFormat: 'am', displayTimeNumber: '6',
    },
    '07:00:00': {
      time: '7AM', displayFormattedTime: '7:00 AM', displayTime: '7 am', activeClass: '', instaBookingClass: '', disable: false, time_insert: '07:00:00', timeNumber: 7, timeFormat: 'am', displayTimeNumber: '7',
    },
    '08:00:00': {
      time: '8AM', displayFormattedTime: '8:00 AM', displayTime: '8 am', activeClass: '', instaBookingClass: '', disable: false, time_insert: '08:00:00', timeNumber: 8, timeFormat: 'am', displayTimeNumber: '8',
    },
    '09:00:00': {
      time: '9AM', displayFormattedTime: '9:00 AM', displayTime: '9 am', activeClass: '', instaBookingClass: '', disable: false, time_insert: '09:00:00', timeNumber: 9, timeFormat: 'am', displayTimeNumber: '9',
    },
    '10:00:00': {
      time: '10AM', displayFormattedTime: '10:00 AM', displayTime: '10 am', activeClass: '', instaBookingClass: '', disable: false, time_insert: '10:00:00', timeNumber: 10, timeFormat: 'am', displayTimeNumber: '10',
    },
    '11:00:00': {
      time: '11AM', displayFormattedTime: '11:00 AM', displayTime: '11 am', activeClass: '', instaBookingClass: '', disable: false, time_insert: '11:00:00', timeNumber: 11, timeFormat: 'am', displayTimeNumber: '11',
    },
    '12:00:00': {
      time: '12PM', displayFormattedTime: '12:00 PM', displayTime: '12 pm', activeClass: '', instaBookingClass: '', disable: false, time_insert: '12:00:00', timeNumber: 12, timeFormat: 'pm', displayTimeNumber: '12',
    },
    '13:00:00': {
      time: '1PM', displayFormattedTime: '1:00 PM', displayTime: '1 pm', activeClass: '', instaBookingClass: '', disable: false, time_insert: '13:00:00', timeNumber: 13, timeFormat: 'pm', displayTimeNumber: '1',
    },
    '14:00:00': {
      time: '2PM', displayFormattedTime: '2:00 PM', displayTime: '2 pm', activeClass: '', instaBookingClass: '', disable: false, time_insert: '14:00:00', timeNumber: 14, timeFormat: 'pm', displayTimeNumber: '2',
    },
    '15:00:00': {
      time: '3PM', displayFormattedTime: '3:00 PM', displayTime: '3 pm', activeClass: '', instaBookingClass: '', disable: false, time_insert: '15:00:00', timeNumber: 15, timeFormat: 'pm', displayTimeNumber: '3',
    },
    '16:00:00': {
      time: '4PM', displayFormattedTime: '4:00 PM', displayTime: '4 pm', activeClass: '', instaBookingClass: '', disable: false, time_insert: '16:00:00', timeNumber: 16, timeFormat: 'pm', displayTimeNumber: '4',
    },
    '17:00:00': {
      time: '5PM', displayFormattedTime: '5:00 PM', displayTime: '5 pm', activeClass: '', instaBookingClass: '', disable: false, time_insert: '17:00:00', timeNumber: 17, timeFormat: 'pm', displayTimeNumber: '5',
    },
    '18:00:00': {
      time: '6PM', displayFormattedTime: '6:00 PM', displayTime: '6 pm', activeClass: '', instaBookingClass: '', disable: false, time_insert: '18:00:00', timeNumber: 18, timeFormat: 'pm', displayTimeNumber: '6',
    },
    '19:00:00': {
      time: '7PM', displayFormattedTime: '7:00 PM', displayTime: '7 pm', activeClass: '', instaBookingClass: '', disable: false, time_insert: '19:00:00', timeNumber: 19, timeFormat: 'pm', displayTimeNumber: '7',
    },
    '20:00:00': {
      time: '8PM', displayFormattedTime: '8:00 PM', displayTime: '8 pm', activeClass: '', instaBookingClass: '', disable: false, time_insert: '20:00:00', timeNumber: 20, timeFormat: 'pm', displayTimeNumber: '8',
    },
    '21:00:00': {
      time: '9PM', displayFormattedTime: '9:00 PM', displayTime: '9 pm', activeClass: '', instaBookingClass: '', disable: false, time_insert: '21:00:00', timeNumber: 21, timeFormat: 'pm', displayTimeNumber: '9',
    },
    '22:00:00': {
      time: '10PM', displayFormattedTime: '10:00 PM', displayTime: '10 pm', activeClass: '', instaBookingClass: '', disable: false, time_insert: '22:00:00', timeNumber: 22, timeFormat: 'pm', displayTimeNumber: '10',
    },
    '23:00:00': {
      time: '11PM', displayFormattedTime: '11:00 PM', displayTime: '11 pm', activeClass: '', instaBookingClass: '', disable: false, time_insert: '23:00:00', timeNumber: 23, timeFormat: 'pm', displayTimeNumber: '11',
    },
    '00:00:00': {
      time: '12AM', displayFormattedTime: '12:00 AM', displayTime: '12 am', activeClass: '', instaBookingClass: '', disable: false, time_insert: '00:00:00', timeNumber: 24, timeFormat: 'am', displayTimeNumber: '12',
    },
  },
  timeNumber: {
    1: {
      time: '1AM', displayFormattedTime: '1:00 AM', displayTime: '1 am', activeClass: '', instaBookingClass: '', disable: false, time_insert: '01:00:00', timeNumber: 1, timeFormat: 'am', displayTimeNumber: '1',
    },
    2: {
      time: '2AM', displayFormattedTime: '2:00 AM', displayTime: '2 am', activeClass: '', instaBookingClass: '', disable: false, time_insert: '02:00:00', timeNumber: 2, timeFormat: 'am', displayTimeNumber: '2',
    },
    3: {
      time: '3AM', displayFormattedTime: '3:00 AM', displayTime: '3 am', activeClass: '', instaBookingClass: '', disable: false, time_insert: '03:00:00', timeNumber: 3, timeFormat: 'am', displayTimeNumber: '3',
    },
    4: {
      time: '4AM', displayFormattedTime: '4:00 AM', displayTime: '4 am', activeClass: '', instaBookingClass: '', disable: false, time_insert: '04:00:00', timeNumber: 4, timeFormat: 'am', displayTimeNumber: '4',
    },
    5: {
      time: '5AM', displayFormattedTime: '5:00 AM', displayTime: '5 am', activeClass: '', instaBookingClass: '', disable: false, time_insert: '05:00:00', timeNumber: 5, timeFormat: 'am', displayTimeNumber: '5',
    },
    6: {
      time: '6AM', displayFormattedTime: '6:00 AM', displayTime: '6 am', activeClass: '', instaBookingClass: '', disable: false, time_insert: '06:00:00', timeNumber: 6, timeFormat: 'am', displayTimeNumber: '6',
    },
    7: {
      time: '7AM', displayFormattedTime: '7:00 AM', displayTime: '7 am', activeClass: '', instaBookingClass: '', disable: false, time_insert: '07:00:00', timeNumber: 7, timeFormat: 'am', displayTimeNumber: '7',
    },
    8: {
      time: '8AM', displayFormattedTime: '8:00 AM', displayTime: '8 am', activeClass: '', instaBookingClass: '', disable: false, time_insert: '08:00:00', timeNumber: 8, timeFormat: 'am', displayTimeNumber: '8',
    },
    9: {
      time: '9AM', displayFormattedTime: '9:00 AM', displayTime: '9 am', activeClass: '', instaBookingClass: '', disable: false, time_insert: '09:00:00', timeNumber: 9, timeFormat: 'am', displayTimeNumber: '9',
    },
    10: {
      time: '10AM', displayFormattedTime: '10:00 AM', displayTime: '10 am', activeClass: '', instaBookingClass: '', disable: false, time_insert: '10:00:00', timeNumber: 10, timeFormat: 'am', displayTimeNumber: '10',
    },
    11: {
      time: '11AM', displayFormattedTime: '11:00 AM', displayTime: '11 am', activeClass: '', instaBookingClass: '', disable: false, time_insert: '11:00:00', timeNumber: 11, timeFormat: 'am', displayTimeNumber: '11',
    },
    12: {
      time: '12PM', displayFormattedTime: '12:00 PM', displayTime: '12 pm', activeClass: '', instaBookingClass: '', disable: false, time_insert: '12:00:00', timeNumber: 12, timeFormat: 'pm', displayTimeNumber: '12',
    },
    13: {
      time: '1PM', displayFormattedTime: '1:00 PM', displayTime: '1 pm', activeClass: '', instaBookingClass: '', disable: false, time_insert: '13:00:00', timeNumber: 13, timeFormat: 'pm', displayTimeNumber: '1',
    },
    14: {
      time: '2PM', displayFormattedTime: '2:00 PM', displayTime: '2 pm', activeClass: '', instaBookingClass: '', disable: false, time_insert: '14:00:00', timeNumber: 14, timeFormat: 'pm', displayTimeNumber: '2',
    },
    15: {
      time: '3PM', displayFormattedTime: '3:00 PM', displayTime: '3 pm', activeClass: '', instaBookingClass: '', disable: false, time_insert: '15:00:00', timeNumber: 15, timeFormat: 'pm', displayTimeNumber: '3',
    },
    16: {
      time: '4PM', displayFormattedTime: '4:00 PM', displayTime: '4 pm', activeClass: '', instaBookingClass: '', disable: false, time_insert: '16:00:00', timeNumber: 16, timeFormat: 'pm', displayTimeNumber: '4',
    },
    17: {
      time: '5PM', displayFormattedTime: '5:00 PM', displayTime: '5 pm', activeClass: '', instaBookingClass: '', disable: false, time_insert: '17:00:00', timeNumber: 17, timeFormat: 'pm', displayTimeNumber: '5',
    },
    18: {
      time: '6PM', displayFormattedTime: '6:00 PM', displayTime: '6 pm', activeClass: '', instaBookingClass: '', disable: false, time_insert: '18:00:00', timeNumber: 18, timeFormat: 'pm', displayTimeNumber: '6',
    },
    19: {
      time: '7PM', displayFormattedTime: '7:00 PM', displayTime: '7 pm', activeClass: '', instaBookingClass: '', disable: false, time_insert: '19:00:00', timeNumber: 19, timeFormat: 'pm', displayTimeNumber: '7',
    },
    20: {
      time: '8PM', displayFormattedTime: '8:00 PM', displayTime: '8 pm', activeClass: '', instaBookingClass: '', disable: false, time_insert: '20:00:00', timeNumber: 20, timeFormat: 'pm', displayTimeNumber: '8',
    },
    21: {
      time: '9PM', displayFormattedTime: '9:00 PM', displayTime: '9 pm', activeClass: '', instaBookingClass: '', disable: false, time_insert: '21:00:00', timeNumber: 21, timeFormat: 'pm', displayTimeNumber: '9',
    },
    22: {
      time: '10PM', displayFormattedTime: '10:00 PM', displayTime: '10 pm', activeClass: '', instaBookingClass: '', disable: false, time_insert: '22:00:00', timeNumber: 22, timeFormat: 'pm', displayTimeNumber: '10',
    },
    23: {
      time: '11PM', displayFormattedTime: '11:00 PM', displayTime: '11 pm', activeClass: '', instaBookingClass: '', disable: false, time_insert: '23:00:00', timeNumber: 23, timeFormat: 'pm', displayTimeNumber: '11',
    },
    24: {
      time: '12AM', displayFormattedTime: '12:00 AM', displayTime: '12 am', activeClass: '', instaBookingClass: '', disable: false, time_insert: '00:00:00', timeNumber: 24, timeFormat: 'am', displayTimeNumber: '12',
    },
  },
};

export const REGION_REGEXP = /\/(us|au)($|\/)/;
export const US_REGION_REGEXP = /US|CA|us|ca/;

export const POOL_SCREENS = [
  { key: 1, value: 'locationStatus' },
  { key: 2, value: 'listingInfoStatus' },
  { key: 3, value: 'pricingGuest' },
  { key: 4, value: 'amenitiesListStatus' },
  { key: 5, value: 'amenitiesAdditionalStatus' },
  { key: 6, value: 'dimensionsStatus' },
  { key: 7, value: 'privacyStatus' },
  { key: 8, value: 'rulesStatus' },
  { key: 9, value: 'imagesStatus' },
  { key: 10, value: 'cancellationPolicyStatus' },
  { key: 11, value: 'showAvailabilityScreen' },
  { key: 12, value: 'showLearnHowBookScreen' },
  { key: 13, value: 'showMonthsSettingsScreen' },
  { key: 14, value: 'showManageCalendarScreen' },
];

export const REGIONS = [
  { code: 'us', displayName: 'USA' },
  { code: 'au', displayName: 'Australian' },
  { code: 'ca', displayName: 'Canadian' },
];

export default {
  SWIMMER_CANCEL_REASONS,
  SWIMMER_CANCEL_CONFIRMED_REASONS,
  HOST_DECLINE_REASONS,
  HOST_CANCEL_CONFIRMED_REASONS,
  PAUSE_POOL_REASONS,
  TIME_DETAILS,
  REGION_REGEXP,
  STRIPE_SUPPORT_COUNTRIES_CODES,
  ADVANCE_NOTICES,
  AVAILABILITY_WINDOW,
  INSTANT_GROUP_SIZE,
  POOL_SCREENS,
  MAX_GUESTS,
  REGIONS,
  FULL_TIME_ARRAY,
  OBJECT_TIME_ARRAY,
};
