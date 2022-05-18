import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";

const Layout = (props) => {
    const {children} = props;
    console.log("props: ", props);
    return (
        <>
            <Header/>
            {children}
        </>
    );
};

export default Layout;

// const mapStateToProps = (state) => state;
// export default connect(mapStateToProps)(Layout);