import styled from "@emotion/styled";
import {NavLink} from "@/components/appbar/NavLink";
import {Button} from "@mui/material";

const bordersGlobalColor = '#660000';
const bordersGlobalRadius = '5px';

const labels = {
    fontSize: '0.9em',
    fontWeight: '500',
    color: '#0f3c4c',
};
const formItem = {
    border: `2px solid ${bordersGlobalColor}`,
    borderRadius: `${bordersGlobalRadius}`,
    blockMargin: '10px 2px 1px 2px',
    selectTopMargin: '8px',
    minHeight: '60px',
};

const Label = styled.label`${labels}`;
const FormItem = styled.div`${formItem}`;
const Select = styled.select`
margin-top: theme=> theme.formItem.selectTopMargin;
`;

// const NavLink_styled = styled(NavLink)`
// margin: 5px auto;
// text-decoration: none;
const NavLink_styled = styled(Button)`
padding-left: 0px;
margin-left: 0px;
text-transform: none;
// text-decoration: underline;
font-weight: 500;
&:visited, &:link, &:active {color: ${props => props.theme.palette.primary.main}   };
&:focus, &:hover {color: ${props => props.theme.palette.success.dark} };
`;

const NavLinkLogin = styled(NavLink)`
text-transform: none;
text-decoration: none;
color: ${props => props.theme.palette.success.main} ;
&:focus, &:hover {color: ${props => props.theme.palette.error.dark} };
`;

const NavLinkProtected = styled(NavLink_styled)`
&:focus, &:hover, &:active {color: ${props => props.theme.palette.error.main}   };
color: grey;
`;


const LocalMenuItem = styled.div`
// border: 2px solid #acc;
// border-radius: 4px;
margin: 6px 15px;
width: 150px;
`;

export {
    FormItem,
    Label,
    Select,
    NavLink_styled,
    NavLinkProtected,
    LocalMenuItem,
    NavLinkLogin,
};