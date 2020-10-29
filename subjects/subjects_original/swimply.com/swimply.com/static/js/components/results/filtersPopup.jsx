import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';
import { RouterContext } from '../router/router-context';
import { FILTER_AMENITIES } from '../../constants';
import UserUtils from '../utilities/UserUtils';

// contexts
import RegionContext from '../../contexts/RegionContext'


const styles = theme => ({
  container: {
    maxWidth: '1170px',
    margin: '0 auto',
    width: '100%',
    padding: '0 15px',
  },
  gueastDropdown: {
    background: theme.palette.common.white,
    boxShadow: theme.shape.boxShadowGray,
    // display: "table",
    // width: "calc(100% - 30px)",
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    // width: 'fit-content',
    alignItems: 'center',
    padding: "10px 15px",
    position: "absolute",
    zIndex: "8",
    marginTop: '5px',
    '@media (max-width: 880px)': {
      marginLeft: '-40px',
    },
    '@media (max-width: 767px)': {
      marginLeft: 0,
      right: 0
    },
    '@media (max-width: 340px)': {
      right: -5
    },
  },

  gueastDropdownMain: {
    display: "flex",
    textAlign: "center",
    marginBottom: "25px",
    alignItems: 'flex-start',
    justifyContent: 'stretch',
    width: '100%',
  },

  displayPriceRange: {
    display: "flex",
    width: '110%',
    marginLeft: '-5%',
    justifyContent: 'space-between',
    margin: '8px 0',
    '& div': {
      textAlign: "center",
      '& div ': {
        width: "100%",
        color: theme.palette.common.black,
        fontSize: "16px",
        fontWeight: "500"
      }
    }
  },

  displayColor: {
    background: 'transparent !important'
  },

  title: {
    fontSize: 17,
    color: 'black',
    fontWeight: 500,
    alignSelf: 'center',
    margin: '10px 0 0',
    fontFamily: '"Poppins", sans-serif',
  },

  filterTitle: {
    fontSize: 15,
    color: 'black',
    alignSelf: 'flex-start',
    margin: '20px 0 10px'
  },

  amenitiesContainer: {
    display: 'flex',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignContent: 'center',
    border: '0.2px solid #e8e8e8',
    boxSizing: 'border-box',
  },

  filterAmenitiesItem: {
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    flex: 'auto',
    width: '32%',
    alignItems: 'center',
    justifyContent: 'center',
    border: '0.2px solid #e8e8e8',
    padding: '15px 0',
  },

  timerSet: {
    width: '84%',
    maxWidth: '268px',
    left: '0',
    right: '0',
    '& > .range-container > div > div  > div': {
      background: '#00a6e2',
    },
    '& > div > div > div > span > div': {
      background: theme.palette.common.white,
      borderColor: theme.palette.common.white,
      boxShadow: '0 0 3px rgba(0, 0, 0, 0.3)'
    }
  },

  counter: {
    width: "100%",
    position: "relative",

    '& Button': {
      width: "25px",
      minWidth: '25px',
      height: "25px",
      borderRadius: "50%",
      padding: 0,
      marginRight: 0,
      boxShadow: "none",
      border: "0.2px solid #e8e8e8",
      cursor: "pointer",
      color: '#00a6e2',
      backgroundColor: 'white',
      background: 'white',
      '& span': {
        textAlign: 'center',
        fontSize: 18,
        color: '#00a6e2',
        lineHeight: 0,
        marginRight: -2
      }
    },
    '& p': {
      maxWidth: "40px",
      padding: "5px",
      margin: "10px auto 6px",
      // boxShadow: "0 0 5px #ccc",
      color: theme.palette.common.black,
      fontWeight: '400'
    },
  },
  labelName: {
    position: "relative",
    marginTop: '10px',
    fontSize: '12px',
    fontWeight: '400',
    letterSpacing: '0.3px',
    '& small': {
      fontSize: '11px',
    }
  },
  CheckboxBottm: {
    alignSelf: 'flex-start',
    position: "relative",
    margin: "0 0 25px",
    '& img': {
      position: "absolute",
      top: "14px",
      bottom: "0",
      left: "28px",
      width: "18px",
    },
  },
  labelInstantBook: {
    '& span + span': {
      paddingLeft: "20px",
    },
  },
  checkBox: {
    color: theme.palette.common.darkgray,
    '&$checked': {
      color: theme.palette.common.blue,
    },
  },
  checked: {},
  buttonGuest: {
    float: "right",
    marginTop: "-10px",
    marginBottom: '10px',
    display: 'flex',
    justifyContent: 'space-evenly',
    '& Button': {
      padding: '3px 15px',
      marginLeft: '5px',
      height: '30px',
      display: 'inline-block',
      '& span': {
        minWidth: '60px',
        position: "relative",
        left: 'inherit',
        top: 'inherit',
        height: 'inherit',
        marginLeft: '0px',
        padding: '0px 0px',
      }
    },
    '& div': {
      display: "flex",

    },
  },
  cancelBtn: {
    background: 'transparent',
    '& span': {
      color: '#00afe3',
    },
    '&:hover': {
      background: 'linear-gradient(90deg,#00b6e7,#04bfeb,#23d1f2,#00b6e7,#23d1f2)',
      '& span': {
        color: theme.palette.common.white,
      },
    }
  }
});


