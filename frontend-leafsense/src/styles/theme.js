import { createTheme } from '@material-ui/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#2B4976'
    },
    secondary: {
      main: '#A5C9EA'
    },
    background: {
      default: '#F8F9FB'
    },
    text: {
      primary: '#000000',
      secondary: '#7F7F7F'
    }
  },
  typography: {
    h5: {
      fontFamily: 'Nunito Sans',
      fontSize: '1.25rem',
      fontWeight: 800
    },
    h6: {
      fontFamily: 'Nunito Sans',
      fontSize: '1rem',
      fontWeight: 700
    },
    subtitle1: {
      fontFamily: 'Nunito Sans',
      fontSize: '1.125rem',
      fontWeight: 600
    },
    subtitle2: {
      fontFamily: 'Nunito Sans',
      fontSize: '1.125rem',
      fontWeight: 400
    },
    button: {
      fontFamily: 'Nunito Sans',
      fontSize: '1rem',
      fontWeight: 700
    },
    body1: {
      fontFamily: 'Nunito Sans',
      fontSize: '0.95rem',
      fontWeight: 400
    },
    body2: {
      fontFamily: 'Nunito Sans',
      fontWeight: 600
    },
    caption: {
      fontFamily: 'Nunito Sans',
      fontSize: '0.875rem',
      fontWeight: 700
    }
  },
  background: {
    default: '#ffffff'
  },
  shadows: ['none', `0px 0px 4.5px rgba(187, 193, 227, 0.57)`],
  overrides: {
    MuiMenu: {
      paper: {
        boxShadow: '0px 0px 4.5px rgba(187, 193, 227, 0.57)'
      }
    },
    PrivateTabIndicator: {
      colorSecondary: {
        backgroundColor: 'transparent'
      }
    },
    MuiTab: {
      root: {
        minWidth: '9vw !important',
        padding: '10px !important',
        '&$selected': {
          backgroundColor: '#A5C9EA',
          color: '#fff'
        }
      },
      wrapper: {
        fontSize: '0.8rem'
      }
    },
    Mui: {
      root: {
        '&$selected': {
          color: '#000000 !important'
        }
      }
    },
    MuiBottomNavigationAction: {
      root: {
        minWidth: '64px'
      }
    },
    MuiFormControl: {
      root: {
        width: '100% !important'
      }
    },
    MuiInputLabel: {
      outlined: {
        transform: 'translate(14px, 14px) scale(1)',
        zIndex: 1
      }
    },
    MuiInputBase: {
      root: {
        width: '100% !important'
      },
      input: {
        padding: 0
      }
    },
    MuiIconButton: {
      root: {
        padding: '9px'
      }
    },
    MuiDialogActions: {
      root: {
        padding: '8px 0px !important'
      }
    },
    MuiFormGroup: {
      root: {
        flexDirection: 'row',
        justifyContent: 'center'
      }
    },
    MuiOutlinedInput: {
      notchedOutline: {
        borderWidth: '2px !important'
      },
      input: {
        padding: 12
      }
    },
    MuiCard: {
      root: {
        display: 'flex !important',
        flexDirection: 'column !important',
        justifyContent: 'space-between !important'
      }
    }
  }
})
