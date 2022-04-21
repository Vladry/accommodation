import React from 'react';
import {Button, MenuList, styled} from "@mui/material";
import Tooltip from '@mui/material/Tooltip';
import {NavLink} from "./NavLink";



const NavBar = () => {

    return (
        <MenuList>
            <Tooltip title={"Fill in the form bellow describing in details the accommodation that you are offering. That data is required for our search algorithms./  Заполните форму. Детально опишите предлагаемое жильё. Эти данные требуются для более точного подбора вариантов для нуждающихся в жилье претендентов."}>
                <span><MyNavLink href={"/formPages/AccommodationFormPage"}>
                Offer accommodation/ Предложить жильё
            </MyNavLink></span>
            </Tooltip>

            <Button variant="primary" ><MyNavLink href={"/formPages/TenantFormPage"}>
                Подать заявку на жильё
            </MyNavLink></Button>
<br/>
            <Tooltip
                title={"(Знакомства для поиска отношений/совместного проживания/семьи/волонтёрства. Cервис скоро запустим, но регистрация уже доступна!)"}>
                <span>
                    <MyNavLink href={"/"}>Знакомства</MyNavLink>
                </span>
            </Tooltip>


            <Tooltip
                title="Вы чудом вышли из ада?  Поговорим или помолчим вместе? Будем искать решения.. Заходи!  (это сервис теплого общения с добродушно настроенными украинцами, волонтёрами, психологами - всеми теми славными нашими людьми, кто отдаёт частичку своего тепла и труда Вам помочь. Почувствуйте себя счастливыми, на сколько это возможно, чтобы ужасного с Вами не случилось недавно.  Враг наш подлый - радуется нас ломать и травмировать. Будем сопротивляться, не позволим стать несчастными чтобы не случилось... Не уходите в себя и в своё горе, помогите нам помочь Вам помочь всем украинцам победить рашидло! - сервис скоро запустим)">
                <span>
                    <MyNavLink href={"/1"}>Дай обниму!</MyNavLink>
                </span>
            </Tooltip>

        </MenuList>
    );
};

export default NavBar;

const MyNavLink = styled(NavLink)`
margin: 0 20px;
`;