import green from '@material-ui/core/colors/green';

const style = {
	background: '#eef1f4',
	palette: {
		primary: {
			main: '#00ade2',
		},
		success: {
			main: green[500],
		},
		common: {
			black: "#232323",
			white: "#fff",
			gray: "#f3f5f5",
			blue:"#22bfea",
			primary: '#22bfea',
			transparent:"transparent",
			darkgray: "#7b858b",
			error: '#da0101',
			border: '#E3E3E3',
			secondary: '#FC5622',
			slider: '#d7e1ea',
		},
	},
	typography: {
		useNextVariants: true,
		suppressDeprecationWarnings: true,
		fontFamily: "'Poppins', sans-serif",
		fontSize: 14,
		fontWeight: "normal",
		body1: {
			color: "#7b858b",
			fontWeight: "normal",
			fontSize: "14px",
			background: "#fff",
		},
		h1: {
			fontSize: "35px",
			fontWeight: "500",
			lineHeight: "1.1",
			color: "#232325",
			margin: 0,
		},
		h2: {
			fontSize: "30px",
			fontWeight: "500",
			lineHeight: "1.1",
			color: "#232325",
			margin: 0,
			'@media (max-width:767px)': {
			  fontSize:25,
			}
		},
		h3: {
			fontSize: "20px",
			fontWeight: "500",
			lineHeight: "1.1",
			color: "#232325",
			margin: 0,
		},
		h4: {
			fontSize: "16px",
			fontWeight: "500",
			lineHeight: "1.1",
			color: "#232325",
		},
		h5: {
			fontSize: "18px",
			fontWeight: "500",
			lineHeight: "1.1",
			color: "#232325",
		},
		h6: {
			fontSize: "16px",
			fontWeight: "300",
			lineHeight: "1.1",
			color: "#7b858b",
		},
		button: {
			background: "linear-gradient(90deg,#23d1f2,#14c8ef,#04bfeb,#00b6e7,#00ade2)",
			color: "#fff",
			padding: "10px 25px",
			textAlign: "center",
			cursor: "pointer",
			borderRadius:'5px',
			'& span': {
				color: "#fff",
				background: "transparent",
			},
			'&:hover': {
				color: "#fff",
				background: "linear-gradient(90deg,#00b6e7,#04bfeb,#23d1f2,#00b6e7,#23d1f2)",
			}
		},
		buttonNext: {
			background: "transparent",
			color: "#232323",
			padding: "10px 25px",
			textAlign: "center",
			cursor: "pointer",
			'& span': {
				color: "#232323",
				background: "transparent",
			},
			'&:hover': {
				color: "#fff",
				background: "linear-gradient(90deg,#00b6e7,#04bfeb,#23d1f2,#00b6e7,#23d1f2)",
			}
		},
		subtitle1: {
			fontSize: "14px",
			color: "#7b858b",
		},
		subtitle2: {
			color: "#232323",
			textTransform: "uppercase",
			fontSize:'13px',
		},
		caption: {
			fontSize: "14px",			
			fontFamily: "'Poppins', sans-serif",
			textAlign: 'center',
			background: '#ffefef',
			padding: '10px',
			color: '#ff0606',
			marginBottom: '10px',
			maxWidth: '351px'
		},
		overline: {
			fontSize: "14px",			
			fontFamily: "'Poppins', sans-serif",
			textAlign: 'center',
			background: '#bdffbd',
			padding: '15px',
			color: '#232323',
			marginBottom: '10px',
			borderRadius:'8px',
			lineHeight:'20px',
		}
	},
	shape: {
	boxShadow: '0 0 2px #00ade2',
	boxShadowGray: '0 0 3px #ccc',
	}

};

export default style;
