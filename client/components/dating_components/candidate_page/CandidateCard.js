import React from 'react';
import {Grid} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import {Box} from "@mui/joy";

const CandidateCard = ({mappedFields}) => {
    const theme = useTheme();

    return (
        <Grid container spacing={2}

              sx={{
                  color: '#eee',
                  borderRadius: `${theme.cardBoxParams.borderRadius}
                //       `,
              }}

        >
{/*            <Grid item xs={5} sx={{border: '1px solid red'}}>
                <p>xs=8</p>
            </Grid>
            <Grid item xs={2} sx={{border: '1px solid red'}}>
                <p>xs=4</p>
            </Grid>
            <Grid item xs={4} sx={{border: '1px solid red'}}>
                <p>xs=4</p>
            </Grid>
            <Grid item xs={8} sx={{border: '1px solid red'}}>
                <p>xs=8</p>
            </Grid>*/}


            {mappedFields}
        </Grid>
    );
};

export default CandidateCard;