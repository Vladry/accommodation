import React from 'react';
import {Box, Divider, MenuList, Typography} from "@mui/material";
import Tooltip from '@mui/material/Tooltip';
import {NavLink} from "./NavLink";
import styled from '@emotion/styled';
import useAuth from "../hooks/useAuth";
import LoginIcon from '@mui/icons-material/Login';
import Link from 'next/link';

let isAuthenticated = null;

const NavBar = () => {
    isAuthenticated = useAuth(false);


    return (
        <MenuList sx={{margin: '20px'}}>

            <MenuItem><NavLinkUnprotected href={"/"} underline={'none'}>Homepage</NavLinkUnprotected></MenuItem>

            {!isAuthenticated && <Divider/>}

            {!isAuthenticated &&
                <Typography
                    color={"error"}
                    variant={'h6'}
                    sx={{mt: '30px'}}
                >
                    <MySpan>Login/Register</MySpan>
                    {/*{!isAuthenticated && <Link href={'/login'}>Login/Register</Link>}*/}
                    {!isAuthenticated && <Link href={'/login'}><LoginIcon
                        sx={{cursor: 'pointer', color: `${({theme}) => theme.palette.error.main}`}}/></Link>}
                    <MySpan><br/>для активации разделов:</MySpan>
                </Typography>
            }

            <Box
                sx={{
                    ...(!isAuthenticated && {
                        border: 2,
                        borderColor: 'rgba(250, 0, 0, 0.6)',
                        borderRadius: '20px',
                        mt: '30px',
                        opacity: 0.6,
                        p: 20
                    })
                }}
            > {/*// защищённая секция */}
                <MenuItem><Tooltip
                    title={"Fill in the form bellow describing in details the accommodation that you are offering. That data is required for our search algorithms./  Заполните форму. Детально опишите предлагаемое жильё. Эти данные требуются для более точного подбора вариантов для нуждающихся в жилье претендентов."}>
                <span>
                    {isAuthenticated ? <NavLinkUnprotected href={"/formPages/AccommodationFormPage"} children={'Предложить жильё'}/> :
                        <NavLinkProtected href={"/formPages/AccommodationFormPage"} children={'Предложить жильё'}/>}
                </span>
                </Tooltip></MenuItem>

                <MenuItem>
                    {isAuthenticated ? <NavLinkUnprotected href={"/formPages/TenantFormPage"} children={'Подать заявку на жильё'}/> :
                        <NavLinkProtected href={"/formPages/TenantFormPage"} children={'Подать заявку на жильё'}/>}
                </MenuItem>

                <MenuItem><Tooltip
                    title={"(Знакомства для поиска отношений/совместного проживания/семьи/волонтёрства. Cервис скоро запустим, но регистрация уже доступна!)"}>
                <span>
                    {isAuthenticated ? <NavLinkUnprotected href={"/"} children={'Знакомства'}/> :
                        <NavLinkProtected href={"/"} children={'Знакомства'}/>}
                </span>
                </Tooltip></MenuItem>


                <MenuItem><Tooltip
                    title="Вы чудом вышли из ада?  Поговорим или помолчим вместе? Будем искать решения.. Заходи!  (это сервис теплого общения с небезразличными украинцами, волонтёрами, психологами - всеми теми славными нашими людьми, кто отдаёт частичку своего тепла и труда Вам помочь. Почувствуйте себя защищённей, на сколько это возможно, чтобы ужасного с Вами не случилось недавно.  Враг наш подлый - радуется нашим травмам и несчастьям. Давайте будем сопротивляться, не позволим стать несчастными чтобы не случилось... Не уходите в себя и в своё горе, помогите нам помочь Вам помочь всем украинцам победить рашидло! - сервис скоро запустим)">
                <span>
                    {isAuthenticated ? <NavLinkUnprotected href={"/"} children={'Дай обниму!'}/> :
                        <NavLinkProtected href={"/"} children={'Дай обниму!'}/>}
                </span>
                </Tooltip></MenuItem>

            </Box>
        </MenuList>
    );
};

export default NavBar;

const NavLinkProtected = styled(NavLink)`
margin: 5px 10px;
text-decoration: none;
&:visited, &:link, &:active {color: ${props => props.theme.palette.primary.main}   };
&:focus, &:hover {color: ${props => props.theme.palette.primary.main}}
`;

const NavLinkUnprotected = styled(NavLink)`
margin: 5px 10px;
text-decoration: none;
&:visited, &:link, &:active {color: ${props => props.theme.palette.primary.main}   };
&:focus, &:hover {color: ${props => props.theme.palette.warning.dark} };
`;


const MenuItem = styled.div`
border: 2px solid #ccc;
border-radius: 15px;
margin: 20px 10px;
`;

const MySpan = styled.span`
font-size: 1em;
font-weight: 100;
color: black;
`;