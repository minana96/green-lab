import React, { useContext } from "react";
import compose from "recompose/compose";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { withApollo } from "react-apollo";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import Pageloader from "../commons/pageloader";
import { loader } from "graphql.macro";
import * as commonFunctions from "./../utilities/commonFunctions";
import UserUtils from "./../utilities/UserUtils";
import { IS_SHVIMPLY } from '../../config'

// contexts
import UserContext from '../../contexts/UserContext'
const getProfileDetails = loader("./../../graphql/user/me.graphql");

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
  addPoolContainer: {
    padding: "60px 0",
    "& h2": {
      marginBottom: "0",
      "& span": {
        fontSize: "12px",
        float: "right",
        padding: "7px 25px"
      }
    },
    "& p": {
      marginTop: "8px"
    },
    "& span": {
      maxWidth: "300px",
      marginTop: "25px",
      '@media(max-width:767px)': {
        maxWidth: '100%'
      }
    },
    '@media(max-width:767px)': {
      padding: "30px 0",
    }
  },
  smallFont: {
    fontSize: "12px"
  },
  addPool: {
    maxWidth: "600px",
    "& p": {
      fontWeight: "400	",
      fontSize: "14px"
    },
    "& ul": {
      listStyle: "none",
      marginTop: "20px",
      "& li": {
        display: "flex",
        alignItems: "center",
        marginBottom: "15px",
        "& figure": {
          margin: "0 20px 0 0",
          "& img": {
            maxWidth: "50px"
          }
        }
      }
    },
    '@media(max-width:767px)': {
      "& ul": {
        paddingLeft: '0',
      }
    }
  }
});

class HostPrompt extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      emailAddress: "",
      firstName: ""
    };
  }

  componentDidMount() {
    this.getProfileDetails()
  }

  getProfileDetails = () => {
    this.props.client
      .query({
        query: getProfileDetails,
        fetchPolicy: 'network-only'
      })
      .then(res => {
        this.setState({ emailAddress: res.data.me.email, firstName: res.data.me.firstname });
        UserUtils.setUserID(res.data.me.id)
        UserUtils.setUserCountry(res.data.me.country_code);
        UserUtils.setSwimmerCountry(res.data.me.country_code_swimmer);
        UserUtils.setLastPoolId(res.data.me.last_pool_id);
      })
      .catch(async (error) => {
        let errorMsg = commonFunctions.parseGraphQLErrorMessage(error);
        this.setState({ loading: false });
        if (errorMsg === 'Unauthenticated.') {
          const status = await this.props.refreshToken(this.props.history)
          if (status === 'ok') {
            this.getProfileDetails()
          }
        }
      });
  }

  render() {
    const { classes } = this.props;
    let { loading, emailAddress, firstName } = this.state;
    return (
      <Typography variant="body1" component="div">
        {loading === true ? <Pageloader loading={loading} /> : ""}
        <div className={classes.addPoolContainer}>
          <div className={classes.container}>
            <div className={classes.addPool}>
              <Typography variant="h2">Become a {IS_SHVIMPLY ? 'Shvimply' : 'Swimply'} Host! </Typography>
              <p className={classes.smallFont}>
                Get ready to earn an extra income from your pool with 4 simple steps!
              </p>
              <ul>
                <li>
                  <figure>
                    <img alt="" src={window.location.origin + "/img/ONB-DiscoverPools.png"} />
                  </figure>
                  <p>List your pool</p>
                </li>
                <li>
                  <figure>
                    <img alt="" src={window.location.origin + "/img/ONB-SetPay.png"} />
                  </figure>
                  <p>Set prices and calendar </p>
                </li>
                <li>
                  <figure>
                    <img alt="" src={window.location.origin + "/img/ONB-TakeReservations.png"} />
                  </figure>
                  <p>Take reservations</p>
                </li>
                <li>
                  <figure>
                    <img alt="" src={window.location.origin + "/img/ONB-GetPaid.png"} />
                  </figure>
                  <p>Get paid for bookings</p>
                </li>
              </ul>
              <Link to="addpool">
                <Typography variant="button">Get Started</Typography>
              </Link>
            </div>
          </div>
          <img style={{ position: "absolute", visibility: "hidden" }} src={"https://www.ref-r.com/campaign/t1/settings?bid_e=35B20B04DB28FDCEF3DCACD87B6962B5&bid=26502&t=420&event=sale&email=" + emailAddress + "&orderID=" + emailAddress + "&purchaseValue=0&fname=" + firstName} alt="" />
        </div>
      </Typography>
    );
  }
}
HostPrompt.propTypes = {
  classes: PropTypes.object.isRequired
};

const enhance = compose(
  withStyles(styles),
  withApollo,
  withRouter
);

function HostPromptContainer (props) {
  const userContext = useContext(UserContext)
  return <HostPrompt {...userContext} {...props} />
}

export default enhance(HostPromptContainer);
