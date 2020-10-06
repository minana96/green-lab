import React, {useContext} from "react";
import PropTypes from "prop-types";
import compose from "recompose/compose";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from '@material-ui/core/Paper';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import { Link } from 'react-router-dom';
import Signup from '../auth/forms/signup';
import Login from '../auth/forms/login';
import ForgotPassword from '../auth/forms/forgotpassword';
import Dialog from '@material-ui/core/Dialog';
import UserUtils from "../utilities/UserUtils";
import { BECOME_A_HOST, IS_SHVIMPLY } from '../../config';

// contexts
import UserContext from '../../contexts/UserContext'

// services
import HelperService from '../../services/helper'

const styles = theme => ({
  dialogBoxContainer: {
    padding: '15px 22px',
    '& h3': {
      padding: '15px 22px 15px',
    },
    '& > div > div:first-child': {
      maxHeight: 'calc(100vh - 25px)',
      maxWidth: '450px',
      minWidth: '350px',
      "@media (max-width:767px)": {
        minWidth: '330px',
        borderRadius: '10px',
      },
      "@media (max-width:360px)": {
        minWidth: '290px',
        borderRadius: '10px',
      }
    }

  },
  dialogBox: {
    minWidth: '280px',
    '& > label': {
      marginBottom: '15px',
    },
    '& a': {
      textDecoration: 'none'
    },
    '@media (max-width:480px)': {
      minWidth: '200px',
    }

  },
  signupBtn: {
    marginBottom: '15px',

  },
  listpoolBanner: {
    position: "relative",
    minHeight: "100vh",
    background: `url(${BECOME_A_HOST}) no-repeat`,
    padding: "50px 0 0",
    backgroundSize: "100%",
    backgroundPosition: "center top",
    width: "100%",
    "@media (max-width:767px)": {
      minHeight: "inherit",
      display: "table",
      background: "url(../img/mobileBglist.png) no-repeat",
      backgroundSize: 'contain',

    },
  },
  bannerContent: {
    position: 'absolute',
    top: '30%',
    maxWidth: '500px',
    '& h3': {
      color: '#1fc8e7',
      fontSize: '30px',
      lineHeight: '42px',
    },

    '& p': {
      color: '#404040',
      fontSize: '14px',
      fontFamily: 'Poppins',
      fontWeight: 'normal',
      lineHeight: '23px',
      maxWidth: '400px',
      left: 0,
      right: 0,
      margin: 'auto',
      marginBottom: '25px',
      marginLeft: '0px',
    },
    '& button': {
      maxWidth: '120px',
    },
    "@media (max-width:767px)": {
      position: 'relative',
      textAlign: 'center',
      padding: '80px 0 120px',
      left: 0,
      right: 0,
      margin: 'auto'
    },
  },
  bannerButton: {
    maxWidth: '120px',
    "@media (max-width:767px)": {
      margin: '0 auto',
    }
  },
  headingHTwo: {
    color: '#22bfea',
    lineHeight: '50px',
    fontSize: '40px',
    textAlign: 'center',
    maxWidth: '500px',
    margin: '0 auto',
    paddingBottom: '50px',
    '@media (max-width:767px)': {
      fontSize: '26px',
      lineHeight: '30px',
    }
  },
  easyList: {
    position: 'relative',
    '& h2': {
      textAlign: 'left',
      margin: '0',
      padding: '0',
      fontSize: '30px',
      lineHeight: '42px',
    },
    '& p': {
      fontSize: '14px',
      maxWidth: '420px',
      marginBottom: '20px',
    },
    '& img': {
      width: '100%',
      maxWidth: '450px',
    },
    '& button': {
      maxWidth: '120px',
    },
    '@media (max-width:767px)': {
      textAlign: 'center',
      '& h2': {
        textAlign: 'center',
      }
    },
  },
  easyImage: {
    textAlign: 'left',
    zIndex: '2',
    position: 'relative',
  },
  easyContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  listpoolSecTwo: {
    padding: '50px 0',
    '& img': {
      maxWidth: 'none',
    }
  },
  gotBackContent: {
    paddingTop: '40px !important',
    '& h2': {
      fontSize: '40px',
      marginBottom: '25px',
    }
  },
  gotBacklist: {
    listStyleType: 'none',
    '& li': {
      fontSize: '13px',
      paddingBottom: '25px',
      position: 'relative',
      '@media (max-width:767px)': {
        paddingLeft: '10px',
        textAlign: 'left',
      }
    },
    '& li:before': {
      content: 'url(../img/listpool_ul_icon.png)',
      position: 'absolute',
      left: '-11%',
    },
    '& span': {
      fontWeight: '500',
    },
  },
  listpoolHost: {
    padding: '50px',

    '@media (max-width:900px)': {
      padding: '15px 0',
      '& h2': {
        fontSize: '42px',
        lineHeight: '45px',
      },
    },
    '@media (max-width: 767px)': {
      padding: '15px 0 50px'
    }
  },
  HostHeading: {
    maxWidth: 'none',
    paddingBottom: '90px',
    '@media (max-width:767px)': {
      paddingBottom: '30px',
    }
  },
  // hostBlock: {
  //   background: 'url(../img/listpool_start_listing.png) no-repeat',
  //   width: '100%',
  //   padding: '50px 0 0',
  //   position: 'relative',
  //   minHeight: '485px',
  //   backgroundSize: '100%',
  //   backgroundPosition: 'center top',
  //   marginTop: '100px',
  //   '& p': {
  //     maxWidth: '325px',
  //     textAlign: 'center',
  //     position: 'absolute',
  //   },
  //   '@media (max-width:767px)': {
  //     display: 'none',
  //   }
  // },
  // circleOne: {
  //   width: '230px',
  //   height: '230px',
  //   borderRadius: '50%',
  //   left: '90px',
  //   position: 'absolute',
  //   top: '70px',
  //   display: 'flex',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   boxShadow: ' 0 0 8px 5px #eaeaea',

  //   '& p': {
  //     margin: '0',
  //     fontWeight: '200',
  //     fontSize: '28px',
  //     lineHeight: '33px',
  //   },
  //   '& font': {
  //     display: 'block',
  //     width: '45px',
  //     marginBottom: '10px',
  //     textAlign: 'center',
  //     border: ' 1px solid #ccc',
  //     borderRadius: ' 50%',
  //     lineHeight: '45px',
  //     margin: '0 auto',
  //     fontWeight: '300',
  //   }
  // },
  // pOne: {
  //   bottom: '25px',
  //   left: '4%',
  // },
  // pTwo: {
  //   top: '-190px',
  //   left: '0',
  //   right: '0',
  //   margin: 'auto',
  // },
  // pThree: {
  //   bottom: '0',
  //   right: '3%'
  // },
  hostButton: {
    margin: '25px auto 0',
    '@media (max-width:767px)': {
      margin: '0 auto 0',
    }
  },
  listpoolEarn: {
    padding: '50px 0',
    position: 'relative',
    '@media (max-width:767px)': {
      '& h2': {
        fontSize: '42px',
        lineHeight: '45px',
      },
    }
  },

  earnBlock: {
    background: 'url(../img/listpool_bg1.png) no-repeat',
    width: '100%',
    padding: '0 0 0',
    position: 'relative',
    minHeight: '680px',
    backgroundSize: '96%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingLeft: '40px',
    '@media (max-width:980px)': {
      paddingLeft: '0',
      minHeight: '540px',
    },
    '@media (max-width:767px)': {
      paddingLeft: '0',
      minHeight: '250px',
    }
  },
  earnButton: {
    margin: '-90px auto 0',
    position: 'relative',
    zIndex: '9',
    '@media (max-width:767px)': {
      margin: '-30px auto 0',
    }
  },
  searchpoolContainer: {
    padding: "30px",
    maxWidth: "320px",
    width: "100%",
    position: "relative",
    overflow: "inherit",
    "& h3": {
      fontWeight: "500",
      lineHeight: "30px",
      margin: "0 0 20px",
      fontSize: "24px"
    },
    "@media (max-width:767px)": {
      width: "calc(100% - 30px)",
      padding: "15px",
      maxWidth: "300px",
      float: 'none',
      margin: '10px auto 0'
    }
  },
  earnCards: {
    justifyContent: 'center',
    '@media (max-width:767px)': {
      '& > div': {
        maxWidth: '50%',
        flexBasis: '50%',
      }
    }

  },
  earnpaper: {
    padding: '40px 0px 40px 30px',
    margin: '0 40px 40px 0',
    borderRadius: '10px',

    '& img': {
      width: '100%',
      borderRadius: '100%',
      verticalAlign: 'middle',
    },

    '& p': {
      margin: '0',
      fontSize: '30px',
    },
    '@media (max-width:980px)': {
      margin: '0 20px 20px 0',
      padding: '35px 15px',
      '& p': {
        fontSize: '16px',
        whiteSpace: 'pre',
      }
    },
    '@media (max-width:767px)': {
      margin: '0 10px 10px 0',
      padding: '15px',
      '& p': {
        fontSize: '14px',
        whiteSpace: 'pre',
      }
    },
  },
  earnDetail: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    paddingLeft: '25px',
    '@media (max-width:767px)': {
      paddingLeft: '0',
    }
  },
  textBlue: {
    color: '#22bfea',
  },
  faqHeading: {
    maxWidth: 'none',
  },
  listpoolFaq: {
    padding: '50px 0',
    '@media (max-width:767px)': {
      padding: '00px 0 30px',
      '& h2': {
        fontSize: '42px',
        lineHeight: '45px',
      },
    }
  },
  faqPanel: {
    marginBottom: '20px',
    boxShadow: 'none',
    '&:before': {
      backgroundColor: 'transparent',
    },
  },
  faqSummary: {
    borderBottom: '4px solid #028db7',
    backgroundImage: 'linear-gradient(#23d1f2, #01aee2)',
    borderRadius: '6px',
    minHeight: '50px !important',
    '& > div': {
      margin: '0 !important',
    }
  },
  summaryHead: {
    color: '#fff',
    fontSize: '16px',
    lineHeight: '17px',
    display: 'flex',
    alignItems: 'center',
    '&:before': {
      content: 'url(../img/listpool_faq.png)',
      paddingRight: '15px',
    },
  },
  listpoolContact: {
    paddingTop: '50px',
    '@media (max-width:767px)': {
      paddingTop: '0',
    }
  },
  ContactBg: {
    background: 'url(../img/listpool_bg2.png) no-repeat',
    width: '100%',
    padding: '50px 0 0',
    position: 'relative',
    minHeight: '380px',
    backgroundSize: 'contain',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    maxWidth: '860px',
    margin: '0 auto',
    '& > div > div': {
      maxWidth: 'inherit',
      flexBasis: 'auto',
    },
    '@media (max-width:767px)': {
      minHeight: '120px',
      '& h2': {
        fontSize: '20px',
        margin: 0,
        padding: 0,
      }
    }
  },
  contactHeading: {
    color: '#fff',
  },
  emailpaper: {
    padding: '20px 30px',
    marginRight: '30px',
    borderRadius: '10px',
    fontSize: '25px',
    fontWeight: '300',
    marginLeft: '-0',
    '& img': {
      verticalAlign: 'middle',
      paddingRight: '20px',
      maxWidth: '40px',
    },
    '@media (max-width:767px)': {
      fontSize: '13px',
      padding: '10px',
      marginRight: '10px',
      '& img': {
        paddingRight: '6px',
        maxWidth: '20px',
      }
    }
  },
  phonepaper: {
    padding: '20px 30px',
    borderRadius: '10px',
    fontSize: '25px',
    fontWeight: '300',
    '& img': {
      verticalAlign: 'middle',
      paddingRight: '20px',
      maxHeight: '32px',
    },
    '@media (max-width:767px)': {
      fontSize: '13px',
      padding: '10px',
      '& img': {
        paddingRight: '6px',
        maxWidth: '20px',
      }
    }
  },
  whyHosting: {
    position: 'relative',



  },

  container: {
    maxWidth: '1000px',
    margin: '0 auto',
    width: '100%',
    fontFamily: 'Poppins',
    padding: '0 15px',
    '@media (max-width:1170px)': {
      maxWidth: '992px',
    },
    '@media (max-width:1000px)': {
      maxWidth: '750px',
    },
    '@media (max-width:980px)': {
      maxWidth: '700px',
    },
    '@media (max-width:767px)': {
      width: 'calc(100% - 30px)',
    },
    '&.wider': {
      maxWidth: '1040px',
      '@media (max-width: 1000px)': {
        maxWidth: '100%',
        boxSizing: 'border-box'
      },
      '@media (max-width: 767px)': {
        padding: 0
      }
    }
  },
  footer: {
    background: 'url(../img/listpool_footer.png) no-repeat',
    width: '100%',
    padding: '50px 0 0',
    position: 'relative',
    minHeight: '220px',
    backgroundSize: '100%',
    marginTop: '100px',
    '& ul': {
      listStyle: 'none',
      paddingLeft: '0',
      marginBottom: '35px',
      textTransform: 'uppercase',
      position: 'relative',
      '& li': {
        color: '#fff',
        cursor: 'pointer',
        display: 'inline-block',
        padding: '0 20px 0',
        borderRight: '1px solid #dadada',
        lineHeight: '13px',
        fontFamily: 'Poppins',
        '& a': {
          color: '#fff',
          textDecoration: 'none',
        },
        '&:last-child': {
          borderRight: '0',
        }
      }
    },
    '@media (max-width:980px)': {
      minHeight: '40px',
      background: IS_SHVIMPLY ? 'url(../img/listpool_footer.png) no-repeat' : 'url(../img/mobileFooter.png) no-repeat',
      backgroundSize: ' 100%',
      marginTop: '50px',
      '& ul': {
        display: 'none',
      },
      '& p': {
        display: 'none',
      }
    }
  },
  footerMain: {
    textAlign: 'center',
    '@media (max-width:1200px)': {
      '&::before': {
        content: '""',
        position: 'absolute',
        width: '200%',
        height: '70px',
        background: '#04c3f4',
        left: '-50%',
        right: '0',
        bottom: '-0',
        zIndex: '0',
      },
    },
    '@media (max-width:1000px)': {
      '&::before': {
        content: '""',
        position: 'absolute',
        width: '200%',
        height: '100px',
        background: '#04c3f4',
        left: '-50%',
        right: '0',
        bottom: '-0',
        zIndex: '0',
      },
    },
    '@media (max-width:800px)': {
      '&::before': {
        width: '0%',
        height: '0',
      },
    },

    '& p': {
      color: '#fff',
      marginBottom: '0',
      position: 'relative',
    },
    '@media (max-width:767px)': {
      '& img': {
        display: IS_SHVIMPLY ? 'unset' : 'none',
      }
    }
  },
  listStar: {
    position: 'absolute',
    left: '0',
    top: '-140px',
    maxWidth: '150px',
    '@media (max-width:767px)': {
      top: '-130px',
      maxWidth: '80px',
    }
  },
  whyHostCont: {
    paddingLeft: '65px',
    marginTop: '-120px',
    '@media (max-width:767px)': {
      marginTop: '0',
      paddingLeft: '0',
    }
  },
  circleTwo: {
    left: '38.5%',
  },
  circleThree: {
    left: '68%',
  },
  shadowImage: {
    position: 'absolute',
    bottom: '0',
    maxWidth: '100% !important',
    zIndex: '0',
    '@media (max-width:767px)': {
      display: 'none',
    }
  },
  shadowImage1: {
    marginTop: '-40px'
  },
  shadowImage2: {
    marginTop: '-380px'
  },
  contentTabMenu: {
    boxShadow: '0px 1px 7px 0px #ccc',
    paddingTop: '15px',
    paddingBottom: '15px',
  },
  footBallSection: {
    position: 'relative',
  },
  footBallSectionImg: {
    position: 'absolute',
    right: '0',
    bottom: '0',
    maxWidth: '100px',
    '@media (max-width:767px)': {
      maxWidth: '50px',
    }
  },
  listpoolEarnImg: {
    position: 'absolute',
    left: '0',
    bottom: '0',
    maxWidth: '150px',
    '@media (max-width:767px)': {
      display: 'none',
    }
  },
  easyContentFlexMobile: {
    '@media (max-width:767px)': {
      display: 'flex',
      flexDirection: 'column-reverse',
      padding: '30px 0'

    }
  },
  // mobileCircle: {
  //   display: 'none',
  //   '@media (max-width:767px)': {
  //     display: 'block',
  //   }
  // },
  // mobileCircleOne: {
  //   textAlign: 'center',
  //   marginBottom: '45px',
  // },
  // mobileCircleOnce: {
  //   width: '230px',
  //   height: '230px',
  //   borderRadius: '50%',
  //   position: 'relative',
  //   display: 'flex',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   boxShadow: ' 0 0 8px 5px #eaeaea',
  //   margin: '0 auto',
  //   '& > div': {
  //     fontSize: '30px',
  //     textAlign: 'center',
  //     fontWeight: '200',
  //     lineHeight: '34px',
  //     padding: '0 15px',
  //   },

  //   '& p': {
  //     margin: '0',
  //     fontWeight: '200',
  //     fontSize: '28px',
  //     lineHeight: '33px',
  //   },
  //   '& font': {
  //     display: 'block',
  //     width: '45px',
  //     marginBottom: '10px',
  //     textAlign: 'center',
  //     border: ' 1px solid #ccc',
  //     borderRadius: ' 50%',
  //     lineHeight: '45px',
  //     margin: '0 auto',
  //     fontWeight: '300',
  //   }
  // },
  subHead: {
    fontSize: '16px',
    fontWeight: '500',
    display: 'block',
    paddingBottom: '3px',
    paddingTop: '15px',
  },
  subheadPadding: {
    paddingTop: '0',
  },
  weGotBack: {
    padding: '0 15px',
    margin: '0',
    '& li': {
      paddingBottom: '8px',
      '& strong': {
        display: 'block',
      }
    },

  },
  faqBox: {
    width: 'calc(33.33% - 30px)',
    padding: '15px',
    display: 'inline-block',
    textAlign: 'center',
    verticalAlign: 'top',
    '@media (max-width:767px)': {
      width: '100%',
      padding: '0',
    }
  },

  faqCircle: {
    width: '230px',
    height: '230px',
    borderRadius: '50%',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: ' 0 0 8px 5px #eaeaea',
    margin: '0 auto',
    '& p': {
      margin: '0',
      fontWeight: '200',
      fontSize: '30px',
      lineHeight: '33px',
      padding: '0 15px'
    },
    '& span': {
      display: 'block',
      width: '45px',
      marginBottom: '10px',
      textAlign: 'center',
      border: ' 1px solid #ccc',
      borderRadius: ' 50%',
      lineHeight: '45px',
      margin: '0 auto',
      fontWeight: '300',
    }
  },
  question: {
    fontWeight: '500',
  },
  answer: {
    fontWeight: '300',
  },
  qustionAndAnswers: {
    listStyle: 'decimal',
    fontWeight: '500',
    margin: '0',
    padding: '0 15px',
    '& li': {
      paddingBottom: '15px',
    }
  },
  hostingContainer: {
    width: '100%',
    height: 'fit-content'
  },
  hostingInnerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    left: 0,
    right: 0,
    margin: 'auto',
    '@media (min-width: 1050px)': {
      maxWidth: '930px',
    },
    '@media (min-width: 1150px)': {
      maxWidth: '100%',
    },
    '@media (max-width: 767px)': {
      flexDirection: 'column',
      alignItems: 'center',
      padding: '0'
    }
  },
  hostingBlock: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center',
    textAlign: 'center',
    padding: '0 10px',
    maxWidth: '300px',
    '@media (max-width: 767px)': {
      padding: '20px 10px'
    },
    '& .icon-container': {
      width: '60px',
      height: '60px'
    },
    '& .host-block-title': {
      textAlign: 'center',
      fontSize: '21px !important',
      fontWeight: 600,
      '@media (max-width: 970px)': {
        fontSize: '19px'
      },
      '@media (max-width: 767px)': {
        fontSize: '21px'
      },
      '@media (max-width: 450px)': {
        margin: '10px 0'
      },
      '& .host-block-number': {
        color: '#25bfeb',
      }
    },
    '& .host-block-content': {
      fontSize: '17px',
      // '@media (max-width: 970px)': {
      //   fontSize: '15px'
      // },
    }
  },
  withArrow: {
    '&:after': {
      content: '""',
      position: 'absolute',
      display: 'block',
      width: '72%',
      height: '60px',
      top: '0px',
      right: '-36%',
      background: 'url(../img/host-arrow.png) no-repeat center/contain',
      '@media (min-width: 1150px)': {
        right: '-42%',
      },
      '@media (max-width: 767px)': {
        display: 'none'
      },
    },
  },
  one: {
    '& .icon-container': {
      background: 'url(../img/host-block-1.png) no-repeat center/contain',
    },
    position: 'relative',
  },
  two: {
    '& .icon-container': {
      background: 'url(../img/host-block-2.png) no-repeat center/contain',
    },
    position: 'relative',
  },
  three: {
    '& .icon-container': {
      background: 'url(../img/host-block-3.png) no-repeat center/contain',
    },
  },
  logoImg: {
    '@media (max-width: 980px)': {
      marginBottom: 15,
      width: 200
    },
    '@media (max-width: 500px)': {
      marginBottom: 0,
      marginTop: -20,
      width: 140
    },
  }
});

