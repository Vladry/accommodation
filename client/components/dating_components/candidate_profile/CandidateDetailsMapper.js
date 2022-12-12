import React, {useContext} from 'react';
import {Context} from "@/root/context.js";
import {Grid} from "@mui/material";
import goals from '../../forms/goals.js';
import interests from '../../forms/interests.js';
import styled from "@emotion/styled";
import {useTheme} from "@mui/material/styles";

const jointEnum = [...goals, ...interests];


const CandidateDetailsMapper = ({udpFields, candidateDatingProfile, reviewedUser}) => {
    const {neatUpZonedDateTime} = useContext(Context);
    const theme = useTheme();
    const dateTimeStr = neatUpZonedDateTime(reviewedUser.datingLastVisitDate);
    const lastVisitDate = new Date(dateTimeStr).toLocaleString();
    let lvTemp = lastVisitDate.slice(0, 17).split(',');
    reviewedUser.lastVisit = (<><Span>{lvTemp[0]}</Span> at <Span> {lvTemp[1]}</Span></>);


    let val;
    const excludedRefs = ['ageRange', 'birthday', 'pictures', 'mySex', 'heightRange', 'seekAPersonOfSex', 'minHeightIWant', 'maxHeightIWant', 'minPreferredAge', 'maxPreferredAge', 'maxNumberOfChildrenAllowed'];


    const mappedContent = udpFields.map(({formikRef, profileLabel}) => {

        const isExcludingElement = excludedRefs.some((el) => formikRef === el);
        if (isExcludingElement) {
            return null;
        } else {
            val = candidateDatingProfile[formikRef] ? candidateDatingProfile[formikRef] : reviewedUser[formikRef];
            if (formikRef === 'name') {
                val = `${reviewedUser.name} ${reviewedUser.lastName}`
            }

            if (Array.isArray(val) && val.length === 0 || val === null) return null;


            if (Array.isArray(val) && val.length > 0) {
                val = val.map((el, ind) => {
                    let enItemName = jointEnum.find(enumItem => enumItem.val === el);

                    return (<Grid item key={ind}>
                        <Span>{enItemName.en}</Span>
                    </Grid>);

                });
            }


            return (
                <Grid item container key={formikRef} xs={12} md={6} lg={4}
                      sx={{
                          p: 2,
                          border: '1px solid grey',
                          // color: '#eee',
                          // backgroundColor: '#34495E',
                          color: '#333',
                          backgroundColor: '#F0EBEA',
                          borderRadius: `4px`
                      }}
                >
                    <P><Span>{profileLabel}:</Span><Span>{val}</Span></P>
                </Grid>
            )
        }
    });

    return mappedContent;
};

export default CandidateDetailsMapper;

const Span = styled.span`
margin: 0 10px 0 0;
`;
const P = styled.div`
padding: 4px;
`;