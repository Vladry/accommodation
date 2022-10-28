import React from 'react';
import {Grid} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import {Box} from "@mui/joy";

const CandidateCard = ({mappedFields}) => {
const theme = useTheme();

    return (
            <Box
                  sx={{
                      display: 'flex',
                      justifyContent: "center",
                      flexFlow: 'row wrap',
                      alignItems: 'center',
                      gap: '6px',
                      color: '#eee',
                      borderRadius: `${theme.cardBoxParams.borderRadius}
                      `,
                  }}>

                {mappedFields}
            </Box>
    );
};

export default CandidateCard;