class ListYourPool extends React.Component {
  /**
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      loginModelOpen: false,
      forgotPasswordModal: false
    };
    this.redirectToFacebook = this.redirectToFacebook.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
  }

  openLoginDialog() {
    this.setState({
      modalOpen: false,
      loginModelOpen: true
    });
  }
  handleSignup() {
    let accessToken = UserUtils.getAccessToken();
    let userRole = UserUtils.getUserRole();
    let { history } = this.props;
    if (accessToken === null || accessToken === "") {
      window.scrollTo(0, 0);
      this.setState({
        modalOpen: true,
        loginModelOpen: false
      });
    } else {
      if (userRole === "Host") {
        history.push("hostprompt");
      } else {
        history.push("profile");
      }
    }


  }

  handleModelOpen() {
    this.setState({ modalOpen: true });
  }

  handleModel() {
    this.setState({
      modalOpen: false,
      profileModelOpen: false,
      loginModelOpen: false
    });
  }

  handleSignUp(data, referralCode, firstname, email) {
    this.setState({
      modalOpen: false,
    });
  }

  handleLogin() {
    this.setState({
      loginModelOpen: false
    });
  }

  handleLoginModelOpen() {
    this.setState({ loginModelOpen: true });
  }

  handleSignupClose(modal) {
    this.setState({ modalOpen: false })
  }

  handleForgotPassword() {
    this.setState({
      forgotPasswordModal: true,
      loginModelOpen: false
    })
  }

  handleForgotPasswordCloseModal() {
    this.setState({ forgotPasswordModal: false });
  }

  redirectToTwitter() {
    window.open("https://twitter.com/swimply");
  }
  redirectToInstagram() {
    window.open("https://www.instagram.com/swimply.official");
  }
  redirectToFacebook() {
    window.open("https://www.facebook.com/swimply.official");
  }

  headMessaging() {
    const { path } = this.props.match;
    switch ( path ) {
      case '/listyourpool-2':
        return 'Earn money effortlessly as a ' + (IS_SHVIMPLY ? 'Shvimply' : 'Swimply') + ' host';
      case '/listyourpool-3':
        return 'List your pool & Earn';
      default:
        return 'Finally, Let your pool pay for itself!';
    }
  }

  /**
   * render
   */
  render() {
    const { classes, user } = this.props;
    const { forgotPasswordModal } = this.state;
    const host = HelperService.isHost(user)
    return (
      <div>
        <div className={classes.listpoolBanner}>
          <div className={classes.container}>
            <div className={classes.bannerContent}>
              <Typography variant="h3">
                {this.headMessaging()}
              </Typography>
              <p>Your pool costs you money every year. Flip the switch with {IS_SHVIMPLY ? 'Shvimply' : 'Swimply'} and have your pool earn you an
effortless income as a {IS_SHVIMPLY ? 'Shvimply' : 'Swimply'} host.</p>
              <Typography variant="button" className={classes.bannerButton} onClick={this.handleSignup}>
                LIST YOUR POOL
              </Typography>
            </div>
          </div>
        </div>
        <div className={classes.whyHosting}>
          <div className={classes.container} >
            <Typography variant="h2" className={classes.headingHTwo}>
              Why hosting on {IS_SHVIMPLY ? 'Shvimply' : 'Swimply'} is kinda awesome.
            </Typography>
            <img src={window.location.origin + '/img/listpool_side1.png'} alt="" className={classes.listStar} />
            <Grid container className={classes.root + " " + classes.easyList} spacing={24}>
              <Grid item xs={12} sm={6}>
                <div className={classes.easyImage}>
                  <img src={window.location.origin + "/img/listpool_free.png"} alt="" />
                </div>
              </Grid>

              <Grid item xs={12} sm={6} className={classes.easyContent}>
                <div className={classes.whyHostCont}>
                  <Typography variant="h2" className={classes.headingHTwo}>
                    Free and <br />Easy to List
                </Typography>
                  <p>
                    It only takes 3-5 minutes to list on {IS_SHVIMPLY ? 'Shvimply' : 'Swimply'} and it's completely free. Just upload a couple of pictures and
  details of your pool and how you want it run. We'll take care of the rest.
                </p>
                  <Typography
                    variant="button"
                    className={classes.bannerButton}
                    onClick={this.handleSignup}
                  >
                    GET STARTED
                </Typography>
                </div>
              </Grid>
              <img className={classes.shadowImage} src={window.location.origin + "/img/shadowSection.png"} alt="" />
            </Grid>
          </div>
          <div className={classes.container} >
            <Grid container className={classes.root + " " + classes.easyList + " " + classes.easyContentFlexMobile} spacing={24}>

              <Grid item xs={12} sm={6} className={classes.easyContent}>
                <Typography variant="h2" className={classes.headingHTwo}>
                  Your Pool.<br />Your Rules.
                </Typography>
                <p>
                  You love your Pool, so you control how you share it. With {IS_SHVIMPLY ? 'Shvimply' : 'Swimply'}, you're in full control of your
  availability, prices, pool rules, and whether or not to accept a given request. You're the boss.
                </p>
                <Typography
                  variant="button"
                  className={classes.bannerButton}
                  onClick={this.handleSignup}
                >
                  GET STARTED
                </Typography>

              </Grid>

              <Grid item xs={12} sm={6}>
                <div className={classes.easyImage}>
                  <img src={window.location.origin + "/img/listpool_rules.png"} alt="" />
                </div>
              </Grid>
            </Grid>
          </div>
          <img className={classes.shadowImage2} src={window.location.origin + "/img/shadowSection2.png"} alt="" />
          <div className={classes.footBallSection}>
            <img src={window.location.origin + "/img/listpool_side2.png"} alt="" className={classes.footBallSectionImg} />
            <div className={classes.container} >
              <Grid container className={classes.root + " " + classes.easyList} spacing={24}>
                <Grid item xs={12} sm={6}>
                  <div className={classes.easyImage}>
                    <img src={window.location.origin + "/img/listpool_payments.png"} alt="" />
                  </div>
                </Grid>

                <Grid item xs={12} sm={6} className={classes.easyContent}>

                  <Typography variant="h2" className={classes.headingHTwo}>
                    Guaranteed<br />Payments
                </Typography>
                  <p>
                    Guests are charged upfront through {IS_SHVIMPLY ? 'Shvimply' : 'Swimply'}'s secure payment system powered by Stripe. Your payout
  is directly deposited after each booking, minus our 15% service fee (it's how we keep the show running).
                </p>
                  <Typography
                    variant="button"
                    className={classes.bannerButton}
                    onClick={this.handleSignup}
                  >
                    GET STARTED
                </Typography>
                </Grid>

              </Grid>

            </div>
          </div>
        </div>

        <div className={classes.listpoolHost}>
          <div className={classes.container + " wider"} >
            <Typography variant="h2" className={classes.headingHTwo + " " + classes.HostHeading}>
              How to Host on {IS_SHVIMPLY ? 'Shvimply' : 'Swimply'}
            </Typography>
            <div className={classes.hostingContainer}>
              <div className={classes.hostingInnerContainer}>
                <div className={classes.hostingBlock + " " + classes.one + " " + classes.withArrow}>
                  <span className='icon-container'></span>
                  <p className='host-block-title'><span className='host-block-number'>01 </span> Create a listing </p>
                  <p className='host-block-content'>
                    Set your price, add photos and details, and we'll make your listing live 
                    and ready to be seen by millions of people looking for a quick relaxation.
                  </p>
                </div>
                <div className={classes.hostingBlock + " " + classes.two + " " + classes.withArrow}>
                  <span className='icon-container'></span>
                  <p className='host-block-title'><span className='host-block-number'>02 </span> Accept reservations </p>
                  <p className='host-block-content'>
                    Message with guests and accept bookings through the {IS_SHVIMPLY ? 'Shvimply' : 'Swimply'} platform. Once you confirm it's cool
                    with you, and the guest confirms their coming, your guests will receive information on how to get
                    there and how to enter and exit the pool area. 
                  </p>
                </div>
                <div className={classes.hostingBlock + " " + classes.three}>
                  <span className='icon-container'></span>
                  <p className='host-block-title'><span className='host-block-number'>03 </span> Get Paid </p>
                  <p className='host-block-content'>
                    Guests are charged upfront through {IS_SHVIMPLY ? 'Shvimply' : 'Swimply'}'s secure payment system. Your payout
                    is directly deposited after each booking, minus our 15% service fee, and is powered by
                    Stripe.
                  </p>
                </div>
              </div>
            </div>
            <Typography
              variant="button"
              className={classes.bannerButton + " " + classes.hostButton}
              onClick={this.handleSignup}
            >
              START LISTING
            </Typography>
          </div>
        </div>

        <div className={classes.listpoolSecTwo}>
          <div className={classes.container} >
            <Grid container className={classes.root + " " + classes.easyList + " " + classes.easyContentFlexMobile} spacing={24}>
              <img className={classes.shadowImage1} src={window.location.origin + "/img/shadowSection.png"} alt="" />
              <Grid item xs={12} sm={6} className={classes.gotBackContent}>
                <Typography variant="h2" className={classes.headingHTwo}>
                  We've Got Your Back
                </Typography>
                <ul className={classes.gotBacklist}>
                  <li><span>Built on trust</span> <br />
                    {IS_SHVIMPLY ? 'Shvimply' : 'Swimply'} guests add a profile photo, so you know who you're talking to. Hosts and
guests also review each other after every booking to help future guests.</li>
                  <li><span>Support on every booking</span> <br />
                    In the rare case something goes wrong, our Host Care Team is here to help. We're open
every day of the year.</li>
                </ul>
              </Grid>

              <Grid item xs={12} sm={6}>
                <div className={classes.gotBackImg}>
                  <img src={window.location.origin + "/img/listpool_yourbank.jpg"} alt="" />
                </div>
              </Grid>
            </Grid>
          </div>
        </div>

        <div className={classes.listpoolFaq}>
          <div className={classes.container} >
            <Typography variant="h2" className={classes.headingHTwo + " " + classes.faqHeading}>
              Frequently Asked Questions
            </Typography>
            <ExpansionPanel className={classes.faqPanel}>
              <ExpansionPanelSummary aria-controls="panel1a-content" id="panel1a-header" className={classes.faqSummary}>
                <Typography className={classes.heading + " " + classes.summaryHead}>How do I get paid?</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className={classes.contentTabMenu}>
                <Typography>
                  Guests are charged upfront through {IS_SHVIMPLY ? 'Shvimply' : 'Swimply'}'s secure payment system powered by Stripe.
  Your payout is directly deposited after each booking, minus our 15% service fee (it's how we keep the
  show running).
                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel className={classes.faqPanel}>
              <ExpansionPanelSummary aria-controls="panel1a-content" id="panel1a-header" className={classes.faqSummary}>
                <Typography className={classes.heading + " " + classes.summaryHead}>Do I need to be home during the rental?</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className={classes.contentTabMenu}>
                <Typography>
                  Not at all, we give you the option to provide all the info your guests will need to help
  themselves. Only confirmed guests will see this info.

                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel className={classes.faqPanel}>
              <ExpansionPanelSummary aria-controls="panel1a-content" id="panel1a-header" className={classes.faqSummary}>
                <Typography className={classes.heading + " " + classes.summaryHead}>Can I be home during the rental?</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className={classes.contentTabMenu}>
                <Typography>
                  Of course, most of our hosts are.
                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel className={classes.faqPanel}>
              <ExpansionPanelSummary aria-controls="panel1a-content" id="panel1a-header" className={classes.faqSummary}>
                <Typography className={classes.heading + " " + classes.summaryHead}>DO I NEED TO PROVIDE A RESTROOM?</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className={classes.contentTabMenu}>
                <Typography>
                  Providing a restroom is entirely optional! Most hosts do provide a restroom as it
  allows them to charge more per hour and accept longer reservations. Some hosts happen to
  have a restroom outside specifically for the pool use which is cool, and some provide
  instructions for guests to use a side/back door to allow minimal access to the home. If you
  would like to provide a restroom, but don't want to allow guest access to your home, let us
  know and we can get a portable restroom brought to your location and maintained once a
  week with some of our pretty cool partnerships. Get in touch with our Host Care Team to
  learn more.
                </Typography>
              </ExpansionPanelDetails >
            </ExpansionPanel>
            <ExpansionPanel className={classes.faqPanel}>
              <ExpansionPanelSummary aria-controls="panel1a-content" id="panel1a-header" className={classes.faqSummary}>
                <Typography className={classes.heading + " " + classes.summaryHead}>HOW DO I PRICE MY POOL?</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className={classes.contentTabMenu}>
                <Typography>
                  Ultimately, the choice is yours, but once you list, our Host Care Team is readily available
  to help assist with pricing your pool and hand over any other golden tips we may have. You can
  always start a bit lower and once you see what people are willing to pay, raise your rate.
                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>

          </div>
        </div>

        <div className={classes.listpoolContact}>
          <div className={classes.container} >
            <div className={classes.ContactBg} >
              <Typography variant="h2" className={classes.headingHTwo + " " + classes.contactHeading}>
                Get in touch with us
              </Typography>
              <Grid container className={classes.earnCards} spacing={5}>
                <Grid item xs={6} sm={4}>
                  <Paper className={classes.paper + " " + classes.emailpaper}>
                    <img src={window.location.origin + "/img/listpool_email.png"} alt="" />
                    {host ? 'HostCare@swimply.com' : 'info@swimply.com'}
                  </Paper>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Paper className={classes.paper + " " + classes.phonepaper}>
                    <img src={window.location.origin + "/img/listpool_phone.png"} alt="" />212-202-0472
                  </Paper>
                </Grid>
              </Grid>
            </div>
          </div>
        </div>

        <Typography variant="body1" component={"span"}>
          <div className={classes.footer}>
            <div className={classes.container}>
              <div className={classes.footerMain}>
                <img width='240' className={classes.logoImg} src={IS_SHVIMPLY ? window.location.origin + '/img/shvimplyImages/shvimply_logo_white.png' : window.location.origin + "/img/Swimply-logo-white.png"} alt="" />
                <ul className={classes.pageLinks}>
                  {/*<li>*/}
                  {/*  {" "}*/}
                  {/*  <Link to="/aboutus">About Us </Link>*/}
                  {/*</li>*/}
                  <li>
                    <Link to="/termsandconditions">Terms of use</Link>
                  </li>
                  <li>
                    <Link to="/privacy">Privacy policy</Link>
                  </li>
                  <li>
                    <a href={host ? 'mailto:HostCare@swimply.com' : 'mailto:info@swimply.com'}>Contact US</a>
                  </li>
                </ul>
                <p>Swimply ©2020. All Rights Reserved.</p>
              </div>
            </div>
          </div>
        </Typography>
        <Dialog
          open={this.state.modalOpen}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          className={classes.dialogBoxContainer}
        >
          <Signup
            openLoginDialog={this.openLoginDialog.bind(this)}
            page='listYourPools'
            handleSignupClose={this.handleSignupClose.bind(this)}
            handleSignUp={this.handleSignUp.bind(this)} />
        </Dialog>
        <Dialog
          open={this.state.loginModelOpen}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          className={classes.dialogBoxContainer}
        >
          <Login
            handleSignup={this.handleSignup.bind(this)}
            handleForgotPassword={this.handleForgotPassword.bind(this)}
            handleLogin={this.handleLogin.bind(this)}
          />
        </Dialog>
        <Dialog
          open={forgotPasswordModal}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          className={classes.dialogBoxContainer}
        >
          <ForgotPassword handleForgotPasswordCloseModal={this.handleForgotPasswordCloseModal.bind(this)} />
        </Dialog>

      </div >
    );
  }
}

ListYourPool.propTypes = {
  classes: PropTypes.object.isRequired
};

const enhance = compose(
  withStyles(styles),
  withRouter
);

function ListYourPoolContainer (props) {
  const userContext = useContext(UserContext)
  return <ListYourPool {...userContext} {...props} />
}

export default enhance(ListYourPoolContainer);
