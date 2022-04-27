import React from 'react';
import {Button, MenuList} from "@mui/material";
import Tooltip from '@mui/material/Tooltip';
import {NavLink} from "./NavLink";
import styled from '@emotion/styled';


const NavBar = () => {

    return (
        <MenuList>

        <MenuItem><MyNavLink href={"/"} >Homepage</MyNavLink></MenuItem>

            <MenuItem><Tooltip
                title={"Fill in the form bellow describing in details the accommodation that you are offering. That data is required for our search algorithms./  Заполните форму. Детально опишите предлагаемое жильё. Эти данные требуются для более точного подбора вариантов для нуждающихся в жилье претендентов."}>
                <span><MyNavLink href={"/formPages/AccommodationFormPage"}>
                Offer accommodation/ Предложить жильё
            </MyNavLink></span>
            </Tooltip></MenuItem>

            <MenuItem>
                <MyNavLink href={"/formPages/TenantFormPage"}>
                    Подать заявку на жильё
                </MyNavLink>

            </MenuItem>

            <MenuItem><Tooltip
                title={"(Знакомства для поиска отношений/совместного проживания/семьи/волонтёрства. Cервис скоро запустим, но регистрация уже доступна!)"}>
                <span>
                    <MyNavLink href={"/"}>Знакомства</MyNavLink>
                </span>
            </Tooltip></MenuItem>


            <MenuItem><Tooltip
                title="Вы чудом вышли из ада?  Поговорим или помолчим вместе? Будем искать решения.. Заходи!  (это сервис теплого общения с небезразличными украинцами, волонтёрами, психологами - всеми теми славными нашими людьми, кто отдаёт частичку своего тепла и труда Вам помочь. Почувствуйте себя защищённей, на сколько это возможно, чтобы ужасного с Вами не случилось недавно.  Враг наш подлый - радуется нашим травмам и несчастьям. Давайте будем сопротивляться, не позволим стать несчастными чтобы не случилось... Не уходите в себя и в своё горе, помогите нам помочь Вам помочь всем украинцам победить рашидло! - сервис скоро запустим)">
                <span>
                    <MyNavLink href={"/1"}>Дай обниму!</MyNavLink>
                </span>
            </Tooltip></MenuItem>

        </MenuList>
    );
};

export default NavBar;

const MyNavLink = styled(NavLink)`
margin: 5px 10px;
text-decoration: none;
`;

const MenuItem = styled.div`
border: 2px solid #ccc;
border-radius: 15px;
margin: 20px 10px;
`;