class FiltersPopup extends React.Component {
  /**
  * @param {*} props
  */
  constructor(props) {
    super(props);
    this.state = {
      adultCount: 1,
      childrenCount: 0,
      infantCount: 0,
      startPrice: 15,
      endPrice: 200,
      budget: {
        low: 15,
        high: 200
      },
      filterAmenities: [],
      selectedAmenities: [],
      checkedInstantBooking: false
    };
    this.increaseAdultCount = this.increaseAdultCount.bind(this);
    this.decreaseAdultCount = this.decreaseAdultCount.bind(this);
    this.increaseChildCount = this.increaseChildCount.bind(this);
    this.descreseChildCount = this.descreseChildCount.bind(this);
    this.increaseInfantCount = this.increaseInfantCount.bind(this);
    this.decreaseInfantCount = this.decreaseInfantCount.bind(this);
    this.handleFiltersApply = this.handleFiltersApply.bind(this);
    this.handleAmenities = this.handleAmenities.bind(this);
    this.handleBudget = this.handleBudget.bind(this);
  }
  static contextType = RouterContext;

  componentWillMount() {
    let toSelectFrom = []
    const regex = /\r?\n|\r/g
    toSelectFrom = this.context.allAmenities.filter(item => {
      item.name.replace(regex, '')
      return FILTER_AMENITIES.includes(item.name.toLowerCase())
    })
    let standard = ['Diving Board', 'Heated Pool', 'Restroom', 'BBQ Grill', 'Pet Friendly', 'Hot Tub']
    let orderedAmenities = []
    standard.map(standardItem => { // eslint-disable-line
      toSelectFrom.map(item => { // eslint-disable-line
        if (standardItem === item.name) {
          orderedAmenities = [...orderedAmenities, item]
        }
      })
    })
    orderedAmenities.splice(2, 0, {id: 'restroom', name: 'Restroom'})

    this.setState({
      filterAmenities: orderedAmenities,
      selectedAmenities: this.props.selectedAmenities
    })
  }

  componentDidMount() {
    let {  searchFields, adultCountNew, childrenCountNew, infantCountNew, budget, selectedAmenities } = this.props; 
    if (searchFields !== undefined) {
      this.setState({
        adultCount: searchFields.adultCount ? parseInt(searchFields.adultCount) : adultCountNew,
        childrenCount: searchFields.childrenCount ? parseInt(searchFields.childrenCount) : childrenCountNew,
        infantCount: searchFields.infantCount ? parseInt(searchFields.infantCount) : infantCountNew,
        budget: searchFields.budget ? searchFields.budget : budget,
        startPrice: searchFields.budget && searchFields.budget.low ? searchFields.budget.low : budget.low,
        endPrice: searchFields.budget && searchFields.budget.high ? searchFields.budget.high : budget.high,
        checkedInstantBooking: (searchFields.checkedInstantBooking === true || searchFields.checkedInstantBooking === 'true') ? true : false,
        selectedAmenities: (searchFields.amenities && searchFields.amenities.length) ? searchFields.amenities : selectedAmenities || []
      })
    }
  }

  handleBudget(e) {
    this.setState({
      startPrice: e.min,
      endPrice: e.max,
      budget: {
        low: e.min,
        high: e.max
      }
    })
  }

  handleInstantBooking(e) {
    this.setState({ checkedInstantBooking: e.target.checked });
    UserUtils.setInstantBooking(e.target.checked);
  }

  increaseAdultCount() {
    let { adultCount } = this.state;
    this.setState({ adultCount: parseInt(adultCount) + parseInt(1) });
  }
  decreaseAdultCount() {
    let { adultCount } = this.state;
    if (adultCount > 0) {
      this.setState({ adultCount: adultCount - 1 });
    }
  }
  increaseChildCount() {
    let { childrenCount } = this.state;
    this.setState({ childrenCount: parseInt(childrenCount) + parseInt(1) });
  }
  descreseChildCount() {
    let { childrenCount } = this.state;
    if (childrenCount > 0) {
      this.setState({ childrenCount: childrenCount - 1 });
    }
  }
  increaseInfantCount() {
    let { infantCount } = this.state;
    this.setState({ infantCount: parseInt(infantCount) + parseInt(1) });
  }
  decreaseInfantCount() {
    let { infantCount } = this.state;
    if (infantCount > 0) {
      this.setState({ infantCount: infantCount - 1 });
    }
  }

  handleFiltersApply() {
    let {
      adultCount,
      childrenCount,
      infantCount,
      startPrice,
      endPrice,
      budget,
      selectedAmenities,
      checkedInstantBooking,
    } = this.state;
    let data = {
      adultCount: adultCount,
      childrenCount: childrenCount,
      infantCount: infantCount,
      startPrice,
      endPrice,
      budget,
      selectedAmenities,
      checkedInstantBooking,
    }
    this.props.handleFiltersApply(data);
  }

