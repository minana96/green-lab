import React, {useContext} from 'react';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { withApollo } from "react-apollo";
import Pageloader from '../commons/pageloader';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import Stepper from './stepper';
import { loader } from 'graphql.macro';
import TagManager from 'react-gtm-module';
import UserUtils from './../utilities/UserUtils';
import * as commonFunctions from './../utilities/commonFunctions';
import UserContext from '../../contexts/UserContext';
const createProfileMutation = loader('./../../graphql/auth/createprofile.graphql');

const styles = theme => ({
	stepperNew: {
		padding: '0',
		maxWidth: '350px',
		'& > div': {
			background: theme.palette.common.blue,
		},
	},
	formInputBox: {
		'& > div > div ': {
			padding: '0',
		},
		'& label + div ': {
			marginTop: '0',
			marginBottom: '0',
			width: '100%'
		},
		position: "relative",
		marginBottom: "20px",
		'& fieldset': {
			opacity: 0,
		},
		'& label': {
			textTransform: "uppercase",
			fontSize: '12px',
			marginBottom: '5px',
			letterSpacing: '1px'
		},
		'& input': {
			background: theme.palette.common.gray,
			position: "relative",
			width: "100%",
			padding: "10px 15px ",
			fontWeight: "normal",
			border: '1px solid #f3f5f5',
			fontSize: '13px',
			borderRadius: '5px',
			maxWidth: '40px',
			textAlign: 'left',
			'&:focus': {
				border: '1px solid #00ade2'
			},
			"&::placeholder": {
				color: "#000",
				opacity: "0.5"
				},
		},
		'& textarea': {
			background: theme.palette.common.gray,
			padding: "10px 15px ",
			border: '1px solid #f3f5f5',
			fontSize: '13px',
			width: 'calc(100% - 30px)',
			borderRadius: '5px',
			'&:focus': {
				border: '1px solid #00ade2'
			},
			"&::placeholder": {
        color: "#000",
        opacity: "0.6"
        },
		},
		'& span': {
			position: "absolute",
			top: "3px",
			bottom: "0",
			margin: "auto",
			height: "0px",
			left: "50px",
			zIndex: '1',
			fontWeight: 'normal',
			'& img': {
				maxWidth: '20px'
			}
		},
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
		paddingTop: '15px',
		'& p': {
			fontWeight: '100',
			fontSize: '13px',
		}
	},
	formContainer: {
		maxWidth: '350px',
		paddingTop: '10px',
		'@media (max-width:767px)': {
			maxWidth: "100%",
		}
	},
	nextButton: {
		marginTop: '35px',
	},
	uploadInput: {
		fontFamily: "'Poppins', sans-serif",
		position: 'relative',
		paddingTop: '25px',
		'& label': {
			letterSpacing: '0.5px',
		},
		'& input': {
			position: 'absolute',
			left: 0,
			right: 0,
			width: '100%',
			margin: 'auto',
			top: 0,
			height: '100%',
			opacity: 0,
			cursor: 'pointer',
		},
		'& > div': {
			margin: '0 auto',
			width: '80px',
			height: '80px',
		},

		paddingBottom: '0',
		textAlign: 'center',
		'& p': {
			fontSize: '12px',
			color: theme.palette.common.blue,
			cursor: 'pointer',
			marginTop: '5px',
			paddingBottom: '8px',
		}
	},
});

