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
const amenitiesAdditionalMutation = loader(
  "./../../graphql/host/amenitiesadditionalmutation.graphql"
);
const pooldetailsQuery = loader(
  "./../../graphql/findpool/pooldetailsQuery.graphql"
);

const styles = theme => ({
  addPoolContainer: {
    "& p": {
      fontWeight: "300",
      fontSize: "13px"
    }
  },
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
      fontSize: "12px",
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
        opacity: "0.6"
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
    paddingTop: "20px",
    '@media (max-width:767px)': {
      maxWidth: "100%",
    }
  },
  nextButton: {
    marginTop: "35px",
    '@media (max-width:767px)': {
      marginBottom: "45px"
    }
  },
  toggleBox: {
    listStyle: "none",
    display: "flex",
    paddingLeft: "0",
    margin: "0",
    cursor: "pointer",
    "& li": {
      padding: "8px 30px",
      border: "1px solid #ccc",
      "&:first-child": {
        borderRadius: "5px 0px 0px 5px"
      },
      "&:last-child": {
        marginLeft: "-1px",
        borderRadius: "0px 5px 5px 0px"
      }
    }
  },
  activeToggle: {
    border: "1px solid #12bfea !important",
    zIndex: 1,
    color: "#12bfea !important"
  }
});

class AmenitiesAdditional extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 33.2,
      restroomAccess: false,
      additionalAmenities: "",
      restroomDescription: "",
      poolID: "",
      loading: false,
      hostError: ""
    };
    this.handleAdditionalAmenities = this.handleAdditionalAmenities.bind(this);
    this.handleRestRoomDescription = this.handleRestRoomDescription.bind(this);
    this.redirectToDimensions = this.redirectToDimensions.bind(this);
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
            if (res.data.pool.restroom_description !== null && res.data.pool.restroom_description !== '') {
              res.data.pool.restroom_description = res.data.pool.restroom_description.replace(regex, '');
            }
            if (res.data.pool.additional_amenities !== null && res.data.pool.additional_amenities !== '') {
              res.data.pool.additional_amenities = res.data.pool.additional_amenities.replace(regex, '');
            }

            this.setState({
              restroomAccess: res.data.pool.restroom_access,
              additionalAmenities: res.data.pool.additional_amenities,
              restroomDescription: res.data.pool.restroom_description,
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
  handleAdditionalAmenities(e) {
    this.setState({ additionalAmenities: e.target.value });
  }
  handleRestRoomDescription(e) {
    this.setState({ restroomDescription: e.target.value });
  }
  handleRestRoomAccess(val) {
    this.setState({ restroomAccess: val === "true" ? true : false });
  }
  redirectToDimensions() {
    let {
      restroomDescription,
      restroomAccess,
      additionalAmenities,
      poolID
    } = this.state;
    let { backBtnChange, history } = this.props;
    this.setState({ loading: true });
    let data = {
      pool_id: parseInt(poolID) || "",
      restroom_access: restroomAccess || false,
      additional_amenities: additionalAmenities || "",
      restroom_description: restroomDescription || ""
    };
    this.props.client
      .mutate({
        mutation: amenitiesAdditionalMutation,
        variables: {
          data: data
        }
      })
      .then(res => {
        if (backBtnChange === true) {
          history.push("editpool");
        } else {
          let dimensionsStatus = true;
          this.props.redirectToDimensions(dimensionsStatus);
        }
      })
      .catch(error => {
        let errorMsg = commonFunctions.parseGraphQLErrorMessage(error);
        this.setState({
          hostError: errorMsg,
          loading: false
        });
      });
  }

  handleBackBtn() {
    let status = UserUtils.getEditPoolStatus();
    let { history } = this.props;
    if (status === "additional_amenties") {
      history.push("editpool");
    } else {
      let amenitiesAdditionalStatus = false;
      this.props.redirectToAmenitiesList(amenitiesAdditionalStatus);
    }
  }

  render() {
    const { classes, backBtnChange } = this.props;
    const {
      loading,
      hostError,
      activeStep,
      restroomAccess,
      restroomDescription,
      additionalAmenities
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
            <Typography variant="h3">Additional Amenities</Typography>
            <p>List additional things that renters may be interested in</p>
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
                CHANGING ROOM OR RESTROOM ACCESS?
                <p>(Listings with restroom access often receive more requests and accommodate longer reservations)</p>
              </Typography>
              <ul className={classes.toggleBox}>
                <li
                  className={
                    restroomAccess !== false ? classes.activeToggle : ""
                  }
                  onClick={this.handleRestRoomAccess.bind(this, "true")}
                >
                  Yes
                </li>
                <li
                  className={
                    restroomAccess !== false ? "" : classes.activeToggle
                  }
                  onClick={this.handleRestRoomAccess.bind(this, "false")}
                >
                  No
                </li>
              </ul>
            </div>
            {restroomAccess === true ? (
              <div className={classes.formInputBox}>
                <Typography variant="subtitle2" component="label">
                  DESCRIBE RESTROOM / CHANGING ROOM ACCOMMODATIONS
                </Typography>
                <TextField
                  id="outlined-email-input"
                  placeholder="e.g. The restroom is located inside the house"
                  type="text"
                  name="email"
                  autoComplete=""
                  margin="normal"
                  variant="outlined"
                  fullWidth={true}
                  multiline={true}
                  rowsMax={8}
                  rows={3}
                  value={restroomDescription}
                  onChange={this.handleRestRoomDescription}
                  onInput={e => {
                    e.target.value = e.target.value.slice(0, 140);
                  }}
                />
              </div>
            ) : (
                ""
              )}
            <div className={classes.formInputBox}>
              <Typography variant="subtitle2" component="label">
                ADDITIONAL AMENITIES
              </Typography>
              <TextField
                id="outlined-email-input"
                placeholder="e.g. Bluetooth speakers, patio umbrellas"
                type="text"
                name="email"
                autoComplete=""
                margin="normal"
                variant="outlined"
                fullWidth={true}
                multiline={true}
                rowsMax={8}
                rows={8}
                value={additionalAmenities}
                onChange={this.handleAdditionalAmenities}
                onInput={e => {
                  e.target.value = e.target.value.slice(0, 500);
                }}
              />
            </div>
            <div className={classes.nextButton}>
              <Typography variant="button" onClick={this.redirectToDimensions}>
                {backBtnChange === true ? "Save" : "Next"}
              </Typography>
            </div>
          </div>
        </div>
      </Typography>
    );
  }
}
AmenitiesAdditional.propTypes = {
  classes: PropTypes.object.isRequired
};

const enhance = compose(
  withStyles(styles, { withTheme: true }),
  withApollo,
  withRouter
);

export default enhance(AmenitiesAdditional);
