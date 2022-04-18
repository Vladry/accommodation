import React from 'react';
import {MenuList, styled} from "@mui/material";
import Tooltip from '@mui/material/Tooltip';
import {makeStyles} from "@mui/styles";
import {NavLink} from "./NavLink";


const useStyles = makeStyles(() => ({
    styledLink: {
        marginLeft: "20px",
        marginRight: "20px"
    }
}));


const NavBar = () => {
    const classes = useStyles();

    return (
        <MenuList>
            <MyNavLink className={classes.styledLink} href={"/formPages/AccommodationFormPage"}>
                submit accommodation/ Предложить жильё
            </MyNavLink>

            <MyNavLink className={classes.styledLink} href={"/formPages/TenantFormPage"}>
                submit accommodation request/ Подать заявку на жильё
            </MyNavLink>

            <Tooltip
                title={"(Знакомства для поиска отношений/совместного проживания/семьи/волонтёрства. Cервис скоро запустим, но регистрация уже доступна!)"}>
                <span>
                    <MyNavLink href={"/"}>Знакомства</MyNavLink>
                </span>
            </Tooltip>


            <Tooltip
                title="Вы чудом вышли из ада?  Поговорим или помолчим вместе? Будем искать решения.. Заходи!  (это сервис теплого общения с добродушно настроенными украинцами, волонтёрами, психологами - всеми теми славными нашими людьми, кто отдаёт частичку своего тепла и труда Вам помочь. Почувствуйте себя счастливыми, на сколько это возможно, чтобы ужасного с Вами не случилось недавно.  Враг наш подлый - радуется нас ломать и травмировать. Будем сопротивляться, не позволим стать несчастными чтобы не случилось... Не уходите в себя и в своё горе, помогите нам помочь Вам помочь всем украинцам победить рашидло! - сервис скоро запустим)">
                <span>
                    <MyNavLink href={"/1"}>Get a hug!/ Дай обниму!</MyNavLink>
                </span>
            </Tooltip>

        </MenuList>
    );
};

export default NavBar;

const MyNavLink = styled(NavLink)`
margin: 0 20px;
`;