class Profile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			activeStep: 99,
			profileImage: '',
			aboutYourself: '',
			loading: false,
			imageError:'',
			isModify: false,
		}
		this.setCoverImages = this.setCoverImages.bind(this);
		this.handleAboutYourself = this.handleAboutYourself.bind(this);
		this.redirectToCompletedStatus = this.redirectToCompletedStatus.bind(this);
		this.handleBackBtn = this.handleBackBtn.bind(this);
		// this.sendCreatingPoolAnalytics = this.sendCreatingPoolAnalytics.bind(this);
	}
	componentDidMount() {
		let { profileImage } = this.props;
		if(profileImage !== "") {
			let completedStatus = true;
			this.props.redirectToCompletedStatus(completedStatus);
		}
	}
	setCoverImages() {
		var file = this.refs.profileImage.files[0];
		var reader = new FileReader();
		reader.readAsDataURL(file);
		let extension = '';
		reader.onloadend = function (e) {
			let base64string = reader.result;
			let filename = file.name;
			let filesize = file.size;
			let imageSize = filesize / 1024 / 1024;

				if (filename.indexOf("png") !== -1 || filename.indexOf("PNG") !== -1) {
					extension = "png";
				} else if (filename.indexOf("jpg") !== -1 || filename.indexOf("jpeg") !== -1) {
					extension = "jpg";
				} else if (filename.indexOf("gif") !== -1 || filename.indexOf("GIF") !== -1) {
					extension = "gif";
				}
				if ((extension === 'jpg' || extension === 'png' || extension === 'gif') && extension !== null && extension !== "" && extension !== undefined) {
					if (imageSize < 5) {
					this.setState({
						profileImage: base64string,
						isModify: true,
						imageError: ''
					});
				} else {
					this.setState({
						imageError: 'Image size should be less than 5MB.',
						profileImage: "",
					});
					document.getElementById("imageUpload").value = "";
				}

				} else {
					this.setState({
						imageError: 'Uploaded file is not a valid image. Only JPG, PNG and GIF files are allowed.',
						profileImage: "",
					});
					document.getElementById("imageUpload").value = "";
				}

		}.bind(this);
	}

	handleAboutYourself(e) {
		this.setState({ aboutYourself: e.target.value });
	}

	redirectToCompletedStatus() {
		let { profileImage, aboutYourself, isModify } = this.state;

		this.setState({ loading: true });

		this.props.client.mutate({
			mutation: createProfileMutation,
			variables: {
				data: {
					'description': aboutYourself,
					'image_url': profileImage,
					'isModify': isModify
				}
			},
		})
		.then((res) => {

			//Step 9 Save
			let poolID = UserUtils.getHostPoolID();
			TagManager.dataLayer({
				dataLayer: {
					poolId: poolID,
					profileImage:res.data.createProfile.image_url,
					description:aboutYourself
				},
				events: {
					RegistrationStep9: 'RegistrationStep9'
				}
			});
			// this.sendCreatingPoolAnalytics(poolID)

			let completedStatus = true;
			this.props.redirectToCompletedStatus(completedStatus);
		}).catch((error) => {
			let errorMsg = commonFunctions.parseGraphQLErrorMessage(error);
			this.setState({
				loginFailError: errorMsg,
				loading: false
			});
		});
	}

	handleBackBtn() {
		let completedStatus = false;
		if (this.props.stripe_id && this.props.user.stripe_account_onboard) {
			this.props.handleNextScreen('profileStatus', 'showManageCalendarScreen')
		} else {
			this.props.redirectToPayout(completedStatus);
		}
	}

	render() {
		const { classes } = this.props;
		const { loading, profileImage, aboutYourself, imageError } = this.state;
		return (
			<Typography variant="body1" component="div">
				{loading === true ? <Pageloader loading={loading} /> : ''}
				<div className={classes.locationMain}>
				<div className={classes.backStep} onClick={this.handleBackBtn}>
							<font><i className="fa fa-angle-left" aria-hidden="true"></i> BACK</font>
					</div>

					<Stepper />
					<div className={classes.ContentContainer}>
						<Typography variant="h3">Add a personal touch</Typography>
						<p>Upload a profile photo and short bio to give swimmers confidence booking your pool, and to other hosts if you ever want to book a pool!</p>
					</div>
					{imageError === "" ? "" : <Typography variant="caption" component="p">{imageError}</Typography>}

					<div className={classes.formContainer}>
						<div className={classes.formInputBox}>
							<div className={classes.uploadInput}>
								<Avatar alt="profile image" src={profileImage || window.location.origin + "/img/profile-icon.png"} />
								<input
									ref="profileImage"
									type="file"
									id="imageUpload"
									name="profileImage"
									onChange={this.setCoverImages} />
								<p>UPLOAD A PHOTO</p>
							</div>
							<div className={classes.formInputBox}>
								<Typography variant="subtitle2" component="label">Tell us about yourself</Typography>
								<TextField
									id="outlined-email-input"
									type="text"
									name="email"
									autoComplete=""
									margin="normal"
									variant="outlined"
									fullWidth={true}
									multiline={true}
									rowsMax={6}
									rows={6}
									onInput = {(e) =>{
										e.target.value = e.target.value.slice(0,140)}}
									value={aboutYourself}
									onChange={this.handleAboutYourself}
								/>
							</div>
						</div>
						<div className={classes.nextButton} >
							<Typography variant="button" onClick={this.redirectToCompletedStatus}>
								Finish
							</Typography>
						</div>
					</div>
				</div>
			</Typography>
		)
	}
}
Profile.propTypes = {
	classes: PropTypes.object.isRequired,
};


const enhance = compose(
	withStyles(styles),
	withApollo
);

function ProfileContainer (props) {
	const context = useContext(UserContext)
	return <Profile {...context} {...props} />
}

export default enhance(ProfileContainer);
