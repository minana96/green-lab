import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { withApollo } from 'react-apollo';
import compose from 'recompose/compose';
import { withRouter } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import DialogContent from '@material-ui/core/DialogContent';
import Avatar from '@material-ui/core/Avatar';
import { loader } from 'graphql.macro';
import Pageloader from '../../commons/pageloader';
import * as commonFunctions from '../../utilities/commonFunctions';
import UserContext from "../../../contexts/UserContext";
const createProfileMutation = loader('./../../../graphql/auth/createprofile.graphql');

const styles = theme => ({
	paper: {
		position: 'absolute',
		width: theme.spacing.unit * 50,
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
		padding: theme.spacing.unit * 4,
		outline: 'none',
	},
	formInputBox: {
		'& label + div ': {
			marginTop: '0',
			marginBottom: '0',
			width: '100%'
		},

		position: "relative",
		marginBottom: "15px",
		'& fieldset': {
			opacity: 0,
		},

		'& label': {
			textTransform: "uppercase",
			fontSize: '12px',
			letterSpacing:'0.6px',
			marginBottom:'3px',
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
			'&:focus': {
				border: '1px solid #00ade2'
			}
		},
		'& span': {
			position: "absolute",
			top: "3px",
			bottom: "0",
			margin: "auto",
			height: "0px",
			left: "9px",
		},

	},
	CheckboxBottm: {
		position: "relative",
		marginTop: '-10px',
		'& img': {
			position: "absolute",
			top: "14px",
			bottom: "0",
			left: "28px",
			width: "18px",
		},
	},
	checkBox: {
		color: theme.palette.common.darkgray,
		'&$checked': {
			color: theme.palette.common.blue,
		},
	},
	checked: {},
	dialogBoxContainer: {
		padding: '15px 22px',

		'& h3': {
			padding: '15px 22px',

		}
	},
	dialogBox: {
		minWidth: '280px',
		'@media (max-width:480px)':{
			minWidth: '200px',
		},
		'& > label': {
			marginBottom: '15px',
		},
		'& label': {
			letterSpacing: '1px',
			fontSize:'12px',
			marginBottom:'5px',
		},
		'& a': {
			textDecoration: 'none'
		}
	},
	signupBtn: {
		marginBottom: '0',
		marginTop:'15px',
		display:'table',
		width:'100%',

	},
	signupToHostBtn: {
		marginBottom: '10px',
		'& span': {
			color: theme.palette.common.black,
			background: theme.palette.common.transparent,
			border: '2px solid #00ade2',
			padding: '6px 15px',
		}
	},
	alreadyHaveAccount: {
		background: theme.palette.common.gray,
		padding: '15px',
		textAlign: 'center',
		borderTop: '1px solid #ccc',
		'& label': {
			fontSize: '14px',
			'& span': {
				color: theme.palette.common.blue,
				textTransform: 'uppercase',
				fontWeight: '500',
			}
		},

	},
	mobileIcon: {
		textAlign: 'center',
		textTransform: 'uppercase',
		fontWeight: '500',
		fontFamily: '"Poppins", sans-serif',
		color: theme.palette.common.darkgray,
		paddingBottom: '15px',
		'& i': {
			position: 'absolute',
			left: '10px',
			fontSize: '27px',
			top: '7px',
			color: theme.palette.common.blue,
			'& img': {
				maxWidth: '20px',
				marginTop: '10px',
				marginLeft: '15px',
			},
		},

	},
	modalCloseIcons: {
		position: 'absolute',
		right: '20px',
		cursor: 'pointer',
		top: '-6px',
		'& img': {
			maxWidth: '30px',
			filter: 'grayscale(1)',
		},
		'& img:hover': {
			filter: 'grayscale(0)',
		}
	},

	textFieldTwo: {
		background: '#f3f5f5',
		width: '100%',
		marginTop: 0,
	},
	uploadInput: {
		fontFamily: "'Poppins', sans-serif",
		position:'relative',
		paddingTop:'25px',
		'& label':{
			letterSpacing:'0.5px',
		},
		'& input':{
			position: 'absolute',
			left: 0,
			right: 0,
			width: '100%',
			top: 0,
			height: '100%',
			opacity: 0,
			cursor:'pointer',
		},
		'& > div':{
			margin:'0 auto',
			width:'80px',
			height:'80px',
		},
	
		paddingBottom:'0',
		textAlign:'center',
		'& p':{
			fontSize:'12px',
			color: theme.palette.common.blue,
			cursor:'pointer',
			marginTop:'5px',
			paddingBottom:'8px',
		}
	},
	errorMessage: {
		'& input':{
		border: '1px solid red',
		borderRadius:'5px',
		}
	},

});

