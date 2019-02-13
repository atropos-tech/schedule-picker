import React from "react";
import { getCountries, getZones, getNameByCode } from "country-tz";
import createReactClass from "create-react-class";
import Downshift from "downshift";
import PickerInput from "./PickerInput";
import PickerDropdown from "./PickerDropdown";
import { func, object, bool, string } from "prop-types";
import { Button } from "material-ui";

const ALL_COUNTRIES = Object.values(getCountries());
const ALL_TIMEZONES = Object.values(getZones());

function unique(...arrayToUnique) {
    return Array.from(new Set(arrayToUnique));
}

function getSuggestions(inputValue) {
    const matchingCountries = ALL_COUNTRIES.filter(country => country.name.toLowerCase().includes(inputValue.toLowerCase()));
    const countryTimezones = matchingCountries.map(country => country.zones).flat().map(zoneName => getZones()[zoneName]);
    const matchingTimezones = ALL_TIMEZONES.filter(zone => zone.name.toLowerCase().includes(inputValue.toLowerCase()));
    const uniqueZones = unique( ...matchingTimezones, ...countryTimezones );
    return uniqueZones.map(zone => {
        const zoneCountries = zone.countries.map(getNameByCode);
        return {
            ...zone,
            zoneCountries
        };
    });
}

const TimezonePicker = createReactClass({
    propTypes: {
        value: object.isRequired,
        onChange: func.isRequired,
        fullWidth: bool,
        label: string
    },
    getInitialState() {
        return { inputValue: "", isPickerMode: false };
    },
    handleInputChange(inputChangeEvent) {
        this.setState({ inputValue: inputChangeEvent.target.value });
    },
    handleShowPicker() {
        this.setState({ isPickerMode: true });
    },
    handleHidePicker() {
        this.setState({ isPickerMode: false });
    },
    handleSelectItem(selectedZone) {
        this.handleHidePicker();
        this.props.onChange(selectedZone);
    },
    safeItemToString(item) {
        // downshift has an issue where it sometimes calls itemToString with "null"
        // this is a temporary workaround
        return item && item.name;
    },
    renderDownshift({ getInputProps, ...dropdownProps }) {
        const { fullWidth, label } = this.props;
        const { inputValue } = this.state;
        return (
            <div style={ { position: "relative" } }>
                <PickerInput
                    {
                    ...getInputProps({
                        onChange: this.handleInputChange
                    })
                    }
                    fullWidth={ fullWidth }
                    label={ label }
                    inputRef={ ref => ref && ref.focus() }
                    onBlur={ this.handleHidePicker }
                />
                <PickerDropdown
                    suggestions={ getSuggestions(inputValue) }
                    {...dropdownProps}
                />
            </div>
        );
    },
    render() {
        const { value } = this.props;
        const { inputValue, isPickerMode } = this.state;
        if ( isPickerMode ) {
            return (
                <div>
                    <Downshift
                        inputValue={ inputValue }
                        onSelect={ this.handleSelectItem }
                        itemToString={ this.safeItemToString }
                        fullWidth
                    >
                        { this.renderDownshift }
                    </Downshift>
                    <Button onClick={ this.handleHidePicker }>&times;</Button>
                </div>
            );
        }
        return (
            <Button onClick={ this.handleShowPicker }>{ value.name } (click to change)</Button>
        );
    }
});

export default TimezonePicker;
