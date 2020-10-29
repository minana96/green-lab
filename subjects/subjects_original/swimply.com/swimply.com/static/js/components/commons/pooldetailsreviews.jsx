import React from "react";
import PropTypes from "prop-types";
import compose from "recompose/compose";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
// import StarRatings from "react-star-ratings";
import moment from 'moment';

const styles = theme => ({
  reviewContainer: {
    "& ul": {
      width: "100%",
      maxWidth: "100%",
      paddingLeft: 0,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      "& li": {
        width: "100%",
        display: "flex",
        verticalAlign: "text-top",
        flexDirection: 'column',
        marginBottom: "15px",
        flex: 1,
        // minWidth: 325,
        maxWidth: '500px',
        marginRight: 25,
        "& figure": {
          margin: "0",
          paddingRight: "15px",
          "& img": {
            borderRadius: "50%",
            height: "60px",
            width: "60px"
          }
        },
        '& p': {
          color: theme.palette.common.darkgray,
          marginTop: 5
        }
      }
    }
  },
  reviewContent: {
    width: "100%",
    display: 'flex',
    flexDirection: 'row',
    "& h6": {
      marginBottom: "1px",
      fontWeight: "500",
      color: theme.palette.common.black,
      fontSize: "14px",
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%',
      alignItems: 'center',
      '& .column': {
        display: 'flex',
        flexDirection: 'column',
        '& span': {
          fontSize: 15,
          fontWeight: 200,
        },
        '& .bold': {
          fontWeight: 500,
          margin: '7px 0'
        }
      },
      "& img": {
        margin: '0 5px -3px',
        width: 18,
        height: 17
      },
      '& h4': {
        fontSize: 17
      }
    },
    // "& span": {
    //   fontSize: "10px",
    //   color: "#adadad"
    // },
    // "& p": {
    //   marginTop: "5px",
    //   color: theme.palette.common.darkgray,
    // },
    // "& time": {
    //   fontSize: "12px",
    //   color: "#ccc"
    // }
  },
  similarContentBox: {
    position: "relative",
    overflow: "hidden",
    marginTop: "20px",
    "& img": {
      width: "100%"
    }
  },
  similarListing: {
    borderBottom: "15px solid #1bccf0",
    paddingBottom: "30px",
    "& Button": {
      position: "absolute",
      top: "10px",
      left: "0",
      borderRadius: 0,
      fontSize: 12,
      padding: "3px 15px",
      "& sub": {
        fontSize: "9px",
        marginTop: "-3px",
        left: "5px",
        position: "relative",
        textTransform: "lowercase"
      }
    }
  },
  similarCaption: {
    position: "absolute",
    bottom: "0",
    color: theme.palette.common.white,
    padding: "15px 15px 10px",
    "& h3": {
      fontSize: "16px",
      color: theme.palette.common.white
    },
    "& p": {
      margin: "0",
      fontSize: "12px",
      fontWeight: "100"
    }
  },
  reviewRating: {
    display: 'flex',
    justifySelf: 'flex-end',
  }
});

class PoolDetailsReviews extends React.Component {
  /**
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {};
  }
  /**
   * render
   */
  render() {
    const { classes, poolDetails } = this.props;
    return (
      <div className={classes.reviewContainer}>
        <ul>
          {poolDetails.reviews && poolDetails.reviews.length > 0 &&
            poolDetails.reviews.map((review, index) => {
              let reviewDate = moment.utc(review.created_at).toDate();
              reviewDate = moment(reviewDate).local().format('MMMM YYYY');
              let lastName = '';
              if(review.commentedBy && review.commentedBy.lastname) {
                lastName = ' '+review.commentedBy.lastname.charAt(0).toUpperCase()+'.';
              } else {
                lastName = '.';
              } 
              return (
              <li key={index} className={classes.row}>
                <div className={classes.reviewContent}>
                  <figure>
                    <img
                      alt=""
                      src={
                        review.commentedBy && review.commentedBy.img_url
                          ? review.commentedBy.img_url
                          : window.location.origin + "/img/profile-icon.png"
                      }
                    />
                  </figure>
                  <Typography variant="h6">
                    <div className='column'>
                      <span className='bold'>
                        {review.commentedBy ? review.commentedBy.firstname : ''}
                        {lastName}
                      </span>
                      <span>{reviewDate}</span>
                    </div>
                    <div className={classes.reviewRating}>
                      <img src={window.location.origin + "/img/icons/star.png"} alt='' />
                      <Typography variant='h4'>
                        {
                          review.rating === null || review.rating === ""
                            ? 0
                            : +parseFloat(review.rating).toFixed(1)
                        }
                      </Typography>
                      {/* <StarRatings
                        rating={
                          review.rating === null || review.rating === ""
                            ? 0
                            : review.rating
                        }
                        changeRating={this.changeRating}
                        numberOfStars={5}
                        name="rating"
                        starRatedColor="#00ade2"
                        starDimension="18px"
                        starSpacing="1px"
                      /> */}
                    </div>
                  </Typography>
                  {/* {reviewDate} */}
                </div>
                <p dangerouslySetInnerHTML={{ __html: review.comment }}/>
              </li>
            )})}
        </ul>
      </div>
    );
  }
}

PoolDetailsReviews.propTypes = {
  classes: PropTypes.object.isRequired
};

const enhance = compose(
  withStyles(styles),
  withRouter
);

export default enhance(PoolDetailsReviews);
