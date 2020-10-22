import React from 'react'
import LayoutWithoutSidebar from '../layout/without-sidebar';
import ResultSidebar from '../layout/resultSidebar';
import MobileTCP from '../layout/mobileTCP';
import LandingHeader from '../layout/landingHeader';
import {
  FindPool,
  ListYourPool,
  Results,
  PoolDetails,
  Payment,
  MessagesList,
  PaymentMethod,
  MyReservations,
  Titledetails,
  ReservationStatus,
  ReservationSuccess,
  ResetPassword,
  NotFound,
  InviteFriends,
  ConvertionList,
  Reviews,
  ReviewsHost,
  Thankyou,
  ContactUs,
  AuTermsAndConditions,
  UsTermsAndConditions,
  Privacy,
  // AboutUs,
  ReservationCancelled,
  Host,
  HostPrompt,
  Location,
  EditPool,
  CalendarManagement,
  Tutorial,
  HostReservation,
  AddPool,
  ReferaFriend,
  verifyEmail,
  SuggestAnotherTime,
  HostPlaceholder,
  ContactHost,
  Profile,
  EditPublicInfo,
  EditPrivateInfo,
  EditProfileNotifications,
  ProfileContactUs,
  ReferralInfo,
  VerificationGetStarted,
  VerificationFirstScreen,
  VerificationFirstStep,
  VerificationSecondStep,
  // VerificationThirdStep,
  Referral,
  HostInfo,
  EditReservation,
} from '../index'
import DailyCalendarManagement from '../editpool/dayilyCalendarManagement';
import ChatRules from '../messages/chat-rules'

// services
import HelperService from '../../services/helper'
import { IS_US } from '../../config'
import Favorites from "../profile/favorites/favorites";

function HostPlaceholderWithLogout () {
  return <HostPlaceholder withLogout />
}

function handleHostPlaceholder (Component, withLogout) {
  return HelperService.handleHostPlaceholder() ?
    withLogout ? HostPlaceholderWithLogout : HostPlaceholder : Component
}

