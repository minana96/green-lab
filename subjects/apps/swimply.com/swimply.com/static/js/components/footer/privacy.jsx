import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { withRouter } from "react-router-dom";
import compose from "recompose/compose";
import Footer from "./footer";

const styles = theme => ({
  container: {
    maxWidth: "1170px",
    margin: "0 auto",
    width: "100%",
    padding: "0 15px",
    "@media (max-width:1170px)": {
      maxWidth: "992px"
    },
    "@media (max-width:1000px)": {
      maxWidth: "750px"
    },
    "@media (max-width:767px)": {
      width: "calc(100% - 30px)"
    }
  },
  termsConditions: {
    padding: "60px 0",
    "@media (max-width:767px)": {
      padding: "30px 0"
    },
    "& h2": {
      marginBottom: "20px",
      fontWeight: "600",
      textTransform:"capitalize"
    },
    "& h4": {
      marginTop: "25px",
      fontWeight: "600",
      fontSize: "14px",
      lineHeight:'24px',
    },
    "& p": {
      fontSize: "13px",
      color: theme.palette.common.black,
      marginTop: "7px",
      marginBottom: "20px",
      lineHeight: "23px"
    }
  },
  termsHead: {
    fontWeight: "500",
    marginBottom: "0 !important",
    paddingTop: "10px",
    textDecoration: "underline"
  },
  mailBreak:{
    '@media (max-width:767px)':{
      paddingRight:'65px'
    }
  }

});

