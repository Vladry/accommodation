import { useRouter } from 'next/router';
import Link from 'next/link';
import PropTypes from 'prop-types';
import {Button} from "@mui/material";

export { NavLink };

NavLink.propTypes = {
    href: PropTypes.string.isRequired,
    exact: PropTypes.bool
};

NavLink.defaultProps = {
    exact: false
};

function NavLink({ href, exact, children, ...props }) {
    const { pathname } = useRouter();
    const isActive = exact ? pathname === href : pathname.startsWith(href);

    if (isActive) {
        props.className += ' active';
    }

    return (
        <Link href={href}>
            {/*в 13м next.js убрали сылки <a></a> см. https://nextjs.org/docs/advanced-features/codemods#new-link*/}
            {/*поэтому я <a> заменил на <Button> но я не уверен, что правильно отобразятся пропсы и чилдрены:*/}
            <Button {...props}>
                {children}
            </Button>
        </Link>
    );
}