export const publicRoutes = [
  {
    key: 'ContactHost',
    exact: true,
    path: '/contact-host/:id/pool/:poolId',
    component: ContactHost,
    layout: ResultSidebar
  },
  {
    key: 'ChatRules',
    exact: true,
    path: '/chat-rules',
    component: ChatRules,
    layout: ResultSidebar
  },
  {
    key: 'findpool',
    exact: true,
    path: '/',
    component: FindPool,
    layout: LayoutWithoutSidebar
  },
  {
    key: 'findpool',
    exact: true,
    path: '/findpool',
    component: FindPool,
    layout: LayoutWithoutSidebar
  },
  {
    key: 'listyourpool',
    exact: true,
    path: '/listyourpool',
    component: ListYourPool,
    layout: LandingHeader
  },
  {
    key: 'listyourpool1',
    exact: true,
    path: '/listyourpool-1',
    component: ListYourPool,
    layout: LandingHeader
  },
  {
    key: 'listyourpool2',
    exact: true,
    path: '/listyourpool-2',
    component: ListYourPool,
    layout: LandingHeader
  },
  {
    key: 'listyourpool3',
    exact: true,
    path: '/listyourpool-3',
    component: ListYourPool,
    layout: LandingHeader
  },
  {
    key: 'results',
    exact: true,
    path: '/search',
    component: Results,
    layout: ResultSidebar
  },
  {
    key: 'poodetails',
    exact: true,
    path: '/pooldetails/:id',
    component: PoolDetails,
    layout: ResultSidebar
  },
  {
    key: 'payment',
    exact: true,
    path: '/payment/:id',
    component: Payment,
    layout: ResultSidebar
  },
  {
    key: 'host-info',
    exact: true,
    path: '/host-info/:poolId',
    component: HostInfo,
    layout: ResultSidebar
  },
  {
    key: 'messagesList',
    exact: true,
    path: '/messages',
    component: MessagesList,
    layout: ResultSidebar
  },
  {
    key: 'convertions',
    exact: true,
    path: '/conversations',
    component: ConvertionList,
    layout: ResultSidebar
  },
  {
    key: 'paymenthod',
    exact: true,
    path: '/payment-method',
    component: PaymentMethod,
    layout: ResultSidebar
  },
  {
    key: 'favorites',
    exact: true,
    path: '/favorites',
    component: Favorites,
    layout: ResultSidebar
  },
  {
    key: 'reservation-success',
    exact: true,
    path: '/reservation-success',
    component: ReservationSuccess,
    layout: ResultSidebar
  },
  {
    key: 'reservation-cancelled',
    exact: true,
    path: '/reservation-cancelled',
    component: ReservationCancelled,
    layout: ResultSidebar
  },
  {
    key: 'reservation-status',
    exact: true,
    path: '/reservation-status',
    component: ReservationStatus,
    layout: ResultSidebar
  },
  {
    key: 'my-reservation',
    exact: true,
    path: '/my-reservation',
    component: MyReservations,
    layout: ResultSidebar
  },
  {
    key: 'reservation-detail',
    exact: true,
    path: '/reservation-details/:id',
    component: Titledetails,
    layout: ResultSidebar
  },
  {
    key: 'edit-reservation',
    exact: true,
    path: '/edit-reservation/:id',
    component: EditReservation,
    layout: ResultSidebar
  },
  {
    key: 'profile',
    exact: true,
    path: '/profile',
    component: handleHostPlaceholder(Profile, true),
    layout: ResultSidebar
  },
  {
    key: 'edit-public-info',
    exact: true,
    path: '/profile/edit-public-info',
    component: handleHostPlaceholder(EditPublicInfo, true),
    layout: ResultSidebar
  },
  {
    key: 'edit-private-info',
    exact: true,
    path: '/profile/edit-private-info',
    component: handleHostPlaceholder(EditPrivateInfo, true),
    layout: ResultSidebar
  },
  {
    key: 'edit-profile-notifications',
    exact: true,
    path: '/profile/edit-profile-notifications',
    component: handleHostPlaceholder(EditProfileNotifications, true),
    layout: ResultSidebar
  },
  {
    key: 'profile-contact-us',
    exact: true,
    path: '/profile/contact-us',
    component: handleHostPlaceholder(ProfileContactUs, true),
    layout: ResultSidebar
  },
  {
    key: 'profile-referral-info',
    exact: true,
    path: '/profile/referral-info',
    component: handleHostPlaceholder(ReferralInfo, true),
    layout: ResultSidebar
  },
  {
    key: 'profile-verification-get-started',
    exact: true,
    path: '/profile/verification-get-started',
    component: handleHostPlaceholder(VerificationGetStarted, true),
    layout: ResultSidebar
  },
  {
    key: 'profile-verification-first-screen',
    exact: true,
    path: '/profile/verification',
    component: handleHostPlaceholder(VerificationFirstScreen, true),
    layout: ResultSidebar
  },
  {
    key: 'profile-verification-first-step',
    exact: true,
    path: '/profile/verification-first-step',
    component: handleHostPlaceholder(VerificationFirstStep, true),
    layout: ResultSidebar
  },
  {
    key: 'profile-verification-second-step',
    exact: true,
    path: '/profile/verification-second-step',
    component: handleHostPlaceholder(VerificationSecondStep, true),
    layout: ResultSidebar
  },
  // {
  //   key: 'profile-verification-third-step',
  //   exact: true,
  //   path: '/profile/verification-third-step',
  //   component: handleHostPlaceholder(VerificationThirdStep, true),
  //   layout: ResultSidebar
  // },
  {
    key: 'referral',
    exact: true,
    path: '/referral',
    component: Referral,
    layout: ResultSidebar
  },
  {
    key: 'reset-password',
    exact: true,
    path: '/reset-password/:token',
    component: ResetPassword,
    layout: ResultSidebar
  },
  {
    key: 'referafriend',
    exact: true,
    path: '/referafriend/:id',
    component: ReferaFriend,
    layout: ResultSidebar
  },
  {
    key: 'verifyemail',
    exact: true,
    path: '/verify-email/:token',
    component: verifyEmail,
    layout: ResultSidebar
  },
  {
    key: 'profile-invite-friends',
    exact: true,
    path: '/profile/invite-friends',
    component: handleHostPlaceholder(InviteFriends),
    layout: ResultSidebar
  },
  {
    key: 'reviews',
    exact: true,
    path: '/reviews/:bookingId',
    component: Reviews,
    layout: ResultSidebar
  },
  {
    key: 'hostreviews',
    exact: true,
    path: '/reviews-host/:bookingId',
    component: ReviewsHost,
    layout: ResultSidebar
  },
  {
    key: 'thankyou',
    exact: true,
    path: '/thankyou',
    component: Thankyou,
    layout: ResultSidebar
  },
  {
    key: 'contactus',
    exact: true,
    path: '/contactus',
    component: ContactUs,
    layout: ResultSidebar
  },
  {
    key: 'TermsAndConditions',
    exact: true,
    path: '/termsandconditions',
    component: IS_US ? UsTermsAndConditions : AuTermsAndConditions,
    layout: ResultSidebar
  },
  {
    key: 'privacy',
    exact: true,
    path: '/privacy',
    component: Privacy,
    layout: ResultSidebar
  },
  // {
  //   key: 'aboutus',
  //   exact: true,
  //   path: '/aboutus',
  //   component: AboutUs,
  //   layout: ResultSidebar
  // },
  {
    key: 'host',
    exact: true,
    path: '/host',
    component: handleHostPlaceholder(Host),
    layout: ResultSidebar
  },
  {
    key: 'hostprompt',
    exact: true,
    path: '/hostprompt',
    component: HostPrompt,
    layout: ResultSidebar
  },
  {
    key: 'addpool',
    exact: true,
    path: '/addpool',
    component: handleHostPlaceholder(AddPool),
    layout: ResultSidebar
  },
  {
    key: 'location',
    exact: true,
    path: '/location',
    component: Location,
    layout: ResultSidebar
  },
  {
    key: 'EditPool',
    exact: true,
    path: '/editpool',
    component: EditPool,
    layout: ResultSidebar
  },
  {
    key: 'DailyCalendarManagement',
    exact: true,
    path: '/daily-calendar-management/:id',
    component: DailyCalendarManagement,
    layout: ResultSidebar
  },
  {
    key: 'CalendarManagement',
    exact: true,
    path: '/calendar-management/:id',
    component: CalendarManagement,
    layout: ResultSidebar
  },
  {
    key: 'Tutorial',
    exact: true,
    path: '/tutorial/:id',
    component: Tutorial,
    layout: ResultSidebar
  },
  {
    key: 'HostReservation',
    exact: true,
    path: '/host-reservation',
    component: HostReservation,
    layout: ResultSidebar
  },
  {
    key: 'SuggestNewTime',
    exact: true,
    path: '/host-reservation/suggest-new-time',
    component: SuggestAnotherTime,
    layout: ResultSidebar
  },
  {
    key: 'mtermsandconditions',
    exact: true,
    path: '/mobile-termsandconditions',
    component: IS_US ? UsTermsAndConditions : AuTermsAndConditions,
    layout: MobileTCP
  },
  {
    key: 'mprivacy',
    exact: true,
    path: '/mobile-privacy',
    component: Privacy,
    layout: MobileTCP
  },
  {
    key: 'notfound',
    exact: true,
    path: '*',
    component: NotFound,
    layout: ResultSidebar
  }
];
