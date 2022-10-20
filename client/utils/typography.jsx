import styled from "@emotion/styled";
import {NavLink} from "../components/appbar/NavLink";

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

const NavLink_styled = styled(NavLink)`
margin: 5px auto;
text-decoration: none;
&:visited, &:link, &:active {color: ${props => props.theme.palette.primary.main}   };
&:focus, &:hover {color: ${props => props.theme.palette.success.dark} };
`;

const NavLinkProtected = styled(NavLink)`
margin: 5px 10px;
text-decoration: none;
&:visited, &:link  {color: ${props => props.theme.palette.primary.main}   };
&:focus, &:hover, &:active {color: ${props => props.theme.palette.error.main}   };
`;

const NavLinkUnprotected = styled(NavLink)`
margin: 5px 10px;
text-decoration: none;
&:visited, &:link, &:active {color: ${props => props.theme.palette.primary.main}   };
&:focus, &:hover {color: ${props => props.theme.palette.success.dark} };
`;


const LocalMenuItem = styled.div`
border: 2px solid #acc;
border-radius: 8px;
margin: 6px 15px;
width: 150px;
`;

export {
    FormItem,
    Label,
    Select,
    NavLink_styled,
    NavLinkProtected,
    NavLinkUnprotected,
    LocalMenuItem,
};