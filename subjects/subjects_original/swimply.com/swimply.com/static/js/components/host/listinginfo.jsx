import React from "react";
import compose from "recompose/compose";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { withApollo } from "react-apollo";
import Pageloader from "../commons/pageloader";
import TextField from "@material-ui/core/TextField";
import { withRouter } from "react-router-dom";
import Stepper from "./stepper";
import { loader } from "graphql.macro";
import * as commonFunctions from "./../utilities/commonFunctions";
import UserUtils from "./../utilities/UserUtils";
import TagManager from 'react-gtm-module';
const listingInfoMutation = loader(
  "./../../graphql/host/listinginfomutation.graphql"
);
const pooldetailsQuery = loader(
  "./../../graphql/findpool/pooldetailsQuery.graphql"
);

const styles = theme => ({
  formInputBox: {
    "& > div > div ": {
      padding: "0"
    },
    "& label + div ": {
      marginTop: "0",
      marginBottom: "0",
      width: "100%"
    },

    position: "relative",
    marginBottom: "20px",
    "& fieldset": {
      opacity: 0
    },

    "& label": {
      textTransform: "uppercase",
      fontSize: "13px",
      marginBottom: "5px",
      letterSpacing: "1px",
      "& p": {
        textTransform: "none",
        margin: '0'
      }
    },
    "& input": {
      background: theme.palette.common.gray,
      position: "relative",
      width: "100%",
      padding: "10px 15px ",
      fontWeight: "normal",
      border: "1px solid #f3f5f5",
      fontSize: "13px",
      borderRadius: "5px",
      "&:focus": {
        border: "1px solid #00ade2"
      },
      "&::placeholder": {
        color: "#000",
        opacity: "0.5"
      },
    },
    "& textarea": {
      background: theme.palette.common.gray,
      padding: "10px 15px ",
      border: "1px solid #f3f5f5",
      fontSize: "13px",
      width: "calc(100% - 30px)",
      borderRadius: "5px",
      "&:focus": {
        border: "1px solid #00ade2"
      },
      "&::placeholder": {
        color: "#000",
        opacity: "0.6"
      },
    },
    "& span": {
      position: "absolute",
      top: "7px",
      bottom: "0",
      margin: "auto",
      height: "0px",
      left: "9px",
      "& img": {
        maxWidth: "20px"
      }
    }
  },
  backStep: {
    marginBottom: "10px",
    color: theme.palette.common.blue,
    cursor: "pointer",
    fontWeight: "500",
    "& i": {
      fontSize: "22px",
      verticalAlign: " text-bottom",
      marginRight: "3px",
      marginTop: "-1px"
    },
    '@media (max-width:767px)': {
      width: '25px',
      height: '25px',
      overflow: 'hidden',
      color: theme.palette.common.black,
      marginBottom: "0px",
      "& i": {
        fontSize: "30px",
      }
    }
  },
  ContentContainer: {
    paddingTop: "15px",
    "& p": {
      fontWeight: "100",
      fontSize: "13px"
    }
  },
  formContainer: {
    maxWidth: "350px",
    paddingTop: "10px",
    '@media (max-width:767px)': {
      maxWidth: "100%",
    }
  },
  nextButton: {
    marginTop: "35px"
  }
});

class ListingInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 16.6,
      listingName: "",
      describePool: "",
      poolID: "",
      hostError: ""
    };
    this.handleListingInfo = this.handleListingInfo.bind(this);
    this.handleDescribePool = this.handleDescribePool.bind(this);
    this.redirectToPricingGuest = this.redirectToPricingGuest.bind(this);
    this.handleBackBtn = this.handleBackBtn.bind(this);
  }
  componentDidMount() {
    let poolID = UserUtils.getHostPoolID();
    if (poolID) {
      this.setState({ loading: true });
      this.props.client
        .query({
          query: pooldetailsQuery,
          variables: {
            id: poolID
          },
          fetchPolicy: "network-only"
        })
        .then(res => {
          if (res.data.pool !== null) {
            const regex = /(<([^>]+)>)/ig;
            res.data.pool.description = res.data.pool.description.replace(regex, '');

            this.setState({
              listingName: res.data.pool.title,
              describePool: res.data.pool.description,
              loading: false,
              poolID: poolID
            });
          } else {
            this.setState({ loading: false });
          }
        })
        .catch(error => {
          let errorMsg = commonFunctions.parseGraphQLErrorMessage(error);
          this.setState({
            loading: false,
            hostError: errorMsg
          });
        });
    }
  }
  handleListingInfo(e) {
    this.setState({ listingName: e.target.value });
  }
  handleDescribePool(e) {
    this.setState({ describePool: e.target.value });
  }

  redirectToPricingGuest() {
    let { listingName, describePool, poolID } = this.state;
    let { backBtnChange, history } = this.props;
    if (listingName !== "") {
      this.setState({ loading: true });
      let data = {
        name: listingName || "",
        description: describePool || "",
        pool_id: parseInt(poolID) || ""
      };
      this.props.client
        .mutate({
          mutation: listingInfoMutation,
          variables: {
            data: data
          }
        })
        .then(res => {
          //Step 2 Save
          TagManager.dataLayer({ 
            dataLayer: {
              poolId: poolID,
              name: data.name,
              description: data.description
            },
            events: {
              RegistrationStep2: 'RegistrationStep2'
            } 
          });

          if (backBtnChange === true) {
            history.push("editpool");
          } else {
            let listingInfoStatus = true;
            this.props.redirectToPricingGuest(listingInfoStatus);
          }
        })
        .catch(error => {
          let errorMsg = commonFunctions.parseGraphQLErrorMessage(error);
          this.setState({
            hostError: errorMsg,
            loading: false
          });
        });
    } else {
      this.setState({
        hostError: "Listing name is required."
      });
    }
  }

  handleBackBtn() {
    let status = UserUtils.getEditPoolStatus();
    let { history } = this.props;
    if (status === "listing_info") {
      history.push("editpool");
    } else {
      let listingInfoStatus = false;
      this.props.redirectToLocation(listingInfoStatus);
    }
  }

  render() {
    const { classes, backBtnChange } = this.props;
    const {
      loading,
      hostError,
      activeStep,
      listingName,
      describePool
    } = this.state;
    return (
      <Typography variant="body1" component="div">
        {loading === true ? <Pageloader loading={loading} /> : ""}
        <div className={classes.locationMain}>
          <div className={classes.backStep} onClick={this.handleBackBtn}>
            <font>
              <i className="fa fa-angle-left" aria-hidden="true" /> BACK
            </font>
          </div>
          {backBtnChange === true ? "" : <Stepper activeStep={activeStep} />}
          <div className={classes.ContentContainer}>
            <Typography variant="h3">Pool name and description</Typography>
            <p>
              Give your pool a creative name and description to help it stand out in search results.
            </p>
          </div>
          {hostError === "" ? (
            ""
          ) : (
              <Typography variant="caption" component="p">
                {hostError}
              </Typography>
            )}
          <div className={classes.formContainer}>
            <div className={classes.formInputBox}>
              <Typography variant="subtitle2" component="label">
                Listing Name
              </Typography>
              <TextField
                id="outlined-email-input"
                placeholder="e.g. Really Cool Pool"
                type="text"
                name="email"
                autoComplete=""
                margin="normal"
                variant="outlined"
                fullWidth={true}
                value={listingName}
                onChange={this.handleListingInfo}
                onInput={e => {
                  e.target.value = e.target.value.slice(0, 32);
                }}
              />
            </div>
            <div className={classes.formInputBox}>
              <Typography variant="subtitle2" component="label">
                Describe your pool and swimming area
                <p>(This is your sales pitch to attract guests)</p>
              </Typography>
              <TextField
                id="outlined-email-input"
                placeholder="e.g. This pool is great for a weekend get together with the whole family!"
                type="text"
                name="email"
                autoComplete=""
                margin="normal"
                variant="outlined"
                fullWidth={true}
                multiline={true}
                rowsMax={8}
                rows={8}
                value={describePool}
                onChange={this.handleDescribePool}
                onInput={e => {
                  e.target.value = e.target.value.slice(0, 1000);
                }}
              />
            </div>
            <div className={classes.nextButton}>
              <Typography
                variant="button"
                onClick={this.redirectToPricingGuest}
              >
                {backBtnChange === true ? "Save" : "Next"}
              </Typography>
            </div>
          </div>
        </div>
      </Typography>
    );
  }
}
ListingInfo.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

const enhance = compose(
  withStyles(styles, { withTheme: true }),
  withApollo,
  withRouter
);

export default enhance(ListingInfo);
