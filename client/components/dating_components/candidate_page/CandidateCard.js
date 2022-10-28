import React from 'react';
import {Grid} from "@mui/material";
import {useTheme} from "@mui/material/styles";

const CandidateCard = ({mappedFields}) => {
const theme = useTheme();

    return (
        <>

            <Grid container
                  sx={{
                      display: 'grid',
                      justifyContent: "space-around",
                      alignItems: 'center',
                      columnGap: '2px',
                      gridTemplateColumns: {xs: '1fr', md: '1fr 1fr', xl: '1fr 1fr 1fr'},
                      backgroundColor: 'whitesmoke',
                      borderRadius: `${theme.cardBoxParams.borderRadius}`,
                  }}>

                {mappedFields}
            </Grid>
        </>
    );
};

export default CandidateCard;