import React from 'react';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { withApollo } from "react-apollo";
import { withRouter } from 'react-router-dom';
import Pageloader from '../commons/pageloader';
import Stepper from './stepper';
import { loader } from 'graphql.macro';
import * as commonFunctions from './../utilities/commonFunctions';
import UserUtils from './../utilities/UserUtils';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import TagManager from 'react-gtm-module';
import _ from 'lodash';
const imagesMutation = loader('./../../graphql/host/imagesmutation.graphql');
const deletePoolImageMutation = loader('./../../graphql/host/deletepoolimagemutation.graphql');
const pooldetailsQuery = loader('./../../graphql/findpool/pooldetailsQuery.graphql');

const styles = theme => ({
	stepperNew: {
		padding: '0',
		maxWidth: '350px',
		'& > div': {
			background: theme.palette.common.blue,
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
	uploadImages: {
		minHeight: '150px',
		background: '#f3f5f5',
		width: '80%',
		margin: '0',
		position: 'relative',
		'@media (max-width:767px)': {
			width: "100%",
		},
		'& input': {
			position: 'absolute',
			width: '100%',
			height: '100%',
			zIndex: '9',
			cursor: 'pointer',
			opacity: '0',
			visibility: 'hidden'
		},
		'figure': {
			margin: '0',
			display: 'table',

		},
		'& img': {
			width: '100%',
		},
		'& i': {
			background: theme.palette.common.white,
			padding: '7px',
			borderRadius: '50%',
			width: '18px',
			height: '18px',
			fontSize: '20px',
			position: 'absolute',
			bottom: '11px',
			right: '7px',
			textAlign: 'center',
			color: '#ccc',
			cursor: 'pointer'
		}
	},
	uploadText: {
		position: 'absolute',
		top: '0',
		bottom: '0',
		left: 0,
		textAlign: 'center',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
		color: theme.palette.common.blue,
		textTransform: 'uppercase',
		fontWeight: '400',
		cursor: 'pointer'
	},
	deletePopup: {
		'& span': {
			padding: '3px 20px'
		},
		'@media (max-width:767px)': {
			'& > div > div ': {
				margin: '15px'
			}
		}
	},
	formInputBox: {
		position: "relative",
		marginBottom: "20px",
	},
	uploadThumbs: {
		listStyle: 'none',
		paddingLeft: '0',
		margin: 0,
		'& li': {
			display: 'inline-block',
			marginRight: '10px',
			marginBottom: '10px',
			width: '70px',
			position: 'relative',
			height: '70px',

			'& i': {
				background: theme.palette.common.white,
				padding: '7px',
				borderRadius: '50%',
				width: '18px',
				height: '18px',
				fontSize: '20px',
				position: 'absolute',
				bottom: '5px',
				right: '5px',
				textAlign: 'center',
				color: '#ccc',
				cursor: 'pointer'
			},
			'& img': {
				width: '70px',
				height: '70px',
				cursor: 'pointer',
				borderRadius: '5px',
			}
		},
		'& P': {
			fontSize: '12px',
			marginTop: '5px',
			color: '#ccc',
			fontWeight: '100	'

		}
	},
	uploadinput: {
		position: 'relative',
		'& input': {
			position: 'absolute',
			width: '100%',
			height: '100%',
			opacity: '0',
			cursor: 'pointer',
			visibility: 'hidden'
		}
	},

});

class Images extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			activeStep: 74.7,
			coverImage: [],
			addionalImages: [],
			loading: false,
			hostError: '',
			coverImageStatus: false,
			addionalImagesStatus: false,
			poolID: '',
			coverPic: [],
			deleteId: '',
			deleteUrl: '',
			deleteIndex: '',
			deletecoverImage: '',
			deleteType: '',
			openConfirmBox: false

		}
		this.triggerCoverImage = this.triggerCoverImage.bind(this);
		this.triggerOtherImages = this.triggerOtherImages.bind(this);
		this.setCoverImages = this.setCoverImages.bind(this);
		this.setOtherImages = this.setOtherImages.bind(this);
		this.redirectToCancellationPolicy = this.redirectToCancellationPolicy.bind(this);
		this.handleBackBtn = this.handleBackBtn.bind(this);
		this.deleteImage = this.deleteImage.bind(this);
		this.closePopup = this.closePopup.bind(this);
	}
	componentDidMount() {
		this.renderImages();
	}

	triggerCoverImage() {
		this.refs.setCoverImage.click();
	}
	triggerOtherImages() {
		this.refs.setOtherImage.click();
	}

	renderImages() {
		let poolID = UserUtils.getHostPoolID();
		if (poolID) {
			this.setState({ loading: true });
			this.props.client.query({
				query: pooldetailsQuery,
				variables: {
					"id": poolID
				},
				fetchPolicy: "network-only"
			})
				.then((res) => {
					if (res.data.pool !== null) {
						let images = res.data.pool.images;
						let cover = [];
						let otherImag = [];
						let coverImage = images.map((data) => {
							if (data.cover === true) {
								return data;
							} else {
								return '';
							}
						})
						cover = coverImage.filter(item => typeof item === 'object');

						let other = images.map((data) => {
							if (data.cover === false) {
								return data;
							} else {
								return '';
							}

						})
						otherImag = other.filter(item => typeof item === 'object');

						this.setState({
							coverImage: cover,
							addionalImages: otherImag,
							loading: false,
							poolID: poolID
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
	setCoverImages() {
		var file = this.refs.setCoverImage.files[0];
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
					let newData = {
						cover: false,
						id: '',
						url: base64string
					}
					this.setState({
						coverImage: this.state.coverImage.concat(newData),
						coverImageStatus: true,
						hostError: ''
					});
				} else {
					this.setState({
						hostError: 'Image size should be less than 5MB.',
						coverImage: [],
					});
				}

			} else {
				this.setState({
					hostError: 'Uploaded file is not a valid image. Only JPG, PNG and GIF files are allowed.',
					coverImage: [],
				});
			}

		}.bind(this);
	}

	deleteImage() {
		let { deleteId, deleteUrl, deleteIndex, deletecoverImage, deleteType } = this.state;
		if (deleteType === 'cover') {
			this.handleCoverImageDelete(deleteId, deleteUrl, deleteIndex, deletecoverImage);
		} else {
			this.handleOtherImageDelete(deleteId, deleteUrl, deleteIndex, deletecoverImage);
		}
		this.setState({
			openConfirmBox: false
		})
	}

	confirmCoverImageDelete(id, url, index, coverImage) {
		this.setState({
			deleteId: id,
			deleteUrl: url,
			deleteIndex: index,
			deletecoverImage: coverImage,
			deleteType: 'cover',
			openConfirmBox: true
		})
	}

	handleCoverImageDelete(id, url, index, coverImage) {
		let { poolID } = this.state;
		if (id !== "") {
			this.setState({ loading: true });
			let data = {
				pool_image_id: id || "",
				key: url || "",
				pool_id: parseInt(poolID) || ""
			}
			this.props.client.mutate({
				mutation: deletePoolImageMutation,
				variables: {
					data: data
				}
			})
				.then((res) => {
					this.renderImages();
				}).catch((error) => {
					let errorMsg = commonFunctions.parseGraphQLErrorMessage(error);
					this.setState({
						hostError: errorMsg,
						loading: false
					});
				});
		} else {
			coverImage.splice(index, 1);
			this.setState({ coverImage: coverImage });
		}
	}
	setOtherImages(id, url, index, addionalImages) {
		var file = this.refs.setOtherImage.files[0];
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
					let newData = {
						cover: true,
						id: '',
						url: base64string
					}
					this.setState({
						addionalImages: this.state.addionalImages.concat(newData),
						addionalImagesStatus: true,
						imageError: ''
					});
				} else {
					this.setState({
						hostError: 'Image size should be less than 5MB.',
					});
				}
			} else {
				this.setState({
					hostError: 'Uploaded file is not a valid image. Only JPG, PNG and GIF files are allowed.	',
				});
			}

		}.bind(this);
	}
	renderFirstImages() {
		let { addionalImages } = this.state;
		let { classes } = this.props;
		let items = [];
		items = addionalImages.map((data, index) =>
			<li className={classes.uploadOtherImages} key={index} >
				<img src={data.url} alt="" />
				<i className="fa fa-trash" onClick={this.confirmOtherImageDelete.bind(this, data.id, data.url, index, addionalImages)} />
			</li>
		)
		return items;
	}

	confirmOtherImageDelete(id, url, index, addionalImages) {
		this.setState({
			deleteId: id,
			deleteUrl: url,
			deleteIndex: index,
			deletecoverImage: addionalImages,
			deleteType: 'additional',
			openConfirmBox: true
		})
	}

	closePopup() {
		this.setState({
			openConfirmBox: false
		})
	}

	handleOtherImageDelete(id, url, index, addionalImages) {
		let { poolID } = this.state;
		if (id !== "") {
			this.setState({ loading: true });
			let data = {
				pool_image_id: id || "",
				key: url || "",
				pool_id: parseInt(poolID) || ""
			}
			this.props.client.mutate({
				mutation: deletePoolImageMutation,
				variables: {
					data: data
				}
			})
				.then((res) => {
					this.renderImages();
				}).catch((error) => {
					let errorMsg = commonFunctions.parseGraphQLErrorMessage(error);
					this.setState({
						hostError: errorMsg,
						loading: false
					});
				});
		} else {
			addionalImages.splice(index, 1);
			this.setState({ addionalImages: addionalImages });
		}
	}

	redirectToCancellationPolicy() {
		let { coverImage, addionalImages, poolID } = this.state;
		let { backBtnChange, history } = this.props;
		let otherImage = addionalImages.map(data => {
			if (data.id === "") {
				return data.url;
			} else {
				return ''
			}

		})
		let otherImag = [];

		otherImag = otherImage.filter(item => typeof item === 'string');
		let coverImg = coverImage.map(data => {
			if (data.id === "") {
				return data.url;
			} else {
				return '';
			}
		})
		let coverImag = [];
		coverImag = coverImg.filter(item => typeof item === 'string');


		this.setState({ loading: true });
		let data = {
			cover_image: coverImag[0] || "",
			other_images: otherImag || "",
			pool_id: parseInt(poolID) || ""
		}
		this.props.client.mutate({
			mutation: imagesMutation,
			variables: {
				data: data
			}
		})
			.then((res) => {
			let responseImages = res.data.savePoolImages.images;
			
			let coverImage =  _.filter(responseImages, { 'cover': true });
			let otherImage = _.filter(responseImages, { 'cover': false });
			//Step 8 Save
	          TagManager.dataLayer({ 
	            dataLayer: {
	              poolId: poolID,
	              coverImage:coverImage,
	              otherImage:otherImage
	            },
	            events: {
	              RegistrationStep8: 'RegistrationStep8'
	            } 
	          });

			if (backBtnChange === true) {
				history.push('editpool');
			} else {
				let cancellationPolicyStatus = true;
				this.props.redirectToCancellationPolicy(cancellationPolicyStatus);
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
		if (status === 'images') {
			history.push('editpool');
		} else {
			let rulesStatus = false;
			this.props.redirectToRules(rulesStatus);
		}
	}

	render() {
		const { classes, backBtnChange } = this.props;
		const { loading, activeStep, coverImage, addionalImages, hostError, openConfirmBox, deleteType } = this.state;
		return (
			<Typography variant="body1" component="div">
				{loading === true ? <Pageloader loading={loading} /> : ''}
				<div className={classes.locationMain}>
					<div className={classes.backStep} onClick={this.handleBackBtn}>
						<font><i className="fa fa-angle-left" aria-hidden="true"></i> BACK</font>
					</div>

					{backBtnChange === true ? "" : <Stepper activeStep={activeStep} />}
					<div className={classes.ContentContainer}>
						<Typography variant="h3">Upload Images</Typography>
						<p>Showcase your best pool photos! This may be the most important part of your listing!<br/>Make sure to capture the pool and any surrounding space that your guests will have access to.<br/>We recommend uploading a minimum of 3-5 landscape pictures.</p>
					</div>
					{hostError === "" ? "" : <Typography variant="caption" component="p">{hostError}</Typography>}
					<div className={classes.formContainer}>
						<div className={classes.formInputBox}>
							<Typography variant="subtitle2" component="label">Cover photo upload</Typography>
							{coverImage.length === 0 ? <div className={classes.uploadImages}>
								<span className={classes.uploadText} onClick={this.triggerCoverImage}>Upload your cover photo</span>
								<input
									id="fileopen"
									ref='setCoverImage'
									type="file"
									name="coverImage"
									onChange={this.setCoverImages}
								/>
							</div> :
								<div>
									{coverImage.length !== 0 && coverImage.map((data, index) =>
										<div className={classes.uploadImages} key={`image-${index}`} >
											<img src={data.url} alt="" />
											<i className="fa fa-trash" onClick={this.confirmCoverImageDelete.bind(this, data.id, data.url, index, coverImage)} />
										</div>)}
								</div>

							}
						</div>
						<div className={classes.formInputBox}>
							<Typography variant="subtitle2" component="label">Upload additional photos</Typography>
							<ul className={classes.uploadThumbs}>
								<p>Add up to 9 additional photos</p>

								{this.renderFirstImages()}
								{addionalImages.length <= 8 ? <li className={classes.uploadinput}>
									<input
										id="fileopen"
										ref="setOtherImage"
										type="file"
										name="otherImage"
										onChange={this.setOtherImages}
									/>
									<img src={window.location.origin + "/img/plusIcon.png"} alt="" onClick={this.triggerOtherImages} />
								</li> : ""}

							</ul>
						</div>

						<div className={classes.nextButton} >




							<Typography variant="button" onClick={this.redirectToCancellationPolicy}>
								{backBtnChange === true ? 'Save' : 'Next'}
							</Typography>
						</div>
					</div>
				</div>
				<Dialog
					open={openConfirmBox}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
					className={classes.deletePopup}
				>
					<DialogContent>
						<DialogContentText id="alert-dialog-description">
							{deleteType === 'cover' ? 'Are you sure you want delete cover photo?' : 'Are you sure you want delete additional photo?'}
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Typography variant="button" onClick={this.deleteImage} autoFocus>
							yes
	              </Typography>
						<Typography variant="button" onClick={this.closePopup} >
							no
	              </Typography>

					</DialogActions>
				</Dialog>
			</Typography>
		)
	}
}
Images.propTypes = {
	classes: PropTypes.object.isRequired,
};


const enhance = compose(
	withStyles(styles, { withTheme: true }),
	withApollo,
	withRouter
);

export default enhance(Images);
