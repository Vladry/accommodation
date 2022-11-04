import {createTheme} from '@mui/material/styles';
import {red} from '@mui/material/colors';


// Create a theme instance.
const myTheme = {

    palette: {
        primary: {
            main: '#556cd6',
        },
        secondary: {
            main: '#19857b',
        },
        error: {
            main: red.A400,
            custom1: '#F44F4F',
            custom2: '#C70039',
            custom3: '#900C3F',
        },
    },
    spacing: [0, 2, 3, 5, 8],


    backgroundColorLight: 'whitesmoke',
    backgroundColorDark1: '#502211',
    backgroundColorDark2: '#281714',
    paperBackgroundColor: '#666',


    selectButton: {m: '1px', p: '4px', fontSize: '0.8em', fontWeight: '400', textTransform: 'none'},

    cardBoxParams: {
        border: '2px solid blue',
        borderRadius: '12px',
        padding: '10px',
    },

    paperProps: {backgroundColor: 'whitesmoke', elevation: 2, padding: '2px'},


};

export default myTheme;


/*
${props => props.theme.palette.primary.main}
${props => props.theme.palette.success.dark}*/
