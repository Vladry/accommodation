import React from 'react';
import {Grid} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import {udpFields} from "../../forms/dating_user_profile_form/udpFields";
import {useSelector} from "react-redux";
import sel from "@/store/user/selectors";
import CandidateDetailsMapper from "./CandidateDetailsMapper";

const CandidateDetailsTable = () => {
    const candidateDatingProfile = useSelector(sel.candidateDatingProfile);
    const reviewedUser = useSelector(sel.reviewedUser);
    const theme = useTheme();

    if (!candidateDatingProfile) return <p>not authenticated or queriedUserId undefined or isLoading</p>;

    const mappedFields = <CandidateDetailsMapper udpFields={udpFields} candidateDatingProfile={candidateDatingProfile}
                                                 reviewedUser={reviewedUser}/>;


    return (
        <Grid container spacing={2}

              sx={{
                  borderRadius: `${theme.cardBoxParams.borderRadius}`,
                  margin: '20px',
              }}

        >

            {mappedFields}
        </Grid>
    );
};

export default CandidateDetailsTable;