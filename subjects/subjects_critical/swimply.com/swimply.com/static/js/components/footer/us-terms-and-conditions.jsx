import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { withRouter } from 'react-router-dom'
import compose from 'recompose/compose'
import Footer from './footer'

const styles = theme => ({
  container: {
    maxWidth: '1170px',
    margin: '0 auto',
    width: '100%',
    padding: '0 15px',
    '@media (max-width:1170px)': {
      maxWidth: '992px',
    },
    '@media (max-width:1000px)': {
      maxWidth: '750px',
    },
    '@media (max-width:767px)': {
      width: 'calc(100% - 30px)',
    },
    '& ol': {
      counterReset: 'item',
      paddingLeft: '20px'
    },
    '& > ol': {
      padding: '0'
    },
    '& ol ol': {
      paddingLeft: '0'
    },
    '& ol > li > ol[type=a]': {
      paddingLeft: '20px'
    },
    '& ul': {
      paddingLeft: '10px'
    },
    '& > ol > li': {
      listStyleType: 'none'
    },
    '& ol > li': {
      counterIncrement: 'item'
    },
    '& h1': {
      fontSize: '30px'
    },
    '& h2': {
      marginTop: '20px',
      fontSize: '20px',
      fontWeight: '600'
    }
  },
  termsConditions: {
    padding: '60px 0',
    '@media (max-width:767px)': {
      padding: '30px 0',
    },
    '& h1': {
      '@media (max-width:767px)': {
        maxWidth: '200px'
      }
    },
    '& h2': {
      '@media (max-width:767px)': {
        fontSize: '16px'
      }
    },
    '& p': {
      fontSize: '13px',
      color: theme.palette.common.black,
      marginTop: '7px',
      lineHeight: '23px',
      '@media (max-width:767px)': {
        paddingRight: '15px',
        fontSize: '12px'
      }
    }
  },
  linksList: {
    '& a': {
      color: theme.palette.common.black,
      cursor: 'pointer'
    }
  },
  innerNumerationList: {
    '& > li': {
      display: 'block',
      position: 'relative',
      marginTop: '15px',
      paddingLeft: '30px'
    },
    '& > li:before': {
      content: `counters(item, '.') ' '`,
      marginRight: '6px',
      position: 'absolute',
      left: '0',
      top: '0'
    },
    '& p': {
      marginTop: '0'
    },
    '& ol > li': {
      paddingLeft: '40px'
    },
    '& ol': {
      marginLeft: '-30px'
    }
  },
  dotsList: {
    '& li': {
      listStyleType: 'disc'
    }
  },
  mainWord: {
    fontWeight: '600',
    marginRight: '4px'
  },
  underLine: {
    textDecoration: 'underline'
  },
  minusMarginLeft: {
    marginLeft: '-40px'
  }
})

