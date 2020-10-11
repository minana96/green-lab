import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import compose from "recompose/compose";
import ToggleRegion from '../shared/toggle-region'

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
  footer: {
    background: "#fff",
    padding: "0px 0 30px",
    textAlign: "center",
    "& p": {
      color: " #B6B6B6",
      marginBottom: 0,
      marginTop: "4px",
      fontSize: "13px"
    },
    "& a": {
      color: theme.palette.common.black
    }
  },
  footerMain: {
    display: "flex",
    "@media (max-width:767px)": {
      display: "block"
    }
  },
  socailIcons: {
    listStyle: "none",
    display: "table",
    textAlign: "center",
    margin: "0 0 0 auto",
    padding: 0,
    "& li": {
      display: "inline-block",
      borderRadius: "50%",
      marginRight: "18px",
      cursor: "pointer",
      "&:last-child": {
        marginRight: "0"
      },
      "& i": {
        marginTop: "0",
        color: "#3a3a3a",
        fontSize: "19px"
      },
      "& img": {
        maxWidth: "16px"
      },
      "@media (max-width:767px)": {
        width: "38px",
        height: "38px",
        "& i": {
          fontSize: "25px"
        }
      }
    },
    "@media (max-width:767px)": {
      margin: "10px auto 0 auto"
    }
  },
  pageLinks: {
    listStyle: "none",
    paddingLeft: "0",
    marginTop: "0",
    marginBottom: "35px",
    textTransform: "uppercase",
    textAlign: "left",
    width: "70%",
    "@media (max-width:767px)": {
      marginBottom: "0",
      width: "100%"
    },
    "& li": {
      display: " inline-block",
      paddingRight: "60px",
      cursor: "pointer",
      fontWeight: "500",
      color: "#000",
      "&:hover": {
        color: "#00ade2"
      },
      "@media (max-width:767px)": {
        display: "block",
        textAlign: "center",
        padding: "5px 0"
      },
      "& a": {
        color: "#000",
        "&:hover": {
          color: "#00ade2"
        }
      }
    }
  },
  footerRightBox: {
    display: "block",
    width: "30%",
    textAlign: "right",
    "@media (max-width:767px)": {
      width: "100%",
      textAlign: "center"
    }
  },
  toggleContainer: {
    marginTop: '-5px',
    "@media (max-width:767px)": {
      marginTop: '0'
    }
  }
});

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.redirectToFacebook = this.redirectToFacebook.bind(this);
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
  redirectToHelpCenter = () => {
    window.open("https://swimply.zendesk.com");
  };

  render() {
    const { classes } = this.props;

    return (
      <Typography variant="body1" component={"span"}>
        <div className={classes.footer}>
          <div className={classes.container}>
            <div className={classes.footerMain}>
              {/* <ul className={classes.socailIcons}>
                <li onClick={this.redirectToTwitter}>
                  <i className="fa fa-twitter" />
                </li>
                <li onClick={this.redirectToFacebook}>
                  <i className="fa fa-facebook" />
                </li>
                <li onClick={this.redirectToInstagram}>
                  <i className="fa fa-instagram" />
                </li>
              </ul> */}
              <ul className={classes.pageLinks}>
                {/* <li>
                  <Link to="/aboutus">About Us </Link>
                </li> */}
                <li>
                  <Link to="/termsandconditions">Terms of use</Link>
                </li>
                <li>
                  <Link to="/privacy">Privacy policy</Link>
                </li>
                <li onClick={this.redirectToHelpCenter}>help center</li>
                <li>
                  <a href="mailto:info@swimply.com">Contact US</a>
                </li>
              </ul>
              <div className={classes.toggleContainer}>
                <ToggleRegion />
              </div>
              <div className={classes.footerRightBox}>
                <ul className={classes.socailIcons}>
                  <li onClick={this.redirectToFacebook}>
                    <i className="fa fa-facebook" />
                  </li>
                  <li onClick={this.redirectToTwitter}>
                    <i className="fa fa-twitter" />
                  </li>
                  <li onClick={this.redirectToInstagram}>
                    <i>
                      <img
                        alt=""
                        src={window.location.origin + "/img/instagram.png"}
                      />
                    </i>
                  </li>
                </ul>
                <p>Swimply &copy;2020. All Rights Reserved.</p>
              </div>
            </div>
          </div>
        </div>
      </Typography>
    );
  }
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired
};

const enhance = compose(
  withStyles(styles),
  withRouter
);

export default enhance(Footer);
