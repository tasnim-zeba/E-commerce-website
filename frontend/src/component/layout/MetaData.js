import React from "react";
import {Helmet} from "react-helmet";


function MetaData({title}) {
    document.title = `${title} - Ecommerce`;
    return (
        <Helmet>
            <title>{`${title} - Ecommerce`}</title>
        </Helmet>
    );
}

export default MetaData;