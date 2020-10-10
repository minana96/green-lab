import React from "react";
import compose from "recompose/compose";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { withApollo } from "react-apollo";
import { withRouter } from 'react-router-dom';
import Pageloader from "../commons/pageloader";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Stepper from './stepper';
import { loader } from 'graphql.macro';
import * as commonFunctions from './../utilities/commonFunctions';
import UserUtils from './../utilities/UserUtils';
import TagManager from 'react-gtm-module';
const cancellationPolicyMutation = loader('./../../graphql/host/cancellationpolicymutation.graphql');
const pooldetailsQuery = loader('./../../graphql/findpool/pooldetailsQuery.graphql');
const getCancellationPolicyQuery = loader('./../../graphql/host/getcancellationpolicyquery.graphql');

const styles = theme => ({
  stepperNew: {
    padding: "0",
    maxWidth: "350px",
    "& > div": {
      background: theme.palette.common.blue
    }
  },

  backStep: {
    marginBottom: '10px',
    color: theme.palette.common.blue,
    cursor: 'pointer',
    fontWeight: '500',
    '& i': {
      fontSize: '22px',
      verticalAlign: ' text-bottom',
      marginRight: '3px',
      marginTop: '-1px',
    },
    '@media (max-width:767px)':{
      width:'25px',
      height:'25px',
      overflow:'hidden',
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
  },

  checkedImg: {
    maxWidth: "20px"
  },
  PrivacyBox: {
    paddingLeft: "0",
    "& li": {
      display: "flex",
      background: "#f3f5f5",
      marginBottom: "10px",
      padding: "20px 15px",
      "& span": {
        paddingTop: "0"
      }
    }
  },
  PrivacyBoxLabel: {
    color: theme.palette.common.black,
    fontWeight: "500",
    marginLeft: "-13px",
    "& span": {
      display: "block",
      color: "#7b858b",
      fontSize: "12px",
      fontWeight: "normal"
    }
  },
  checkboxBtn: {
    '& > div > label': {
      background: ' #f4f5f5',
      border: '1px solid #f4f5f5 ',
      marginBottom: '10px',
      padding: '25px 15px',
      width: 'calc(100% - 30px)',
      margin: '5px 0',
      '& > span:first-child': {
        // marginTop: '-38px',
        paddingLeft: '0'
      }
    }
  },
  checkBox: {
    top: 0,
    bottom: 0,
    margin: 'auto'
  },
  activeCheckbox: {
    background: '#fff !important',
    border: '1px solid #60bfed !important',

  },
  privacyTittle: {
    '& > div': {
      fontSize: '12px',
      color: '#7b858b'
    },
    '& > span': {
      fontWeight: '500'
    },
    '& > img': {
      marginTop: '-10px'
    }
  },
  disableBtn: {
    background: '#ccc',
    width: '100%',
    padding: '10px 15px',
    cursor: 'default',
    '&:hover': {
      background: '#ccc',
    }
  },
});

class CancellationPolicy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 83,
      cancellationPolicies: [],
      poolCancellationID: '',
      loading: false,
      hostError: '',
      selectedPrivacy: false,
      poolID: '',
      poolDetails: {}
    };
    this.handleCheckbox = this.handleCheckbox.bind(this);
    this.redirectToPayout = this.redirectToPayout.bind(this);
    this.handleBackBtn = this.handleBackBtn.bind(this);
    this.redirectToEditPool = this.redirectToEditPool.bind(this);
  }
  componentDidMount() {
    let poolID = UserUtils.getHostPoolID();
    this.setState({ poolID: poolID });
    if (poolID) {
      this.setState({ loading: true });
      this.props.client.query({
        query: getCancellationPolicyQuery,
        fetchPolicy: "network-only",
        variables: {
          active: true
        },
      })
        .then((res) => {

          if (res.data.cancellationPolicies !== null) {
            this.setState({
              cancellationPolicies: res.data.cancellationPolicies,
              loading: false,
            });
          } else {
            this.setState({ loading: false });
          }
        }).catch((error) => {
          let errorMsg = commonFunctions.parseGraphQLErrorMessage(error);
          this.setState({
            loading: false,
            hostError: errorMsg,
          })
        });

      this.props.client.query({
        query: pooldetailsQuery,
        variables: {
          "id": poolID
        },
        fetchPolicy: "network-only"
      })
        .then((res) => {

          if (res.data.pool !== null) {
            let selectedPrivacy = [];
            let cancellationPolicy = res.data.pool.cancellation_policy;
            let cancellationPolicyData = this.state.cancellationPolicies.map((data) => {
              if (cancellationPolicy !== null && cancellationPolicy.id === data.id) {
                data.checked = true;
              } else {
                data.checked = false;
              }
              return data;
            })
            let data = cancellationPolicyData.filter(item => item.checked);
            data.map((data) => { return selectedPrivacy.push(data.id) }).join(', ');

            this.setState({
              poolDetails: res.data.pool,
              cancellationPolicies: cancellationPolicyData,
              loading: false,
              poolCancellationID: (cancellationPolicy !== null ) ? cancellationPolicy.id : ''
            });

          } else {
            this.setState({ loading: false });
          }
        }).catch((error) => {
          let errorMsg = commonFunctions.parseGraphQLErrorMessage(error);
          this.setState({
            loading: false,
            hostError: errorMsg,
          })
        });
    }
  }
  handleCheckbox(e) {
    let { cancellationPolicies } = this.state;
    let amenities = cancellationPolicies.map((data) => {
      if (e.target.value === data.id) {
        data.checked = true;
      } else {
        data.checked = false;
      }
      return data;
    })
    this.setState({
      cancellationPolicies: amenities,
      poolCancellationID: e.target.value,
    });
  }
  redirectToPayout() {
    let { poolCancellationID, poolID, poolDetails } = this.state;
    this.setState({ loading: true });
    let data = {
      pool_id: parseInt(poolID) || "",
      pool_cancellation_id: poolCancellationID || ""
    }
    this.props.client.mutate({
      mutation: cancellationPolicyMutation,
      variables: {
        data: data
      }
    })
      .then((res) => {
        let status = UserUtils.getEditPoolStatus();
        let { history } = this.props;
        let dataLayerData = {
            poolId: poolID,
            poolName: poolDetails.title,
            amenities: poolDetails.amenities,
            rules: poolDetails.rules,
            privacy: poolDetails.privacy_policy,
            price: poolDetails.hourly_price,
            userId: poolDetails.createdBy.id,
            hostEmail: poolDetails.createdBy.email,
            size: poolDetails.shallow_end,
            depth:  poolDetails.deep_end,
            address: poolDetails.full_address,
            City: poolDetails.city,
            State: poolDetails.state,
            ZIP: poolDetails.zip_code,
          };
        TagManager.dataLayer({
          dataLayer: dataLayerData,
          events: {
            hostPosting: 'hostPosting'
          }
        });
        // TODO need to redirect to availability screen
        if (status === 'cancellation_policy') {
          history.push('editpool');
        } else {
          let payoutStatus = true;
          this.props.redirectToPayout(payoutStatus);
        }
      }).catch((error) => {
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
    if (status === 'cancellation_policy') {
      history.push('editpool');
    } else {
      let payoutStatus = false;
      this.props.redirectToImages(payoutStatus);
    }
  }
  redirectToEditPool() {
    let { history } = this.props;
    history.push('editpool');
  }

  render() {
    const { classes, backBtnChange } = this.props;
    const { loading, activeStep, cancellationPolicies, poolCancellationID } = this.state;
    return (
      <Typography variant="body1" component="div">
        {loading === true ? <Pageloader loading={loading} /> : ""}
        <div className={classes.locationMain}>
          <div className={classes.backStep} onClick={this.handleBackBtn}>
            <font><i className="fa fa-angle-left" aria-hidden="true"></i> BACK</font>
          </div>

          {backBtnChange === true ? "" : <Stepper activeStep={activeStep} />}
          <div className={classes.ContentContainer}>
            <Typography variant="h3">Cancellation Policy</Typography>
            <p>Choose among the three cancellations policies</p>
          </div>
          <div className={classes.formContainer}>
            <FormControl component="fieldset" className={classes.formControl + " " + classes.checkboxBtn}>

              <RadioGroup
                aria-label="Gender"
                name="gender1"
                className={classes.group}
                value={poolCancellationID}
                onChange={this.handleCheckbox}
              >
                {cancellationPolicies.map((privacy, i) =>
                  <FormControlLabel
                    value={privacy.id}
                    key={`privacy-${privacy.id}`}
                    className={privacy.checked ? classes.activeCheckbox : ""}
                    control={
                      <Radio
                        className={classes.checkBox}
                        checked={privacy.checked}
                        disableRipple={true}
                        icon={<img alt="" src={window.location.origin + "/img/Check-Unchecked.png"} className={classes.checkedImg} />}
                        checkedIcon={<img alt="" src={window.location.origin + "/img/Check-Checked.png"} className={classes.checkedImg} />}
                      />
                    }
                    label={
                      <div className={classes.privacyTittle}>
                        <span>{privacy.title}</span>
                        <div>{privacy.description}</div>
                      </div>
                    } />

                )
                }
              </RadioGroup>
            </FormControl>

            <div className={classes.nextButton}>



              {poolCancellationID !== "" ? <div className={classes.nextButton} >

             <Typography variant="button" onClick={this.redirectToPayout}>
                {backBtnChange === true ? 'Save' : 'Next'}
							</Typography>

              </div> :
                <Button variant="button" className={classes.disableBtn}>
                  Next
					</Button>}

            </div>
          </div>
        </div>
      </Typography>
    );
  }
}
CancellationPolicy.propTypes = {
  classes: PropTypes.object.isRequired
};

const enhance = compose(
  withStyles(styles),
  withApollo,
  withRouter,
);

export default enhance(CancellationPolicy);