class CreateProfile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			profileImage: '',
			aboutYourself: '',
			loading: false,
			imageError:'',
			isModify: false,
		}
		this.setCoverImages = this.setCoverImages.bind(this);
		this.handleAboutYourself = this.handleAboutYourself.bind(this);
		this.onSubmitCreateProfile = this.onSubmitCreateProfile.bind(this);
		this.handleCreateProfileModal = this.handleCreateProfileModal.bind(this);
	}

	componentDidMount() {
		this.setState({
			profileImage: this.props.image || ''
		})
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

	onSubmitCreateProfile() {
		let { profileImage, aboutYourself, isModify } = this.state;
		if(profileImage !== '' || aboutYourself !== '') {
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
					if (res.data.createProfile.status) {
						this.props.handleUser({
							...this.props.user,
							img_url: res.data.createProfile.image_url,
							description: aboutYourself,
						})
					}
					this.props.handleCreateProfile(res.data.createProfile);
					this.setState({ loading: false });
				}).catch((error) => {
					let errorMsg = commonFunctions.parseGraphQLErrorMessage(error);
					this.setState({
						loginFailError: errorMsg,
						loading: false
					});
				});
		} else {
			this.setState({imageError:'Please upload profile photo or tell about yourself to submit.'});
		}
	}

	handleCreateProfileModal() {
		this.props.handleCreateProfileClose();
	}

	render() {
		const { classes, referralCode, email, firstname, referralToken } = this.props;
		let { profileImage, aboutYourself, loading, imageError } = this.state;
		return (
			<div>
				{loading === true ? <Pageloader loading={loading}/> : ''}
				<Typography variant="h3" component="h3">Create Profile</Typography>
				{imageError === "" ? "" : <Typography variant="caption" component="p">{imageError}</Typography>}
				<p onClick={this.handleCreateProfileModal} className={classes.modalCloseIcons}><img src={window.location.origin +"/img/close-button.png"} alt="" /></p>
				<DialogContent className={classes.dialogBox}>
					<div  className={classes.uploadInput }>
						<Avatar alt="" src={profileImage || (window.location.origin +"/img/profile-icon.png")} />
						<input
							ref="profileImage"
							type="file"
							id="imageUpload"
							name="profileImage"
							onChange={this.setCoverImages} />
						<p>UPLOAD A PHOTO</p>
					</div>
					<div className={classes.formInputBox2}>
						<Typography variant="subtitle2" component="label"> Tell us about yourself</Typography>
						<TextField
							id="outlined-email-input"
							placeholder="Min 15 characters"
							className={classes.textFieldTwo}
							type="text"
							name="pool"
							autoComplete=""
							margin="normal"
							variant="outlined"
							multiline={true}
							rows={4}
							rowsMax={4}
							onInput = {(e) =>{
								e.target.value = e.target.value.slice(0,140)}}
							value={aboutYourself}
							onChange={this.handleAboutYourself}
						/>
					</div>
					{
						referralToken ?
							<Typography variant='subheading'>In order to receive referral code, you will need to add a profile picture and Bio</Typography>
							: null
					}
					<span className={classes.signupBtn} onClick={this.onSubmitCreateProfile}>
						<Typography variant="button">
							ADD TO PROFILE
						</Typography>
					</span>
				</DialogContent>
				{ referralCode && <img style={{position:"absolute", visibility:"hidden"}} src={"https://www.ref-r.com/campaign/t1/settings?bid_e=35B20B04DB28FDCEF3DCACD87B6962B5&bid=26502&t=420&event=register&email="+email+"&orderID="+email+"&fname="+firstname} alt="" /> }
			</div>
		)
	}
}

CreateProfile.propTypes = {
	classes: PropTypes.object.isRequired,
};
const enhance = compose(
	withStyles(styles),
	withRouter,
	withApollo
);

function CreateProfileContainer(props) {
	const context = useContext(UserContext)
	return <CreateProfile {...context} {...props} />
}

export default enhance(CreateProfileContainer);

