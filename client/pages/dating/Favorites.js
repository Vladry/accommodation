import React from 'react';
import DatingMenuWrapper from "../../components/dating_components/datingMenuItems/DatingMenuWrapper";
import {datingMenu} from "../../public/menuConfig";
import {Box} from "@mui/material";
import classes from '../../components/dating_components/datingMenuItems/dating.module.css';
import {useSelector} from "react-redux";
import sel from "@/store/user/selectors";
import {useRouter} from "next/router";
import urls from "../../../src/main/resources/urls.json";
import DatingSubWrapper from "../../components/dating_components/datingMenuItems/DatingSubWrapper";
import DatingMenuDrawer from "@/components/dating_components/DatingMenuDrawer";

const Favorites = () => {

    const favoritesPage = (
        <Box className={classes['dating-sections-container']}>
            <DatingMenuDrawer hideThreshold={600} menuIndex={3} />
            <h3 className={classes['header']}>{datingMenu[3].title}</h3>
        </Box>
    );

    return (
        <DatingSubWrapper>
            {favoritesPage}
        </DatingSubWrapper>
    );

};

export default Favorites;