  handleAmenities(id) {
    let newSelectionArray = []
    if (!this.state.selectedAmenities.includes(id)) {
      newSelectionArray = [...this.state.selectedAmenities, id]
    } else {
      newSelectionArray = this.state.selectedAmenities.filter(itemId => itemId !== id)
    }
    this.setState({
      selectedAmenities: newSelectionArray
    })
  }

  render() {
    const { classes, updateBtn } = this.props;
    let {
      adultCount,
      childrenCount,
      infantCount,
      filterAmenities,
      selectedAmenities,
      checkedInstantBooking,
      budget,
      startPrice,
      endPrice
    } = this.state;

    const checkedImage = window.location.origin + '/img/filterIcons/Check-Checked.png';
    const DivingBoard = window.location.origin + '/img/filterIcons/diving-board.png';
    const HeatedPool = window.location.origin + '/img/filterIcons/heated-pool.png';
    const Restroom = window.location.origin + '/img/filterIcons/restroom.png';
    const BBQGrill = window.location.origin + '/img/filterIcons/bbq-grill.png';
    const PetFriendly = window.location.origin + '/img/filterIcons/pet-friendly.png';
    const HotTub = window.location.origin + '/img/filterIcons/hot-tub.png';
    let amenitiesIcons = {
      'DivingBoard': DivingBoard,
      'HeatedPool': HeatedPool,
      'Restroom': Restroom,
      'BBQGrill': BBQGrill,
      'PetFriendly': PetFriendly,
      'HotTub': HotTub
    }

    return (
      <div className={classes.gueastDropdown} >
        <h3 className={classes.title}>Filters</h3>
        <span className={classes.filterTitle}>Budget</span>
        <div className={classes.timerSet}>
          <div className={classes.displayPriceRange}>
            <div>
              <div className={classes.displayColor}>${startPrice}</div>
            </div>
            <div>
              <div className={classes.displayColor}>${endPrice}</div>
            </div>
          </div>
          <div className='range-container'>
          <InputRange
            maxValue={200}
            minValue={15}
            value={{min: budget.low, max: budget.high}}
            formatLabel={budget => ``}
            step={5}
            onChange={this.handleBudget} />
          </div>
          
        </div>

        <span className={classes.filterTitle}>Amenities</span>
        <div className={classes.amenitiesContainer}>
          {filterAmenities.map((item, index) => {
            let uniqueClass = item.name.replace(' ', '')
            return (
              <div className={classes.filterAmenitiesItem + ' ' + classes[uniqueClass]} key={item.name + index} onClick={this.handleAmenities.bind(null, item.id)}>
                <img alt='' src={amenitiesIcons[uniqueClass]} style={{width: 25, height: 25, marginBottom: 5 }} />
                <span style={{fontSize: 13}}>{item.name}</span>
                {selectedAmenities.includes(item.id)
                  ? <img alt='' src={checkedImage} style={{width: 15, height: 15, position: 'absolute', top: 8, right: 8 }} />
                  : null
                }
              </div>)
          })}
        </div>
        <span className={classes.filterTitle}>Guests</span>
        <div className={classes.gueastDropdownMain}>
          <div className={classes.counter} >
            <Button onClick={this.increaseAdultCount}>+</Button>
            <p>{ adultCount }</p>
            <Button onClick={this.decreaseAdultCount}>-</Button>
            <div className={classes.labelName} >Adults <br/><small>&nbsp;</small></div>
          </div>
          <div className={classes.counter}>
            <Button onClick={this.increaseChildCount}>+</Button>
            <p> {childrenCount } </p>
            <Button onClick={this.descreseChildCount}>-</Button>
            <div className={classes.labelName}>Children <br/><small>(Ages 2-12)</small></div>
          </div>
          <div className={classes.counter}>
            <Button onClick={this.increaseInfantCount}>+</Button>
            <p>  {infantCount }</p>
            <Button onClick={this.decreaseInfantCount}>-</Button>
            <div className={classes.labelName}>Infants <br/><small>(Under 2)</small></div>
          </div>
        </div>
        <div className={classes.CheckboxBottm}>
          <FormControlLabel
            className={classes.labelInstantBook}
            control={
              <Checkbox
                checked={checkedInstantBooking}
                onChange={this.handleInstantBooking.bind(this)}
                disableRipple={true}
                value='instabooking'
                classes={{
                  root: classes.checkBox,
                  checked: classes.checked,
                }}
              />
            }
            label="Instant Booking"
          />
          <img src={window.location.origin + "/img/time.png"} alt="" />
        </div>
        <div className={classes.buttonGuest}>
          <Button className={classes.cancelBtn} onClick={this.props.handleFiltersCancel}>
            Cancel
          </Button>
          <Button onClick={this.handleFiltersApply}>
            {updateBtn === true ? 'Update' : 'Apply'}
          </Button>
        </div>
      </div>
    )
  }
}

FiltersPopup.propTypes = {
  classes: PropTypes.object.isRequired,
};

const enhance = compose(
  withStyles(styles),
  withRouter,
);

function FiltersPopupContainer (props) {
  const { region } = useContext(RegionContext)
  return <FiltersPopup region={region} {...props} />
}

export default enhance(FiltersPopupContainer);
