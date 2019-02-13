import React from "react";
import { func, object } from "prop-types";
import { Button } from "material-ui";
import createReactClass from "create-react-class";
import WeekGrid from "./WeekGrid";
import TimezonePicker from "./TimezonePicker";
import { WORK_WEEK } from "./time";

const SchedulePicker = createReactClass({
    propTypes: {
        value: object,
        onChange: func
    },
    setWorkWeek() {
        this.handleChangeSlots(WORK_WEEK);
    },
    handleClear() {
        this.handleChangeSlots([]);
    },
    handleChangeSlots(slots) {
        const { value = {}, onChange } = this.props;
        onChange({ ...value, slots });
    },
    handleTimezoneChange(timezone) {
        const { value = {}, onChange } = this.props;
        onChange({ ...value, timezone });
    },
    render() {
        const { value = {} } = this.props;
        return (
            <div>
                <WeekGrid value={ value.slots || [] } onChange={ this.handleChangeSlots } />
                <Button onClick={ this.setWorkWeek }>Work week</Button>
                <Button onClick={ this.handleClear }>Clear</Button>
                <TimezonePicker value={ value.timezone } onChange={ this.handleTimezoneChange } label="Country or timezone name" />
            </div>
        );
    }
});

export default SchedulePicker;
