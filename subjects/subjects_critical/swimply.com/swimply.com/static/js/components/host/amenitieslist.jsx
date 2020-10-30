import React from 'react';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import { withApollo } from "react-apollo";
import { withRouter } from 'react-router-dom';
import Pageloader from '../commons/pageloader';
import Stepper from './stepper';
import { loader } from 'graphql.macro';
import * as commonFunctions from './../utilities/commonFunctions';
import UserUtils from './../utilities/UserUtils';
import _ from 'lodash';
import TagManager from 'react-gtm-module';
const amenitiesListMutation = loader('./../../graphql/host/amenitieslistmutation.graphql'); 
const pooldetailsQuery = loader('./../../graphql/findpool/pooldetailsQuery.graphql');
const getAmenitiesListQuery = loader('./../../graphql/host/getamenitieslistquery.graphql');


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

	nextButton: {
		marginTop: '35px',
	},
	formContainer: {
		maxWidth: '350px',
		paddingTop: '10px',
		'& > div > div': {
			padding: '0px 0 0 18px !important',
			'& span': {
				padding: '3px 3px',
				fontSize: '13px',
			},
		},
		'@media (max-width:767px)': {
			maxWidth: "100%",
		}
	},
	checkedImg: {
		maxWidth: '20px'
	}
});

class AmenitiesList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			activeStep: 24.9,
			amenities: [],
			amenitiesData: [],
			poolID: '',
			loading: false,
			hostError: ''
		}
		this.redirectToAmenitiesAdditional = this.redirectToAmenitiesAdditional.bind(this);
		this.handleBackBtn = this.handleBackBtn.bind(this);
	}

	componentDidMount() {
		let poolID = UserUtils.getHostPoolID();
		if(poolID){
			this.setState({ loading: true });
			this.props.client.query({
				query: getAmenitiesListQuery,				
				fetchPolicy:"network-only"
			})
			.then((res) => {
				if(res.data.amenities !== null) {		
					res.data.amenities = res.data.amenities.map(el => ({ ...el, ...{checked: false} }));
					this.setState({ 
						amenities : res.data.amenities, 
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
				fetchPolicy:"network-only"
			})
			.then((res) => {
				if(res.data.pool !== null) {
					let selectedAmenities = [];
					selectedAmenities = _.map(res.data.pool.amenities, 'id');
					this.setState({ 
						amenitiesData : selectedAmenities,
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
	handleCheckbox(id, e) {
		let { amenitiesData } = this.state;
		let amenitiesIndex = amenitiesData.indexOf(id);
		if(amenitiesIndex >= 0) {
			amenitiesData.splice(amenitiesIndex,1);
		} else {
			amenitiesData.push(id);
		}
	    this.setState({
	      amenitiesData
	    })
	  }

	redirectToAmenitiesAdditional() {		
		let { amenitiesData, poolID, amenities }	= this.state;
		let { backBtnChange, history } = this.props;
		let gtmAmenities = [];
		if(amenitiesData.length >= 1) {
			gtmAmenities = _.filter(amenities, function(data) {
			  let index = amenitiesData.indexOf(data.id);
			  if(index >= 0){
			  	return {'id':data.id,'name':data.name};
			  } else {
			  	return '';
			  }
		    });
		}

		this.setState({ loading: true });
		let data = {		
			pool_id: parseInt(poolID) || "",
			amenities_list: amenitiesData || ""	
		}
		this.props.client.mutate({
			mutation: amenitiesListMutation,
			variables: { 
				data: data
			}
		})
		.then((res) => {
			//Step 4 Save
	          TagManager.dataLayer({ 
	            dataLayer: {
	              poolId: poolID,
	              amenitiesList: gtmAmenities
	            },
	            events: {
	              RegistrationStep4: 'RegistrationStep4'
	            } 
	          });
			if(backBtnChange === true ){
				history.push('editpool');
			} else {
				let amenitiesAdditionalStatus = true;
				this.props.redirectToAmenitiesAdditional(amenitiesAdditionalStatus);
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
		if(status === 'amenties') {
			history.push('editpool');
		} else {
			let amenitiesAdditionalStatus = false;
			this.props.redirectToPricingGuest(amenitiesAdditionalStatus);
		}		
	}


	render() {
		const { classes, backBtnChange } = this.props;
		const { loading,  hostError, amenities, activeStep, amenitiesData } = this.state;
		return (
			<Typography variant="body1" component="div">
				{loading === true ? <Pageloader loading={loading} /> : ''}

				<div className={classes.locationMain}>
				<div className={classes.backStep} onClick={this.handleBackBtn}>
						<font><i className="fa fa-angle-left" aria-hidden="true"></i> BACK</font>					
					</div>

					{backBtnChange === true ? "" : <Stepper activeStep={activeStep} />}
					<div className={classes.ContentContainer}>
						<Typography variant="h3">Does your pool come with any amenities?</Typography>
						<p>Select all the following that apply</p>
					</div>
					{hostError === "" ? "" :<Typography variant="caption" component="p">{hostError}</Typography>}
					<div className={classes.formContainer}>
						<Grid container spacing={24} >
							{amenities.map((ame, i) => {
								let amenitiesIndex = amenitiesData.indexOf(ame.id);
								let amenitiChecked = false;
								if(amenitiesIndex >= 0) {
									amenitiChecked = true;
								}

								return (
									<Grid item xs={6} sm={6} md={6} key={`ame-${ame.id}`} >
										<FormControlLabel
											control={
												<Checkbox
													checked={amenitiChecked}
													onChange={this.handleCheckbox.bind(this, ame.id)}
													value={ame.id}
													color="primary"
													disableRipple={true}
													icon={<img alt="" src={window.location.origin + "/img/Check-Unchecked.png"} className={classes.checkedImg}/>}
         									checkedIcon={<img alt="" src={window.location.origin + "/img/Check-Checked.png"} className={classes.checkedImg}/>}
												/>
											}
											label={ame.name}
										/>
									</Grid>

								)
							})
							}
						</Grid>
						<div className={classes.nextButton} >					

							<Typography variant="button" onClick={this.redirectToAmenitiesAdditional}>
							{ backBtnChange === true ? 'Save' : 'Next' }
							</Typography>

						</div>
					</div>

				</div>


			</Typography>
		)
	}
}
AmenitiesList.propTypes = {
	classes: PropTypes.object.isRequired,
};


const enhance = compose(
	withStyles(styles),
	withApollo,
	withRouter,
);

export default enhance(AmenitiesList);
