import React from "react";
import { Typography } from "material-ui";
import { string } from "prop-types";

function DefaultEmptyMessage({ inputValue }) {
    return (
        <Typography variant='subtitle' align="center" className='no-suggestions-message'>
            No suggestions found for <strong>{ inputValue }</strong>
        </Typography>
    );
}

DefaultEmptyMessage.propTypes = {
    inputValue: string.isRequired
};

export default DefaultEmptyMessage;
