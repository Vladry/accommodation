import React from 'react';
import styled from "@emotion/styled";

const About = () => {
    return (
        <>
            <P>
                Приглашаем к сотрудничеству волонтёров: наш проект абсолютно неприбыльный и держится исключительно за
                счет энтузиазма и самоотдачи инициаторов и исполнителей.
                Желающие могут предложить свою помощь, написав нам в телеграм: <Span>@Vlad_Ry</Span> или перейдя по ссылке:
                <Span>https://t.me/Vlad_Ry</Span>
            </P>

        </>
    );
};

export default About;

const Span = styled.span`
font-weight: bold;
color: ${({theme})=>theme.palette.primary.dark};
margin: 10px;
`;

const P = styled.p(
    ({theme}) => (
        {
            color: theme.palette.primary.main
        }
    )
);