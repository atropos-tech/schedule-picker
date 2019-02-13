import React from "react";
import { MenuItem, Paper, Typography } from "material-ui";
import { string, func, number, any } from "prop-types";
import DefaultEmptyMessage from "./DefaultEmptyMessage";

const REMOVE_PADDING = { padding: 0, height: "auto" };

const DROPDOWN_STYLE = {
    position: "absolute",
    zIndex: 20,
    width: "100%"
};

function Timezone({ timezone }) {
    return (
        <div>
            <Typography variant='subheading'>{ timezone.name }</Typography>
            <Typography>{ timezone.zoneCountries.join(", ") }</Typography>
        </div>
    );
}

function PickerDropdown({ isOpen, suggestions, getItemProps, highlightedIndex, inputValue }) {
    if ( isOpen ) {
        return (
            <Paper square style={ DROPDOWN_STYLE }>
                {
                    suggestions.map((timezone, index) => {
                        const itemId = timezone.name;
                        const isHighlighted = highlightedIndex === index;

                        const menuItemProps = getItemProps({
                            index,
                            item: timezone,
                            style: {
                                backgroundColor: isHighlighted ? "lightgray" : "white"
                            },
                        });
                        return (
                            <MenuItem className="suggestion" key={ itemId } {...menuItemProps}>
                                <Timezone itemId={ itemId } timezone={ timezone } inputValue={ inputValue } />
                            </MenuItem>
                        );
                    })
                }
                {
                    suggestions.length === 0 && <DefaultEmptyMessage />
                }
            </Paper>
        );
    }
    return false;
}

PickerDropdown.propTypes = {
    getItemProps: func.isRequired,
    highlightedIndex: number,
    inputValue: string.isRequired
};

export default PickerDropdown;
