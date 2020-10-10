import { HEADER_IMG_MOBILE, HEADER_IMG, NOT_JUST_POOL } from '../../config'

const styles = theme => ({
  mainBanner: {
    position: "relative",
    minHeight: "calc(100vh - 70px)",
    background: `url(${HEADER_IMG}) no-repeat`,
    padding: "50px 0",
    backgroundSize: "cover",
    backgroundPosition: "70% top",
    width: "100%",
    "&:before": {
      content: '""',
      position: "absolute",
      width: "100%",
      height: "100%",
      top: "0",
      left: "0",
      background: "rgba(0,0,0,0.2)"
    },
    "@media (max-width:767px)": {
      background: `url(${HEADER_IMG_MOBILE}) no-repeat`,
      backgroundSize: '100%',
      display: "flex",
      minHeight:"520px",
      backgroundPosition: 'bottom center',
      "&:before": {
        background: "rgba(0,0,0,0.05)",
        maxHeight:"520px", 
      },
    },
    '@media (max-width:520px)': {
      backgroundSize: 'cover',
    }
  },
  howItWorks: {
    paddingTop: "5px"
  },
  howWorksContainerBtn: {
    margin: "0 auto",
    paddingTop: "10px"
  },
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
    "@media (max-width:980px)": {
      maxWidth: "750px"
    },
    "@media (max-width:767px)": {
      width: "calc(100% - 30px)"
    }
  },
  newBannerMain: {
    display: "flex",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "calc(100vh - 70px)",
    "@media (max-width:767px)": {
      minHeight: "inherit"
    }
  },
  newBannerContent: {
    color: theme.palette.common.white,
    textAlign: "center",
    width: "100%",
    maxWidth: "600px",
    position: "relative",
    '@media (max-width:480px)': {
      marginTop: -30
    },
    "& h1": {
      color: theme.palette.common.white,
      marginBottom: "5px",
      fontSize: "58px",
      fontWeight: "600",
      "@media (max-width:479px)": { 
        marginTop: '65px',
      }
    },
    "& h4": {
      color: theme.palette.common.white,
      marginBottom: "20px",
      fontSize: "21px",
      fontWeight: "500",
      "@media (max-width:479px)": { 
        marginBottom: "10px",
        fontSize: "12px",
      }
    },
    "& p": {
      color: theme.palette.common.white,
      fontSize: "16px",
      cursor: "pointer",
      "& i": {
        marginRight: "5px",
        cursor: "pointer"
      }
    },
    "@media (max-width:767px)": {
      "& h1": {
        fontSize: "34px",
        marginTop: "20px"
      },
      "& h4": {
        fontSize: "16px"
      }
    }
  },
  homeNewFormGroup: {
    display: "flex",
    alignItems: "center",
    marginBottom: "20px",
    "& > div": {
      width: "100%",
      margin: "0",
      "& > div": {
        "&:before": {
          display: "none"
        },
        "&:after": {
          display: "none"
        }
      },
      "& input": {
        width: "calc(100% - 60px)",
        background: "#fff",
        padding: "12px 40px 12px 20px",
        borderRadius: "25px",
        border: "none",
        fontSize: "14px",
        "&:focus": {
          outline: "none"
        }
      },
      "& ul": {
        position: "absolute",
        background: "#fff",
        color: "#000",
        listStyle: "none",
        width: "100%",
        padding: "0",
        overflowY: "auto",
        overflowX: "hidden",
        borderRadius: "15px",
        marginTop: "5px",
        zIndex: "9",
        maxHeight: "200px",
        overflow: "auto",
        "& li": {
          textAlign: "left",
          padding: "5px 20px",
          borderBottom: "1px solid #f9f9f9",
          maxHeight: "150px",
          overflowY: "auto",
          fontSize: "13px",
          cursor: "pointer",
          "&:first-child": {
            paddingTop: "15px"
          },
          "&:last-child": {
            paddingBottom: "15px"
          },
          "&:hover": {
            background: "#f9f9f9"
          }
        }
      }
    },
    "& i": {
      marginLeft: "-35px",
      color: "#000",
      zIndex: "1",
      fontSize: "20px",
      cursor: "pointer"
    },
    "& textarea": {
      width: "100%",
      background: "#fff",
      padding: "12px 20px",
      borderRadius: "25px",
      outline: "none"
    }
  },
  bgHome: {
    background: "#fff"
  },
  poolDetailsImages: {
    outline: "none",
    position: "relative",
    "& img": {
      minHeight: "300px",
      cursor: "pointer",
      width: "100%",
      "@media (max-width:1200px)": {
        minHeight: "250px"
      },
      "@media (max-width:768px)": {
        minHeight: "250px",
        maxHeight: "416px"
      },
      "@media (max-width:480px)": {
        minHeight: "250px"
      }
    }
  },
  sliderImages: {
    padding: "60px 0",
    textAlign: "center",
    "& > h2": {
      padding: "0 0 30px",
      fontSize: "35px",
      position: "relative",
      color: " #102937",
      fontWeight: "600",
      textTransform: "capitalize",
      "&:before": {
        content: '""',
        position: "absolute",
        width: "35px",
        height: "2px",
        background: "#0aa2d0",
        left: "0",
        right: "0",
        margin: "auto",
        bottom: "15px"
      }
    },
    "& > h2 + p": {
      fontSize: "16px",
      marginBottom: "50px"
    },
    "& button": {
      marginTop: "45px",
      background: "white",
      color: "#000",
      border: "1px solid #ff5f1c",
      borderRadius: "25px",
      fontWeight: "400",
      padding: "7px 35px",
      textTransform: "capitalize",
      "&:hover": {
        background: "#ff5f1c",
        "& span": {
          color: "#fff"
        }
      },
      "& span": {
        color: "#ff5f1c"
      }
    },
    "& p": {
      maxWidth: "400px",
      margin: " 0 auto 30px",
      color: " #102937"
    },
    "@media (max-width:767px)": {
      padding: "30px 0",
      "& h2": {
        fontSize: "30px"
      },
      "& > h2 + p": {
        marginBottom: "30px"
      }
    }
  },
  imageTextBlock: {
    textAlign: "left",
    marginTop: "25px",
    marginLeft: "0",
    color: "#1b3340",
    "& h2": {
      padding: "0",
      margin: "0 0 3px",
      fontSize: "20px",
      color: "#1b3340",
      fontWeight: "600"
    },
    "& span": {
      fontSize: "16px",
      marginTop: "0",
      color: "#1b3340",
      fontWeight: "500"
    },
    "& p": {
      margin: "10px 0",
      fontSize: "12px",
      color: "#9A9A9A",
      "& img": {
        width: "auto",
        height: "auto",
        minHeight: "inherit",
        display: "inline-block",
        paddingTop: "5px"
      }
    },
    "@media (max-width:1200px)": {
      left: "35px",
      "& h2": {
        fontSize: "26px"
      },
      "& span": {
        fontSize: "20px"
      }
    },
    "@media (max-width:480px)": {
      left: "20px",
      "& h2": {
        fontSize: "18px"
      },
      "& span": {
        fontSize: "14px"
      }
    }
  },
  yoursDemand: {
    textAlign: "center",
    padding: "0px 0 60px",
    "& > h2": {
      padding: "0 0 30px",
      fontSize: "40px",
      position: "relative",
      color: " #102937",
      fontWeight: "600",
      "&:before": {
        content: '""',
        position: "absolute",
        width: "35px",
        height: "2px",
        background: "#0aa2d0",
        left: "0",
        right: "0",
        margin: "auto",
        bottom: "15px"
      }
    },
    "& > h2 + p": {
      fontSize: "16px",
      marginBottom: "50px"
    },
    "& p": {
      maxWidth: "370px",
      margin: " 0 auto 30px",
      color: " #102937"
    },
    "& img": {
      width: "100%",
      verticalAlign: "middle"
    },
    "@media(max-width:767px)": {
      padding: "15px",
      "& h2": {
        fontSize: "30px"
      }
    }
  },
  summerBlock: {
    alignItems: "center",
    "& div > h3": {
      fontWeight: "600"
    },
    "@media(max-width:767px)": {
      padding: "15px",
      "& h2": {
        fontSize: "30px",
        paddingTop: "20px"
      }
    }
  },
  notJustPool: {
    minHeight: 420,
    background: `url(${NOT_JUST_POOL}) no-repeat center/cover`,
    '@media(max-width:767px)': {
      minHeight: 300
    }
  },
  yoursDemandContent: {
    "& h1": {
      paddingBottom: "20px",
      fontSize: "30px",
      color: " #102937",
      fontWeight: "600",
      position: "relative",
      marginTop: "20px",
      "&:before": {
        content: '""',
        position: "absolute",
        width: "35px",
        height: "2px",
        background: "#0aa2d0",
        left: "0",
        right: "0",
        margin: "auto",
        bottom: "8px"
      }
    },
    "& p": {
      fontSize: "14px",
      maxWidth: "470px",
      color: " #102937",
      lineHeight: "23px"
    },
    "& button": {
      marginTop: "5px",
      background: "white",
      color: "#000",
      border: "1px solid #ff5f1c",
      borderRadius: "25px",
      fontWeight: "400",
      padding: "7px 25px",
      textTransform: "capitalize",
      "&:hover": {
        background: "#ff5f1c",
        "& span": {
          color: "#fff"
        }
      },
      "& span": {
        color: "#ff5f1c"
      }
    },
    "@media(max-width:767px)": {
      marginTop: "0",
      "& h3": {
        paddingTop: "25px"
      },
      "& img": {
        marginBottom: "0 !important"
      }
    }
  },
  howWorks: {
    textAlign: "center",
    padding: "0px 0 60px",
    "& > h2": {
      padding: "0 0 30px",
      fontSize: "40px",
      position: "relative",
      color: " #102937",
      fontWeight: "600",
      "&:before": {
        content: '""',
        position: "absolute",
        width: "35px",
        height: "2px",
        background: "#0aa2d0",
        left: "0",
        right: "0",
        margin: "auto",
        bottom: "15px"
      }
    },
    "& > h2 + p": {
      maxWidth: "260px",
      fontSize: "16px"
    },
    "& p": {
      maxWidth: "94%",
      margin: " 0 auto",
      fontSize: "13px",
      color: " #102937",
      "& img": {
        marginBottom: "0",
        marginRight: "5px",
        maxWidth: "15px"
      }
    },
    "& img": {
      width: "auto",
      verticalAlign: "middle",
      marginBottom: "20px"
    },
    "@media(max-width:767px)": {
      "& h2": {
        fontSize: "30px"
      }
    }
  },
  howWorksContainer: {
    marginTop: "50px",
    "& div > h3": {
      fontWeight: "600"
    },
    "@media (max-width:767px)": {
      marginTop: "0",
      "& > div": {
        marginTop: "50px"
      }
    }
  },

  assets: {
    textAlign: "center",
    padding: "0",
    marginBottom: "60px",
    background: "#f9f9f9",
    "& p": {
      maxWidth: "350px",
      margin: " 0 auto 30px"
    },
    "& img": {
      width: "100%",
      verticalAlign: "middle"
    },
    "& div > h3": {
      paddingBottom: "20px",
      fontSize: "40px",
      maxWidth: "450px",
      margin: "0 auto",
      fontWeight: "600",
      color: " #102937"
    },
    "@media (max-width:767px)": {
      "& div > h3": {
        paddingTop: "15px",
        fontSize: "30px"
      }
    }
  },
  assetsContent: {
    "& p": {
      fontSize: "14px",
      maxWidth: "420px",
      color: " #102937"
    },
    "& button": {
      marginTop: "5px",
      background: "#f9f9f9",
      color: "#000",
      border: "1px solid #ff5f1c",
      borderRadius: "25px",
      fontWeight: "400",
      padding: "7px 25px",
      textTransform: "capitalize",
      "&:hover": {
        background: "#ff5f1c",
        "& span": {
          color: "#fff"
        }
      },
      "& span": {
        color: "#ff5f1c"
      }
    },
    "@media {max-width:767px}": {
      padding: "0 15px !important"
    }
  },
  testimonials: {
    marginBottom: "80px",
    "& div img": {
      width: "100px",
      height: "100px",
      borderRadius: "50% !important",
      minHeight: "100px"
    },
    "& h1": {
      fontSize: "40px",
      textAlign: "center",
      marginBottom: "50px",
      color: " #102937",
      fontWeight: "600"
    },
    "@media (max-width:767px)": {
      "& h1": {
        fontSize: "30px"
      }
    }
  },
  testimonialsContent: {
    marginTop: "25px",
    marginLeft: "0",
    color: "#1b3340",
    textAlign: "center",
    "& h2": {
      padding: "0",
      margin: "0 0 50px",
      position: "relative",
      fontSize: "20px",
      color: " #102937",
      fontWeight: "600",
      "&:before": {
        content: '""',
        position: "absolute",
        width: "20px",
        height: "2px",
        background: "#0aa2d0",
        left: "0",
        right: "0",
        margin: "auto",
        bottom: "-27px"
      }
    },
    "& p": {
      fontSize: "18px",
      maxWidth: "355px",
      margin: "0 auto 25px",
      color: " #102937"
    }
  },
  appDownload: {
    background: "url(../img/app-download.png) no-repeat",
    backgroundPosition: "center center",
    minHeight: "600px",
    backgroundSize: "cover",
    position: "relative",
    "&:before": {
      content: '""',
      position: "absolute",
      width: "100%",
      height: "100%",
      background: "rgba(0,0,0,0.1)"
    }
  },
  appDownloadContent: {
    alignItems: "center",
    maxWidth: "550px",
    textAlign: "center",
    padding: "0 0",
    "& p": {
      width: "100%",
      color: "#fff",
      maxWidth: "300px",
      fontSize: "15px",
      margin: " 0 auto 20px",
      fontWeight: "200"
    },
    "& h2": {
      width: "100%",
      color: "#fff",
      marginBottom: "25px"
    }
  },
  playStoreBlock: {
    textAlign: "center",
    margin: "0 auto",
    "& img": {
      maxWidth: "150px",
      cursor: "pointer"
    }
  },
  appDownloadFlex: {
    display: "flex",
    alignItems: "center",
    height: "600px",
    position: "relative"
  },
  contactMain: {
    position: "relative",
    padding: "50px 0 0"
  },
  leafSection: {
    "& img": {
      position: "absolute",
      margin: "auto",
      maxWidth: "200px",
      "&:first-child": {
        left: "0",
        top: "0"
      },
      "&:last-child": {
        right: "0",
        bottom: "-80px",
        "@media (max-width:767px)": {
          bottom: "-35px"
        }
      }
    },
    "@media (max-width:767px)": {
      "& img": {
        maxWidth: "80px",
        "&:last-child": {
          bottom: "0"
        }
      }
    }
  },
  conatactContainer: {
    textAlign: "center",
    padding: "50px",
    background: "#f9f9f9",
    "& > h2": {
      padding: "0 0 30px",
      fontSize: "40px",
      position: "relative",
      color: "#102937",
      fontWeight: "600",
      "&:before": {
        content: '""',
        position: "absolute",
        width: "35px",
        height: "2px",
        background: "#0aa2d0",
        left: "0",
        right: "0",
        margin: "auto",
        bottom: "15px"
      }
    },
    "& p": {
      maxWidth: "320px",
      margin: " 0 auto 30px",
      color: "#102937",
      fontSize: "16px",
      lineHeight: "24px",
      "& span": {
        display: "block",
        "& font": {
          color: theme.palette.common.blue
        }
      }
    },
    "& img": {
      width: "auto",
      verticalAlign: "middle",
      marginBottom: "20px"
    },
    "@media (max-width:767px)": {
      "& h2": {
        fontSize: "30px"
      }
    }
  },
  contactGrid: {
    maxWidth: "600px",
    margin: "0 auto",
    "& button": {
      padding: "8px 35px",
      borderRadius: "25px",
      margin: " 0 auto",
      minWidth: "140px",
      textTransform: "inherit"
    }
  },
  contactNewFormGroup: {
    display: "flex",
    alignItems: "center",
    marginBottom: "20px",
    "& > div": {
      width: "100%",
      margin: "0",
      "& > div": {
        "&:before": {
          display: "none"
        },
        "&:after": {
          display: "none"
        }
      },
      "& input": {
        width: "calc(100% - 50px)",
        background: "#fff",
        padding: "12px 20px",
        borderRadius: "25px",
        border: "1px solid #eee"
      }
    },
    "& textarea": {
      width: "100%",
      background: "#fff",
      padding: "12px 20px",
      borderRadius: "25px",
      outline: "none",
      fontSize: "14px",
      fontFamily: "inherit",
      border: "1px solid #eee",
      minHeight: "60px",
      resize: "none"
    }
  },
  imageBlock: {
    "& img": {
      maxWidth: "450px",
      position: "absolute",
      right: "60px",
      bottom: "0"
    },
    "@media (max-width:767px)": {
      "& img": {
        display: "none"
      }
    }
  },
  testmonialSlider: {
    maxWidth: "750px",
    margin: "0 auto"
  },
  errorMessage: {
    "& input": {
      border: "1px solid red !important",
      borderRadius: "25px"
    },
    "& textarea": {
      border: "1px solid red !important",
      borderRadius: "25px"
    }
  },
  contactTextArea: {
    "& > div": {
      margin: "0"
    },
    "& > div > div": {
      padding: "0"
    },
    "& fieldset": {
      display: "none"
    },
    "& textarea": {
      background: "#fff",
      padding: " 15px 20px",
      borderRadius: "25px",
      width: "calc(100% - 40px)",
      marginBottom: "35px",
      border: "1px solid #eee"
    }
  },
  submmerBlockReverece: {
    "@media (max-width:767px)": {
      flexDirection: " column-reverse"
    }
  }
});
export default styles;
