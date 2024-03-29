import React from "react";
import {styled} from "@mui/material/styles";
import {useLocation} from "react-router-dom";
import {NavLink} from "react-router-dom";
import MainMenuButton from "./MainMenuButton";
import PropTypes from "prop-types";

const MainMenu = ({menu}) => {
  const location = useLocation();

  return (
    <MenuNav>
      {menu?.map(({path, text, iconName, iconActive, modalPage}) => (
        <NavLink
          key={path}
          to={path}
          style={{textDecoration: 'none'}}
          state={modalPage ? {background: location} : {}}
        >
          {({isActive}) => (
            <MenuItem>
              <MainMenuButton
                isActive={isActive}
                iconName={isActive ? iconActive : iconName}
                text={text}/>
            </MenuItem>
          )}
        </NavLink>
      ))}
    </MenuNav>
  );
}

const MenuNav = styled('nav')(({theme}) => ({
  display: 'flex',
  flexDirection: 'row',

  [theme.breakpoints.up('xs')]: {
    flexDirection: 'column',
    position: 'relative',
  },
}));

const MenuItem = styled('div')(({theme}) => ({
  margin: '4px 0',
  display: 'flex',
  cursor: 'pointer',
  color: theme.palette.action.active,

  '& .MainMenuButton': {
    borderRadius: 40,
  },

  '&:hover .MainMenuButton': {
    backgroundColor: '#E0E0E0',
    transition: '0.1s'
  }
}));

MainMenu.propTypes = {
  menu: PropTypes.array,
}

export default MainMenu;
