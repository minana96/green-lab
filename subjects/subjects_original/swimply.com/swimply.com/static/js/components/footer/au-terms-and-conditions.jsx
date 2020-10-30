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
    marginRight: '4px',
    '&:not(:first-child)': {
      marginLeft: '4px'
    }
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
              <Typography variant='subtitle1'>Swimply Terms of Service – December 2019</Typography>
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
                    Application of Terms
                  </span>
                </li>
                <li>
                  <span onClick={this.goToSection.bind(null, 'section-4')} className={classes.mainWord}>
                    Account Registration
                  </span>
                </li>
                <li>
                  <span onClick={this.goToSection.bind(null, 'section-5')} className={classes.mainWord}>
                    Member Profiles: use of Our Website
                  </span>
                </li>
                <li>
                  <span onClick={this.goToSection.bind(null, 'section-6')} className={classes.mainWord}>
                    Protect Login Information
                  </span>
                </li>
                <li>
                  <span onClick={this.goToSection.bind(null, 'section-7')} className={classes.mainWord}>
                    Proprietary Data, Communication and Reviews
                  </span>
                </li>
                <li>
                  <span onClick={this.goToSection.bind(null, 'section-8')} className={classes.mainWord}>
                    Third-Party Sites
                  </span>
                </li>
                <li>
                  <span onClick={this.goToSection.bind(null, 'section-9')} className={classes.mainWord}>
                    Pool Listings
                  </span>
                </li>
                <li>
                  <span onClick={this.goToSection.bind(null, 'section-10')} className={classes.mainWord}>
                    Insurance
                  </span>
                </li>
                <li>
                  <span onClick={this.goToSection.bind(null, 'section-11')} className={classes.mainWord}>
                    Booking and Financial Terms
                  </span>
                </li>
                <li>
                  <span onClick={this.goToSection.bind(null, 'section-12')} className={classes.mainWord}>
                    Service Fees
                  </span>
                </li>
                <li>
                  <span onClick={this.goToSection.bind(null, 'section-13')} className={classes.mainWord}>
                    Damages
                  </span>
                </li>
                <li>
                  <span onClick={this.goToSection.bind(null, 'section-14')} className={classes.mainWord}>
                    Overstaying or Usage without Consent
                  </span>
                </li>
                <li>
                  <span onClick={this.goToSection.bind(null, 'section-15')} className={classes.mainWord}>
                    Cancellations and Refunds
                  </span>
                </li>
                <li>
                  <span onClick={this.goToSection.bind(null, 'section-16')} className={classes.mainWord}>
                    User Conduct
                  </span>
                </li>
                <li>
                  <span onClick={this.goToSection.bind(null, 'section-17')} className={classes.mainWord}>
                    Prohibitions
                  </span>
                </li>
                <li>
                  <span onClick={this.goToSection.bind(null, 'section-18')} className={classes.mainWord}>
                    Term, Suspension and Termination
                  </span>
                </li>
                <li>
                  <span onClick={this.goToSection.bind(null, 'section-19')} className={classes.mainWord}>
                    Taxes
                  </span>
                </li>
                <li>
                  <span onClick={this.goToSection.bind(null, 'section-20')} className={classes.mainWord}>
                    Equitable Relief
                  </span>
                </li>
                <li>
                  <span onClick={this.goToSection.bind(null, 'section-21')} className={classes.mainWord}>
                    Member Content
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
                    Indemnification
                  </span>
                </li>
                <li>
                  <span onClick={this.goToSection.bind(null, 'section-25')} className={classes.mainWord}>
                    Liability of Swimply
                  </span>
                </li>
                <li>
                  <span onClick={this.goToSection.bind(null, 'section-26')} className={classes.mainWord}>
                    Disclaimer and acknowledgements
                  </span>
                </li>
                <li>
                  <span onClick={this.goToSection.bind(null, 'section-27')} className={classes.mainWord}>
                    Governing Law and Jurisdiction
                  </span>
                </li>
                <li>
                  <span onClick={this.goToSection.bind(null, 'section-28')} className={classes.mainWord}>
                    Dispute Resolution
                  </span>
                </li>
                <li>
                  <span onClick={this.goToSection.bind(null, 'section-29')} className={classes.mainWord}>
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
                      <span className={classes.mainWord}>“Account”</span>
                      means the account a person registers for to become a Member with Swimply to use the Site,
                      Application or Services.
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
                      means any applications for mobile and other smart devices andapplication program interfaces
                      through which Swimply provides services, if any.
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
                      <span className={classes.mainWord}>“Guest”</span>
                      means a Member who rents or books a Listing via the Platform.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>“Guest Fee”</span>
                      means the fee that Swimply charges a Guest for the use of the Services (excluding Taxes), which is
                      calculated as a percentage of the applicable Pool Fees.
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
                      <span className={classes.mainWord}>“Host Fee”</span>
                      means the fee Swimply charges a Host for use of the Services (excluding Taxes), which is
                      calculated as a percentage of the applicable Pool Fees.
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
                      means all Content that a Member posts, uploads, publishes, submits, transmits, or includes in
                      their Listing, Member Profile or Swimply promotional campaign to be made available through the
                      Platform.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>“Member Profile”</span>
                      means the profile established by the Member on the Site.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>“Member”</span>
                      means a person who holds an Account, and Membership is the state of being a Member.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>“Membership Application”</span>
                      means an application for Membership, which may be made electronically, and includes all of the
                      information provided by the prospective Member in that form or in connection with that
                      application.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>“Occupancy Tax”</span>
                      has the meaning set forth in clause 19.3.
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
                      means the amounts due by Guest in exchange for use of a Pool asdefined by Hosts, exclusive of
                      Service Fees and Taxes.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>“Service Fees”</span>
                      means collectively the Guest Fees and the Host Fees plus any third-party charges associated with
                      collection of payments by Swimply shown on the Platform from time to time.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>“Services”</span>
                      means the services Swimply makes available through the Site and the Application for Hosts to make
                      Listings and for Guests to apply for Booking.
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
                      <span className={classes.mainWord}>“Swimply”, </span>
                      <span className={classes.mainWord}>“We” </span>
                      or
                      <span className={classes.mainWord}> “we” </span>
                      or
                      <span className={classes.mainWord}> “Our” </span>
                      or
                      <span className={classes.mainWord}> “our” </span>
                      means Swimply Australia Pty Ltd and its online Platform that connects, pool owners (“Hosts”), with
                      potential guests (“Guests”), collectively “Parties”.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>“Swimply  Content”</span>
                      means all content that Swimply makes available through the Platform or its related promotional
                      campaigns and official social media channels, including any Content licensed from a third party,
                      but excluding Member Content.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>“Tax Authority”</span>
                      has the meaning set forth in clause 19.3.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>“Tax”</span>
                      or
                      <span className={classes.mainWord}>“Taxes”</span>
                      means any means any tax, duty, levy, charge, impost, fee, deduction, goods and services tax,
                      compulsory loan or withholding (together with any interest, penalty, fine or expense that is
                      imposed on or in respect of any of the foregoing) which is assessed, levied, imposed or collected
                      by any government agency.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>“Terms”</span>
                      means these Terms of Service.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>“Total Fees”</span>
                      means collectively the Pool Fees plus Service Fees and Taxes.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>“You”, “you”, “Your” </span>
                      or
                      <span className={classes.mainWord}> “your” </span>
                      means you as a Member, unless otherwise specified. The Terms may apply to you as a Guest, as a
                      Host, or as a Guest and Host concurrently.
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
                      <span className={classes.mainWord}> Swimply is an introductory service only. </span>
                      These Terms, and in particular clause 26, contain provisions which include important disclaimers
                      and limitations on our liability in connection with the use of Pools.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>Parties: </span>
                      This agreement
                      <span className={classes.mainWord}> (“Agreement”) </span>
                      is between Swimply and You.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>Acceptance: </span>
                      In order to use the Service you must agree to the terms and conditions set out in these Terms.
                      Upon your electronic acceptance of these Terms via the Platform, you will be legally bound by the
                      Terms.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>Feedback: </span>
                      If you have any questions or feedback on the Service, please contact us at info@swimply.com.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>Purpose of Headings: </span>
                      Headings in these Terms are solely for reference objectives and do not limit the scope or extent
                      of such section. Except as otherwise stated in these Terms, if any clause of these Terms are found
                      to be invalid, void, or for any reason unenforceable, such clause shall be struck out and shall
                      not affect the validity and enforceability of the remaining provisions.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>Your Legal Rights: </span>
                      Please read these Terms carefully as they contain important information regarding your legal
                      rights, remedies, and obligations. By agreeing to these Terms, you hereby acknowledge that you
                      have read and understand that you are bound to a legal agreement between you and Swimply pursuant
                      to these Terms. If you accept or agree to these Terms on behalf of a company or other legal
                      entity, you represent and warrant that you have the authority to bind said company or other legal
                      entity to these Terms and, in such event, “You” and “Your” will refer and apply to that company or
                      other legal entity. If you do not agree to these Terms, you may not access or use Swimply’s
                      Services. If as a mere visitor of the Platform, you do not agree with any clauses in these Terms
                      or the Swimply Privacy Policy, you may not visit the Platform.
                    </p>
                  </li>
                </ol>
              </li>
              <li id='section-3'>
                <Typography variant='h2'>3. Application of Terms</Typography>
                <p>
                  These Terms govern your access or use of the Platform, including but not limited to payment
                  procedures, Collective Content, and the Ambassador Program.
                </p>
                <ol className={classes.innerNumerationList}>
                  <li>
                    <p>
                      <span className={classes.mainWord}>Member agreements: </span>
                      These Terms contain non-exhaustive provisions which inform the terms and conditions of the
                      agreement that applies between Hosts and Guests in relation to a Booking and the use of a Pool.
                      The Platform allows Hosts to create Listings for Pools, and Guests may learn about and book Pools
                      directly with Hosts. Swimply is not a party to any agreements entered into between Members (except
                      in its limited agency capacities as set out in these Terms), and disclaims all liability and
                      responsibility arising from or related to any agreements between Members. Swimply has no control
                      over the conduct of Hosts, Guests and other users of the Platform or Services or any Pools, and
                      disclaims all liability in this regard to the maximum extent permitted by law. Except in relation
                      to powers expressly set out in these Terms, Swimply does not adjudicate on or mediate any dispute
                      between Members.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>Modifications: </span>
                      Swimply reserves the right, in its sole discretion, to modify or replace the Terms at any time by
                      giving you reasonable prior notice. If Swimply modifies these Terms, it will post the modification
                      on the Platform and/or provide you notice of the modification by email. The date the Terms were
                      “Last Updated” will be shown on the Site. If you disagree with such updated Terms, you may close
                      your Account. If you do not close your Account, your continued access or use of the Platform will
                      constitute acceptance of the modified Terms.
                    </p>
                  </li>
                  <li>
                    <p>
                      Without limiting the above, Swimply may for the benefit of Members and Swimply, in its sole
                      discretion, make changes to any of Terms that inform the terms and conditions of the agreement
                      between Hosts and Guests. The Members agree for the benefit of the Members and Swimply that the
                      modified Terms form part of the agreement between them. Any changes to the Terms will not affect
                      outstanding Bookings unless the changes are required by law.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>No Waiver: </span>
                      Except as otherwise set out in these Terms, any partial exercise, failure to exercise, or delay in
                      exercising, a right or remedy provided under these Terms or by law does not operate as a waiver or
                      prevent or restrict any further or other exercise of that or any other right or remedy in
                      accordance with these Terms.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>Hosts Duties: </span>
                      Hosts are responsible for identifying, understanding, and complying with all laws, rules, and
                      regulations that apply to their Listings. In particular, Hosts are encouraged to undertake
                      inquiries and obtain legal advice as to the legality of the use of their Pool by Guests through
                      Bookings on the Platform. Hosts are solely responsible for identifying and complying with all laws
                      and regulations applying to the use of their properties and Pools for the purposes of a Listing
                      and use by a Guest through a Booking, including obtaining any planning approvals, permits,
                      authorisations, registrations, licences and certificates. A failure to comply with such laws and a
                      failure to obtain any required approvals, permits, authorisations, registrations, licences and
                      certificates could result in the Host being liable to pay a fine or be subject to other criminal
                      or civil enforcement. Local laws and enforcement vary from State to State and council to council.
                      Swimply takes no position on such legal requirements, and has no liability insofar as a Pool or
                      the use of a Pool by a Guest through a Booking fails to comply with any legal or regulatory
                      requirements. Hosts acknowledge that Swimply may be required to provide information to government
                      or regulatory bodies, investigations, administrative proceedings and litigation.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>Member Minimum Age: </span>
                      Members must be at least 18 years old to register for an Account, post a Listing, or use the
                      Platform. By accessing the Platform, you represent that you are at least 18 years old. Please
                      report immediately if you are aware of Members under 18, any such Member will be removed
                      immediately. Swimply cannot take accountability for the Member’s misuse of Swimply. To book a
                      listing that would include a minor who is under 18, you represent that you have the authority to
                      do so.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>Alcohol: </span>
                      Hosts must take adequate measures to confirm the identification and age of those wishing to drink
                      during the event taking place in the Pool. It may be illegal in different States and Territories
                      in Australia to supply or serve alcohol to or purchase alcoholic beverages for a minor. The
                      parties agree for the benefit of the Members that no individual under the age of 18 may consume
                      alcohol at a Booking.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>Sharing Personal Information for Reports: </span>
                      You as a Member agree and authorise Swimply to facilitate the use of your personal information for
                      the purpose of obtaining third-party reports, as permitted by law. To the extent permitted by
                      applicable laws, Swimply may use your personal information to obtain reports from public records
                      of criminal convictions or sex offenders or any other information that can potentially harm anyone
                      associated with Swimply Bookings. Swimply may, directly or indirectly through third parties, make
                      inquiries to verify your identity to prevent fraud.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>Entire Agreement: </span>
                      These Terms, written documents or materials referred to in these Terms (such as relevant terms on
                      the Platform) and Swimply’s Privacy Policy constitute the written agreement between you and
                      Swimply. These Terms shall govern in the event of conflict between these Terms and documents or
                      materials referenced herein.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>Assignment: </span>
                      You acknowledge and agree that We may transfer our rights or obligations or sub-contract our
                      obligations under these Terms to another legal entity provided that this will not adversely affect
                      the standard of service you receive under these Terms. As set out under these Terms, You may
                      terminate your agreement with us at any time.
                    </p>
                  </li>
                </ol>
              </li>
              <li id='section-4'>
                <Typography variant='h2'>4. Account Registration</Typography>
                <ol className={classes.innerNumerationList}>
                  <li>
                    <p>
                      <span className={classes.mainWord}>Registration: </span>
                      In order to access certain features of the Platform and to book a Pool or create a Listing, you
                      must register for an Account and become a Member. You may register directly via the Platform, or
                      in any other manner described by Swimply now or in the future.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>Information Required: </span>
                      In Your Membership Application You will be required to submit personal information such as full
                      name, date of birth, address, post code and other information to create an Account with Swimply
                      for the purpose of verification and safety of the Platform.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>Ability to reject: </span>
                      We mayaccept or reject any Membership Application in Our absolute discretion.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>One account: </span>
                      You may not create or use more than one Account at a time.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>Accurate information: </span>
                      You warrant that the information you provide to Us in Your Membership Application, or at any time
                      while You are a Member, is true, accurate, current, and complete at all times.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>Suspension or termination of Account: </span>
                      Swimply reserves the right to suspend or terminate your Account and your access to the Platform if
                      you create more than one Account, or if any information provided proves to be incorrect or
                      misleading in any way (including by omission or being out of date), or otherwise in breach of
                      these Terms.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>Information must be correct: </span>
                      You must indemnify Us for any claim or loss that We suffer as a result of any information that You
                      provide to Us in relation to this Agreement, Your Membership Application, Membership or Your use
                      of the Service being incorrect or misleading in any way (including by omission or being out of
                      date), whether intentionally or otherwise.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>Application of this clause: </span>
                      This clause 4 applies from the time you submit a Membership Application to Us. The rest of this
                      Agreement applies when We give You notice that We accept Your Membership Application.
                    </p>
                  </li>
                </ol>
              </li>
              <li id='section-5'>
                <Typography variant='h2'>5. Member Profiles: use of Our Website</Typography>
                <ol className={classes.innerNumerationList}>
                  <li>
                    <p>
                      <span className={classes.mainWord}>Member  Profile: </span>
                      We will create a Member Profile for Youusing the information that You provide to Us in Your
                      Membership Application or by any other method. This Member Profile will be accessible to You via
                      the Member-only section of Our Site.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>Up to date Profile: </span>
                      You are responsible for updating and maintaining the currency of Your own Member Content on Our
                      Website. You must ensure that any information posted in Your Member Content is correct and
                      complete and not misleading.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>No Liability: </span>
                      We will not under any circumstances be liable for any loss or damage resulting from or arising in
                      connection with any errors, inaccuracies or misrepresentations in Your Member Content or any other
                      Member’s Content.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>Protect Login Information: </span>
                      We will issue You with a Member ID for accessing the Member-only areas of Our Site.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>Pool registration: </span>
                      We may in our absolute discretion take steps to verify (or engage service providers to verify), at
                      the time that a Member is accepted for Membership, that any Pool that the Member makes available
                      for sharing is appropriately registered, if registration is legally required, or any other matter
                      that we may elect to verify. However We do not guarantee that we will take any verification steps,
                      nor do We guarantee the completeness or correctness of any verification materials that we obtain
                      or any other information that Members provide to Us at the time of submitting Application or
                      afterwards. We will not under any circumstances be liable for any loss or damage resulting from or
                      arising in connection with any verification steps or failure to take verification steps, or any
                      errors, inaccuracies or misrepresentations in Your Member Profile or any other Member’s Member
                      Profile.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>Pool inspection: </span>
                      We may in our absolute discretion inspect (or engage service providers to inspect) Pools for,
                      amongst other things, assessing compliance with applicable law. However We do not guarantee that
                      we will inspect any Pool, nor do We guarantee the completeness or correctness of any inspection or
                      inspection report. We will not under any circumstances be liable for any loss or damage resulting
                      from or arising in connection with any inspection or failure to inspect a Pool.
                    </p>
                  </li>
                </ol>
              </li>
              <li id='section-6'>
                <Typography variant='h2'>6. Protect Login Information</Typography>
                <ol className={classes.innerNumerationList}>
                  <li>
                    <p>
                      You are responsible for safeguarding your password, user ID or any other form of verification
                      (“Login Information”). You agree that you will not disclose your Login Information to any third
                      party and will take reasonable steps to ensure its security. Unless expressly authorised, you are
                      not permitted to share your Account. If you fail to adequately safeguard your Login Information or
                      gave someone else your Login Information, You agree that you will take sole responsibility for any
                      activities or actions taken under your Account, whether you authorised such activities or actions
                      and whether or not such activities are fraudulent or you wanted them performed or not. You will
                      immediately notify Swimply of any unauthorised use of your Account. Should you share such
                      information with third-parties you are responsible for all consequences and Swimply reserves the
                      right to take any action to remedy the effects.
                    </p>
                  </li>
                </ol>
              </li>
              <li id='section-7'>
                <Typography variant='h2'>7. Proprietary Data, Communication and Reviews</Typography>
                <ol className={classes.innerNumerationList}>
                  <li>
                    <p>
                      <span className={classes.mainWord}>Swimply Communication with  Members: </span>
                      Swimply will not communicate with you via any method unless you consent to such form of
                      communication. Any Feedback you submit to us will be considered non-confidential and
                      non-proprietary to you.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>Communication  between  Members: </span>
                      Any communication between Members using the Platform must not include email addresses or phone
                      numbers. Please be aware that any communications may be monitored by our employees and agents and
                      we may delete or redact information from these communications if we consider they are
                      inappropriate or in violation of the law or these Terms. Members are responsible for ensuring that
                      any communications do not infringe applicable law or the Terms.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>Swimply Use of Member Content: </span>
                      By submitting any form of Content to us, you grant us a non-exclusive, worldwide, royalty-free,
                      irrevocable, sub-licensable, perpetual licence to use and publish those ideas and materials for
                      any purpose, without compensation to you.Swimply, in its sole discretion, may utilise any Member
                      Content posted for any purpose. By posting any Member Content, you grant Swimply a worldwide,
                      irrevocable, perpetual (or for the term of the protection), non-exclusive, transferable,
                      royalty-free licence, with the right to sublicence, to use, view, copy, adapt, translate, modify,
                      distribute, licence, sell, transfer, publicly display, perform, transmit, stream, broadcast,
                      access, view, and otherwise exploit such Member Content, on or through the Platform. Please do not
                      add the personal information of you or someone else to your Member Content. Swimply may review any
                      Member Content and delete it when it is no longer accurate or up-to-date or if we consider that it
                      is inappropriate or in violation of the law or these Terms. Swimply may suspend or prevent the use
                      any involved Account.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>You Represent You Own Data You Post:  </span>
                      You represent and warrant that: (i) you either are the sole and exclusive owner of all Member
                      Content that you make available through the Platform or through Swimply promotional campaigns or
                      you have all rights, licenses, consents and releases that are necessary to grant to Swimply the
                      rights in such Member Content, as
                      contemplated under these Terms; and (ii) neither the Member Content nor your posting, uploading,
                      publication, submission or transmission of the Member Content or Swimply’s use of the Member
                      Content (or any portion thereof) on, through or by means of the Platform or Swimply’s promotional
                      campaigns will infringe, misappropriate or violate a third party’s patent, copyright, trademark,
                      trade secret, moral rights or other proprietary or intellectual property rights, or rights of
                      publicity or privacy, or result in the violation of any applicable law or regulation.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>Licence to App: </span>
                      In the event an Application becomes available, Swimply grants you a limited non-exclusive,
                      non-transferable licence to download and install the Application to your devices for personal use.
                      If you access or download the Application from the Apple App Store, you agree to Apple’s Licensed
                      Application End User Licence Agreement. Please review said Agreement carefully.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>Google Maps: </span>
                      Some parts of the Site may use Google Maps, your use of such services are subject to the Google
                      Maps terms.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>Reviews: </span>
                      For the benefit of Swimply and the Members, Guests may post their reviews of Pools and Hosts on
                      the Site and Hosts may post reviews of Guests on the Site. Swimply disclaims any liability for the
                      contents of any review, however we may remove any review that we consider to be inappropriate or
                      in violation of the law or these Terms. The Members agree to allow Swimply to make such reviews
                      available to other Members.
                    </p>
                  </li>
                </ol>
              </li>
              <li id='section-8'>
                <Typography variant='h2'>8. Third-Party Sites</Typography>
                <ol className={classes.innerNumerationList}>
                  <li>
                    <p>
                      The Platform may contain links to third-party websites or resources. You acknowledge and agree
                      that
                      Swimply is not responsible or liable for: (i) the availability or accuracy of such websites or
                      resources; or (ii) the content, products, or services on or available from such websites or
                      resources. Links to such websites or resources do not imply any endorsement by Swimply of such
                      websites or resources or the content, products, or services available from such websites or
                      resources. You acknowledge sole responsibility for and assume all risk arising from your use of
                      any such websites or resources or the Content, products or services on or available from such
                      websites or resources.
                    </p>
                  </li>
                </ol>
              </li>
              <li id='section-9'>
                <Typography variant='h2'>9. Pool Listings</Typography>
                <ol className={classes.innerNumerationList}>
                  <li>
                    <p>
                      <span className={classes.mainWord}>Guest and Host Responsibility: </span>
                      Hosts, not Swimply, are solely responsible for honouring any confirmed Bookings and making
                      available any Pools reserved through the Platform. The lease or rental of Pools is provided by
                      Hosts to Guests under a separate contract. If you, as a Guest, choose to enter a transaction with
                      a Host for a Booking, you agree and understand that you will be required to enter an agreement
                      with the Host and accept any terms, conditions, rules and restrictions imposed by the Host as may
                      be informed by these Terms. Members acknowledge and agree that Members, and not Swimply, will be
                      responsible for performing any such agreements.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>Listing Requirements: </span>
                      As a Host, you may create Listings for the subject Pool in accordance with these Terms. For the
                      benefit of the Members and Swimply, nothing in the Booking or in the Listing may be in
                      contravention of anything in these Terms. Listings must include a valid physical address to be
                      featured on the Site. Listings will be made publicly available via the Platform. It is your duty
                      to disclose all deficiencies relating to your Pool. You must not create a Listing for any Pool
                      situated on a property that you do not own. That is, you must not create a Listing for a Pool if
                      you lease, rent or otherwise have possession but not ownership of the property on which it is
                      situated.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>Swimply Imposed Requirements: </span>
                      Swimply reserves the right for the benefit of the Members and Swimply to set any requirements with
                      regard to Listings including, but not limited to, minimum or maximum durations, minimum times
                      between Listings, minimum and maximum number of Guest invitees and minimum pricing. Any such
                      requirements from time to time will be set out with reasonable prior notice on the Platform and
                      those that are in effect at the time of the Booking will apply to that Booking.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>You are Responsible for Listings: </span>
                      You acknowledge and agree that you alone are responsible for any and all Listings and Member
                      Content you post. Accordingly, you represent and warrant that any Listing or Member Content you
                      post, including but not limited to photographs, will be an accurate description of the Pool.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>No breach of third party agreements: </span>
                      For the benefit of the Members, You represent and warrant that any Listing you post and the
                      Booking of, or a Guest’s stay at, a Pool in a Listing you post:
                    </p>
                    <ol type='a'>
                      <li>
                        <p>
                          Will not breach any agreements you have entered into with any third parties, such as a body
                          corporate, owners corporation, community association, a precinct association or a
                          neighbourhood association, or such other like body corporate or association, or other third
                          party agreements; and
                        </p>
                      </li>
                      <li>
                        <p>
                          Will (i) be in compliance with all applicable laws (such as planning and zoning laws and
                          public
                          health requirements), tax requirements, intellectual property laws, and rules and regulations
                          that may apply to any Pool included in a Listing you post (including having all required
                          planning approvals, permits, authorisations, registrations, licenses and certificates), and
                          (ii) not conflict with the rights of third parties. </p>
                      </li>
                    </ol>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>Listing Price: </span>
                      Hosts shall set the Pool Fee for the Listing, and elect in his or her sole discretion whether to
                      include:
                    </p>
                    <ol type='a'>
                      <li>
                        <p>
                          a pool cleaning fee;
                        </p>
                      </li>
                      <li>
                        <p>
                          an extra charge per Guest invitee per hour;
                        </p>
                      </li>
                      <li>
                        <p>
                          Taxes the Hosts determines that he or she has to collect pursuant to law; or
                        </p>
                      </li>
                      <li>
                        <p>
                          any other fee permitted to be charged by Hosts and published to Guests on the Platform at the
                          time
                          of applying for a Booking.
                        </p>
                      </li>
                    </ol>
                    <p>
                      All payments will be charged and made in Australian dollars.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>Guest Booking Request: </span>
                      Other Members will be able to apply for a Booking via the Platform based upon the information
                      provided in Your Listing, Your requirements, and Guests’ search parameters and preferences. For
                      the benefit of the Members and Swimply You understand and agree that once you approve a Guest’s
                      application for a Booking, you may not request the Guest to pay a higher price than in the Booking
                      request. Such activity may result in Swimply taking account action against Hosts, including
                      closing a Host’s Account.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>Responsibility for other Guests or Co-Owners: </span>
                      You as a Guest or Host are responsible for any modifications to a Booking that you direct Swimply
                      customer service to make, and you agree to pay any Pool Fees, Guest Fees, Host Fees, Services
                      Fees, and/or Taxes associated with such Booking modifications.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>Listing Rankings by Swimply: </span>
                      The placement and/or ranking of Listings in search results maydepend on a variety of factors,
                      including, but not limited to, Party preferences, ratings and/or ease of Booking.
                    </p>
                  </li>
                </ol>
              </li>
              <li id='section-10'>
                <Typography variant='h2'>10. Insurance</Typography>
                <ol className={classes.innerNumerationList}>
                  <li>
                    <p>
                      <span className={classes.mainWord}>Hosts should Obtain Insurance:</span>
                      Swimply recommends that Hosts obtain appropriate insurance for their Pools. Please review any
                      insurance policy that you may have for your Pool carefully, and in particular, ensure that you are
                      familiar with and understand any exclusions to, and any deductibles that may apply for, such
                      insurance policy, including, but not limited to, whether your insurance policy will cover the
                      actions or inactions of or relating to Guests (and the individuals the Guest invites to the Pool,
                      if applicable) while at your Pool.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>Swimply is not an Insurer:</span>
                      As a Member, you understand and agree that Swimply does not act as an insurer or provide any form
                      of insurance. For the benefit of Members and Swimply, it is the responsibility of the Guest to ask
                      the Hosts about insurance.
                    </p>
                  </li>
                </ol>
              </li>
              <li id='section-11'>
                <Typography variant='h2'>11. Booking and Financial Terms</Typography>
                <ol className={classes.innerNumerationList}>
                  <li>
                    <p>
                      <span className={classes.mainWord}>Payment Method:</span>
                      You authorise Swimply and its payment providers to store your Payment Method information and
                      charge your Payment Method as outlined in these Terms. It is the duty of Members to carefully
                      analyse all the practices of their chosen payment provider, Swimply takes no official position in
                      this matter. If your Payment Method’s account information changes (e.g. account number, routing
                      number, expiration date), you consent to Swimply acquiring such information from Swimply’s
                      financial services partner or your bank and solely for the purpose of updating your Payment Method
                      on file in your Swimply Account. Whatever Payment Method you use may be subject to additional
                      terms and conditions imposed by the applicable third-party payment service provider. Please review
                      such terms and conditions before using your Payment Method. </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>Payment Information:</span>
                      In connection with your requested Booking, you will be asked to provide typical billing
                      information such as name, billing address and Payment Method information either to Swimply or a
                      third-party payment processor(s). You agree to pay Swimply (for itself and as limited payment
                      collection agent for Hosts) for any confirmed Bookings made in connection with your Account in
                      accordance with these Payment Terms by a method supported by the Platform (e.g. PayPal, credit or
                      debit card). You hereby authorise the collection of such amounts by charging the Payment Method
                      provided as part of requesting the Booking, either directly by Swimply or indirectly, via a
                      third-party payment processor or by one of the payment methods described on the Platform. You also
                      authorise Swimply to charge any Payment Method on file in your Swimply Account for damage caused
                      at a Pool in accordance with these Terms.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>Swimply Right to Set-off: </span>
                      Swimply reserves the right to set-off or deduct any amounts owed to you by Swimply or Members with
                      any amounts you may owe Swimply. If Swimply is unable to collect any amounts you owe for a
                      confirmed Booking or a Damage Claim (as defined in clause 13.3), Swimply may for its own account
                      or for the benefit of other Members engage in collection efforts to recover such amounts from you.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>Timing of Payment: </span>
                      Swimply will initiate payment of Pool Fees less the Service Fees and Taxes to the Host within
                      seven (7) business days after the date of the Booking, subject to any delays which are not within
                      Swimply’s control. Swimply only guarantees payments to Host for amounts it has received from
                      Guests in accordance with these Terms.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>Swimply Price Discretion: </span>
                      Swimply, in its sole discretion, may increase or discount a Host’s Listing price or a Guest’s
                      Booking cost in any matter it deems appropriate, including but not limited to providing
                      promotional codes to Guests.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>Hosts Process: </span>
                      If you are a Host, and a Booking is requested for your Pool via the Platform, you will be required
                      to either confirm or reject the Booking request. When you confirm a Booking requested by a Guest,
                      Swimply will send you a communication confirming such Booking, depending on the selections you
                      make via the Platform. Upon receipt of the communication, You, as Host and the Guest have entered
                      into a legally binding agreement, subject to any particular rules or restrictions specified in the
                      Listing which includes the applicable cancellation policy.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>Guest Payments: </span>
                      You as a Guest agree and authorise Swimply (for its own account and as limited payment collection
                      agent of Hosts) to charge your Payment Method with the Total Fees for any Booking requested or
                      confirmed in connection with your Account. In order to establish a Booking pending the applicable
                      Host’s confirmation of your requested Booking, you understand and agree that Swimply, on behalf of
                      the Hosts, reserves the right, in its sole discretion, to (i) obtain a pre-authorisation via your
                      Payment Method for the Total Fees and/or (ii) charge your Payment Method a nominal amount, not to
                      exceed one dollar ($1), to verify your Payment Method.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>Guest Payment Schedule: </span>
                      Depending on your chosen Payment Method, Swimply will either collect the Total Fees on its own
                      behalf and on behalf of the Host: (i) at the time of the Booking request or (ii) upon the Host’s
                      confirmation. Generally, Swimply will collect the Total Fees due once Swimply receives
                      confirmation of your Booking from the Host. However, if you pay with a push Payment Method,
                      Swimply will collect Total Fees at the time of your Booking request. If Swimply is unable to
                      collect Total Fees in the ordinary course, it may elect to collect Total Fees at a later time.
                      Once the payment transaction for your requested Booking is successfully completed you will receive
                      a confirmation email summarising your confirmed Booking and payment (if any).
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>Payment agent: </span>
                      As a Guest Your obligation to pay Pool Fees to the Host is discharged when you pay the required
                      Total Fees to Swimply, who will act as limited payment agent on behalf of the Host in respect of
                      Pool Fees, and once paid to Swimply the Host will only have recourse against Swimply for payment
                      of any outstanding Pool Fees due to the Host in relation to the Booking.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>Indemnity for costs: </span>
                      If You as a Guest are in default of any obligation to pay money to Us or to a Host under this
                      Agreement, You must indemnify Us for any costs that We reasonably incur on our behalf or on behalf
                      of the Host in taking action against You to recover that amount.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>Disputes: </span>
                      If You wish to query or dispute the amounts shown on an Invoice, You may do so in accordance with
                      the Dispute Resolution procedure set out in these Terms.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>Card ownership: </span>
                      Where a card registered under the Payment Method (Card) is in Your name, You warrant that the Card
                      is Yours and You (whether alone or with another person or other people) are responsible for all
                      amounts charged or debited to that Card. Where the Card is not in Your name, You warrant that You
                      are authorised to permit and authorise Us to charge the Card in accordance with this Agreement.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>Promotional  Codes: </span>
                      We may, in our sole discretion, create promotional codes
                      <span className={classes.mainWord}> (“Promo Codes”) </span>
                      which may be redeemed by you through the Platform.
                      The following are the terms and conditions that commonly apply to
                      promotions on Swimply.com, including promotions where you must redeem a promotional code as part
                      of the offer and subject to any additional terms which we establish on a per Promo Code business
                      <span className={classes.mainWord}> (“Promo Terms”): </span>
                    </p>
                    <ul>
                      <li>
                        <p>
                          this a limited time offer;
                        </p>
                      </li>
                      <li>
                        <p>
                          it may only be used pursuant to the Promo Terms;
                        </p>
                      </li>
                      <li>
                        <p>
                          Swimply reserves the right to modify or cancel the offer at any time. If you received the
                          promotional code (directly or indirectly) from a third party, that third party also reserves
                          the right to modify or cancel the offer at any time;
                        </p>
                      </li>
                      <li>
                        <p>
                          offer is limited to one per customer and account and may be used by you only;
                        </p>
                      </li>
                      <li>
                        <p>
                          offer may not be combined with other offers;
                        </p>
                      </li>
                      <li>
                        <p>
                          offer is non-transferrable, are not valid for cash and may not be resold;
                        </p>
                      </li>
                      <li>
                        <p>
                          if the booking is refunded, your refund will equal the amount you paid for the product or
                          content, subject to applicable refund policies;
                        </p>
                      </li>
                      <li>
                        <p>
                          offer discount will be allocated proportionally among all promotional items in your order;
                        </p>
                      </li>
                      <li>
                        <p>
                          may expire prior to redemption; and
                        </p>
                      </li>
                      <li>
                        <p>
                          if you violate any of the offer terms, the offer will be invalid.
                        </p>
                      </li>
                    </ul>
                  </li>
                </ol>
              </li>
              <li id='section-12'>
                <Typography variant='h2'>12. Service Fees</Typography>
                <ol className={classes.innerNumerationList}>
                  <li>
                    <p>
                      <span className={classes.mainWord}>Host Fees and Guest Fees: </span>
                      Swimply will charge Host Fees (plus Taxes) to Hosts and GuestFees (plus Taxes) to Guests for their
                      use of the Services. Swimply will collect Total Fees from a Guest. Swimply deducts the Guest Fee
                      (plus Taxes) and Host Fee (plus Taxes) payable to Swimply from the Total Fees before remitting the
                      Pool Fee to the Host. Balances will be remitted by Swimply to the Host via the Payout Method
                      selected by the Host via the Platform.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>Disclosure of Service Fees: </span>
                      Hosts and Guests can see the Services Fees (plus Taxes) before they submit a Listing or a Booking
                      request. </p>
                  </li>
                </ol>
              </li>
              <li id='section-13'>
                <Typography variant='h2'>13. Damages</Typography>
                <ol className={classes.innerNumerationList}>
                  <li>
                    <p>
                      <span className={classes.mainWord}>Duty for Damages and Lost Objects: </span>
                      For the benefit of the Members,You as a Guest are responsible for leaving the Pool (including any
                      personal or other property located at a Pool) in the condition it was in when you arrived. You are
                      also responsible for all items you bring with you to the Pool and should you leave such items at
                      the Pool, the Host can elect to return them, however, it is not his or her duty to do so.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>Guests Liability: </span>
                      For the benefit of the Members,You acknowledge and agree that, as a Guest, you are responsible for
                      your own acts and omissions and the acts and omissions of any individuals you invite or otherwise
                      provide access to, the Pool. We recommend Guests take photographs of the Pool on arrival and
                      departure from Your Booking. Further, we recommend Hosts take photographs of the Pool before and
                      after each Booking.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>Host Remedies: </span>
                      For the benefit of the Members and Swimply, if a Host claims and provides evidence of damage to
                      its Pool (“Damage Claim”) for a confirmed Booking, the Host may seek payment from the Guest
                      through Swimply. The Host may escalate the Damage Claim to Swimply if the Host and Guest are
                      unable to resolve a Damage Claim. If escalating the Damage Claim to Swimply, the Host must send
                      evidence of the damage to Swimply including but not limited to photographs. If a Host escalates a
                      Damage Claim to Swimply you as a Guest will be notified of the Damage Claim and be given an
                      opportunity to respond. If you as a Guest agree to pay the Host in connection with a Damage Claim,
                      or if Swimply determines, acting reasonably, that you are clearly responsible for damaging a Pool
                      or any personal or other property located at a Pool, Swimply will collect any such costs from you
                      from the Payment Method as collection agent for the Host in accordance with the Payment Terms.
                      Swimply may elect to make a determination in this respect in its absolute discretion. If Guests do
                      not agree to pay the Host in connection with a Damage Claim, or if Swimply fails to make a
                      determination in this respect, the Host is free to pursue their legal rights and remedies against
                      the Guest.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>Reimbursement of excess: </span>
                      If the actual costs of, or associated with, the Damage Claim are less than the amount that You
                      have been charged, or if We recover the costs from any third parties who may have been at fault,
                      then We will reimburse the difference to You within a reasonable time after all costs have been
                      fully quantified and forward to you an invoice for the final amount. Alternatively, if We discover
                      that the actual costs exceed the amount that You have been charged, then we may charge Your
                      Payment Method, either for Our account or for the Host’s account, with the outstanding amount.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>Member Cooperation: </span>
                      Members agree to cooperate with and assist Swimply in good faith and to provide Swimply with such
                      information as well as to take such actions as may be reasonably requested by Swimply, in
                      connection with any Damage Claims or other complaints or claims made by Members relating to Pools
                      or any personal or other property located at a Pool or with respect to any investigation
                      undertaken by Swimply or a representative of Swimply regarding use or abuse of the Platform. You
                      as a Guest, upon Swimply’s reasonable request and to the extent you are reasonably able to do so,
                      agree to participate in mediation or similar resolution process with a Host, at no cost to you,
                      which process will be conducted by Swimply or a third party selected by Swimply, with respect to
                      losses for which the Host is requesting payment from Swimply under these terms.
                    </p>
                  </li>
                </ol>
              </li>
              <li id='section-14'>
                <Typography variant='h2'>14. Overstaying or Usage without Consent</Typography>
                <ol className={classes.innerNumerationList}>
                  <li>
                    <p>
                      <span className={classes.mainWord}>Pool Availability: </span>
                      For the benefit of the Members and Swimply, You as a Host agree to make the Pool available for the
                      duration agreed upon either (i) at the time of Booking, or (ii) such other time as mutually agreed
                      upon by you and the Guest (“Allowed Duration”). If you fail to do so, you shall be treated as
                      having cancelled the Booking under clause 15.1 for every half hour increment for which the Pool is
                      unavailable for the duration of the Booking. Swimply reserves the right to take other reasonable
                      action in response to address these kinds of actions on its Platform.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>Overstaying as a Guest: </span>
                      For the benefit of the Members and Swimply, You as a Guest agree that your confirmed Booking
                      grants you a limited licence to enter and use the Pool for the Allowed Duration. If you exceed the
                      Allowed Duration, you agree that the Host or Swimply (as limited payment collection agent for the
                      Host) may charge you a rate of 200% of the Pool Fees per half hour originally paid by you for
                      every half hour increment exceeding the Allowed Duration. This amount includes compensation to the
                      Host for inconvenience. Swimply is authorised to collect fees pursuant to this section from the
                      Guest’s Payment Methods.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>Unauthorised Access of Pool: </span>
                      For the benefit of the Members and Swimply, You as a Guest agree that you are responsible for any
                      individuals whom you invite to, or otherwise provide access to, the Pool, and as such for the
                      benefit of the Members, if you invite or provide access to more persons than agreed upon between
                      you and the Host or otherwise permitted by the Host, the Host or Swimply (as limited payment agent
                      for the Host) may charge you a $50 fee per person per hour in excess of the agreed upon number of
                      persons as set out in the agreement between You and the Host. You authorise that Swimply may as
                      limited payment collection agent deduct this amount from Your Payment Method on behalf of the
                      Host.
                    </p>
                  </li>
                </ol>
              </li>
              <li id='section-15'>
                <Typography variant='h2'>15. Cancellations and Refunds </Typography>
                <ol className={classes.innerNumerationList}>
                  <li>
                    <p>
                      <span className={classes.mainWord}>Host Cancellations: </span>
                      If as a Host you cancel a confirmed Booking made via the Platform, except due to rain (which is
                      covered in clause 15.5), Swimply will for the benefit of the Members refund the Total Fees for
                      such Booking to the applicable Guest. You will owe Swimply the Pool Fee and the Host Fee for the
                      Booking. Other consequences may apply to you or your Listing,
                      including (i) publishing an automated review on your Listing indicating that a Booking was
                      cancelled; or (ii) keeping the calendar for your Listing unavailable or blocked for the dates of
                      the cancelled Booking, or (iii) for more than one cancellation in any three month period without
                      good reason, increasing the Hosts Fee payable to Swimply for future Listings.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>Guest Cancellations: </span>
                      If as a Guest you wish to cancel a confirmed Booking made via the Platform, you may do so on the
                      Platform in accordance with the cancellation terms agreed with the Host. You will owe Swimply the
                      Guest Fee for a cancelled Booking.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>Cancellations by Swimply: </span>
                      In certain circumstances, Swimply may decide, in its sole discretion, that it is necessary or
                      desirable in the interests of Swimply and the Members to cancel a confirmed Booking made via the
                      Platform. This may be for reasons set forth on the Platform, due to the suspension or termination
                      of a Member’s Account or where it considers it is necessary to protect it, the Members or any
                      third parties from the risk of harm while taking the legitimate interests or those of the Members
                      or any third party into account. If Swimply cancels a Booking through no action or fault of a
                      Guest, Swimply will refund the Total Fees for such Booking to the Guest, and the Host agrees that
                      neither the Guest nor Swimply will have any liability to the Host for the Pool Fee. Except if a
                      Booking is cancelled by Swimply through no action or fault of a Member, or Swimply otherwise
                      determines, in its sole discretion, to forgo a Service Fee owing by a Member, Members will owe
                      Swimply Service Fees for a Booking that is cancelled by Swimply.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>Cancellation through Platform: </span>
                      You must submit all cancellations through the Swimply Platform. Your cancellation of a Booking is
                      not effective unless and until you have requested the cancellation through your Account.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>Other Cancellations: </span>
                      In the event of rain, Swimply will assist the Guest to request that the Host accommodate the
                      Booking at a different date. If the Host fails to confirm a new Booking date within one week from
                      the initial Booking date, the Host may cancel the Booking. If the Host cancels the Booking due to
                      rain, the Pool Fee will be remitted to the Host and the Service Fees for the Booking will be
                      retained by Swimply.
                    </p>
                    <p className={classes.mainWord}>
                      Swimply reserves the right, at any time and without prior notice, to remove or disable access to
                      any Listing for any reason, including Listings that Swimply, acting reasonably, considers to be
                      objectionable for any reason, in breach of these terms or Swimply’s then-current policies, or
                      otherwise harmful to the Site, Application or Services.
                    </p>
                  </li>
                </ol>
              </li>
              <li id='section-16'>
                <Typography variant='h2'>16. User Conduct</Typography>
                <ol className={classes.innerNumerationList}>
                  <li>
                    <p>
                      You understand and agree that you are solely responsible for compliance with any and all laws,
                      rules, regulations, and Tax obligations that may apply to your use of the Platform and Collective
                      Content, and you agree that you may not and will not:
                    </p>
                    <ol type='a'>
                      <li>
                        <p>
                          <span className={classes.mainWord}>Breach the Law: </span>
                          breach any local, state, national, or other laws or regulations, or any order of a court,
                          including, without limitation, planning laws and restrictions and Tax regulations;
                        </p>
                      </li>
                      <li>
                        <p>
                          <span className={classes.mainWord}>Observance of Terms and Policies: </span>
                          Member agrees not to breach these Terms or Swimply’s then-current Policies and Community
                          Guidelines or Standards, if any exist.
                        </p>
                      </li>
                    </ol>
                  </li>
                  <li>
                    <p className={classes.mainWord}>No discrimination: </p>
                    <ol type='a'>
                      <li>
                        <p>
                          Swimply will not tolerate any discriminatory actions taken by Guests and Hosts.. We
                          explicitly prohibit offensive behavior (e.g. derogatory comments towards colleagues of a
                          specific gender or ethnicity.)
                        </p>
                      </li>
                      <li>
                        <p>
                          Discrimination is any negative action or attitude directed toward someone because of
                          protected characteristics, like race and gender. Other protected characteristics are:
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
                          </li>
                          <li>
                            <p>
                              different backgrounds
                            </p>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <p>
                          Any discrimination against a Member can result in any consequences
                          up to and including expulsion from
                          the site and potential even civil or criminal penalties.
                          We will not be lenient in cases of assault,
                          sexual harassment or violence, whether physical or psychological.
                        </p>
                      </li>
                    </ol>
                  </li>
                </ol>
              </li>
              <li id='section-17'>
                <Typography variant='h2'>17. Prohibitions</Typography>
                <ol className={classes.innerNumerationList}>
                  <li>
                    <p>
                      A Member must not directly or indirectly:
                    </p>
                    <ol type='a'>
                      <li>
                        <p>
                          <span className={classes.mainWord}>Page Scrape or Cause Site Damage: </span>
                          use manual or automated software, scripts or systematic retrieval, or devices, scripts,
                          robots, backdoors or other means or processes to access, “scrape,” “crawl” or “spider” any web
                          pages or other services contained in the Platform or Collective Content or any other form of
                          gleaning information to create or compile, directly or indirectly, in single or multiple
                          downloads, a collection, compilation, database, directory or the like;
                        </p>
                      </li>
                      <li>
                        <p>
                          <span className={classes.mainWord}>Interfere or damage the Platform: </span>
                          interfere with or damage the Platform, including, without limitation, through the use of
                          viruses, cancel bots, Trojan horses, harmful code, flood pings, denial-of-service attacks,
                          backdoors, packet or IP spoofing, forged routing or electronic mail address information or
                          similar methods or technology;
                        </p>
                      </li>
                      <li>
                        <p>
                          <span className={classes.mainWord}>Tamper with the Platform: </span>
                          access, tamper with, or use non-public areas of the Platform, Swimply’s computer systems, or
                          the technical delivery systems of Swimply’s providers;
                        </p>
                      </li>
                      <li>
                        <p>
                          <span className={classes.mainWord}>Test any Swimply system: </span>
                          attempt to probe, scan, or test the vulnerability of any Swimply system or network or breach
                          any security or authentication measures;
                        </p>
                      </li>
                      <li>
                        <p>
                          <span className={classes.mainWord}>Circumvent technological measures: </span>
                          avoid, bypass, remove, deactivate, impair, descramble, or otherwise circumvent any
                          technological measure implemented by Swimply or any of Swimply’s providers or any other third
                          party (including another user) to protect the Platform or Collective Content or attempt to
                          decipher, decompile, disassemble or reverse engineer any of the software used for the Platform
                          or Collective Content;
                        </p>
                      </li>
                      <li>
                        <p>
                          <span className={classes.mainWord}>Send false information: </span>
                          forge any TCP/IP packet header or any part of the header information in any email or newsgroup
                          posting, or in any way use the Platform or Collective Content to send altered, deceptive or
                          false source-identifying information;
                        </p>
                      </li>
                      <li>
                        <p>
                          <span className={classes.mainWord}>Use for Restricted Commercial Purposes: </span>
                          use the Platform or Collective Content for any commercial or other purposes that are not
                          expressly permitted by these Terms or in a manner that falsely implies Swimply endorsement,
                          partnership or otherwise misleads others as to your affiliation with Swimply;
                        </p>
                      </li>
                      <li>
                        <p>
                          <span className={classes.mainWord}>Use Platform Content: </span>
                          use, display, mirror or frame the Platform or Collective Content, or any individual element
                          within the Platform or Collective Content;
                        </p>
                      </li>
                      <li>
                        <p>
                          <span className={classes.mainWord}>No Use for Competing Business: </span>
                          access the Site for the purpose of a competing platform or business, submit any Listing with
                          false or misleading information (including by omission or that is out of date), including
                          price information, or submit any Listing with a price that you do not intend to honour
                        </p>
                      </li>
                      <li>
                        <p>
                          <span className={classes.mainWord}>Cannot Circumvent Swimply: </span>
                          attempt to bypass Swimply to rent or book any Pool outside the Swimply Platform. Members who
                          are discovered to be breaching this rule will be liable to Swimply for 200% of the Service
                          Fees for such as a booking as if it was made on the Platform, plus fees incurred by Swimply.
                          Additionally, Members cannot use the Platform or Collective Content to find a Host or Guest
                          and then complete a booking of a Pool independently of the Platform, and Members will be
                          liable to Swimply for 200% of the Service Fees for such as a booking as if it was made on the
                          Platform plus fees incurred by Swimply;
                        </p>
                      </li>
                      <li>
                        <p>
                          <span className={classes.mainWord}>Reputational Harm: </span>
                          purport to say or take any actions with regard to Swimply thathas the potential to harm,
                          damage or tarnish its reputation in any way. Please reach out to us as a first point of
                          contact should you have any such concerns;
                        </p>
                      </li>
                      <li>
                        <p>
                          <span className={classes.mainWord}>Content Restrictions: </span>
                          post, upload, publish, submit or transmit any Content that: (i)infringes, misappropriates or
                          breaches a third party’s patent, copyright, trademark, trade secret, moral rights or other
                          intellectual property rights, or rights of publicity or privacy; (ii) breaches, or encourages
                          any conduct that would breach, any applicable law or regulation or would give rise to civil
                          liability; (iii) is fraudulent, false, misleading (directly or by omission or failure to
                          update information) or deceptive; (iv) is defamatory, obscene, pornographic, vulgar or
                          offensive; (v) promotes discrimination, bigotry, racism, hatred, harassment or harm against
                          any individual or group; (vi) is violent or threatening or promotes violence or actions that
                          are threatening to any other person; or (vii) promotes illegal or harmful activities or
                          substances;
                        </p>
                      </li>
                      <li>
                        <p>
                          <span className={classes.mainWord}>No Spam: </span>
                          use the Platform or Collective Content in connection with the distribution of unsolicited
                          commercial email (“spam”) or advertisements unrelated to Listing a Pool;
                        </p>
                      </li>
                      <li>
                        <p>
                          <span className={classes.mainWord}>Inappropriate Interactions with Third-Parties: </span>
                          use the Platform to transmit, distribute, post or submit any information concerning any other
                          person or entity, including without limitation, photographs of others without their
                          permission, personal contact information or credit, debit, calling card or account numbers;
                        </p>
                      </li>
                      <li>
                        <p>
                          <span className={classes.mainWord}>Breach Payment Practices: </span>
                          accept or make a payment for Pool Fees outside Swimply. If you do so, you acknowledge and
                          agree that, you: (i) would be in breach of these Terms, (ii) accept all risks and
                          responsibility for such payment, and (iii) hold Swimply harmless from any liability for such
                          payment;
                        </p>
                      </li>
                      <li>
                        <p>
                          <span className={classes.mainWord}>Harassment: </span>
                          “stalk” or harass any other user of the Platform or Collective Content, or collect or store
                          any personally identifiable information about any other user other than for purposes of
                          transacting as a Swimply Guest or Host or engage in disruptive, circumventive, abusive or
                          harassing behaviour in any area or aspect of Swimply’s Platform;
                        </p>
                      </li>
                      <li>
                        <p>
                          <span className={classes.mainWord}>Offer Another’s or Restricted Property: </span>
                          offer, as a Host, any Pool that you do not yourself have rights to offer (without limiting the
                          foregoing, you will not list Pools as a Host if you are serving in the capacity of an agent
                          for a third party); offer, as a Host, any Pool that may not be Booked pursuant to an agreement
                          with a third party;
                        </p>
                      </li>
                      <li>
                        <p>
                          <span className={classes.mainWord}>Book for Another: </span>
                          request or book a stay at any Pool if you will not actually be staying at the Pool yourself.
                          You agree not to impersonate any person or entity, or falsify or otherwise misrepresent
                          yourself or your affiliation with any person or entity, or advocate, encourage, or assist any
                          third party in doing any of the foregoing. Further, if you bring additional Guests with you it
                          is your duty to ensure they follow the rules;
                        </p>
                      </li>
                      <li>
                        <p>
                          <span className={classes.mainWord}>Direct Contact with Member not for Swimply Finalised Booking: </span>
                          contact another Member for any purpose other than asking a question related to a Booking,
                          Pool, Listing, or the Member’s use of the Platform or recruit or otherwise solicit any Member
                          to join third-party services, applications or websites, without Swimply’s prior written
                          approval;
                        </p>
                      </li>
                      <li>
                        <p>
                          <span className={classes.mainWord}>Falsify Reviews: </span>
                          publish reviews that are not in accordance with your views, orwithhold or tarnish or improve a
                          review for any gain or use relating to extortion.
                        </p>
                      </li>
                      <li>
                        <p>
                          <span className={classes.mainWord}>Breach Intellectual Property Restrictions: </span>
                          dilute, tarnish or otherwise harm the Swimply brand in any way, including through unauthorised
                          use of Collective Content, registering and/or using Swimply or derivative terms in domain
                          names, trade names, trademarks or other source identifiers, or registering and/or using
                          domains names, trade names, trademarks, logos or other source identifiers that closely imitate
                          or are confusingly similar to Swimply domains, trademarks, taglines, promotional campaigns or
                          Collective Content, other proprietary information or infringe the rights of Swimply or the any
                          other person or entity, including without limitation, their intellectual property, privacy,
                          publicity or contractual right, copy, store or otherwise access or use any information
                          contained on the Platform or Collective Content for purposes not expressly permitted by these
                          Terms.
                        </p>
                      </li>
                    </ol>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>Reporting Misconduct: </span>
                      If you feel that any Member is acting or has acted inappropriately, including but not limited to
                      anyone who (i) engages in offensive, violent or sexually inappropriate behaviour, (ii) you suspect
                      of stealing from you, or (iii) engages in any other wrongful or improper conduct, you should
                      immediately report such person to the appropriate authorities and then to Swimply by contacting
                      Swimply with your police station and report number. You acknowledge that your report will not
                      obligate Swimply to take any action beyond that required by law (if any) or cause Swimply to incur
                      any liability to you.
                    </p>
                  </li>
                </ol>
              </li>
              <li id='section-18'>
                <Typography variant='h2'>18. Term, Suspension and Termination</Typography>
                <ol className={classes.innerNumerationList}>
                  <li>
                    <p>
                      <span className={classes.mainWord}>Term: </span>
                      These Terms commence from the date that these Terms are accepted by you and will continue until
                      terminated in accordance with this clause.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>Swimply Action: </span>
                      In addition to its rights as set out elsewhere in these Terms, Swimply may remove or disable
                      access to any or all of your Member Content or deactivate or cancel your Listing(s) or Account in
                      response to a breach of the Terms.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>Termination with notice by Us: </span>
                      We may terminate these Terms and close any Account you have with Us, for any reason by giving you
                      no less than 30 days’ notice in writing.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>Termination without notice: </span>
                      Swimply may terminate these Terms and close any Account you have with Us by notice with immediate
                      effect if:
                    </p>
                    <ol type='a'>
                      <li>
                        <p>
                          you materially breach these Terms or other Policies and Community Guidelines or Standards
                          referenced herein or on the Site;
                        </p>
                      </li>
                      <li>
                        <p>
                          you breach applicable laws, regulations or third party rights;
                        </p>
                      </li>
                      <li>
                        <p>
                          Swimply believes in good faith that a Member, in renting their Pool via the Platform, is in
                          violation of the law; or
                        </p>
                      </li>
                      <li>
                        <p>
                          Swimply believes in good faith that termination is reasonably necessary to protect the safety
                          or property of other Members, Swimply or third parties, for fraud prevention, risk assessment,
                          security or investigation purposes.
                        </p>
                      </li>
                    </ol>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>Consequences of breach: </span>
                      If any of clauses 18.4(a) to 18.4(d) apply or Swimply reasonably believes that they are likely to
                      apply, or if You receive one or more poor ratings from Members (with the definition of “poor” to
                      be at Swimply’s sole and absolute discretion), Swimply may:
                    </p>
                    <ol type='a'>
                      <li>
                        <p>
                          deactivate or delay Listings, reviews, or other Member Content;
                        </p>
                      </li>
                      <li>
                        <p>
                          cancel any pending or confirmed Bookings;
                        </p>
                      </li>
                      <li>
                        <p>
                          limit your use of or access to your Account and the Platform, temporarily or permanently
                          revoke any special status associated with your Account, or temporarily or permanently suspend
                          your Account. Swimply’s right to take action under this clause is in addition to, and does not
                          affect its right to take action under, clause 18.4.
                        </p>
                      </li>
                    </ol>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>Swimply Termination of Host: </span>
                      If Swimply takes any of the measures described in clauses 18.3 to 18.5 relating to a Host, it may:
                    </p>
                    <ol type='a'>
                      <li>
                        <p>
                          communicate to your Guests that a pending or confirmed Booking has been cancelled;
                        </p>
                      </li>
                      <li>
                        <p>
                          refund your Guests in full for any and all confirmed Bookings, irrespective of applicable
                          cancellation policies set out in these Terms and/or any agreement between a Guest and a Host;
                          and
                        </p>
                      </li>
                      <li>
                        <p>
                          suport your Guests, on an exceptional basis, in finding potential alternative Pools.
                        </p>
                      </li>
                    </ol>
                    <p>
                      You will not be entitled to any compensation for confirmed Bookings that were cancelled.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>No Right to Account Restoration: </span>
                      When this Agreement has been terminated, you are not entitled to restore your Swimply Account or
                      any of your Member Content.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>Member Termination: </span>
                      You may terminate your Account by cancelling it on the Site or by sending Swimply an email in
                      which you request that Swimply terminate your Account. If you cancel your Account as a Host, any
                      confirmed Bookings will be automatically cancelled, and your Guests will receive a full refund of
                      the Pool Fee. No refunds of Host Fees will be provided. If you cancel your Swimply Account as a
                      Guest, any confirmed Booking will be automatically cancelled, and you will be issued a refund in
                      accordance with the cancellation policy referenced herein.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span
                        className={classes.mainWord}>Ban on Issue of New Account after Suspension/termination: </span>
                      If your access to or use of the Platform has been limited or your Swimply Account has been
                      suspended or this Agreement has been terminated by Swimply, you may not register a new Swimply
                      Account or attempt to access and use the Platform through other Swimply Accounts.
                    </p>
                  </li>
                </ol>
              </li>
              <li id='section-19'>
                <Typography variant='h2'>19. Taxes</Typography>
                <ol className={classes.innerNumerationList}>
                  <li>
                    <p>
                      <span className={classes.mainWord}>Tax Requirements: </span>
                      Tax regulations may require Swimply to collect appropriate tax data from Hosts, or to withhold
                      taxes from payouts to Hosts, or both. You as a Host are solely responsible for keeping the
                      information in your tax forms current, complete and accurate. If you as a Host fail to provide
                      Swimply with documentation that Swimply determines to be sufficient to alleviate Swimply’s
                      obligation (if any) to withhold taxes from payments to you, Swimply reserves the right in its sole
                      discretion to freeze all payouts to you until resolution, to withhold such amounts as required by
                      law, or to do both.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>Host Responsibility: </span>
                      You as a Host understand and agree that you are solely responsible for determining (i) your
                      applicable Tax reporting requirements, and (ii) the Taxes that should be included and including
                      Taxes to be collected or obligations relating to applicable Taxes in Listings. You are also solely
                      responsible for remitting to the relevant authority any Taxes included or received by you. Swimply
                      cannot and does not offer Tax-related advice to any Members.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>Collection of taxes by Swimply: </span>
                      You understand and acknowledge that appropriate governmental agencies, departments or authorities
                      (the<span className={classes.mainWord}> “Tax Authority”) </span>
                      where your Pool is located may require Taxes to be collected from Guests or
                      Hosts on the amount paid for the right to use and/or occupancy of Pools, and to be remitted to the
                      respective Tax Authority. We reserve the right to collect taxes that would be wanted by any
                      governmental authority. The laws in jurisdictions may vary, but these taxes may be required to be
                      collected and remitted as a percentage of the Pool Fees set by Hosts, a set amount per day, or
                      other variations, and are sometimes called “occupancy taxes,” “hotel taxes,” “lodging taxes,”
                      “transient taxes,” “sales and use taxes,” “value added taxes,” “room taxes” or “tourist taxes”
                      (hereafter,<span className={classes.mainWord}> “Occupancy Taxes”).</span>
                    </p>
                  </li>
                </ol>
              </li>
              <li id='section-20'>
                <Typography variant='h2'>20. Equitable Relief</Typography>
                <p>
                  You acknowledge and agree that in the event of a breach or threatened breach of our intellectual
                  property rights and confidential and proprietary information by you, we will suffer irreparable harm
                  and will therefore be entitled to injunctive relief to enforce this Agreement. We may, without waiving
                  any other remedies under this Agreement, seek from any court having jurisdiction any interim,
                  equitable, provisional, or injunctive relief that is necessary to protect our rights.
                </p>
              </li>
              <li id='section-21'>
                <Typography variant='h2'>21. Member Content</Typography>
                <p>
                  We are not responsible for any Member Content and you use and rely on the Member Content at Your Own
                  risk. We neither warrant the accuracy of the Member Content nor exercise any editorial control over
                  Member Content, nor do we assume any legal obligation for editorial control of Member Content or
                  liability in connection with Member Content, including any responsibility or liability for
                  investigating or verifying the accuracy of any Member Content.
                </p>
              </li>
              <li id='section-22'>
                <Typography variant='h2'>22. Privacy</Typography>
                <p>
                  We will comply with all relevant privacy legislation and our Privacy Policy in relation to Your
                  personal information.
                </p>
                <p>
                  Please review Swimply’s Privacy Policy at www.swimply.com/privacy_policy, which also governs your
                  access and use of this Platform.
                </p>
                <p>
                  The terms of Our Privacy Policy form part of this Agreement. Our Privacy Policy sets out how We
                  collect, use, store and disclose Your personal information.
                </p>
                <p>
                  If We do not collect personal information from You, We will not be able to provide Our Services to You
                  and if any of the personal information You provide is incomplete or inaccurate, the quality of Our
                  services may be compromised.
                </p>
                <p>
                  You consent to Us providing Your personal information to other Members as required by the Booking.
                </p>
                <p>
                  You can tell Us if You do not consent to Our use of such information, or if You do not wish to receive
                  such information, or if you have any questions about Our Privacy Policy, by calling Us on +1
                  212-202-0472 or by sending an email to info@swimply.com.
                </p>
                <p>
                  By entering into this Agreement and by providing us with personal information, You represent to us
                  that You have read, and agree to, the terms of Our Privacy Policy.
                </p>
                <p>
                  By using the Platform and registering for an Account, you agree to said Privacy Policy.
                </p>
              </li>
              <li id='section-23'>
                <Typography variant='h2'>23. Assumption of Risk and Waiver</Typography>
                <p>
                  You as a Guest agree that you are aware of and assume all risks voluntarily for yourself as well as
                  any other Guest or invitees attending your Booking.. To the maximum extent permitted by law, You
                  hereby agree to release, waive, discharge, and covenant not to sue and to hold harmless Swimply or the
                  Hosts for any injuries, death, loss or harm arising from or related to use of the Pool.
                </p>
                <p>
                  You agree that the Pools carry inherent risk, and by using such Pools, you choose to assume those
                  risks voluntarily. For example, the Pools may carry risk of illness, bodily injury, disability, or
                  death, and you freely and wilfully assume those risks by choosing to enter into these Terms and use
                  the Pools. You assume full responsibility for the choices you make before, during and after the use by
                  you and your invitees of a Pool. If you are bringing a minor as an additional Guest, you are solely
                  responsible for the supervision of that minor at all times throughout the duration of your time in the
                  Pool. To the maximum extent permitted by law, you agree to release, waive, discharge, not to take
                  legal action and hold harmless Swimply from all liabilities and claims that arise in any way from any
                  injury, death, loss or harm that occurs to any minor under your supervision during swimming or in any
                  way arising from or related to the use of the Pool.
                </p>
              </li>
              <li id='section-24'>
                <Typography variant='h2'>24. Indemnification</Typography>
                <p>
                  You agree to forever release, defend, discharge, indemnify, and hold Swimply and its affiliates and
                  subsidiaries, and their members, managers, officers, directors, employees and agents, harmless from
                  and against any claims (howsoever arising, under any theory of liability) or investigations and all
                  damages, losses, and expenses, including, without limitation, reasonable legal and accounting fees
                  that we incur in relation to such claims and investigations, arising out of or in any way connected
                  with:
                </p>
                <ol type='a'>
                  <li>
                    <p>
                      your breach of these Terms or Policies;
                    </p>
                  </li>
                  <li>
                    <p>
                      your breach of any laws or third party rights;
                    </p>
                  </li>
                  <li>
                    <p>
                      your Member Content;
                    </p>
                  </li>
                  <li>
                    <p>
                      the use of a Pool by you or your invitees,
                    </p>
                  </li>
                </ol>
                <p>
                  except if and to the extent that Swimply was negligent, or caused or contributed to the loss.
                </p>
              </li>
              <li id='section-25'>
                <Typography variant='h2'>25. Liability of Swimply</Typography>
                <ol className={classes.innerNumerationList}>
                  <li>
                    <p>
                      <span className={classes.mainWord}>Force majeure: </span>
                      You hereby waive any potential liability for delays in payment on account of force majeure.
                      Swimply is not responsible or liable for non-performance caused by telecommunications failures,
                      non-performance of vendors, fires or other acts of nature, strife or acts of political discord, or
                      other events outside its reasonable control (each a “Force Majeure”).
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>No liability for consequential loss: </span>
                      To the maximum extent permitted by law, Swimply will not be liable to Members for any:
                    </p>
                    <ol type='a'>
                      <li>
                        <p>
                          loss to the extent that it is for special, indirect, consequential or economic loss; or
                        </p>
                      </li>
                      <li>
                        <p>
                          any loss of profits, loss of revenue of any nature whatsoever, loss of expected savings, loss
                          of use, loss of chance or business opportunity, business interruption, loss of data or loss or
                          reduction of goodwill, service interruption, computer damage, system failure or damage to
                          reputation, </p>
                      </li>
                    </ol>
                    <p>
                      although this limitation will not apply if and to the extent that we are also liable for that loss
                      caused by our breach of the consumer guarantees under the Australian Consumer Law.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>Limitation of liability: </span>
                      Notwithstanding any other provision these Terms, but subject to your statutory rights, Swimply’s
                      total liability to the customer as a result of or arising out of or in connection with these terms
                      and your use of the Services, will be limited to the amounts paid by Swimply to you in the twelve
                      (12) month period prior to the event giving rise to the liability. This limitation will not apply
                      to our obligations to pay Pool Fees to Hosts or to pay refunds to Members pursuant to these Terms.
                    </p>
                  </li>
                </ol>
              </li>
              <li id='section-26'>
                <Typography variant='h2'>26. Disclaimer and acknowledgements</Typography>
                <ol className={classes.innerNumerationList}>
                  <li>
                    <p>
                      <span className={classes.mainWord}>As is basis: </span>
                      The Service comes with consumer guarantees under the Australian Consumer Law in the Consumer and
                      Competition Act 2010 (Cth) that cannot be excluded by this Agreement. Nothing in this Agreement
                      affects your statutory rights as a consumer. We make no express warranties beyond the consumer
                      guarantees.However, you acknowledge and agree that, where such statutory provisions apply, to the
                      extent Swimply is permitted to do so, our total liability for any loss or damage that you suffer
                      or incur from using the Service is limited to us re-supplying the Service to you or, at our
                      option, refunding to you the amount you have paid for the Services to which your claim relates.
                      The Service is subject to limitations, delays and other problems which are inherent in the use of
                      internet and electronic communications.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>No warranty re Accuracy: </span>
                      To the maximum extent permitted by law the material in the Site could include technical
                      inaccuracies or typographical errors. We accept no responsibility for and make no representations
                      or warranties to you or to any other user as to the reliability, accuracy or completeness of the
                      information provided through the Service. We recommend that you maintain your own records and use
                      your discretion when acting on information received through the Service. Swimply cannot ensure
                      that any files, documents or other data you download from the Site will be free of viruses or
                      contamination or destructive features.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>Swimply is an introductory service only: </span>
                      Swimply is an introductory service only. We provide a platform to connect you with Hosts and/or
                      Guests and facilitate payment for the use of the Pools under these Terms. You acknowledge and
                      agree that:
                    </p>
                    <ol type='a'>
                      <li>
                        <p>
                          we make no representations that your Listings will attract requests for Bookings;
                        </p>
                      </li>
                      <li>
                        <p>
                          we make no representations that your requests for Bookings will be accepted;
                        </p>
                      </li>
                      <li>
                        <p>
                          we are not a party to any arrangements between Host and Guest, and we act in a limited
                          capacity as a booking and payment collection agent as set out in these Terms. Any arrangements
                          made for the use of a Pool is between the Guest and the Host only;
                        </p>
                      </li>
                      <li>
                        <p>
                          we do not control the condition of any Pool, the actions of any Member, or the information
                          provided to us by You or other Members and included in any Member Profiles or otherwise made
                          available to You. You are solely responsible for Your actions and inactions in relation to
                          Your use of the Service and Your interactions with other Members;
                        </p>
                      </li>
                      <li>
                        <p>
                          we take no responsibility as to whether a Pool is registered, if registration is legally
                          required, or whether a Pool or the use of a Pool complies with legal and regulatory
                          requirements. We do not guarantee that we inspect Pools;
                        </p>
                      </li>
                      <li>
                        <p>
                          we do not provide any form of insurance or similar protection for Guest or Hosts, whether in
                          relation to property damage, personal injury or otherwise. It is the Member’s responsibility
                          to enquire about insurance;
                        </p>
                      </li>
                      <li>
                        <p>
                          the use of any Pool by you and your invitees is at Your own risk. We owe You no duty of care,
                          and disclaim all responsibility or liability to You or any third party (howsoever arising,
                          whether under contract, tort (including negligence), statute or otherwise) resulting from the
                          use of a Pool including but not limited to any death, injury, losses, or damages
                          (compensatory, direct, incidental, consequential or otherwise) of any kind arising in
                          connection with or as a result of a Booking or use of a Pool;
                        </p>
                      </li>
                      <li>
                        <p>
                          you release us and agree not to attempt to claim against or impose liability on or seek any
                          legal remedy from Us, with respect to any legal claim or remedy that You seek to make or
                          obtain (including by way of cross-claim, contribution or under proportionate liability
                          legislation) under or arising out of an agreement with a Member, or for your actions or
                          omissions or those of other Members or third parties. If You have a dispute with or claim
                          against one or more Members, You release us (and our officers, directors, agents, and
                          employees) from liability (howsoever arising, whether under contract, tort (including
                          negligence), statute or otherwise) in any way connected with such disputes or claims;
                        </p>
                      </li>
                      <li>
                        <p>
                          we have no obligation to conduct background or registered sex offender searches;
                        </p>
                      </li>
                      <li>
                        <p>
                          Swimply is not responsible for any Member’s conduct on the Platform or otherwise. You agree to
                          take reasonable precautions in all communications and interactions with other Members and
                          users of the Platform and with other persons with whom you communicate or interact as a result
                          of your use of the Platform, including, but not limited to, Guests and Hosts, particularly if
                          you decide to meet offline or in person regardless of whether such meetings are organized by
                          Swimply. Swimply explicitly disclaims all liability for any act or omission of any Member or
                          other third party.
                        </p>
                      </li>
                      <li>
                        <p>
                          to the maximum extent permitted by law, Swimply makes no representations or warranties as to
                          any
                          Pool or Listing. Guests are solely responsible for inquiring or performing any
                          due diligence necessary to evaluate a Pool. Swimply does not endorse any Member, Listing, or
                          Pool.
                        </p>
                      </li>
                    </ol>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>Application of disclaimers: </span>
                      The foregoing disclaimers apply to the maximum extent permitted by law. You may have statutory
                      rights that cannot be excluded by the foregoing disclaimers, including under the Australian
                      Consumer Law. However, the duration of statutorily required warranties, if any, shall be limited
                      in time to the maximum extent permitted by law.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className={classes.mainWord}>No agency: </span>
                      Swimply does not appoint any Member or other user of the Platform as its employee, mandatory,
                      legal agent, or form any kind of legal partnership or joint venture. You are not authorised to
                      make any commitments on behalf of Swimply.
                    </p>
                  </li>
                </ol>
              </li>
              <li id='section-27'>
                <Typography variant='h2'>27. Governing Law and Jurisdiction</Typography>
                <ol className={classes.innerNumerationList}>
                  <li>
                    <p>
                      These Terms are governed by the laws and to be construed in accordance with of New South Wales,
                      Australia. You submit to the non-exclusive jurisdiction of the courts of the State of New South
                      Wales, Australia.
                    </p>
                  </li>
                </ol>
              </li>
              <li id='section-28'>
                <Typography variant='h2'>28. Dispute Resolution</Typography>
                <ol className={classes.innerNumerationList}>
                  <li>
                    <p>
                      If you wish to:
                    </p>
                    <ol type='a'>
                      <li>
                        <p>
                          provide us with any feedback;
                        </p>
                      </li>
                      <li>
                        <p>
                          make a complaint in relation to the Service or make a claim under these Terms; or
                        </p>
                      </li>
                      <li>
                        <p>
                          make a complaint about other Members or users of the Service,
                        </p>
                      </li>
                    </ol>
                    <p>
                      please email us at info@swimply.com.
                    </p>
                  </li>
                  <li>
                    <p>
                      Each party agrees to act reasonably and without delay in seeking to resolve any disputes arising
                      under these Terms.
                    </p>
                  </li>
                </ol>
              </li>
              <li id='section-29'>
                <Typography variant='h2'>29. Contact Information</Typography>
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
