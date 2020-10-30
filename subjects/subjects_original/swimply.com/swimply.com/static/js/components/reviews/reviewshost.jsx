import React, {useContext} from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import StarRatings from "react-star-ratings";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { withRouter } from "react-router-dom";
import UserUtils from "../utilities/UserUtils";
import compose from "recompose/compose";
import { loader } from "graphql.macro";
import { withApollo } from "react-apollo";
import * as commonFunctions from "../utilities/commonFunctions";
import Pageloader from "../commons/pageloader";
import UserContext from "../../contexts/UserContext";
const hostreviewMutation = loader("./../../graphql/reviews/hostreview.graphql");
const reviewsDetails = loader(
  "./../../graphql/reviews/reviewsdetails.graphql"
);

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
    },
    "& > a": {
      display: "block",
      color: theme.palette.common.blue,
      marginBottom: "7px",
      textDecoration: "none"
    }
  },
  profileMain: {
    paddingTop: "40px",
    "& h2": {
      marginBottom: "35px",
      "& span": {
        float: "right",
        fontSize: "14px",
        verticalAlign: "middle",
        color: theme.palette.common.blue
      }
    }
  },
  bigAvatar: {
    margin: 0,
    width: 120,
    height: 120,
    "@media (max-width:767px)": {
      margin: "0 auto"
    }
  },
  profileMainLeft: {
    display: "flex",
    "@media (max-width:767px)": {
      display: "block"
    }
  },
  profileMainLeftBox: {
    paddingLeft: "25px",
    width: "100%",
    maxWidth: "100%",
    "& h3": {
      marginBottom: "8px"
    },
    "& h6": {
      color: theme.palette.common.blue,
      fontSize: "14px",
      fontWeight: "500"
    },
    "& p:nth-child(4)": {
      color: theme.palette.common.blue,
      paddingTop: "10px",
      "& i": {
        paddingRight: "10px",
        color: theme.palette.common.darkgray,
        fontSize: "20px",
        verticalAlign: "bottom"
      }
    },
    "@media (max-width:767px)": {
      paddingLeft: "0",
      textAlign: "center",
      "& h3": {
        marginTop: "10px"
      }
    }
  },
  profileMainRight: {
    background: theme.palette.common.blue,
    minHeight: "100px",
    color: theme.palette.common.white,
    padding: "35px",
    borderRadius: "10px",
    "& h5": {
      color: theme.palette.common.white
    },
    "& span": {
      display: "inline-block",
      background: theme.palette.common.white,
      color: theme.palette.common.black
    },
    "& span:hover": {
      background: theme.palette.common.white,
      color: theme.palette.common.black
    }
  },
  paymentBox: {
    background: "#f3f5f5",
    maxWidth: "300px",
    padding: "20px",
    "& p": {
      marginTop: 0,
      marginBottom: "5px",
      textTransform: "uppercase",
      color: "#232323",
      fontSize: "16px"
    }
  },
  textFieldTwo: {
    background: "#f3f5f5",
    fontSize: "12px",
    borderRadius: "5px",
    "& > div": {
      padding: "10px 15px",
      fontSize: "14px"
    }
  },
  formInputBox: {
    marginTop: "10px",
    textAlign: "left",
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
      marginBottom: "3px",
      letterSpacing: "0.8px"
    },
    "& input": {
      background: theme.palette.common.gray,
      position: "relative",
      width: "100%",
      padding: "10px 15px ",
      fontWeight: "normal",
      border: "1px solid #f3f5f5",
      fontSize: "14px",
      borderRadius: "5px",
      "&:focus": {
        border: "1px solid #00ade2"
      }
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
  reviewBtn: {
    "& span": {
      display: "inline-block",
      minWidth: "250px"
    },
    "@media (max-width:767px)": {
      "& span": {
        width: "calc(100% - 50px)"
      }
    }
  },
  disabledBtn: {
    background: "#d1d4d8",
    minWidth: "250px",
    padding: " 10px 25px",

    "& span": {
      marginTop: "0px",
      display: "inline-block",
      minWidth: "250px"
    },
    "@media (max-width:767px)": {
      width: "100%"
    }
  },
  errorMessage: {
    "& > div": {
      border: "1px solid red",
      borderRadius: "5px"
    }
  },
  errorLabelMessage:{
    maxWidth:'100%'
  }
});

class Reviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 0,
      comment: "",
      reviewsFailError: "",
      loading: false,
      ratingStatus: false,
      showCommentError: false,
      userDetails: {},
      user_id: "",
      booking_id: "",
      errorMessage:''
    };
    this.handleChangeRating = this.handleChangeRating.bind(this);
    this.handleComment = this.handleComment.bind(this);
    this.validateComment = this.validateComment.bind(this);
    this.submitReviews = this.submitReviews.bind(this);
  }

  componentDidMount() {
    let { history } = this.props;

    let bookingId = parseInt(this.props.match.params.bookingId);    
    let role = UserUtils.getUserRole();
    let accessToken = UserUtils.getAccessToken();
    if (accessToken !== null && accessToken !== "") {
      
      if (isNaN(bookingId)) {
        if (role === "Host") {
          history.push("/host-reservation");
        } else {
          history.push("/my-reservation");
        }
      } else {
        this.setState({
          loading: true,
          booking_id: bookingId
        });
        this.props.client
          .query({
            query: reviewsDetails,
            variables: {
              id: parseInt(bookingId)
            },
            fetchPolicy: "no-cache"
          })
          .then(res => {
            this.setState({
              userDetails: res.data.reservationDetails.user,
              user_id:res.data.reservationDetails.user.id,
              bookingId: bookingId,
              loading: false
            });
          })
          .catch(error => {
            if (role === "Host") {
              history.push("/host-reservation");
            } else {
              history.push("/my-reservation");
            }
            this.setState({ loading: false });
          });
      }
    } else {
      UserUtils.logout();
      UserUtils.setPreviousUrl(this.props.location.pathname);
      UserUtils.setPreviousSearchUrl(this.props.location.search);
      UserUtils.setIsPreviousUrl('yes');
      history.push("/");
    }
  }

  handleChangeRating(newRating) {
    this.setState({
      rating: newRating,
      ratingStatus: true
    });
  }
  handleComment(e) {
    this.setState({ comment: e.target.value });
  }
  validateComment() {
    let { comment } = this.state;

    let hasError = false;
    if (commonFunctions.isEmpty(comment)) {
      hasError = true;
    }
    this.setState({
      showCommentError: hasError === true ? true : false
    });
    return hasError === true ? false : true;
  }
  validateForm() {
    let hasError = false;
    if (!this.validateComment()) {
      hasError = true;
    }
    return hasError === true ? false : true;
  }
  submitReviews() {
    let { history } = this.props;
    let { user_id, booking_id, rating, comment } = this.state;
    if (!this.validateForm()) {
      return;
    }
    this.setState({ loading: true });
    this.props.client
      .mutate({
        mutation: hostreviewMutation,
        variables: {
          data: {
            rating: rating,
            comment: comment,
            user_id: user_id,
            booking_id: booking_id
          }
        }
      })
      .then(res => {
        this.setState({
          loading: false
        });
        if(res.data.hostReviewStore.status === 'HOST_REVIEW_SUCCESSFULL') {
          UserUtils.setReviewType('Host');
          history.push("/thankyou");
        } else {
          this.setState({
            errorMessage:res.data.hostReviewStore.message,
            reviewsFailError:''
          })
        }
      })
      .catch(async error => {
        let errorMsg = commonFunctions.parseGraphQLErrorMessage(error);
        this.setState({
          reviewsFailError: errorMsg,
          loading: false,
          errorMessage:''
        });
        if (errorMsg === "Unauthenticated.") {
          const status = await this.props.refreshToken(history)
          if (status === 'ok') {
            this.submitReviews()
          }
        }
      });
  }

  render() {
    let { classes } = this.props;
    let {
      rating,
      comment,
      reviewsFailError,
      loading,
      ratingStatus,
      showCommentError,
      userDetails,
      errorMessage
    } = this.state;
    return (
      <Typography variant="body1" component="span">
        {loading === true ? <Pageloader loading={loading} /> : ""}
        <div className={classes.container}>
          <div className={classes.profileMain}>
            <Typography variant="h2">Review this swimmer</Typography>
            <Grid container spacing={24}>
              <Grid item xs={12} sm={12} md={8}>
                <div className={classes.profileMainLeft}>
                  <Avatar
                    alt=""
                    src={
                      (userDetails.img_url === "" || userDetails.img_url === null)
                        ? window.location.origin + "/img/profile-icon.png"
                        : userDetails.img_url
                    }
                    className={classes.bigAvatar}
                  />
                  <div className={classes.profileMainLeftBox}>
                    {reviewsFailError === "" ? (
                      ""
                    ) : (
                      <Typography variant="caption" component="p">
                        {reviewsFailError}
                      </Typography>
                    )}
                    {errorMessage === "" ? "" : <Typography variant="caption" className={classes.errorLabelMessage} component="p">{errorMessage}</Typography>}
                    {userDetails.id !== undefined ? (
                      <Typography variant="h3">
                        {userDetails.firstname}{(userDetails.lastname !== undefined && userDetails.lastname !== null && userDetails.lastname !== ''?(userDetails.lastname.charAt(0)):'')}
                        .
                      </Typography>
                    ) : (
                      ""
                    )}
                    <div className="ratingNew">
                      <StarRatings
                        rating={rating}
                        changeRating={this.handleChangeRating}
                        numberOfStars={5}
                        name="rating"
                        starRatedColor="#00ade2"
                        starDimension="20px"
                        starSpacing="1px"
                        starHoverColor="#00ade2"
                      />
                    </div>
                    <div className={classes.formInputBox}>
                      <Typography variant="subtitle2" component="label">
                        HOW WAS THIS SWIMMER?
                      </Typography>
                      <TextField
                        id="outlined-email-input"
                        className={
                          showCommentError === false
                            ? classes.textFieldTwo
                            : classes.textFieldTwo + " " + classes.errorMessage
                        }
                        placeholder="Was this a good guest? Did they follow pool rules? Would you rent to them again?"
                        type="text"
                        name="pool"
                        margin="normal"
                        variant="outlined"
                        multiline={true}
                        rows={4}
                        rowsMax={4}
                        value={comment}
                        onChange={this.handleComment}
                        onInput={e => {
                          e.target.value = e.target.value.slice(0, 280);
                        }}
                      />
                    </div>
                    <div className={classes.reviewBtn}>
                      {ratingStatus !== true ? (
                        <Button disabled className={classes.disabledBtn}>
                          Submit Review
                        </Button>
                      ) : (
                        <Typography
                          variant="button"
                          onClick={this.submitReviews}
                        >
                          Submit Review
                        </Typography>
                      )}
                    </div>
                  </div>
                </div>
              </Grid>
            </Grid>
          </div>
        </div>
      </Typography>
    );
  }
}
Reviews.propTypes = {
  classes: PropTypes.object.isRequired
};

const enhance = compose(
  withStyles(styles),
  withRouter,
  withApollo
);

function ReviewsContainer (props) {
  const context = useContext(UserContext)
  return <Reviews {...context} {...props} />
}

export default enhance(ReviewsContainer);
