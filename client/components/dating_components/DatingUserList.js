import React from 'react';
import DatingUserCard from './DatingUserCard';
import styled from "@emotion/styled";
import {Box} from "@mui/material";

const DatingUserList = ({users}) => {
    // console.log("rendering DatingUserList");
    if (!users) return <h3>No candidates matching your criteria <br/>
    Не найдено кандидатов соответствующих Вашим критериям</h3>;

    const datingUsers = users.map(
        (user, key) => {
            if (!user) return null;
            return <DatingUserCard user={user} key={key}/>;
        });

    return (
        <FlexContainer>
            {datingUsers}
        </FlexContainer>
    );
};

// export default DatingUserList;
export default React.memo(DatingUserList);

const FlexContainer = styled(Box)`
display: flex;
justify-content: center;
flex-flow: row wrap;
gap: 5px;
`;
const ListItem = styled(Box)`

`;