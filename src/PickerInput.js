import React from "react";
import { func, string, bool } from "prop-types";
import { TextField } from "material-ui";


function PickerInput({ value, onChange, fullWidth, label, inputRef, onBlur, ...otherProps }) {
    console.log(inputRef);
    const InputProps = {
        inputProps: {
            ...otherProps,
            ref: inputRef,
            style: { flex: "1 1 auto", marginTop: "3px", minWidth: "200px", width: "auto" }
        }
    };

    return (
        <TextField
            label={ label }
            value={ value }
            onChange={ onChange }
            onBlur={ onBlur }
            InputProps={ InputProps }
            fullWidth={ fullWidth }
        />
    );
}

PickerInput.propTypes = {
    label: string,
    value: string.isRequired,
    onChange: func.isRequired,
    onBlur: func.isRequired,
    fullWidth: bool,
};

PickerInput.defaultProps = {
    label: "",
    fullWidth: false
};

export default PickerInput;
