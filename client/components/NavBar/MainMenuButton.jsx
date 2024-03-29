import React from "react";
import PropTypes from "prop-types";
import {Typography} from "@mui/material";
import IconByName from "../icons/IconByName";
import {styled} from "@mui/material/styles";

const MainMenuButton = ({isActive, iconName, text}) => (
  <Div className='MainMenuButton'>
    <IconByName iconName={iconName}/>
    <Typography
      className={`LinkText ${isActive && 'LinkText_active'}`}
      variant='body1'>
      {text}
    </Typography>
  </Div>
);

const Div = styled('div')(({theme}) => ({
  padding: 10,
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',

  '& .IconByName': {
    fontSize: '2rem',
  },

  '& .LinkText': {
    marginLeft: 14,
    fontSize: '1.254rem',

    [theme.breakpoints.down('xl')]: {
      display: 'none'
    },

    '&_active': {
      fontWeight: 600
    }
  },
}));

MainMenuButton.propTypes = {
  isActive: PropTypes.bool,
  iconName: PropTypes.string,
  text: PropTypes.string,
}

export default MainMenuButton;
