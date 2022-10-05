import React, {useContext} from 'react';
import {useFormik, getIn} from 'formik';
import MuiPhoneNumber from 'material-ui-phone-number-2';
import {Box, Button, Checkbox, Container, FormControlLabel, Grid, TextField, useMediaQuery} from "@mui/material";
import AutocompleteFromMapbox from "./AutocompleteFromMapbox";
import {useRouter} from "next/router";
import DatingMenuWrapper from "../pages/formPages/dating/DatingMenuWrapper";
import {datingMenu} from "../public/menuConfig";
import DatingUserList from "./dating_components/DatingUserList";
import SideBar from "./dating_components/SideBar";
import ArticleWindow from "./dating_components/ArticleWindow";
import {Context} from "../context";

const UserDatingProfileMapper = ({fields, values, id, reviewedUser}) => {
    const {neatUpZonedDateTime} = useContext(Context);

    const name = [
        <Box key={"name"} sx={{p: 2, border: '1px solid lightgrey', borderRadius: 1, width: '400px'}}>
            <p>{`${reviewedUser.name} ${reviewedUser.lastName}`}</p>
        </Box>
    ];

    const location = [
        <Box key={"location"} sx={{p: 2, border: '1px solid lightgrey', borderRadius: 1, width: '400px'}}>
            <p>{`current location: ${reviewedUser.location}`}</p>
        </Box>
    ];

    const dateTimeStr = neatUpZonedDateTime(reviewedUser.datingLastVisitDate);
    const lastVisitDate = new Date(dateTimeStr);
    const lastVisit = [
        <Box key={"lastVisit"} sx={{p: 2, border: '1px solid lightgrey', borderRadius: 1, width: '400px'}}>
            <p>{`lastVisit: ${lastVisitDate.toLocaleString()}`}</p>
        </Box>
    ];

       const age = [
        <Box key={"age"} sx={{p: 2, border: '1px solid lightgrey', borderRadius: 1, width: '400px'}}>
            <p>{`age/возраст: ${values["age"]}`}</p>
        </Box>
    ];

    let val = "";
    const excludedRefs = ['birthday', 'pictures', 'mySex', 'seekAPersonOfSex', 'minHeightIWant', 'maxHeightIWant', 'minPreferedAge', 'maxPreferedAge', 'maxNumberOfChildrenAllowed'];
    const mappedContent = fields.map(({name, formikRef, label}, index) => {
        const isExcludingElement = excludedRefs.some((el) => formikRef === el);
        if (isExcludingElement) {
            return null;
        } else {
            if (values != null && values[formikRef] != null) {
                val = values[formikRef];
            }

            if (val != null) {
                return (
                    <Box key={formikRef} sx={{p: 2, border: '1px solid lightgrey', borderRadius: 1, width: '400px'}}>
                        <p>{label} {val}</p>
                    </Box>
                )
            } else {
                return null;
            }
        }

    });

    return name.concat(location).concat(lastVisit).concat(age).concat(mappedContent);
};

export default UserDatingProfileMapper;