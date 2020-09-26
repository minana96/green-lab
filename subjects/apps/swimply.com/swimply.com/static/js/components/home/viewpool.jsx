import React from "react";
import PropTypes from "prop-types";
import compose from "recompose/compose";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import styles from "./style";
import Typography from "@material-ui/core/Typography";
// import TextField from "@material-ui/core/TextField";
import Slider from "react-slick";
import UserUtils from "../utilities/UserUtils";
import { Button } from "@material-ui/core";
import * as commonFunctions from "../utilities/commonFunctions";
import { withApollo } from "react-apollo";
import { loader } from "graphql.macro";
import Pageloader from "./../commons/pageloader";
import { IS_US, IS_SHVIMPLY } from '../../config'
import { RouterContext } from '../router/router-context'
import JoyspaceBanner from "../shared/joyspace-bunner";
// import HelperService from "../../services/helper";
// import DownloadBanner from "../shared/download-banner";

const contactUs = loader("./../../graphql/user/contactUs.graphql");

const settings = {
  speed: 700,
  slidesToShow: 3,
  slidesToScroll: 3,
  autoplay: true,
  autoplaySpeed: 7000,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
};

const testimonialsSlider = {
  speed: 300,
  slidesToShow: 1,
  slidesToScroll: 1,
  dots: true,
  autoplay: false,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
};

const USPopularSpots = [
  {
    id: 1,
    poolName: "Attractive pool in Burbank",
    city: "Los Angeles, California",
    url: "/pooldetails/2847",
    src: "https://s3.amazonaws.com/swimplyinc-prod/thumbnails/0ot4TK77QJPgEZNXdsANE6yD42BS4lcHKcl9HcN5.jpeg"
  },
  {
    id: 2,
    poolName: "Oak Forest Oasis",
    city: "Houston, Texas",
    url: "/pooldetails/1416",
    src:
      "https://s3.amazonaws.com/swimplyinc-prod/thumbnails/VCdbnE4Nxn6YSwxJgBnxd2lehmOk0vLrqdHK2J7n.jpeg"
  },
  {
    id: 3,
    poolName: "Lap Swim and Serenity",
    city: "Miami Beach, Florida",
    url: "/pooldetails/2963",
    src: "https://s3.amazonaws.com/swimplyinc-prod/thumbnails/2963-77079784571585227370.jpeg"
  },
  {
    id: 4,
    poolName: "Private Oasis Among the Trees",
    city: "Glendale, California",
    url: "/pooldetails/3595",
    src: "https://s3.amazonaws.com/swimplyinc-prod/thumbnails/3595-416659096411590524934.jpeg"
  },
  {
    id: 5,
    poolName: "Incredible Mediterranean Escape",
    city: "Los Angeles, California",
    url: "/pooldetails/2133",
    src: "https://s3.amazonaws.com/swimplyinc-prod/thumbnails/2133-cover14461631351569906662.jpeg"
  }
]
const AUPopularSpots = [
  {
    id: 1,
    poolName: 'Blue Waters',
    price: '$25/hour',
    url: 'https://swimply.com/pooldetails/2362',
    src: '../img/Blue Waters Pool.jpeg'
  },
  {
    id: 2,
    poolName: 'Bali in Melbourne',
    price: '$50/hour',
    url: 'https://swimply.com/pooldetails/2329',
    src: '../img/Bali in Melbourne Pool.jpeg'
  },
  {
    id: 3,
    poolName: 'Large Pool and Tennis Court!',
    price: '$80/hour',
    url: 'https://www.swimply.com/pooldetails/2523',
    src: '../img/Large pool and tennis court!.jpeg'
  }
]

function SampleNextArrow(props) {
  const { className, onClick } = props;
  return (
    <div
      className={className}
      style={{
        position: "absolute",
        top: "50%",
        right: "-3%",
        width: "40px",
        height: "40px",
        background: "url(..img/right-home.png)",
        backgroundPosition: " right",
        zIndex: "9",
        cursor: "pointer",
        opacity: "0.3",
        fontSize: "25px",
        backgroundSize: "cover",
        backgroundRepeat: " no-repeat"
      }}
      onClick={onClick}
    ></div>
  );
}