class TermsAndConditions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { classes } = this.props;
    let footerMobile = false;
    if(this.props.match.path === '/mobile-privacy') {
      footerMobile = true;
    }
    return (
      <Typography variant="body1" component={"span"}>
        <div className={classes.termsConditions}>
          <div className={classes.container}>
            <Typography variant="h2">privacy policy</Typography>
            <p>Last updated: December 21, 2018</p>
            <p className={classes.mailBreak}>We can be reached via email at info@swimply.com.</p>
            <p>
              Your privacy is important to us. This privacy policy (“Privacy
              Policy”) describes how Pools For You LLC d/b/a Swimply (“Swimply”)
              collects, uses, and discloses information with respect to the
              Site, Application or Services (collectively, the “Platform”). We
              want to clearly explain the types of information we gather, how it
              is maintained and used, and how to correct or change it.
            </p>
            <Typography variant="h4">1. Definitions</Typography>
            <p>
              Capitalized terms not otherwise defined herein shall have the
              meanings ascribed to them in Swimply’s Terms of Service.
            </p>
            <p>
              “Account” means the account you registered for to access and use
              the Platform.
              <br />
              “Application” means any applications for mobile, tablet and other
              smart devices and application program interfaces through which
              Swimply provides services, if any.
              <br />
              “Personal Information” means information (which may include
              sensitive information) relating to an individual who is
              identifiable or may be identified from that information in
              conjunction with other information that is in, or is likely to
              come into Swimply’s possession.
              <br />
              “Services” means the services Swimply makes available through its
              site for hosts to list pools and for guests to book such pools.
              <br />
              “Site” means www.swimply.com and any other website through which
              Swimply makes Services available.
              <br />
              “Third Parties” means companies or persons not related by common
              ownership or control (i.e. non-affiliates) or other unrelated
              individuals. Third Parties may be financial and non-financial
              companies, or persons other than you or Swimply.
              <br />
              “Users” means any individual who accesses or uses the Platform for
              any reason
            </p>
            <Typography variant="h4">
              2. What types of information does Swimply gather about you?
            </Typography>
            <p>
              We collect several types of information from and about users of
              the Platform, including Personal Information by which you may be
              personally identified, such as name, address, e-mail address,
              phone number, and any other information Swimply obtains about you.
            </p>
            <p>
              We receive, store and process information, including Personal
              Information that you make available to Swimply by your use of the
              Platform. We collect this information directly from you when you
              provide it to us, automatically as you navigate through the
              Platform, and from Third Parties as described herein.
            </p>
            <p className={classes.termsHead}>Information You Provide to Us</p>
            <p>
              In order to register for an Account via the Platform, you must
              provide a username, email address, level of education, identifying
              information related to education, and preferences. Swimply may
              store all information for as long as you maintain an Account with
              Swimply. Should you choose to cancel your Account, we will delete
              your user information upon request.
            </p>
            <p>
              You make available to us any correspondence or transactions you
              engage in on the Platform, including but not limited to, posting
              listings, booking Accommodations, posting reviews or comments, and
              linking your Account to Third Party websites such as Facebook.
            </p>
            <p className={classes.termsHead}>
              Information We Collect Through Your Use of the Platform
            </p>
            <p>
              When you use certain features of the Platform, Swimply may
              receive, store and process information about your location,
              including general information (e.g. IP address, zip code) and more
              specific information (e.g. GPS-based functionality on mobile
              devices used to access the Platform).
            </p>
            <p>
              We may also receive, store and process log data, which is
              information that is automatically recorded by our servers whenever
              you access or use the Platform. This information includes your IP
              address, date and time of access, the hardware and software you
              are using, referring and exit pages and URLS, the number of
              clicks, device event information, pages viewed and the order of
              pages, and the time spent on particular pages.
            </p>
            <p className={classes.termsHead}>Cookies</p>
            <p>
              We use cookies to allow users to log into their Accounts and use
              the Platform. We may use technologies such as our own cookies to
              provide you with advertising based on your specific interests or
              preferences. If you would like to opt-out of receiving
              behavioral-based advertising from advertising companies with whom
              we have a relationship, you may do so by visiting the Network
              Advertising Initiative or Digital Advertising Alliance.
            </p>
            <p>
              We may participate in demographic, interest, and location-based
              advertising. If we do so, we will not use Personal Information in
              conjunction with this information. You may opt out or customize
              your demographic and interest based settings, on the Google
              Display Network, using the Ad Settings.
            </p>
            <Typography variant="h4">
              3. How does the Company use and process the information it
              gathers?
            </Typography>
            <p>
              We use information that we collect about you or that you provide
              to us, including any Personal Information, to enable you to access
              and use the Platform, connect and communicate with other users,
              and to foster a trusted and safe environment for users of the
              Platform. Additionally, we use your information to send you
              important notices regarding the Platform as well as marketing,
              advertising and promotional messages that may be of interest to
              you. You may opt-out from receiving such communications in the
              “Account” section of the settings
            </p>
            <p>
              We use information that we collect about you or that you provide
              to us to comply with our legal obligations, resolve any disputes
              that we may have with any of our users, and enforce our agreements
              with Third Parties.
            </p>
            <p>
              We may, either directly or through Third Parties, review, scan or
              analyze your communications with other users on the Platform for
              fraud prevention, risk assessment, regulatory compliance,
              investigation, product development, research and customer support
              purposes. We will not review, scan, or analyze your communications
              for sending Third-Party marketing messages to you. We will also
              not sell these reviews or analyses of communications to Third
              Parties.
            </p>
            <Typography variant="h4">
              4. How does the Company disclose or share your Personal
              Information and to whom does it disclose to such information?
            </Typography>
            <p>
              Information that you provide to create your profile and Listings
              may be visible to the general public for marketing purposes.
              Listings may include information such as the city, neighborhood,
              and approximate geographic location displayed on a map of where
              the Accommodation is located.
            </p>
            <p>
              Your profile and Listings may appear as search results on search
              engines by default. You may opt-out of this feature by changing
              your settings. Please be aware that Swimply does not control the
              practices of Third Party search engines and as a result, your
              information may continue to be visible as a search result.
            </p>
            <p>
              Swimply does not share your telephone number with other users
              without your consent. As a Guest, if you agree to be contacted by
              Hosts before your request for a Booking has been accepted, and the
              Host decides to do so, Swimply will act as an intermediary and
              connect you with the Host. We will not share your phone number
              unless a Booking is confirmed. If a Booking is confirmed, your
              phone number will become visible to the Host and Guest, and either
              party may contact one another directly.
            </p>
            <p>
              Your payment and billing information will never be shared with
              other users.
            </p>
            <p>
              We disclose your information to Third Parties as further explained
              in Section 5 below.
            </p>
            <p>
              We may, without notice to you, store, transfer and disclose data
              to the Tax Authority relating to transactions, Bookings,
              Accommodations and Taxes including but not limited to, Personal
              Information, Listings, transaction dates and amounts, tax
              identification numbers, amount of taxes received by Hosts from
              Guests, or allegedly due, contact information and similar
              information.
            </p>
            <p>
              In the event legal enforcement requests information about you, we
              will use commercially reasonable efforts to notify you (before or
              after) about such requests unless (i) providing notice is
              prohibited by the legal process itself, court order or by
              applicable law, or (ii) providing notice would (a) be futile, (b)
              be ineffective, (c) create a risk of injury or bodily harm to
              others or (d) create a risk or increase a risk of fraud upon
              Swimply, its users, or the Platform.{" "}
            </p>
            <p className={classes.termsHead}>Third Party Access and Use</p>
            <p>
              We may allow our business partners to use their cookies and other
              tracking technologies on our Platform. We may also, either
              directly or through Third Parties we engage to provide services to
              us, track your behavior in utilizing the Platform for purposes of
              our own customer support, analytics, research, product
              development, fraud prevention, risk assessment, regulatory
              compliance, investigation, as well as enable you to use and access
              the Platform. If you disable cookies, you may lose certain
              features and functionality of the Application or Site, as cookies
              are necessary to track and enhance use of and access to the
              Platform.
            </p>
            <p>
              At times, you may be directed to Third Party websites and/or
              offered the option to download an application using a Third Party
              platform. Hosts may elect to use Third Party services made
              available through the Swimply.
            </p>
            <p>
              Swimply may use social plugins provided and operated by Third
              Parties such as Facebook’s “Like” button. By clicking on the such
              social plugin, you may be sending your information to a Third
              Party. Please be aware that the terms of the Third Party’s privacy
              policy will apply to your use of any Third Party platforms (e.g.
              social plugin, website, or applications).
            </p>
            <p>
              If Swimply undertakes or is involved with any merger, acquisition,
              reorganization, sale of assets, bankruptcy or event of insolvency,
              then we may sell, transfer or share some or all of our assets
              including your Personal Information. In this event, we will notify
              you of the transfer of Personal Information, which may become
              subject to a different privacy policy.
            </p>
            <Typography variant="h4">5. Children Under 13</Typography>
            <p>
              The Platform is not intended for individuals under the age of
              thirteen (13), and we request that these individuals do not
              provide Personal Information through our Application. We do not
              knowingly collect information from children under thirteen (13)
              without parental consent. Visit the Federal Trade Commission
              website for more information about the Children’s Online Privacy
              Protection Act (COPPA).
            </p>
            <p>
              How to access, change, or delete your information, or cancel your
              Account You may review, update, correct or delete the Personal
              Information in your Account. You may cancel your Account entirely
              by accessing the settings on the Site or Application. Please note
              that any reviews, forum postings, and materials you have posted
              may continue to be publicly available on the Site or Application
              even after you cancel your Account.{" "}
            </p>
            <Typography variant="h4">Disclaimer</Typography>
            <p>
              We are continuously implementing and updating administrative,
              technical, and physical security measures to help protect your
              Personal Information against unauthorized access, destruction or
              alteration. However, no method of transmission over the Internet,
              and no method of storing electronic information, can be 100%
              secure. So, we cannot guarantee the security of your transmissions
              to us and of your Personal Information that we store.{" "}
            </p>
            <Typography variant="h4">Modifications</Typography>
            <p>
              The Privacy Policy is subject to change. We suggest you review the
              policy from time to time. If we make changes to the Privacy
              Policy, we will revise the “Last Updated” date at the top of this
              policy. Any changes to this policy will become effective when we
              post the revised Privacy Policy with respect to the Platform. Your
              use of the Platform following these changes constitutes acceptance
              of the revised Privacy Policy.{" "}
            </p>
            <p>
              PLEASE READ THE TERMS OF THIS PRIVACY POLICY CAREFULLY AS IT
              CONTAINS IMPORTANT INFORMATION REGARDING YOUR PERSONAL
              INFORMATION. IF YOU DO NOT AGREE TO ANY OF THESE TERMS, YOU MUST
              DISCONTINUE YOUR USE OF THE PLATFORM AND CANCEL YOUR ACCOUNT.
            </p>
          </div>
        </div>
        {footerMobile !== true ? <Footer /> : ""}
      </Typography>
    );
  }
}

TermsAndConditions.propTypes = {
  classes: PropTypes.object.isRequired
};

const enhance = compose(
  withStyles(styles),
  withRouter
);

export default enhance(TermsAndConditions);
