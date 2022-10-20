import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';


// Create a theme instance.
const theme = createTheme({
    palette: {
        primary: {
            main: '#556cd6',
        },
        secondary: {
            main: '#19857b',
        },
        error: {
            main: red.A400,
        },
    },
    spacing: [0, 2, 3, 5, 8],




    selectButton: {m: '1px', p: '4px', fontSize: '0.8em', fontWeight: '400', textTransform: 'none'},

    cardBoxParams:{
        border: '2px solid blue',
        borderRadius: '12px',
        padding: '10px',
    },

    paperProps: {backgroundColor: '#f0f0f0', elevation: 2, padding: '10px'},






});

export default theme;


/*
${props => props.theme.palette.primary.main}
${props => props.theme.palette.success.dark}*/