class TermsAndConditions extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  goToSection = (id) => {
    const section = document.getElementById(id)
    if (section && section.offsetTop) {
      const targetOffsetTop = section.offsetTop - 80
      try {
        window.scrollTo({ left: 0, top: targetOffsetTop, behavior: 'smooth' })
      } catch (e) {
        window.scrollTo(0, targetOffsetTop)
      }
    }
  }

  render () {
    const { classes } = this.props
    let footerMobile = false
    if (this.props.match.path === '/mobile-termsandconditions') {
      footerMobile = true
    }
    return (
      <Typography variant='body1' component='div'>
        <div className={classes.termsConditions}>
          <div className={classes.container}>
            <div>
              <Typography variant='subtitle1'>Swimply Terms of Service – July 30, 2019</Typography>
              <Typography variant='h2'>Table of Contents</Typography>
              <ol type='1' className={classes.linksList}>
                <li>
                  <span onClick={this.goToSection.bind(null, 'section-1')} className={classes.mainWord}>
                    Definitions
                  </span>
                </li>
                <li>
                  <span onClick={this.goToSection.bind(null, 'section-2')} className={classes.mainWord}>
                    Terms and Conditions
                  </span>
                </li>
                <li>
                  <span onClick={this.goToSection.bind(null, 'section-3')} className={classes.mainWord}>
                    Account Registration
                  </span>
                </li>
                <li>
                  <span onClick={this.goToSection.bind(null, 'section-4')} className={classes.mainWord}>
                    Protect Login Information
                  </span>
                </li>
                <li>
                  <span onClick={this.goToSection.bind(null, 'section-5')} className={classes.mainWord}>
                    Proprietary Data and Communication
                  </span>
                </li>
                <li>
                  <span onClick={this.goToSection.bind(null, 'section-6')} className={classes.mainWord}>
                    Third-Party Sites
                  </span>
                </li>
                <li>
                  <span onClick={this.goToSection.bind(null, 'section-7')} className={classes.mainWord}>
                    Pool Listings
                  </span>
                </li>
                <li>
                  <span onClick={this.goToSection.bind(null, 'section-8')} className={classes.mainWord}>
                    Pool Inspection Corporate Partnerships
                  </span>
                </li>
                <li>
                  <span onClick={this.goToSection.bind(null, 'section-9')} className={classes.mainWord}>
                    Insurance
                  </span>
                </li>
                <li>
                  <span onClick={this.goToSection.bind(null, 'section-10')} className={classes.mainWord}>
                    Booking and Financial Terms
                  </span>
                </li>
                <li>
                  <span onClick={this.goToSection.bind(null, 'section-11')} className={classes.mainWord}>
                    Fees
                  </span>
                </li>
                <li>
                  <span onClick={this.goToSection.bind(null, 'section-12')} className={classes.mainWord}>
                    Damages and Security Deposits
                  </span>
                </li>
                <li>
                  <span onClick={this.goToSection.bind(null, 'section-13')} className={classes.mainWord}>
                    Overstaying or Usage without Consent
                  </span>
                </li>
                <li>
                  <span onClick={this.goToSection.bind(null, 'section-14')} className={classes.mainWord}>
                    Cancellations and Refunds
                  </span>
                </li>
                <li>
                  <span onClick={this.goToSection.bind(null, 'section-15')} className={classes.mainWord}>
                    User Conduct
                  </span>
                </li>
                <li>
                  <span onClick={this.goToSection.bind(null, 'section-16')} className={classes.mainWord}>
                    Term, Suspension and Termination
                  </span>
                </li>
                <li>
                  <span onClick={this.goToSection.bind(null, 'section-17')} className={classes.mainWord}>
                    Taxes
                  </span>
                </li>
                <li>
                  <span onClick={this.goToSection.bind(null, 'section-18')} className={classes.mainWord}>
                    Digital Millennium Copyright Act (DMCA)
                  </span>
                </li>
                <li>
                  <span onClick={this.goToSection.bind(null, 'section-19')} className={classes.mainWord}>
                    Class Action Waiver
                  </span>
                </li>
                <li>
                  <span onClick={this.goToSection.bind(null, 'section-20')} className={classes.mainWord}>
                    Equitable Relief
                  </span>
                </li>
                <li>
                  <span onClick={this.goToSection.bind(null, 'section-21')} className={classes.mainWord}>
                    Communications Decency Act Notice
                  </span>
                </li>
                <li>
                  <span onClick={this.goToSection.bind(null, 'section-22')} className={classes.mainWord}>
                    Privacy
                  </span>
                </li>
                <li>
                  <span onClick={this.goToSection.bind(null, 'section-23')} className={classes.mainWord}>
                    Assumption of Risk and Waiver
                  </span>
                </li>
                <li>
                  <span onClick={this.goToSection.bind(null, 'section-24')} className={classes.mainWord}>
                    Indemnification and Limitation of Liability
                  </span>
                </li>
                <li>
                  <span onClick={this.goToSection.bind(null, 'section-25')} className={classes.mainWord}>
                    Disclaimer
                  </span>
                </li>
                <li>
                  <span onClick={this.goToSection.bind(null, 'section-26')} className={classes.mainWord}>
                    Governing Law and Jurisdiction
                  </span>
                </li>
                <li>
                  <span onClick={this.goToSection.bind(null, 'section-27')} className={classes.mainWord}>
                    Contact Information
                  </span>
                </li>
              </ol>
            </div>
            <Typography variant='h1'>Terms of use and service</Typography>
            <ol type='1'>
              <li id='section-1'>
                <Typography variant='h2'>1. Definitions</Typography>
                <ol type='a'>
                  <li>
                    <p>
                      <span className={classes.mainWord}>“Swimply.com”</span>
                      , and/or <span className={classes.mainWord}>“Swimply”</span>
                      shall mean Swimply, Inc. and its online Platform
                      that connects, pool owners, (“Hosts”), with potential
                      guests (“Guests”), collectively “Parties”.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>“Account”</span>
                      means the account a person registers for to become
                      a Member with Swimply to use the Site, Application or Services.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>“Allowed Duration”</span>
                      has the meaning set forth in Section 10.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>“Ambassador Program”</span>
                      means the ambassador program established by Swimply, if any.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>“Application”</span>
                      means any applications for mobile and other smart devices
                      and application program interfaces through
                      which Swimply provides services, if any.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>“Booking Request Period”</span>
                      means the time period after Guests books a
                      Pool through the Site or Application, and before
                      Hosts confirms or rejects such Booking.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>“Booking”</span>
                      or <span className={classes.mainWord}>“Rental”</span>
                      means a limited license granted by the
                      Hosts to the Guests to use the Pool for the limited duration of the confirmed Booking.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>“Collective Content”</span>
                      means Member Content and Swimply Content.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>“Communication”</span>
                      means an email, message via the Application, and text message or message among Guests, Hosts, and
                      Swimply.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>“Content”</span>
                      means text, graphics, images, music, software (excluding the Application),
                      audio, video, information or other materials.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>“Listing”</span>
                      means Pool that is listed by a Hosts as available for Booking via the Platform.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>“Member Content”</span>
                      means all Content that a Member posts, uploads, publishes,
                      submits, transmits, or includes in their Listing,
                      Member profile or Swimply promotional campaign to be made available through the Platform.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>“Member”</span>
                      refers to a person who completes Swimply’s account registration process,
                      including but not limited to Hosts and Guests, as described under “Account Registration” below.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>“Occupancy Tax”</span>
                      has the meaning set forth in Section 16.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>“Payment Method”</span>
                      means a payment method that you have added to your Swimply
                      Account, for instance, a credit card, debit card or PayPal.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>“Payout Method”</span>
                      means a payout method that you added to your Swimply Account, for example,
                      PayPal, direct deposit or electronic funds transfer,
                      a prepaid card or a debit card (where available).
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>“Platform”</span>
                      refers to the Swimply Site, Application and Services.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>“Pool”</span>
                      means the pool and surrounding space (i.e. backyard)
                      booked for a specified duration as specified
                      by the Booking and as agreed upon by the Parties.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>“Pool Fees”</span>
                      means the amounts due by Guest in exchange for use of a Pool,
                      exclusive of Service Fees and Taxes as defined by Hosts.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>“Hosts”</span>
                      means a Member who creates a Listing and rents its Pool via the Platform.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>“Hosts Fee”</span>
                      means the fee Swimply charges a Hosts for use of the Services,
                      which is calculated as a percentage of the applicable Pool Fees.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>“Service Fees”</span>
                      means collectively the Guest Fees and the Hosts Fees
                      plus any third-party charges associated with collection of payment.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>“Services”</span>
                      means the services Swimply makes available through its site for Hosts to list pools and for Guests
                      to book such pools.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>“Site”</span>
                      means www.swimply.com and any other website through which Swimply makes Services available.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>“Guest”</span>
                      means a Member who rents or books a Listing via the Platform
                      and uses the Pool according to the agreement governing the Booking.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>“Guest Fee”</span>
                      means the fee that Swimply charges a Guest for the use of the Services, which is calculated as a
                      percentage of the applicable Pool Fees.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>“Swimply Content”</span>
                      means all content that Swimply makes available through the Platform or its related
                      promotional campaigns and official social media channels,
                      including any Content licensed from a third party, but excluding Member Content.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>“Tax Authority”</span>
                      has the meaning set forth in Section 16.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>“Tax”</span>
                      or <span className={classes.mainWord}>“Taxes”</span>
                      means any sales , value added taxes (VAT), goods and services taxes (GST),
                      transient occupancy, tourist or other visitor taxes, Pool or lodging taxes,
                      fees Hosts may be required by law to collect and remit to governmental
                      agencies, other similar municipal, state, federal and national indirect
                      or other withholding and personal or corporate income taxes,
                      or any other tax that is required to be or permitted to be collected by law.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>“Terms”</span>
                      means these Terms.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>“Total Fees”</span>
                      means collectively the Pool Fees plus Service Fees
                      (inclusive of Guests and Hosts Fees) and Taxes.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>“You”</span>
                      or <span className={classes.mainWord}>“your”</span>
                      means you as a Member, unless otherwise specified.
                      The Terms may apply to you as a Guests and Member or Guests and Hosts concurrently.
                    </p>
                  </li>
                </ol>
              </li>
              <li id='section-2'>
                <Typography variant='h2'>2. Terms and Conditions</Typography>
                <ol className={classes.innerNumerationList}>
                  <li>
                    <p>
                      <span className={classes.mainWord}>Who We Are:</span>
                      Swimply is an online marketplace that enables Hosts to list
                      their Pools for Booking and to communicate directly with potential Guests
                      who wish to use those Bookings and to ultimately facilitate transactions
                      whereby Guests pay for and use the Host’s Pool.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>Purpose of Headings:</span>
                      Headings in these Terms are solely for reference objectives and do not limit
                      the scope or extent of such section. Except as otherwise stated in these Terms,
                      if any clause of these Terms are found to be invalid, void, or for any reason unenforceable,
                      such clause shall be struck out and shall not affect the
                      validity and enforceability of the remaining provisions.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>Your Legal Rights:</span>
                      PLEASE READ THESE TERMS CAREFULLY AS THEY CONTAIN IMPORTANT INFORMATION
                      REGARDING YOUR LEGAL RIGHTS, REMEDIES, AND OBLIGATIONS.
                      BY AGREEING TO THESE TERMS, YOU HEREBY
                      ACKNOWLEDGE THAT YOU HAVE READ AND UNDERSTAND THAT YOU ARE BOUND TO A
                      LEGAL AGREEMENT BETWEEN YOU AND SWIMPLY PURSUANT TO THESE TERMS. If you
                    </p>
                    <p>
                      These Terms govern your access or use of the Platform, including but not limited to
                      payment procedures, Collective Content, and the Ambassador Program.
                      The Platform allows Hosts to create Listings for Pools and Guests
                      may learn about and book Pools directly with Hosts.
                      SWIMPLY IS NOT A PARTY TO ANY FACET OF ANY AGREEMENTS ENTERED INTO BETWEEN
                      POOL OWNERS AND GUESTS, NOR IS SWIMPLY AN INSURER, SWIMPLY
                      HAS NO CONTROL OVER THE CONDUCT OF HOSTS, GUESTS AND OTHER
                      USERS OF THE SITE, APPLICATION OR SERVICES OR ANY POOLS,
                      AND DISCLAIMS ALL LIABILITY IN THIS REGARD TO THE MAXIMUM EXTENT PERMITTED BY LAW.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>Modifications:</span>
                      Swimply reserves the right, in its sole discretion,
                      to modify the Terms or Platform at any time and without prior notice.
                      If Swimply materially changes or modifies these Terms,
                      it will post the modification on the Platform and/or provide
                      you notice of the modification by email.
                      The date the Terms were “Last Updated” will be shown on the Site.
                      Changes to the Terms will be effective at the time of posting.
                      If you disagree with such updated Terms, you may terminate your Account.
                      If you do not terminate your Account, your continued access or
                      use of the Platform will constitute acceptance of the modified Terms.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>No Waiver: </span>
                      Swimply, in its sole discretion, may determine whether to prosecute a right or claim,
                      and failing to do so is not a waiver of its right, or of any subsequently accruing right or claim.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>Hosts Duties:</span>
                      HOSTS ARE RESPONSIBLE FOR IDENTIFYING, UNDERSTANDING, AND COMPLYING WITH ALL LAWS,
                      RULES, AND REGULATIONS THAT APPLY TO THEIR LISTINGS. FOR EXAMPLE,
                      SOME CITIES MAY RESTRICT POOL OWNERS FROM RENTING FOR SHORT PERIODS OF TIME,
                      HOSTS MAY BE REQUIRED TO REGISTER OR OBTAIN A PERMIT OR LICENSE BEFORE,
                      LISTING A PROPERTY OR ACCEPTING GUESTS. LOCAL LAWS AND ENFORCEMENT VARY
                      FROM CITY TO CITY; PENALTIES MAY INCLUDE FINES OR OTHER ENFORCEMENT.
                      If you have questions about the applicability of local laws to your Listing or Pool,
                      you should seek legal guidance. SWIMPLY TAKES NO OFFICIAL POSITION ON SUCH LEGAL REQUIREMENTS,
                      SAID DUTY LIES SOLELY WITH THE MEMBERS. With the exception
                      of Swimply’s obligations pursuant to these Terms, Swimply disclaims
                      all liability and responsibility arising from or related to any Member agreements.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>Member Minimum Age:</span>
                      Members must be at least 18 years old to register for an account,
                      post a Listing, or use the Platform. By accessing the Platform, you represent
                      that you are at least 18 years old. Please report immediately if
                      you are aware of Members under 18, any such Member will be removed immediately.
                      Swimply cannot take accountability for the Member’s misuse of Swimply.
                      To book a listing that would include a minor who is under 18,
                      you represent that you have the authority to do so.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>Alcohol:</span>
                      Hosts must take adequate measures to confirm the identification and age
                      of those wishing to drink during the event taking place in the Pool.
                      It is illegal to serve alcohol to or purchase alcoholic beverages for a minor.
                      NO INDIVIDUAL UNDER THE AGE OF 21 MAY CONSUME ALCOHOL AT A BOOKING.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>Sharing Personal Information for Reports:</span>
                      You as a Member agree and authorize Swimply to facilitate the use of your personal
                      information for the purpose of obtaining third-party reports, as permitted by law.
                      To the extent permitted by applicable laws, Swimply may use your personal
                      information to obtain reports from public records of criminal convictions
                      or sex offenders or any other information that can potentially
                      harm anyone associated with Swimply Bookings. Swimply may, directly or
                      indirectly through third parties, make inquiries to verify your identity to prevent fraud.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>Entire Agreement:</span>
                      These terms, supplemented by documents referenced on the Platform or herein,
                      including but not limited to, Swimply’s Privacy Policy, constitute the entire
                      agreement between you and Swimply. In the event of conflict between these
                      Terms and other documents referenced on the Site or herein, the most recently
                      updated terms shall govern. These terms supersede and replace any and all prior
                      oral or written understandings or agreements between you and Swimply.
                    </p>
                  </li>
                </ol>
              </li>
              <li id='section-3'>
                <Typography variant='h2'>3. Account Registration</Typography>
                <p>
                  In order to access certain features of the Site and Application and to book a
                  Pool or create a Listing, you must register for an Account and become a Member.
                  You may register directly via the Platform, or in any other manner described
                  by Swimply now or in the future.
                </p>
                <p>
                  <span className={classes.mainWord}>Information Required:</span>
                  You will be required to submit personal information such as full name, date of birth, address,
                  and other information to create an Account with Swimply for the purpose of verification
                  and safety of the site. You may not create or use more than one Account at a time.
                  You agree that the information you provide us is accurate, current, and complete at all times.
                  Swimply reserves the right to suspend or terminate your Account and
                  your access to the Platform if you create more than one Account,
                  or if any information provided proves to be inaccurate, fraudulent,
                  not current, incomplete, or otherwise in violation of these Terms.
                </p>
              </li>
              <li id='section-4'>
                <Typography variant='h2'>4. Protect Login Information</Typography>
                <p>
                  You are responsible for safeguarding your password, user ID or any other form of verification
                  (“Login Information”). You agree that you will not disclose your Login
                  Information to any third party and will take reasonable steps to ensure its security.
                  Unless expressly authorized, you are not permitted to share your Account.
                  You agree that you will take sole responsibility for any activities or
                  actions taken under your Account, whether you authorized such activities or actions.
                  You will immediately notify Swimply of any unauthorized use of your Account.
                  Should you share such information with third-parties you are responsible
                  for all consequences and Swimply reserves the right to take any action to remedy the effects.
                </p>
              </li>
              <li id='section-5'>
                <Typography variant='h2'>5. Proprietary Data and Communication</Typography>
                <ol className={classes.innerNumerationList}>
                  <li>
                    <p>
                      <span className={classes.mainWord}>Swimply Communication with Members:</span>
                      Swimply will not communicate with you via any method unless
                      you consent to such form of communication. Any Feedback you submit to us will be
                      considered non-confidential and non-proprietary to you.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>Swimply Use of Member Content:</span>
                      By submitting Feedback to us, you grant us a non-exclusive,
                      worldwide, royalty-free, irrevocable, sub-licensable, perpetual license to use and publish
                      those ideas and materials for any purpose, without compensation to you.
                      Swimply, in its sole discretion, may utilize any Member Content posted for any purpose.
                      By posting any Member Content, you grant Swimply a worldwide, irrevocable,
                      perpetual (or for the term of the protection), non-exclusive, transferable,
                      royalty-free license, with the right to sublicense, to use, view, copy, adapt,
                      translate, modify, distribute, license, sell, transfer, publicly display, perform,
                      transmit, stream, broadcast, access, view, and otherwise exploit such Member Content,
                      on or through the Platform. Please do not add the personal information
                      of you or someone else to your Member Content.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>You Represent You Own Data You Post:</span>
                      You represent and warrant that: (i) you either are
                      the sole and exclusive owner of all Member Content that you make available through
                      the Platform or through Swimply promotional campaigns or you have all rights, licenses,
                      consents and releases that are necessary to grant to Swimply the rights in such Member Content,
                      as contemplated under these Terms; and (ii) neither the Member Content nor your posting,
                      uploading, publication, submission or transmittal of the Member Content or Swimply’s
                      use of the Member Content (or any portion thereof) on, through or by means of the Platform
                      or Swimply’s promotional campaigns will infringe, misappropriate or violate a
                      third party’s patent, copyright, trademark, trade secret, moral rights or other
                      proprietary or intellectual property rights, or rights of publicity or privacy,
                      or result in the violation of any applicable law or regulation.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>License to App:</span>
                      In the event an Application becomes available, Swimply grants
                      you a limited non-exclusive, non- transferable license to download and install
                      the Application to your devices for personal use. If you access or download
                      the Application from the Apple App Store, you agree to Apple’s Licensed
                      Application End User License Agreement. Please review said Agreement carefully.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>Google Maps:</span>
                      Some parts of this site may use Google Maps, your use
                      of such services are subject to the Google Maps terms.
                    </p>
                  </li>
                </ol>
              </li>
              <li id='section-6'>
                <Typography variant='h2'>6. Third-Party Sites</Typography>
                <p>
                  The Platform may contain links to third-party websites or resources.
                  You acknowledge and agree that Swimply is not responsible or liable for:
                  (i) the availability or accuracy of such websites or resources; or (ii) the content,
                  products, or services on or available from such websites or resources.
                  Links to such websites or resources do not imply any endorsement
                  by Swimply of such websites or resources or the content, products,
                  or services available from such websites or resources.
                  You acknowledge sole responsibility for and assume all risk arising from your
                  use of any such websites or resources or the Content, products or services
                  on or available from such websites or resources.
                </p>
              </li>
              <li id='section-7'>
                <Typography variant='h2'>7. Pool Listings</Typography>
                <ol className={classes.innerNumerationList}>
                  <li>
                    <p>
                      <span className={classes.mainWord}>Listing Requirements:</span>
                      As a Member, you may create Listings for the subject Pool
                      in accordance with these Terms. Nothing in the Agreement or in the
                      Listing may be in contravention of anything in these Terms.
                      Listings must include a valid physical address to be featured on the Site.
                      Listings will be made publicly available via the Platform.
                      It is your duty to disclose all deficiencies relating to your property.
                    </p>
                    <p>
                      <span className={classes.underLine}>Swimply Imposed Requirements: </span>
                      SWIMPLY RESERVES THE RIGHT TO IMPOSE ANY AND ALL REQUIREMENTS IT DEEMS
                      FIT WITH REGARD TO SUCH LISTINGS INCLUDING, BUT NOT LIMITED TO, MINIMUM OR MAXIMUM DURATIONS,
                      MINIMUM TIMES BETWEEN LISTINGS, AND MINIMUM PRICING.
                    </p>
                    <p>
                      <span className={classes.underLine}>You are Responsible for Listings:</span>
                      You acknowledge and agree that you alone are responsible for any and
                      all Listings and Member Content you post. Accordingly, you represent
                      and warrant that any Listing or Member Content you post,
                      including but not limited to photographs, will be an accurate description of the Pool.
                    </p>
                    <p>
                      You represent and warrant that any Listing you post and the Booking of, or a Guest’s stay at,
                      a Pool in a Listing you post (i) will not breach any agreements you have entered
                      into with any third parties, such as a homeowners association,
                      condominium association, or other third party agreements,
                      and (ii) will (a) be in compliance with all applicable laws (such as zoning laws),
                      tax requirements, intellectual property laws, and rules
                      and regulations that may apply to any Pool included in a Listing you post (including having
                      all required permits, licenses and registrations),
                      and (b) not conflict with the rights of third parties.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>Listing Price:</span>
                      Hosts shall set the Pool Fee for the Listing, and elect in his or her sole discretion
                      whether to include (i) a pool cleaning fee; (ii) Taxes the Hosts determines that
                      he or she has to collect pursuant to local law; or (iii) any other fee permitted
                      according to the Swimply Terms herein. All payments will be charged and made in U.S. dollars.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>Guest Booking Request:</span>
                      Other Members will be able to book your Pool via the Platform based upon the information
                      provided in your Listing, your requirements, and Guests’ search parameters and preferences.
                      You understand and agree that once you approve a Guests requests to Book your Pool,
                      you may not request the Guests to pay a higher price than in the Booking request.
                      Such activity may result in Swimply taking account action against Hosts,
                      up to and including removal from the site. Hosts may not
                      list their Pool for rent in any other location.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>Responsibility for other Guests or Co-Owners:</span>
                      You as a Guest or Host are responsible for any modifications
                      to a Booking that you direct Swimply customer service to make, and you agree to
                      pay any Pool Fees, Guest Fees, Host Fees, Services Fees,
                      and/or Taxes associated with such Booking Modifications.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>Listing Rankings by Swimply:</span>
                      The placement and/or ranking of Listings in search
                      results may depend on a variety of factors, including, but not limited to,
                      Party preferences, ratings and/or ease of Booking. Hosts agree that
                      by listing their Pool they will not list it elsewhere.
                    </p>
                  </li>
                </ol>
              </li>
              <li id='section-8'>
                <Typography variant='h2'>8. Pool Inspection Corporate Partnerships</Typography>
                <p>
                  Swimply has a partnership with PoolWerx, LLC, AquaMasters, America’s Swimming Pool Company,
                  and Miami Pool Tech, the relevant services of which depending on location may differ, as well as,
                  which partners are available (collectively “Pool Assessors”).
                  Pool Assessors inspect Pools for the purpose of assessing compliance with pertinent,
                  federal, state, town and other legal requirements. Please review their policies carefully
                  and reach out to them with pertinent questions. Pool Assessors shall be indemnified
                  from liability in all instances in which they use all commercially reasonable practices
                  to ensure appropriate compliance for each Pool. Should there be a concern with a Pool,
                  Pool Assessors will notify Swimply within 48 hours and Swimply will address accordingly.
                </p>
              </li>
              <li id='section-9'>
                <Typography variant='h2'>9. Insurance</Typography>
                <ol className={classes.innerNumerationList}>
                  <li>
                    <p>
                      <span className={classes.mainWord}>Hosts should Obtain Insurance:</span>
                      Swimply recommends that Hosts obtain appropriate insurance for their
                      Pools. Please review any insurance policy that you may have for your Pool carefully,
                      and in particular, ensure that you are familiar with and understand any exclusions to,
                      and any deductibles that may apply for, such insurance policy, including,
                      but not limited to, whether your insurance policy will cover the actions
                      or inactions of or relating to Guests (and the individuals the Guest invites
                      to the Pool, if applicable) while at your Pool.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>Swimply is not an Insurer:</span>
                      As a Host, you understand and agree that Swimply does not act as an insurer.
                      If a Guest requests a Booking of your Pool and stays at your Pool,
                      any agreement you enter into with such Guest is between you and the Guest.
                      It is the responsibility of the Guest to ask the Hosts about insurance.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>Swimply can Make a Claim under your Insurance:</span>
                      If you are a Member, you understand and agree that Swimply may make
                      a claim under your homeowner’s, renter’s or other insurance policy related
                      to any damage or loss that you may have caused or been responsible
                      for or to a Pool or any personal or other property located at a Pool.
                      You agree to cooperate with and assist Swimply in good faith,
                      and to provide Swimply with such information as may be reasonably requested
                      by Swimply, in order to make a claim under your homeowner’s,
                      renter’s or other insurance policy, including, but not limited to,
                      executing documents and taking such further acts as Swimply
                      may reasonably request to assist Swimply in accomplishing the foregoing.
                    </p>
                  </li>
                </ol>
              </li>
              <li id='section-10'>
                <Typography variant='h2'>10. Booking and Financial Terms</Typography>
                <ol className={classes.innerNumerationList}>
                  <li>
                    <p>
                      <span className={classes.mainWord}>Payment Method:</span>
                      You authorize Swimply to store your Payment Method information and charge your Payment Method as
                      outlined in these Terms. It is the duty of Members to carefully analyze all the practices of
                      chosen payment provider, Swimply takes no official position in this matter. If your Payment
                      Method’s account information changes (e.g. account number, routing number, expiration date), you
                      consent to Swimply acquiring such information from Swimply’s financial services partner or your
                      bank and solely for the purpose of updating your Payment Method on file in your Swimply Account.
                      Whatever Payment Method you use may be subject to additional terms and conditions imposed by the
                      applicable third-party payment service provider; please review such terms and conditions before
                      using your Payment Method.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>Payment Information:</span>
                      In connection with your requested Booking, you will be asked to provide typical billing
                      information such as name, billing address and Payment Method information either to Swimply or a
                      third-party payment processor(s). You agree to pay Swimply for any confirmed Bookings made in
                      connection with your Swimply account in accordance with these Payments Terms by a method supported
                      by the Platform (e.g. PayPal, credit or debit card). You hereby authorize the collection of such
                      amounts by charging the Payment Method provided as part of requesting the Booking, either directly
                      by Swimply or indirectly, via a third-party payment processor or by one of the payment methods
                      described on the Platform. You also authorize Swimply to charge any Payment Method on file in your
                      Swimply Account if damage caused at a Pool in accordance with these Terms.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>Swimply Right to Setoff or Payment Disbursement:</span>
                      Swimply reserves the right to setoff any amounts owed to you by Swimply with any amounts you may
                      owe Swimply. For example, if you as a Host are owed a Pool Fee from Swimply, and concurrently owe
                      Swimply an overage fee, Swimply may setoff the amounts against each other. Similarly, if you as a
                      Guest have booked a Pool and are entitled to a refund for a separate cancelled Booking, Swimply
                      may setoff the amounts against each other. Both Swimply and you as either a Guest or Host, will be
                      relieved of your obligation with respect to setoff amounts following such a setoff. Swimply will
                      initiate payment of Pool Fees less the Service Fees and Taxes to the Host within seven (7)
                      business days after the date of the Booking, subject to any delays not within Swimply’s control.
                      If Swimply is unable to collect any amounts you owe for a confirmed Booking or a Damage Claim,
                      Swimply may engage in collection efforts to recover such amounts from you.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>Swimply Price Discretion:</span>
                      Swimply, in its sole discretion, may increase or discount a Host’s Listing price or a Guest’s
                      Booking cost in any matter it deems appropriate, including but not limited to providing
                      promotional codes to Guests.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>Hosts Process:</span>
                      If you are a Hosts, and a Booking is requested for your Pool via the Platform, you will be
                      required to either confirm or reject the Booking request within the Booking Request Period,
                      otherwise the request will automatically expire and any Simply collected fees will be returned to
                      the Guest. When you confirm a Booking requested by a Guest, Swimply will send you a Communication
                      confirming such Booking, depending on the selections you make via the Platform.
                    </p>
                    <p>
                      Host shall set the Pool Fee for the Listing, and elect in his or her sole discretion whether to
                      include (i) a pool cleaning fee; (ii) Taxes the Host determines that he or she has to collect
                      pursuant to local law; or (iii) any other fee permitted according to the Swimply Terms herein.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>Guest Responsibility:</span>
                      Hosts, not Swimply, are solely responsible for honoring any confirmed Bookings and making
                      available any Pools reserved through the Platform. If you, as a Guest, choose to enter a
                      transaction with a Host for a Booking, you agree and understand that you will be required to enter
                      an agreement with the Host and accept any terms, conditions, rules and restrictions imposed by the
                      Host. You acknowledge and agree that you, and not Swimply, will be responsible for performing the
                      obligations of any such agreements
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>Guest Payments:</span>
                      You as a Guest agree that Swimply may charge your Payment Method the Total Fees for any Booking
                      requested in connection with your Swimply Account. In order to establish a Booking pending the
                      applicable Host’s confirmation of your requested Booking, you understand and agree that Swimply,
                      on behalf of the Hosts, reserves the right, in its sole discretion, to (i) obtain a
                      pre-authorization via your Payment Method for the Total Fees and/or (ii) charge your Payment
                      Method a nominal amount, not to exceed one dollar ($1), to verify your Payment Method.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>Guest Payment Schedule:</span>
                      Depending on your chosen Payment Method, Swimply will either collect the Total Fees (i) at the
                      time of the Booking request or (ii) upon the Host’s confirmation. Generally, Swimply will collect
                      the Total Fees due once Swimply receives confirmation of your Booking from the applicable Host.
                      However, if you pay with a push Payment Method, Swimply will collect Total Fees at the time of
                      your Booking request. If Swimply is unable to collect Total Fees in the ordinary course, it may
                      elect to collect Total Fees at a later time. Once the payment transaction for your requested
                      Booking is successfully completed you will receive a confirmation email summarizing your confirmed
                      Booking.
                    </p>
                  </li>
                  <li>
                    <p>
                      These are terms and conditions that commonly apply to promotions on Swimply.com, including ones
                      where you must redeem a promotional code as part of the offer and where no alternative terms and
                      conditions apply.
                    </p>
                    <ul className={classes.dotsList}>
                      <li>
                        <p>
                          This is a limited time offer.
                        </p>
                      </li>
                      <li>
                        <p>
                          Swimply reserves the right to modify or cancel the offer at any time. If you received the
                          promotional code (directly or indirectly) from a third party, that third party also reserves
                          the right to modify or cancel the offer at any time.
                        </p>
                      </li>
                      <li>
                        <p>
                          Offer limited to one per customer and account.
                        </p>
                      </li>
                      <li>
                        <p>
                          Offer may not be combined with other offers.
                        </p>
                      </li>
                      <li>
                        <p>
                          Offer is non-transferrable and may not be resold.
                        </p>
                      </li>
                      <li>
                        <p>
                          If the booking is refunded, your refund will equal the amount you paid for the product or
                          content, subject to applicable refund policies.
                        </p>
                      </li>
                      <li>
                        <p>
                          Offer discount will be allocated proportionally among all promotional items in your order.
                        </p>
                      </li>
                      <li>
                        <p>
                          If you violate any of the offer terms, the offer will be invalid.
                        </p>
                      </li>
                    </ul>
                  </li>
                </ol>
              </li>
              <li id='section-11'>
                <Typography variant='h2'>11. Fees</Typography>
                <p>
                  Service Fees or charges may include collection fees, convenience fees, other third-party charges or
                  any other fee that may be needed to address your account and is permitted by law. Where applicable,
                  Swimply may also charge Taxes relating to the Host Fees and Guest Fees. Swimply deducts the Host Fees
                  from the Pool Fees before remitting the balance to the Host.
                </p>
                <p>
                  Balances will be remitted by Swimply to Host via the Payout Method selected by the Host in the Host’s
                  currency of choice, depending on the selections Host makes via the Platform. Swimply may, in its sole
                  discretion, round up or round down amounts payable from or to Guests and Hosts to the nearest whole
                  dollar (i.e. $101.50 to $102.00, or $101.49 to $101.00).
                </p>
              </li>
              <li id='section-12'>
                <Typography variant='h2'>12. Damages</Typography>
                <ol className={classes.innerNumerationList}>
                  <li>
                    <p>
                      <span className={classes.mainWord}>Duty for Damages and Lost Objects:</span>
                      You as a Guest are responsible for leaving the Pool (including any personal or other property
                      located at a Pool) in the condition it was in when you arrived. You are also responsible for all
                      items you bring with you to the Pool and should you leave such items at the Pool, the Host can
                      elect to return them, however, it is not his or her duty to do so.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>Guests Guests Liability:</span>
                      You acknowledge and agree that, as a Guest, you are responsible for your own acts and omissions
                      and the acts and omissions of any individuals you invite or otherwise provide access to, the Pool.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>Damage Payment Process:</span>
                      If a Host claims and provides evidence of damage to its Pool (“Damage Claim”), including but not
                      limited to photographs, you agree to pay the cost of replacement. Such cost may be collected from
                      the Payment Method used to book the Pool, or any other Payment Method on file at the time of the
                      Damage Claim. Swimply reserves the right to collect payment from you and pursue any options
                      available if it is unable to collect from the Payment Method.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>Incident Reporting:</span>
                      You will need to use all reasonable efforts to secure evidence from any available witnesses and to
                      provide Swimply or insurance-related parties with a written description of the incident and any
                      other information requested, including identity and insurance information of any parties involved
                      in the incident. You are also required to cooperate in any loss investigation conducted by
                      Swimply, or third party insurers. After an incident, you may not continue to use the Pool unless
                      you have the explicit permission of Swimply.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>Host Remedies:</span>
                      If a Hosts has a Damage Claim for a confirmed Booking, the Host may seek payment from the Guest
                      through Swimply. The Hosts may escalate the Damage Claim to Swimply if the Host and Guest are
                      unable to resolve a Damage Claim. If escalating the Damage Claim to Swimply, the Host must send
                      evidence of the damage to Swimply. If a Host escalates a Damage Claim to Swimply, you as a Guest
                      will be notified of the Damage Claim and be given an opportunity to respond. If you as a Guest
                      agree to pay the Host in connection with a Damage Claim, or if Swimply determines, in its sole
                      discretion, that you are responsible for damaging a Pool or any personal or other property located
                      at a Pool, Swimply will collect any such costs from you from the Payment Method in accordance with
                      the Payments Terms. Swimply also reserves the right to otherwise collect payment from you and
                      pursue any avenues available to Swimply in this regard, in situations in which you have been
                      determined, in Swimply’s sole discretion, to have damaged any Pool or any personal or other
                      property located at a Pool.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>Member Cooperation:</span>
                      Members agree to cooperate with and assist Swimply in good faith and to provide Swimply with such
                      information as well as to take such actions as may be reasonably requested by Swimply, in
                      connection with any Damage Claims or other complaints or claims made by Members relating to Pools
                      or any personal or other property located at a Pool or with respect to any investigation
                      undertaken by Swimply or a representative of Swimply regarding use or abuse of the Platform. You
                      as a Guest, upon Swimply’s reasonable request and to the extent you are reasonably able to do so,
                      you agree to participate in mediation or similar resolution process with a Hosts, at no cost to
                      you, which process will be conducted by Swimply or a third party selected by Swimply or its
                      insurer, with respect to losses for which the Host is requesting payment from Swimply under these
                      terms.
                    </p>
                  </li>
                </ol>
              </li>
              <li id='section-13'>
                <Typography variant='h2'>13. Overstaying or Usage without Consent</Typography>
                <ol className={classes.innerNumerationList}>
                  <li>
                    <p>
                      <span className={classes.mainWord}>Pool Availability:</span>
                      You as a Host agree to make the Pool available for the duration agreed upon either (i) at the time
                      of Booking, or (ii) such other time as mutually agreed upon by you and the Guest (“Allowed
                      Duration”). If you fail to do so, you shall be subject to a charge of at least $50 for every half
                      hour increments for which the Pool is unavailable for the duration of the Booking, to be deducted
                      from amounts owed to you by Swimply for the Booking. Swimply reserves the right to take whatever
                      action necessary to address these kinds of actions on its Platform.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>Overstaying as a Guest:</span>
                      You as a Guest agree that your confirmed Booking grants you a limited license to enter and use the
                      Pool for the Allowed Duration. If you exceed the Allowed Duration, without the Host’s consent, you
                      agree that the Host or Swimply may charge you a rate of at least $100 for every half hour
                      increment exceeding the Allowed Duration and Host may set out other fees in their independent
                      agreement. This amount shall be to compensate the Hosts for any inconvenience. Swimply is
                      authorized to collect fees pursuant to this Section from the Guest’s Payment Methods.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>Unauthorized Access of Pool:</span>
                      You as a Guest agree that you are responsible for any individuals whom you invite to, or otherwise
                      provide access to, the Pool, and as such, if you invite or provide access to more persons than
                      agreed upon between you and the Host or otherwise permitted by the Host, you will be subject to a
                      $25 fee per person per hour in excess of the agreed upon number of persons.
                    </p>
                  </li>
                </ol>
              </li>
              <li id='section-14'>
                <Typography variant='h2'>14. Cancellations and Refunds</Typography>
                <ol className={classes.innerNumerationList}>
                  <li>
                    <p>
                      <span className={classes.mainWord}>Host Cancellations:</span>
                      If you cancel a confirmed Booking made via the Platform, Swimply will refund the Total Fees for
                      such Booking to the applicable Guest. If, as a Host, you cancel a confirmed Booking, you may be
                      subject to a cancellation fee. Each host on the Platform sets the cancellation policy for their
                      pool. For cancellations made 72 hours prior to the Booking date, you will not be charged a
                      cancellation fee, unless such cancellation causes Swimply unexpected fees (cost of unexpected fees
                      will apply to cancellation at any time). For cancellations made within 24 through 72 hours prior
                      to the Booking date, you will be charged a cancellation fee equal to 50% of the Total Fees. For
                      cancellations made within 24 hours of the confirmed Booking date, you will be charged a
                      cancellation fee equal to the Total Fees. Other consequences may apply to you or your Listing,
                      including (i) publishing an automated review on your Listing indicating that a Booking was
                      cancelled, (ii) keeping the calendar for your Listing unavailable or blocked for the dates of the
                      cancelled Booking, or (iii) increasing the Hosts Fee payable to Swimply for future Listings.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>Swimmer Cancellations:</span>
                      If as a Swimmer you wish to cancel a confirmed Booking made via the Platform, you may do so on the
                      Platform. Swimmer’s cancellation effects will be based on cancellation policy elected by Host.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>Cancellations Generally:</span>
                      In certain circumstances, Swimply may decide, in its sole discretion, that it is necessary or
                      desirable to cancel a confirmed Booking made via the Platform. This may be for reasons set forth
                      on the Site or for any other reason as deemed fit under Swimply’s discretion. Swimply may also
                      determine, in its sole discretion, to forgo a cancellation fee from the Hosts or refund to the
                      Guest part or all of the amounts charged to the Guest. You agree that Swimply will not have any
                      liability for such cancellations or refunds. If Guest or Hosts have medical circumstances which
                      prevent them from taking the reservation with medical evidence, the party shall not be financially
                      responsible. You must submit all cancellations through the Swimply Platform. Your cancellation of
                      a Listing is not effective unless and until you have requested the cancellation through your
                      Swimply account. You acknowledge and agree that any and all Fees (as defined herein) are 100%
                      non-cancellable and non-refundable. You may only cancel one Booking in any three (3) month period.
                      If you cancel any Booking, your calendar will stay blocked for the cancelled Booking and you will
                      not be able to accept another reservation for the same date of the canceled reservation.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>Other Host Cancellations:</span>
                      In certain circumstances, such as rain, Swimply may decide, in its sole discretion, that it is
                      necessary or desirable to postpone a confirmed Booking made via the Platform. In the event of
                      rain, Swimply will allow the Host to accommodate the reservation at a different date, within one
                      weeks time from the initial booking date. Swimply will allow the Host to cancel the reservation
                      due to rain, and the reservation price, minus the 10% service fee per booking.
                    </p>
                    <p className={classes.mainWord}>
                      SWIMPLY RESERVES THE RIGHT, AT ANY TIME AND WITHOUT PRIOR NOTICE, TO REMOVE OR DISABLE ACCESS TO
                      ANY LISTING FOR ANY REASON, INCLUDING LISTINGS THAT SWIMPLY, IN ITS SOLE DISCRETION, CONSIDERS TO
                      BE OBJECTIONABLE FOR ANY REASON, IN VIOLATION OF THESE TERMS OR SWIMPLY’S THEN-CURRENT POLICIES,
                      OR OTHERWISE HARMFUL TO THE SITE, APPLICATION OR SERVICES.
                    </p>
                  </li>
                </ol>
              </li>
              <li id='section-15'>
                <Typography variant='h2'>15. User Conduct</Typography>
                <p>
                  You understand and agree that you are solely responsible for compliance with any and all laws, rules,
                  regulations, and Tax obligations that may apply to your use of the Platform and Collective Content,
                  you agree that you may not and will not (as applied to primary headers 15.1, 15.2):
                </p>
                <ol className={classes.innerNumerationList}>
                  <li>
                    <p>
                      <span className={classes.mainWord}>Violate the Law or Policies:</span>
                      Violate any local, state, provincial, national, or other law or regulation, or any order of a
                      court, including, without limitation, zoning restrictions and Tax regulations;
                    </p>
                    <ol className={classes.innerNumerationList}>
                      <li>
                        <p>
                          Member agrees not to violate these Terms or Swimply’s then-current Policies and Community
                          Guidelines or Standards, if any exist;
                          Swimply will not tolerate any discriminatory actions taken by guests and hosts. Swimply
                          complies
                          with all anti-discrimination laws. We explicitly prohibit offensive behavior (e.g. derogatory
                          comments towards colleagues of a specific gender or ethnicity.)
                        </p>
                      </li>
                      <li>
                        <p>
                          Discrimination is any negative action or attitude directed toward someone because of protected
                          characteristics, like race and gender. Other protected characteristics are:
                        </p>
                        <ul className={classes.dotsList}>
                          <li>
                            <p>Age</p>
                          </li>
                          <li>
                            <p>Religion</p>
                          </li>
                          <li>
                            <p>Ethnicity/ nationality</p>
                          </li>
                          <li>
                            <p>Disability/ medical history</p>
                          </li>
                          <li>
                            <p>Marriage / civil partnership</p>
                          </li>
                          <li>
                            <p>Pregnancy / maternity/ paternity</p>
                          </li>
                          <li>
                            <p>
                              Gender identity/ sexual orientation
                            </p>
                            <p>
                              Any discrimination against a Member can result in any consequences
                              up to and including expulsion from
                              the site and potential even civil or criminal penalties.
                              We will not be lenient in cases of assault,
                              sexual harassment or violence, whether physical or psychological.
                            </p>
                          </li>
                          <li>
                            <p>
                              different backgrounds
                            </p>
                          </li>
                        </ul>
                        <Typography className={classes.minusMarginLeft} variant='h3'>What to do in cases of discrimination</Typography>
                        <p className={classes.minusMarginLeft}>
                          If you are the victim of discriminatory behavior (or if you suspect that others are being
                          discriminated against,) please contact us as soon as possible.
                        </p>
                        <p className={classes.minusMarginLeft}>
                          Punishment for discriminatory behavior depends on the severity of the offence. For example,
                          inadvertently offending someone might warrant a reprimand. Conversely, willfully bypassing a
                          Guest
                          because of a protected characteristic will result in termination from the site.
                        </p>
                        <Typography className={classes.minusMarginLeft} variant='h3'>How we address discrimination complaints</Typography>
                        <p className={classes.minusMarginLeft}>
                          Swimply is proactive and responsive about determining whether discrimination occurs.
                        </p>
                        <p className={classes.minusMarginLeft}>
                          We will investigate all claims discreetly. We will never disclose who made a complaint to
                          anyone or
                          give out information that may help others identify that person (e.g. which department or role
                          they
                          work in.)
                        </p>
                        <p className={classes.minusMarginLeft}>
                          We should all strive to prevent and address discrimination. Be aware of your implicit biases
                          and speak
                          up whenever you or your colleagues are discriminated against. If you have any ideas on how we
                          can
                          ensure fairness and equality in our workplace, we are happy to hear them.
                        </p>
                      </li>
                    </ol>
                  </li>
                  <li>
                    <p>
                      Page Scrape or Cause Site Damage: Use manual or automated software, scripts or systematic
                      retrieval, or devices, scripts, robots, backdoors or other means or processes to access, “scrape,”
                      “crawl” or “spider” any web pages or other services contained in the Platform or Collective
                      Content or any other form of gleaning information to create or compile, directly or indirectly, in
                      single or multiple downloads, a collection, compilation, database, directory or the like;
                      Member will not:
                    </p>
                    <ol className={classes.innerNumerationList}>
                      <li>
                        <p>
                          interfere with or damage the Platform, including, without limitation, through the use of
                          viruses, cancel bots, Trojan horses, harmful code, flood pings, denial-of-service attacks,
                          backdoors, packet or IP spoofing, forged routing or electronic mail address information or
                          similar methods or technology;
                        </p>
                      </li>
                      <li>
                        <p>
                          access, tamper with, or use non-public areas of the Platform, Swimply’s computer systems, or
                          the technical delivery systems of Swimply’s providers;
                        </p>
                      </li>
                      <li>
                        <p>
                          attempt to probe, scan, or test the vulnerability of any Swimply system or network or breach
                          any security or authentication measures;
                        </p>
                      </li>
                      <li>
                        <p>
                          avoid, bypass, remove, deactivate, impair, descramble, or otherwise circumvent any
                          technological measure implemented by Swimply or any of Swimply’s providers or any other third
                          party (including another user) to protect the Platform or Collective Content or attempt to
                          decipher, decompile, disassemble or reverse engineer any of the software used for the Platform
                          or collective content;
                        </p>
                      </li>
                      <li>
                        <p>
                          forge any TCP/IP packet header or any part of the header information in any email or newsgroup
                          posting, or in any way use the Platform or Collective Content to send altered, deceptive or
                          false source-identifying information;
                        </p>
                      </li>
                    </ol>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>Use for Restricted Commercial Purposes:</span>
                      Use the Platform or Collective Content for any commercial or other purposes that are not expressly
                      permitted by these Terms or in a manner that falsely implies Swimply endorsement, partnership or
                      otherwise misleads others as to your affiliation with Swimply;
                    </p>
                    <p className={classes.mainWord}>
                      Member will not:
                    </p>
                    <ol className={classes.innerNumerationList}>
                      <li>
                        <p>
                          <span className={classes.mainWord}>Use Platform Content:</span>
                          Use, display, mirror or frame the Platform or Collective Content, or any individual element
                          within the Platform or Collective Content;
                        </p>
                      </li>
                      <li>
                        <p>
                          <span className={classes.mainWord}>No Use for Competing Business:</span>
                          Access the site for the purpose of a competing platform or business as a Hosts, submit any
                          Listing with false or misleading information, including price information, or submit any
                          Listing with a price that you do not intend to honor;
                        </p>
                      </li>
                      <li>
                        <p>
                          <span className={classes.mainWord}>Cannot Circumvent Swimply:</span>
                          Attempt to bypass Swimply to rent or book any Pool outside the Swimply Platform. Members
                          discovered violating this rule will owe Swimply the full cost they would have incurred on the
                          site, plus fees incurred by Swimply. Additionally, Members cannot use the Platform or
                          Collective Content to find a Hosts or Guest and then complete a Booking of a Pool independent
                          of the Platform;
                        </p>
                      </li>
                      <li>
                        <p>
                          <span className={classes.mainWord}>Reputational Harm:</span>
                          Purport to say or take any actions with regard to Swimply that has the potential to harm,
                          damage or tarnish its reputation in any way, please reach out to us as a first point of
                          contact should you have any such concerns;
                        </p>
                      </li>
                      <li>
                        <p>
                          <span className={classes.mainWord}>Falsify Reviews:</span>
                          You agree to only publish reviews in accordance with your views and you agree to never
                          withhold or tarnish or improve a review for any gain or use relating to extortion;
                        </p>
                      </li>
                    </ol>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>Violate Payment Practices:</span>
                      You may not accept or make a payment for Pool Fees outside Swimply. If you do so, you acknowledge
                      and agree that, you: (i) would be in breach of these Terms, (ii) accept all risks and
                      responsibility for such payment, and (iii) hold Swimply harmless from any liability for such
                      payment.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>Violate Intellectual Property Restrictions:</span>
                      You agree that, without Swimply’s written consent, you will not dilute, tarnish or otherwise harm
                      the Swimply brand in any way, including through unauthorized use of Collective Content,
                      registering and/or using Swimply or derivative terms in domain names, trade names, trademarks or
                      other source identifiers, or registering and/or using domains names, trade names, trademarks,
                      logos or other source identifiers that closely imitate or are confusingly similar to Swimply
                      domains, trademarks, taglines, promotional campaigns or Collective Content, other proprietary
                      information or infringe the rights of Swimply or the any other person or entity, including without
                      limitation, their intellectual property, privacy, publicity or contractual right, copy, store or
                      otherwise access or use any information contained on the Platform or Collective Content for
                      purposes not expressly permitted by these Terms;
                    </p>
                    <p className={classes.mainWord}>Member will not:</p>
                    <ol className={classes.innerNumerationList}>
                      <li>
                        <p>
                          <span className={classes.mainWord}>Content Restrictions:</span>
                          Post, upload, publish, submit or transmit any Content that: (i) infringes, misappropriates or
                          violates a third party’s patent, copyright, trademark, trade secret, moral rights or other
                          intellectual property rights, or rights of publicity or privacy; (ii) violates, or encourages
                          any conduct that would violate, any applicable law or regulation or would give rise to civil
                          liability; (iii) is fraudulent, false, misleading (directly or by omission or failure to
                          update information) or deceptive; (iv) is defamatory, obscene, pornographic, vulgar or
                          offensive; (v) promotes discrimination, bigotry, racism, hatred, harassment or harm against
                          any individual or group; (vi) is violent or threatening or promotes violence or actions that
                          are threatening to any other person; or (vii) promotes illegal or harmful activities or
                          substances;
                        </p>
                      </li>
                    </ol>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>Inappropriate Interactions with Third-Parties:</span>
                      You may not use the Platform to transmit, distribute, post or submit any information concerning
                      any other person or entity, including without limitation, photographs of others without their
                      permission, personal contact information or credit, debit, calling card or account numbers;
                    </p>
                    <ol className={classes.innerNumerationList}>
                      <li>
                        <p>
                          <span className={classes.mainWord}>No Spam:</span>
                          Use the Platform or Collective Content in connection with the distribution of unsolicited
                          commercial email (“spam”) or advertisements unrelated to lodging in a private residence;
                        </p>
                      </li>
                      <li>
                        <p>
                          <span className={classes.mainWord}>Direct Contact with Member not for Swimply Finalized Booking:</span>
                          No contacting another Member for any purpose other than asking a question related to a
                          Booking, Pool, Listing, or the Member’s use of the Platform or recruit or otherwise solicit
                          any Member to join third-party services, applications or websites, without Swimply’s prior
                          written approval;
                        </p>
                      </li>
                      <li>
                        <p>
                          <span className={classes.mainWord}>Harassment:</span>
                          Member agrees not to “Stalk” or harass any other user of the Platform or Collective Content,
                          or collect or store any personally identifiable information about any other user other than
                          for purposes of transacting as a Swimply Guest or Hosts engage in disruptive, circumventive,
                          abusive or harassing behavior in any area or aspect of Swimply’s Platform;
                        </p>
                      </li>
                      <li>
                        <p>
                          <span className={classes.mainWord}>Offer Another’s or Restricted Property:</span>
                          Offer, as a Hosts, any Pool , that you do not yourself have rights to offer (without limiting
                          the foregoing, you will not list Pools as a Hosts if you are serving in the capacity of an
                          agent for a third party); offer, as a Hosts, any Pool that may not be Booked pursuant to an
                          agreement with a third party;
                        </p>
                      </li>
                      <li>
                        <p>
                          <span className={classes.mainWord}>Register for Multiple Accounts:</span>
                          Member will not register for more than one Swimply Account or register for a Swimply Account
                          on behalf of an individual other than yourself;
                        </p>
                      </li>
                      <li>
                        <p>
                          <span className={classes.mainWord}>Book for Another:</span>
                          Unless Swimply explicitly permits otherwise, request or book a stay at any Pool if you will
                          not actually be staying at the Pool yourself, you agree not to impersonate any person or
                          entity, or falsify or otherwise misrepresent yourself or your affiliation with any person or
                          entity; advocate, encourage, or assist any third party in doing any of the foregoing. Further,
                          if you bring additional Guests with you it is your duty to ensure they follow the rules
                        </p>
                      </li>
                      <li>
                        <p>
                          <span className={classes.mainWord}>Reporting Misconduct:</span>
                          If you feel that any Member is acting or has acted inappropriately, including but not limited
                          to anyone who (i) engages in offensive, violent or sexually inappropriate behavior, (ii) you
                          suspect of stealing from you, or (iii) engages in any other disturbing conduct, you should
                          immediately report such person to the appropriate authorities and then to Swimply by
                          contacting Swimply with your police station and report number; provided that your report will
                          not obligate Swimply to take any action beyond that required by law (if any) or cause Swimply
                          to incur any liability to you.
                        </p>
                      </li>
                    </ol>
                  </li>
                </ol>
              </li>
              <li id='section-16'>
                <Typography variant='h2'>16. Term, Suspension and Termination</Typography>
                <ol className={classes.innerNumerationList}>
                  <li>
                    <p>
                      <span className={classes.mainWord}>Swimply Response to Violations:</span>
                      Swimply has the right to investigate and prosecute violations of any violations of these Terms or
                      the law to the fullest extent of the law. In addition, and as set in these Terms, Swimply may take
                      a range of actions against you, including but not limited to removing or disabling access to any
                      or all of your Member Content or deactivating or canceling your Listing(s) or Swimply Account, for
                      a violation of the Terms. While Swimply takes due diligence to review all content that would
                      potentially be nefarious or egregious, Swimply takes no responsibility for content that evades the
                      vetting system. Swimply may refuse to surface, delete or delay any Listings, Ratings, Reviews, or
                      other Member Content or cancel any pending or confirmed Bookings. Swimply may terminate without
                      notice if (i) you breached these Terms or other Policies referenced herein or on the Site, (ii)
                      you have provided inaccurate, fraudulent, outdated or incomplete information during the Swimply
                      Account registration, or Listing process or thereafter, (iii) you have violated applicable laws,
                      regulations or third party rights, or (iv) Swimply believes in good faith that such action is
                      reasonably necessary to protect the safety or property of other Members, Swimply or third parties,
                      for fraud prevention, risk assessment, security or investigation purposes.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>Termination for Cause:</span>
                      Swimply may deactivate or delay Listings, reviews, or other Member Content, cancel any pending or
                      confirmed Bookings, limit your use of or access to your Swimply Account and the Platform,
                      temporarily or permanently revoke any special status associated with your Swimply Account, or
                      temporarily or permanently suspend your Swimply Account if you have breached these Terms or
                      policies, including material and non-material breaches, and if you receive one or more poor
                      ratings from Hosts or Guests (with the definition of “poor” to be at Swimply’s sole and absolute
                      discretion).
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>Hosts Termination:</span>
                      If Swimply takes any of the measures described herein relating to a Hosts, it may (i) communicate
                      to your Guests or Hosts that a pending or confirmed Booking has been cancelled, (ii) refund your
                      Guests in full for any and all confirmed Bookings, irrespective of applicable cancellation
                      policies, (iii) support your Guests, on an exceptional basis, in finding potential alternative
                      Pools, and (iv) you will not be entitled to any compensation for confirmed Bookings that were
                      cancelled.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>No Right to Account Restoration:</span>
                      When this Agreement has been terminated, you are not entitled to a restoration of your Swimply
                      Account or any of your Member Content. If your access to or use of the Swimply Platform has been
                      limited or your Swimply Account has been suspended or this Agreement has been terminated by us,
                      you may not register a new Swimply Account or access and use the Swimply Platform through a
                      Swimply Account of another Member.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>Swimply Rationale for Data Access:</span>
                      Swimply may access, preserve and disclose any of your information if required to do so by law, or
                      if it believes in good faith that it is reasonably necessary to (i) respond to claims asserted
                      against Swimply or to comply with legal process (for example, subpoenas or warrants), (ii) enforce
                      or administer Swimply’s agreements with users, such as these Terms, (iii) for fraud prevention,
                      risk assessment, investigation, customer support, product development and de-bugging purposes, or
                      (iv) protect the rights, property or safety of Swimply, its users, or members of the public.
                      Swimply reserves the right, at any time and without prior notice, to remove or disable access to
                      any Collective Content that Swimply, at its sole discretion, considers to be objectionable for any
                      reason, in violation of these Terms or otherwise harmful to the Platform. (v) you have repeatedly
                      received poor Ratings or Reviews or Swimply otherwise becomes aware of or has received complaints
                      about your performance or conduct, or (vi) you have repeatedly cancelled confirmed bookings or
                      failed to respond to booking requests without a valid reason.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>User Volitional Termination:</span>
                      You may terminate your Swimply Account by canceling it on the Site or by sending Swimply an email
                      in which you request that Swimply terminate your Swimply Account. If you cancel your Swimply
                      Account as a Hosts, any confirmed Bookings will be automatically cancelled, and your Guests will
                      receive a full refund of the Pool Fee. No refunds of Service Fees will be provided. If you cancel
                      your Swimply Account as a Guest, any confirmed Booking will be automatically cancelled, and you
                      will be issued a refund in accordance with the cancellation policy referenced herein.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>Ban on Issue of New Account after Suspension:</span>
                      If your access to or use of the Platform has been limited or your Swimply Account has been
                      suspended or this Agreement has been terminated by Swimply, you may not register a new Swimply
                      Account or attempt to access and use the Platform through other Swimply Accounts.
                    </p>
                  </li>
                </ol>
              </li>
              <li id='section-17'>
                <Typography variant='h2'>17. Taxes</Typography>
                <p>
                  Tax regulations may require Swimply to collect appropriate tax data from Hosts, or to withhold taxes
                  from payouts to Hosts, or both. You as a Hosts are solely responsible for keeping the information in
                  your tax forms current, complete and accurate. If you as a Hosts fail to provide Swimply with
                  documentation that Swimply determines to be sufficient to alleviate Swimply’s obligation (if any) to
                  withhold taxes from payments to you, Swimply reserves the right in its sole discretion to freeze all
                  payouts to you until resolution, to withhold such amounts as required by law, or to do both.
                </p>
                <p>
                  You as a Hosts understand and agree that you are solely responsible for determining (i) your
                  applicable Tax reporting requirements, and (ii) the Taxes that should be included and including Taxes
                  to be collected or obligations relating to applicable Taxes in Listings. You are also solely
                  responsible for remitting to the relevant authority any Taxes included or received by you. Swimply
                  cannot and does not offer Tax-related advice to any Members.
                </p>
                <p>
                  You understand and acknowledge that appropriate governmental agencies, departments or authorities (the
                  <span className={classes.mainWord}>“Tax Authority”</span>) where your Pool is located may require
                  Taxes to be collected from Guests or Hosts on
                  the amount paid for the right to use and/or occupancy of Pools, and to be remitted to the respective
                  Tax Authority. We reserve the right to collect taxes that would be wanted by any governmental
                  authority. The laws in jurisdictions may vary, but these taxes may be required to be collected and
                  remitted as a percentage of the Pool Fees set by Hosts, a set amount per day, or other variations, and
                  are sometimes called “occupancy taxes,” “hotel taxes,” “lodging taxes,” “transient taxes,” “sales and
                  use taxes,” “value added taxes,” “room taxes” or “tourist taxes” (hereafter,
                  <span className={classes.mainWord}>“Occupancy Taxes”</span>).
                </p>
              </li>
              <li id='section-18'>
                <Typography variant='h2'>18. Digital Millennium Copyright Act (DMCA)</Typography>
                <p>
                  Swimply respects the intellectual property rights of others and attempts to comply with all relevant
                  laws. We will review all claims of copyright infringement received and remove any content deemed to
                  have been posted or distributed in violation of any such laws.
                  Our designated agent under the Digital Millennium Copyright Act (the “Act”) for the receipt of any
                  Notification of Claimed Infringement which may be given under that Act is as follows:
                  info@swimply.com
                  If you believe that your work has been copied on the Site in a way that constitutes copyright
                  infringement, please provide our agent with notice in accordance with the requirements of the Act,
                  including (i) a description of the infringed work and the specific location on the Site where such
                  work is located; (ii) a description of the location of the original or an authorized copy of the
                  copyrighted work; (iii) your address, telephone number and e-mail address; (iv) a statement by you
                  that you have a good faith belief that the disputed use is not authorized by the copyright owner, its
                  agent or the law; (v) a statement by you, made under penalty of perjury, that the information in your
                  notice is accurate and that you are the copyright owner or authorized to act on the copyright owner’s
                  behalf; and (vi) an electronic or physical signature of the owner of the copyright or the person
                  authorized to act on behalf of the owner of the copyright interest.
                </p>
              </li>
              <li id='section-19'>
                <Typography variant='h2'>19. Class Action Waiver</Typography>
                <p>
                  You agree that any arbitration or proceeding shall be limited to the dispute between us and you
                  individually. To the full extent permitted by law, (i) no arbitration or proceeding shall be joined
                  with any other; (ii) there is no right or authority for any dispute to be arbitrated or resolved on a
                  class action-basis or to utilize class action procedures; and (iii) there is no right or authority for
                  any dispute to be brought in a purported representative capacity on behalf of the general public or
                  any other persons. YOU AGREE THAT YOU MAY BRING CLAIMS AGAINST US ONLY IN YOUR INDIVIDUAL CAPACITY AND
                  NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED CLASS OR REPRESENTATIVE PROCEEDING.
                  You may opt-out of this class action and jury waiver described herein by emailing us at
                  info@swimply.com within 30 days of your first use of the Platform or Services. You must include your
                  name, phone number, physical address, and email address in your opt-out notice. This is your only
                  mechanism for opting out of this Section and failure to do so as described constitutes your consent to
                  this waiver. If you choose to opt out of this Section please note that all other provisions in these
                  Terms will remain intact and in full force and effect.
                </p>
              </li>
              <li id='section-20'>
                <Typography variant='h2'>20. Equitable Relief</Typography>
                <p>
                  You acknowledge and agree that in the event of a breach or threatened violation of our intellectual
                  property rights and confidential and proprietary information by you, we will suffer irreparable harm
                  and will therefore be entitled to injunctive relief to enforce this Agreement. We may, without waiving
                  any other remedies under this Agreement, seek from any court having jurisdiction any interim,
                  equitable, provisional, or injunctive relief that is necessary to protect our rights and property
                  pending the outcome of the arbitration referenced above. You hereby irrevocably and unconditionally
                  consent to the personal and subject matter jurisdiction of the federal and state courts in the State
                  of New Jersey for purposes of any such action by us.
                </p>
              </li>
              <li id='section-21'>
                <Typography variant='h2'>21. Communications Decency Act Notice</Typography>
                <p>
                  Swimply may be a provider of “interactive computer services” as defined under the Communications
                  Decency Act, 47 U.S.C. Section 230, and as such, our liability for defamation, libel, product
                  disparagement, and other claims arising out of any Collective Content is limited as described therein.
                  We are not responsible for any Collective Content. We neither warrant the accuracy of the Collective
                  Content nor exercise any editorial control over Collective Content, nor do we assume any legal
                  obligation for editorial control of Collective Content or liability in connection with Collective
                  Content, including any responsibility or liability for investigating or verifying the accuracy of any
                  Collective Content.
                </p>
              </li>
              <li id='section-22'>
                <Typography variant='h2'>22. Privacy</Typography>
                <p>
                  Please review Swimply’s Privacy Policy at www.swimply.com/privacy_policy, which also governs your
                  access and use of this Platform. By using the Platform you agree to said Privacy Policy.
                </p>
              </li>
              <li id='section-23'>
                <Typography variant='h2'>23. Assumption of Risk and Waiver</Typography>
                <p>
                  You as a Guest agree that you are aware of and assume all risks for yourself as well as any other
                  Guest or invitees attending your Booking. Neither Swimply nor the Hosts is responsible for any
                  accidents caused or incurred by you as a Guest or any of your Guests or invitees, related to swimming
                  or otherwise. You hereby release, waive, discharge, and covenant not to sue Swimply or the Hosts for
                  any injuries arising from or related to use of the Pool.
                  You agree that some Listings may carry inherent risk, and by participating in such services, you
                  choose to assume those risks voluntarily. For example, some Listings may carry risk of illness, bodily
                  injury, disability, or death, and you freely and willfully assume those risks by choosing to
                  participate in those Pools. You assume full responsibility for the choices you make before, during and
                  after your participation in a Pool. If you are bringing a minor as an additional Guest, you are solely
                  responsible for the supervision of that minor throughout the duration of your time in the Pool and to
                  the maximum extent permitted by law, you agree to release and hold harmless Swimply from all
                  liabilities and claims that arise in any way from any injury, death, loss or harm that occurs to that
                  minor during swimming or in any way related to the Pool you choose.
                </p>
              </li>
              <li id='section-24'>
                <Typography variant='h2'>24. Indemnification and Limitation of Liability</Typography>
                <p>
                  You agree to forever release, defend, discharge, indemnify, and hold Swimply and its affiliates and
                  subsidiaries, and their members, managers, officers, directors, employees and agents, harmless from
                  and against any claims, liabilities, damages, losses, and expenses, including, without limitation,
                  reasonable legal and accounting fees, arising out of or in any way connected with (a) your access to
                  or use of the Platform or Collective Content or your violation of these Terms; (b) your Member
                  Content; (c) your (i) interaction with any Member, (ii) Booking of a Pool, or (iii) creation of a
                  Listing; and (d) the use, condition or Booking of a Pool by you, including but not limited to any
                  injuries, losses, or damages (compensatory, direct, incidental, consequential or otherwise) of any
                  kind arising in connection with or as a result of a Booking or use of an Pool.
                  You hereby waive any potential liability for delays in payment on account of force majeure. Swimply is
                  not responsible or liable for nonperformance caused by telecommunications failures, nonperformance of
                  vendors, fires or other acts of nature, strife or acts of political discord, or other events outside
                  its reasonable control (each a “Force Majeure”).
                </p>
                <p>
                  YOU ACKNOWLEDGE AND AGREE THAT, TO THE MAXIMUM EXTENT PERMITTED BY LAW, YOU ASSUME THE ENTIRE RISK
                  ARISING OUT OF YOUR USE OF THE PLATFORM. IF YOU PERMIT OR AUTHORIZE ANOTHER PERSON TO USE YOUR SWIMPLY
                  ACCOUNT IN ANY WAY, YOU ARE RESPONSIBLE FOR THE ACTIONS TAKEN BY THAT PERSON. NEITHER SWIMPLY NOR ANY
                  THIRD PARTY INVOLVED IN PROVIDING PAYMENT SERVICES WILL BE LIABLE FOR ANY INCIDENTAL, SPECIAL,
                  EXEMPLARY OR CONSEQUENTIAL DAMAGES, INCLUDING LOST PROFITS, LOSS OF DATA OR LOSS OF GOODWILL, SERVICE
                  INTERRUPTION, COMPUTER DAMAGE OR SYSTEM FAILURE OR THE COST OF SUBSTITUTE PRODUCTS OR SERVICES, OR FOR
                  ANY DAMAGES FOR PERSONAL OR BODILY INJURY OR EMOTIONAL DISTRESS ARISING OUT OF OR IN CONNECTION WITH
                  THESE TERMS, FROM THE USE OF OR INABILITY TO USE THE SERVICES, FROM ANY COMMUNICATIONS, INTERACTIONS
                  OR MEETINGS WITH OTHER PERSONS WITH WHOM YOU COMMUNICATE OR INTERACT AS A RESULT OF YOUR USE OF THE
                  SERVICES, WHETHER BASED ON WARRANTY, CONTRACT, TORT (INCLUDING NEGLIGENCE), PRODUCT LIABILITY OR ANY
                  OTHER LEGAL THEORY, AND WHETHER OR NOT SWIMPLY HAS BEEN INFORMED OF THE POSSIBILITY OF SUCH DAMAGE,
                  EVEN IF A LIMITED REMEDY SET FORTH HEREIN IS FOUND TO HAVE FAILED OF ITS ESSENTIAL PURPOSE. SOME
                  STATES DO NOT ALLOW THE EXCLUSION OR LIMITATION OF INCIDENTAL OR CONSEQUENTIAL DAMAGES, SO, IN THOSE
                  STATES, THE HEREIN LIMITATION SHALL BE TO THE MAXIMUM EXTENT PERMITTED UNDER APPLICABLE LAW.
                </p>
                <p>
                  <span className={classes.mainWord}>Hosts Liability:</span>
                  <p>
                    YOU ACKNOWLEDGE AND AGREE THAT, TO THE MAXIMUM EXTENT PERMITTED BY LAW, THE ENTIRE RISK ARISING OUT
                    OF YOU PROVIDING ACCESS TO AND USE OF YOUR POOL AND BROADER PREMISES AND MEMBER CONTENT, ANY
                    RELATIONSHIP OR COMMUNICATION YOU HAVE WITH ANY GUEST IS OWNED BY YOU, POOL OWNER. SWIMPLY WILL NOT
                    BE LIABLE FOR ANY SPECIAL, INCIDENTAL, CONSEQUENTIAL OR EXEMPLARY DAMAGES, INCLUDING LOST PROFITS,
                    LOSS OF DATA OR LOSS OF GOODWILL, SERVICE INTERRUPTION, COMPUTER DAMAGE OR SYSTEM FAILURE OR THE
                    COST OF SUBSTITUTE PRODUCTS OR SERVICES, OR FOR ANY DAMAGES FOR PERSONAL OR BODILY INJURY OR
                    EMOTIONAL DISTRESS ARISING OUT OF OR IN CONNECTION WITH (I) THESE TERMS, (II) FROM THE USE OF OR
                    INABILITY TO USE THE SWIMPLY PLATFORM, (III) FROM ANY COMMUNICATIONS, INTERACTIONS OR MEETINGS WITH
                    OTHER MEMBERS OR OTHER PERSONS WITH WHOM YOU COMMUNICATE, INTERACT OR MEET WITH AS A RESULT OF YOUR
                    USE OF SWIMPLY, OR (IV) FROM YOUR PUBLISHING OR BOOKING OF A LISTING, INCLUDING WHETHER BASED ON
                    WARRANTY, CONTRACT, TORT (INCLUDING NEGLIGENCE), PRODUCT LIABILITY OR ANY OTHER LEGAL THEORY, AND
                    WHETHER OR NOT SWIMPLY HAS BEEN INFORMED OF THE POSSIBILITY OF SUCH DAMAGE, EVEN IF A LIMITED REMEDY
                    SET FORTH HEREIN IS FOUND TO HAVE FAILED OF ITS ESSENTIAL PURPOSE. EXCEPT FOR OUR OBLIGATIONS TO PAY
                    AMOUNTS TO APPLICABLE POOL OWNERS PURSUANT TO THESE TERMS OR AN APPROVED PAYMENT REQUEST UNDER THE
                    POOL OWNER’S INSURANCE, IN NO EVENT WILL SWIMPLY AGGREGATE LIABILITY ARISING OUT OF OR IN CONNECTION
                    WITH THESE TERMS AND YOUR USE OF THE SWIMPLY PLATFORM INCLUDING, BUT NOT LIMITED TO, FROM YOUR
                    PUBLISHING OR BOOKING OF ANY LISTINGS VIA THE SWIMPLY PLATFORM, OR FROM THE USE OF OR INABILITY TO
                    USE THE SWIMPLY PLATFORM AND IN CONNECTION WITH ANY BOOKING OR INTERACTIONS WITH ANY OTHER MEMBERS,
                    OR THE AMOUNTS PAID BY SWIMPLY TO YOU IN THE TWELVE (12) MONTH PERIOD PRIOR TO THE EVENT GIVING RISE
                    TO THE LIABILITY. THE LIMITATIONS OF DAMAGES SET FORTH ABOVE ARE FUNDAMENTAL ELEMENTS OF THE BASIS
                    OF THE BARGAIN BETWEEN SWIMPLY AND YOU. SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OR LIMITATION
                    OF LIABILITY FOR CONSEQUENTIAL OR INCIDENTAL DAMAGES, SO THE ABOVE LIMITATION MAY NOT APPLY TO YOU.
                    SOME JURISDICTIONS, INCLUDING THE STATE OF NEW JERSEY, DO NOT ALLOW THE EXCLUSION OF CERTAIN
                    WARRANTIES. THEREFORE, SOME OF THE ABOVE LIMITATIONS ON WARRANTIES IN THIS SECTION MAY NOT APPLY TO
                    YOU. NOTHING IN THESE TERMS OF USE SHALL AFFECT ANY NON-WAIVABLE STATUTORY RIGHTS THAT APPLY TO YOU.
                  </p>
                  <p>
                    Swimply is not a party to the Hosts’s process for deciphering an acceptable Booking and is not
                    involved in the scope of the agreement. Swimply may in its sole discretion increase or decrease the
                    time period within which the Hosts must confirm or reject such Booking. Any such modification will
                    be posted to these Terms within 30 business days of the decision to change the standard for fees.
                  </p>
                </p>
              </li>
              <li id='section-25'>
                <Typography variant='h2'>25. Disclaimer</Typography>
                <p>
                  SWIMPLY DOES NOT PROMISE THAT THE SITE OR ANY CONTENT, DOCUMENT OR FEATURE OF THE SITE WILL BE
                  ERROR-FREE OR UNINTERRUPTED, OR THAT ANY DEFECTS WILL BE CORRECTED OR THAT YOUR USE OF THE SITE WILL
                  PROVIDE SPECIFIC RESULTS. THE MATERIAL IN THIS SITE COULD INCLUDE TECHNICAL INACCURACIES OR
                  TYPOGRAPHICAL ERRORS. SWIMPLY CANNOT ENSURE THAT ANY FILES, DOCUMENTS OR OTHER DATA YOU DOWNLOAD FROM
                  THE SITE WILL BE FREE OF VIRUSES OR CONTAMINATION OR DESTRUCTIVE FEATURES. SWIMPLY DISCLAIMS ALL
                  WARRANTIES, EXPRESS OR IMPLIED, INCLUDING ANY WARRANTIES OF ACCURACY, NON-INFRINGEMENT,
                  MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE.
                </p>
                <p>
                  SWIMPLY DOES NOT HAVE AN OBGLIATION TO CONDUCT BACKGROUND OR REGISTERED SEX OFFENDER SEARCHES, BUT MAY
                  DO SO TO THE EXTENT PERMITTED BY APPLICABLE LAWS. EVEN IF SWIMPLY CHOOSES TO DO SO, IT DISCLAIMS
                  WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, THAT SUCH CHECKS WILL IDENTIFY PRIOR MISCONDUCT BY
                  A USER OR GUARANTEE THAT A USER WILL NOT ENGAGE IN MISCONDUCT IN THE FUTURE.
                </p>
                <p>
                  SWIMPLY MAKES NO REPRESENTATIONS OR WARRANTIES AS TO ANY MEMBER’S CONDUCT ON THE PLATFORM OR
                  OTHERWISE. YOU AGREE TO TAKE REASONABLE PRECAUTIONS IN ALL COMMUNICATIONS AND INTERACTIONS WITH OTHER
                  USERS OF THE PLATFORM AND WITH OTHER PERSONS WITH WHOM YOU COMMUNICATE OR INTERACT AS A RESULT OF YOUR
                  USE OF THE PLATFORM, INCLUDING, BUT NOT LIMITED TO, GUESTS AND POOL OWNERS, PARTICULARLY IF YOU DECIDE
                  TO MEET OFFLINE OR IN PERSON REGARDLESS OF WHETHER SUCH MEETINGS ARE ORGANIZED BY SWIMPLY. SWIMPLY
                  EXPLICITLY DISCLAIMS ALL LIABILITY FOR ANY ACT OR OMISSION OF ANY GUEST OR OTHER THIRD PARTY.
                </p>
                <p>
                  SWIMPLY MAKES NO REPRESENTATIONS OR WARRANTIES AS TO ANY POOL OR LISTING. GUESTS ARE SOLELY
                  RESPONSIBLE FOR INQUIRING OR PERFORMING ANY DUE DILIGENCE NECESSARY TO EVALUATE A POOL. SWIMPLY DOES
                  NOT ENDORSE ANY MEMBER, LISTING, OR POOL.
                </p>
                <p>
                  The foregoing disclaimers apply to the maximum extent permitted by law. You may have other statutory
                  rights. However, the duration of statutorily required warranties, if any, shall be limited to the
                  maximum extent permitted by law.
                </p>
                <p>
                  Swimply does not appoint you or any other user as its employee, mandatory, legal agent, or form any
                  kind of legal partnership or joint venture. You are not authorized to make any commitments on behalf
                  of Swimply.
                </p>
              </li>
              <li id='section-26'>
                <Typography variant='h2'>26. Governing Law and Jurisdiction</Typography>
                <p>
                  Any dispute, claim, or controversy relating to, and the use of, the Platform and/or relating to the
                  Terms, and the materials contained herein (“Claims”) is governed by the laws of the state of New
                  Jersey without regard to conflict of law rules. All Claims, including the determination of the scope
                  or applicability of this paragraph, shall be determined by arbitration in New Jersey by JAMS pursuant
                  to its Streamlined Arbitration Rules and Procedures. Subject to the foregoing terms in this paragraph,
                  you consent to the exclusive jurisdiction of the federal and state courts located in Ocean County, New
                  Jersey.
                </p>
                <p>
                  The Site is based in the North America. We make no claims concerning whether the Content may be
                  downloaded, viewed, or be appropriate for use outside of North America. If you access or use the Site,
                  the Content, or the Services from outside of North America, you do so at your own risk. Whether inside
                  or outside of North America, you are solely responsible for ensuring compliance with the laws of your
                  specific jurisdiction.
                </p>
              </li>
              <li id='section-27'>
                <Typography variant='h2'>27. Contact Information</Typography>
                <p className={classes.mainWord}>Email: info@swimply.com</p>
              </li>
            </ol>
          </div>
        </div>
        {!footerMobile ? <Footer/> : ''}
      </Typography>
    )
  }

}

TermsAndConditions.propTypes = {
  classes: PropTypes.object.isRequired,
}

const enhance = compose(
  withStyles(styles),
  withRouter
)

export default enhance(TermsAndConditions)