function SamplePrevArrow(props) {
  const { className, onClick } = props;
  return (
    <div
      className={className}
      style={{
        position: "absolute",
        top: "50%",
        left: "-3%",
        height: "40px",
        width: "40px",
        backgroundPosition: " 0 0",
        background: "url(..img/left-home.png)",
        zIndex: "9",
        cursor: "pointer",
        opacity: "0.3",
        fontSize: "25px",
        backgroundSize: "cover"
      }}
      onClick={onClick}
    ></div>
  );
}
class ViewPool extends React.Component {
  /**
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {
      poolImages: IS_US ? USPopularSpots : AUPopularSpots,
      submitForm: false,
      valideEmail: true,
      name: "",
      email: "",
      description: "",
      errorMessage: "",
      successMessage: "",
      loading: false,
			// tenSecondsPassed: false
    };
    this.handleLoginModelOpen = this.handleLoginModelOpen.bind(this);
    this.goToTop = this.goToTop.bind(this);
		// this.removeOnMouseLeave = this.removeOnMouseLeave.bind(this)
		// this.showEmailCapturePopup = this.showEmailCapturePopup.bind(this)
  }
	static contextType = RouterContext;

	// showEmailCapturePopup () {
	// 	if (!UserUtils.getAccessToken() && !localStorage.getItem('popupShowed') && this.state.tenSecondsPassed) {
	// 		UserUtils.showDiscountPopup(true)
	// 		this.context.showPopupCallback()
	// 		document.body.removeEventListener("mouseleave", this.removeOnMouseLeave)
	// 	}
	// }

	componentWillUnmount() {
		window.removeEventListener('scroll', this.fixedSiderBar, false);
    // document.body.removeEventListener("mouseleave", this.removeOnMouseLeave)
		// this.showEmailCapturePopup()
  }
  
  // componentDidMount () {
	// 	document.body.addEventListener("mouseleave", this.removeOnMouseLeave)

	// 	setTimeout(() => {
  //     this.setState({tenSecondsPassed: true})
  //   }, 10000)
  // }

	// removeOnMouseLeave () {
	// 	this.showEmailCapturePopup()
  // }

  goToTop() {
    let swimplyWorks = document.getElementById("mainbody");
    swimplyWorks.scrollIntoView({ behavior: "smooth" });
  }

  handleLoginModelOpen(type) {
    let accessToken = UserUtils.getAccessToken();
    let userRole = UserUtils.getUserRole();
    let { history } = this.props;
    if (accessToken === null || accessToken === "") {
      window.scrollTo(0, 0);
      if (type === "signup") {
        window.headerComponent.handleModelOpen();
      } else {
        UserUtils.setPreviousUrl("home_top");
        UserUtils.setIsPreviousUrl("yes");
        window.headerComponent.handleLoginModelOpen();
      }
    } else {
      window.scrollTo(0, 0);
      if (type === "signup") {
        if (userRole === "Host") {
          history.push("hostprompt");
        } else {
          history.push("profile");
        }
      }
    }
  }
  redirectToPoolDetails(url) {
    if (/https/.test(url)) {
      window.location.href = url
    } else {
      let { history } = this.props;
      UserUtils.setBackBtnLink("home");
      history.push(url);
    }
  }

  handleInput = e => {
    if (e.target.name === "email") {
      let valideEmail = true;
      if (commonFunctions.validateEmail(e.target.value)) {
        valideEmail = false;
      }
      this.setState({
        [e.target.name]: e.target.value,
        valideEmail
      });
    } else {
      this.setState({
        [e.target.name]: e.target.value
      });
    }
  };

  submitContactForm = e => {
    let { name, email, description, valideEmail } = this.state;
    if (
      name !== "" &&
      email !== "" &&
      valideEmail === false &&
      description !== ""
    ) {
      this.setState({
        loading: true
      });
      let userId = UserUtils.getAccessToken() ? UserUtils.getUserID() : null;
      let data = {
        name: name,
        email: email,
        description: description,
        user_id: userId
      };

      this.props.client
        .mutate({
          mutation: contactUs,
          variables: {
            data: data
          }
        })
        .then(res => {
          this.setState({
            errorMessage: "",
            successMessage: res.data.contactUs.message,
            loading: false,
            submitForm: false,
            valideEmail: false,
            name: "",
            email: "",
            description: ""
          });
        })
        .catch(error => {
          let errorMsg = commonFunctions.parseGraphQLErrorMessage(error);
          this.setState({
            errorMessage: errorMsg,
            successMessage: "",
            loading: false
          });
        });
    } else {
      this.setState({
        submitForm: true
      });
    }
  };

  redirectToAppStore = () => {
    window.open(
      "https://apps.apple.com/us/app/swimply-book-beautiful-pools/id1472785554"
    );
  };

  redirectToPlayStore = () => {
    window.open(
      "https://play.google.com/store/apps/details?id=com.swimply.android"
    );
  };

  /**
   * render
   */
  render() {
    const { classes } = this.props;
    let {
      poolImages,
      // name,
      // email,
      // description,
      // submitForm,
      // valideEmail,
      loading,
      // errorMessage,
      // successMessage
    } = this.state;

    // const host = HelperService.isHost(this.props.user)

    return (
      <div>
        {loading === true ? <Pageloader loading={loading} /> : ""}
        <div className={classes.bgHome + " sliderClassNew"}>
          <div className={classes.container}>
            <div className={classes.sliderImages}>
              <Typography variant="h2" className={classes.headingHTwo}>
                Popular Spots
              </Typography>

              <Slider {...settings}>
                {poolImages.length > 0 &&
                  poolImages.map((img, imgIndex) => (
                    <div
                      key={imgIndex}
                      onClick={this.redirectToPoolDetails.bind(this, img.url)}
                      className={classes.poolDetailsImages}
                    >
                      <img alt="" src={img.src} />
                      <div className={classes.imageTextBlock}>
                        <Typography component="h2">{img.poolName}</Typography>
                        <Typography component="span">{img.city || img.price}</Typography>
                        <Typography component="p">
                          See details{" "}
                          <img
                            alt=""
                            src={window.location.origin + "/img/long-arrow.jpg"}
                          />
                        </Typography>
                      </div>
                    </div>
                  ))}
              </Slider>
              <Button onClick={this.props.redirectSearchPage}>
                Find Pools Near Me
              </Button>
            </div>
          </div>
        </div>
        {IS_SHVIMPLY ? null
        : <div className={classes.yoursDemand}>
          <Typography variant="h2" className={classes.headingHTwo}>
            Yours, on demand
          </Typography>
          <Typography component="p">
          Enjoy the luxury of a private pool whenever you feel like it.
          </Typography>
          <Grid container className={classes.summerBlock} spacing={2}>
            <Grid item xs={12} sm={6}>
              <img alt="" src={window.location.origin + (IS_SHVIMPLY ? '/img/summer.png' : '/img/cropped-home-new-banner.jpg')} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <div className={classes.yoursDemandContent}>
                <Typography variant="h1" className={classes.headingHTwo}>
                A new way to Chill
                </Typography>
                <Typography component="p">
                Owning  a pool can be expensive, enjoying one doesn’t have to be. With {IS_SHVIMPLY ? 'Shvimply' : 'Swimply'}, you will have access to beautiful  Family Friendly pools all over the US and Australia.
                </Typography>
              </div>
            </Grid>
          </Grid>
          <Grid
            container
            className={classes.summerBlock + " " + classes.submmerBlockReverece}
            spacing={2}
          >
            <Grid item xs={12} sm={6}>
              <div className={classes.yoursDemandContent}>
                <Typography variant="h1" className={classes.headingHTwo}>
                  Celebrate
                </Typography>
                <Typography component="p">
                Look out for Party Friendly pools that would love to host your event. Work out details with the host, invite your squad and you're all set.
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <img alt="" src={window.location.origin + "/img/celebrate.png"} />
            </Grid>
          </Grid>
          <Grid container className={classes.summerBlock} spacing={2}>
            <Grid item xs={12} sm={6}>
              <img alt="" src={window.location.origin + "/img/enjoy.png"} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <div className={classes.yoursDemandContent}>
                <Typography variant="h1" className={classes.headingHTwo}>
                And Escape.
                </Typography>
                <Typography component="p">
                Freestyling or me-styling, escape into a world of you. {IS_SHVIMPLY ? 'Shvimply' : 'Swimply'}’s pools are entirely private and yours for the duration of the reservation. Enjoy!
                </Typography>
                <Button onClick={this.goToTop}>Get Started</Button>
              </div>
            </Grid>
          </Grid>
        </div>}
        <div className={classes.container} id="how_swimply_works">
          <div className={classes.howWorks}>
            <Typography variant="h2" className={classes.headingHTwo}>
              {IS_SHVIMPLY ? 'How Shvimply Works' : 'How Swimply Works'}
            </Typography>
            <Typography component="p">
              It's as easy as asking directions. Just more secure and fun.
            </Typography>
            <Grid container className={classes.howWorksContainer} spacing={2}>
              <Grid item xs={12} sm={4}>
                <div className={classes.yoursDemandContent}>
                  <img
                    alt=""
                    src={window.location.origin + "/img/find-pool.jpg"}
                  />
                  <Typography variant="h3" className={classes.headingHTwo}>
                    Find your pool
                  </Typography>
                  <Typography component="p">
                    Request a pool (or two), get approved, then simply confirm.
                    You will only be charged for the pool you confirm with.
                    Pools with the{" "}
                    <img
                      alt=""
                      src={window.location.origin + "/img/clock2.png"}
                    />{" "}
                    icon can be booked instantly.
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={12} sm={4}>
                <div className={classes.yoursDemandContent}>
                  <img
                    alt=""
                    src={window.location.origin + "/img/chat-with-us.jpg"}
                  />
                  <Typography variant="h3" className={classes.headingHTwo}>
                    Chat with host
                  </Typography>
                  <Typography component="p">
                    Communicate easily and coordinate flawlessly through {IS_SHVIMPLY ? 'Shvimply' : 'Swimply'}
                    chat, and enjoy data privacy and user protections.
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={12} sm={4}>
                <div className={classes.yoursDemandContent}>
                  <img alt="" src={window.location.origin + "/img/drive.jpg"} />
                  <Typography variant="h3" className={classes.headingHTwo}>
                    Dive right in
                  </Typography>
                  <Typography component="p">
                    Upon confirmation, you will have access to everything you
                    need to know including address, enter and exit info, and
                    things like the Wi-Fi password. Enjoy!
                  </Typography>
                </div>
              </Grid>
              <div
                className={
                  classes.yoursDemandContent +
                  " " +
                  classes.howWorksContainerBtn
                }
              >
                <Button onClick={this.goToTop}>Get Started</Button>
              </div>
            </Grid>
          </div>
        </div>
        <div className={classes.assets}>
          <Grid container className={classes.summerBlock} spacing={2}>
            <Grid item xs={12} sm={6}>
              <div className={classes.notJustPool}></div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <div className={classes.assetsContent}>
                <Typography variant="h3" className={classes.headingHTwo}>
                  Not just your pool, it’s an asset
                </Typography>
                <Typography component="p">
                  Join thousands of {IS_SHVIMPLY ? 'Shvimply' : 'Swimply'} pool owners earning an effortless
                  income. Cover your operating expenses, cash in on the side,
                  and make other families happy—without compromising your own
                  pool time. Join now and do a victory lap.
                </Typography>
                <Button onClick={e => this.handleLoginModelOpen("signup")}>
                  Sign up
                </Button>
              </div>
            </Grid>
          </Grid>
        </div>
        {IS_SHVIMPLY ? null : <div className={classes.testimonials}>
          <div className={classes.container}>
            <Typography variant="h1">
              Experience their joy for yourself
            </Typography>
            <div className={classes.testmonialSlider}>
              <Slider {...testimonialsSlider}>
                <div className={classes.poolDetailsImages}>
                  <img
                    alt=""
                    src={window.location.origin + "/img/Review1.jpeg"}
                  />
                  <div className={classes.testimonialsContent}>
                    <Typography variant="h2">Amanda M.</Typography>
                    <Typography component="p">
                      "This is a perfect zen pool in the busy city! We live
                      nearby and wanted to experience a day without all the
                      people at public pools or hotels. What a treat! We had an
                      amazing relaxing time in this beautiful backyard and
                      saltwater pool. The pool was super clean and warm. Loved
                      it!"
                    </Typography>
                  </div>
                </div>
                <div className={classes.poolDetailsImages}>
                  <img
                    alt=""
                    src={window.location.origin + "/img/Review2.jpeg"}
                  />
                  <div className={classes.testimonialsContent}>
                    <Typography variant="h2">Alyson H.</Typography>
                    <Typography component="p">
                      "The pool and grounds are absolutely gorgeous - we didn’t
                      want to leave! The charming pool house has a new kitchen,
                      bathroom, shower - everything you could need, including a
                      well-stocked fridge! The hosts were great to communicate
                      with. I highly recommend!"
                    </Typography>
                  </div>
                </div>
                {IS_SHVIMPLY ? null : <div className={classes.poolDetailsImages}>
                  <img
                    alt=""
                    src={window.location.origin + "/img/Review3.png"}
                  />
                  <div className={classes.testimonialsContent}>
                    <Typography variant="h2">Cassandra H.</Typography>
                    <Typography component="p">
                      "The pool was so much fun! Such a great backyard to relax
                      and a great host!! Will be booking again soon."
                    </Typography>
                  </div>
                </div>}
                <div className={classes.poolDetailsImages}>
                  <img
                    alt=""
                    src={window.location.origin + "/img/Review4.jpeg"}
                  />
                  <div className={classes.testimonialsContent}>
                    <Typography variant="h2">Brian W.</Typography>
                    <Typography component="p">
                      "Was super happy with the pool. Very nice back yard and
                      had plenty of tables and chairs which was nice. Very quiet
                      as well which was great."
                    </Typography>
                  </div>
                </div>
              </Slider>
            </div>
          </div>
        </div>}
        <JoyspaceBanner />
        {/*<div className={classes.appDownload}>*/}
        {/*  <div className={classes.container}>*/}
        {/*    <div className={classes.appDownloadFlex}>*/}
        {/*      <div className={classes.appDownloadContent}>*/}
        {/*        <Typography variant="h2">Download. Wind down.</Typography>*/}
        {/*        <Typography component="p">*/}
        {/*          Use the Swimply app to find pools faster, communicate easier,*/}
        {/*          and get the best deals in your area*/}
        {/*        </Typography>*/}
        {/*        <div className={classes.playStoreBlock}>*/}
        {/*          <img*/}
        {/*            alt=""*/}
        {/*            src={window.location.origin + "/img/appstore.png"}*/}
        {/*            onClick={this.redirectToAppStore}*/}
        {/*          />*/}
        {/*          <img*/}
        {/*            alt=""*/}
        {/*            src={window.location.origin + "/img/playstore.png"}*/}
        {/*            onClick={this.redirectToPlayStore}*/}
        {/*          />*/}
        {/*        </div>*/}
        {/*      </div>*/}
        {/*      <div className={classes.imageBlock}>*/}
        {/*        <img*/}
        {/*          alt=""*/}
        {/*          src={window.location.origin + "/img/phones-img.png"}*/}
        {/*        />*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</div>*/}
        {/*<DownloadBanner />*/}
        {/*<div className={classes.contactMain} id='contact-section'>*/}
        {/*  <div className={classes.leafSection}>*/}
        {/*    <img alt="" src={window.location.origin + "/img/leaf-left.png"} />*/}
        {/*    <img alt="" src={window.location.origin + "/img/leaf-right.png"} />*/}
        {/*  </div>*/}
        {/*  <div className={classes.container}>*/}
        {/*    <div className={classes.conatactContainer}>*/}
        {/*      <Typography variant="h2" className={classes.headingHTwo}>*/}
        {/*        We help it go swimmingly*/}
        {/*      </Typography>*/}
        {/*      <Typography component="p">*/}
        {/*        Whether you’re a {IS_SHVIMPLY ? 'Shvimply' : 'Swimply'} pro or just getting your toes wet,*/}
        {/*        we’re here to help*/}
        {/*        <span>*/}
        {/*          email:{" "}*/}
        {/*          <font>*/}
        {/*            <a href={host ? 'mailto:HostCare@swimply.com' : 'mailto:info@swimply.com'}>*/}
        {/*              {host ? 'HostCare@swimply.com' : 'info@swimply.com'}*/}
        {/*            </a>{" "}*/}
        {/*          </font>*/}
        {/*        </span>*/}
        {/*        /!*<span>*!/*/}
        {/*        /!*  US Number: <strong>212-202-0472</strong>*!/*/}
        {/*        /!*</span>*!/*/}
        {/*        /!*<span>*!/*/}
        {/*        /!*  AU Number: <strong>61 2 7202 6240</strong>*!/*/}
        {/*        /!*</span>*!/*/}
        {/*      </Typography>*/}
        {/*      {errorMessage === "" ? (*/}
        {/*        ""*/}
        {/*      ) : (*/}
        {/*        <Typography variant="caption" component="p">*/}
        {/*          {errorMessage}*/}
        {/*        </Typography>*/}
        {/*      )}*/}
        {/*      {successMessage === "" ? (*/}
        {/*        ""*/}
        {/*      ) : (*/}
        {/*        <Typography variant="overline" component="p">*/}
        {/*          {successMessage}*/}
        {/*        </Typography>*/}
        {/*      )}*/}
        {/*      <form>*/}
        {/*        <Grid container className={classes.contactGrid}>*/}
        {/*          <Grid xs={12} sm={6}>*/}
        {/*            <div className={classes.contactNewFormGroup}>*/}
        {/*              <TextField*/}
        {/*                className={*/}
        {/*                  submitForm === true && name === ""*/}
        {/*                    ? classes.errorMessage*/}
        {/*                    : ""*/}
        {/*                }*/}
        {/*                id="standard-name"*/}
        {/*                placeholder="Your Name"*/}
        {/*                margin="normal"*/}
        {/*                name="name"*/}
        {/*                value={name}*/}
        {/*                onChange={this.handleInput}*/}
        {/*              />*/}
        {/*            </div>*/}
        {/*          </Grid>*/}
        {/*          <Grid xs={12} sm={6}>*/}
        {/*            <div className={classes.contactNewFormGroup}>*/}
        {/*              <TextField*/}
        {/*                id="standard-name2"*/}
        {/*                className={*/}
        {/*                  submitForm === true &&*/}
        {/*                  (email === "" || valideEmail === true)*/}
        {/*                    ? classes.errorMessage*/}
        {/*                    : ""*/}
        {/*                }*/}
        {/*                placeholder="Email"*/}
        {/*                margin="normal"*/}
        {/*                name="email"*/}
        {/*                value={email}*/}
        {/*                onChange={this.handleInput}*/}
        {/*              />*/}
        {/*            </div>*/}
        {/*          </Grid>*/}
        {/*          <Grid xs={12} sm={12}>*/}
        {/*            <div className={classes.contactTextArea}>*/}
        {/*              <TextField*/}
        {/*                className={*/}
        {/*                  submitForm === true && description === ""*/}
        {/*                    ? classes.errorMessage*/}
        {/*                    : ""*/}
        {/*                }*/}
        {/*                id="description"*/}
        {/*                placeholder="Message"*/}
        {/*                type="text"*/}
        {/*                name="description"*/}
        {/*                margin="normal"*/}
        {/*                variant="outlined"*/}
        {/*                fullWidth={true}*/}
        {/*                multiline={true}*/}
        {/*                rowsMax={4}*/}
        {/*                rows={4}*/}
        {/*                value={description}*/}
        {/*                onChange={this.handleInput}*/}
        {/*              />*/}
        {/*            </div>*/}
        {/*          </Grid>*/}
        {/*          <Button onClick={this.submitContactForm}>Submit</Button>*/}
        {/*        </Grid>*/}
        {/*      </form>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</div>*/}
      </div>
    );
  }
}

ViewPool.propTypes = {
  classes: PropTypes.object.isRequired
};

const enhance = compose(
  withStyles(styles),
  withRouter,
  withApollo
);

export default enhance(ViewPool);
