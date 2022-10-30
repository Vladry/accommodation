import React, {useContext} from 'react';
import {Box} from "@mui/material";
import {Context} from "../context";
import {Grid} from "@mui/material";

const UdpMapper = ({fields, values, id, reviewedUser}) => {
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
            <p>{`age: ${values["age"]}`}</p>
        </Box>
    ];

    let val = "";
    const excludedRefs = ['ageRange', 'birthday', 'pictures', 'mySex', 'heightRange', 'seekAPersonOfSex', 'minHeightIWant', 'maxHeightIWant', 'minPreferredAge', 'maxPreferredAge', 'maxNumberOfChildrenAllowed'];


    const mappedContent = fields.map(({name, formikRef, label}, index) => {
        let girdStartCol;
        if (index === 0) {
            girdStartCol = 2;
        } else if (index % 2 === 0) {
            girdStartCol = 2;
        } else {
            girdStartCol = 3;
        }
        const isExcludingElement = excludedRefs.some((el) => formikRef === el);
        if (isExcludingElement) {
            return null;
        } else {
            if (values != null && values[formikRef] != null) {
                val = values[formikRef];
            }

            if (val != null) {
                return (
                    <Grid item key={formikRef}  xs={12} md={6} lg={4}

/*                         sx={{
                             p: 2,
                             border: '1px solid lightgrey',
                             backgroundColor: '#34495E',
                             borderRadius: 1,
                             flexBasis: {xs: '51%', md: '30%'},
                             // width: '300px'
                         }}*/


                         sx={{
                             p: 2,
                             border: '1px solid lightgrey',
                             backgroundColor: '#34495E',
                             borderRadius: 1,
                         }}
                    >
                        <p>{label}: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span>{val}</span></p>
                    </Grid>
                )
            } else {
                return null;
            }
        }

    });

    // return mappedContent;
    return name.concat(location).concat(lastVisit).concat(age).concat(mappedContent);
};

export default UdpMapper;