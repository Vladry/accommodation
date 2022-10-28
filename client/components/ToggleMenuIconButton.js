import React from 'react';
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";

const ToggleMenuIconButton = ({toggleDrawer}) => {
    return (
        <IconButton
            size="large"
            edge="start"
            aria-label="open drawer"
            color={"primary"}
            onClick={toggleDrawer}
        >

            <Typography
                variant={"h6"}
                noWrap
                component={"div"}
                sx={{display: {xs: 'none', sm: 'block'}}}
            >Menu
            </Typography>

            <MenuIcon sx={{display: {xs: 'block', sm: 'none'}, mr: 2}}/>
        </IconButton>
    );
};

export default ToggleMenuIconButton;