import React from 'react';
import {Grid} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import {udpFields} from "../../forms/dating_user_profile_form/udpFields";
import {useSelector} from "react-redux";
import sel from "../../../store/selectors";
import UdpMapper from "./UdpMapper";

const CandidateDetailsTable = () => {
    const candidateDatingProfile = useSelector(sel.candidateDatingProfile);
    const reviewedUser = useSelector(sel.reviewedUser);
    const theme = useTheme();

    if (!candidateDatingProfile) return <p>not authenticated or queriedUserId undefined or isLoading</p>;

    const mappedFields = <UdpMapper udpFields={udpFields} candidateDatingProfile={candidateDatingProfile}
                                    reviewedUser={reviewedUser}/>;

    console.log("mappedFields: ",mappedFields);

    return (
        <Grid container spacing={2}

              sx={{
                  color: '#eee',
                  borderRadius: `${theme.cardBoxParams.borderRadius}
                //       `,
              }}

        >

            {mappedFields}
        </Grid>
    );
};

export default CandidateDetailsTable;