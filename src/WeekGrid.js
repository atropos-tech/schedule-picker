import React from "react";
import createReactClass from "create-react-class";
import { Button, Typography } from "material-ui";
import { WEEKDAYS, TIME_SLOTS } from "./time";

function getTimeslotButtonColor(timeslot, value) {
    const isSelected = value.find(slot => slot.start === timeslot.start && slot.end === timeslot.end);
    return isSelected ? "primary" : "default";
}

function DayRow({ day, value, onClickTimeslot, onMouseDown, onMouseUp, onMouseMove }) {
    return (
        <div style={ { display: "flex", alignItems: "center", width: "100%" } }>
            <Typography style={ { flex: "0 0 100px", textAlign: "right", padding: "4px 8px" } }>{ day.fullName }</Typography>
            {
                TIME_SLOTS.map(timeslot =>
                    (
                        <Button
                            style={ { flex: "1 1 0", minWidth: "32px" } }
                            key={ timeslot.start + timeslot.end }
                            variant="raised"
                            color={ getTimeslotButtonColor(timeslot, value) }
                            onClick={ () => onClickTimeslot(day, timeslot) }
                            onMouseDown={ onMouseDown }
                            onMouseUp={ onMouseUp }
                            onMouseMove={ () => onMouseMove(day, timeslot) }
                        >&nbsp;
                        </Button>
                    )
                )
            }
        </div>
    );
}

function getDayValue(day, allValues) {
    return allValues.filter(slot => slot.day === day.shortName);
}

const WeekGrid = createReactClass({
    handleMouseDown() {
        this.isMouseDown = true;
    },
    handleMouseUp() {
        this.isMouseDown = false;
    },
    handleMouseMove(day, timeslot) {
        if ( this.isMouseDown ) {
            const { onChange, value } = this.props;
            const isSelected = value.find(slot =>
                slot.day === day.shortName && slot.start === timeslot.start && slot.end === timeslot.end
            );
            if ( !isSelected ) {
                const newSlot = { day: day.shortName, ...timeslot };
                onChange([...value, newSlot]);
            }
        }
    },
    render() {
        const { onChange, value } = this.props;
        const handleChange = (day, timeslot) => {
            const isSelected = value.find(slot =>
                slot.day === day.shortName && slot.start === timeslot.start && slot.end === timeslot.end
            );
            if ( isSelected ) {
                onChange(
                    value.filter(slot =>
                        !(slot.day === day.shortName && slot.start === timeslot.start && slot.end === timeslot.end)
                    )
                );
            } else {
                const newSlot = { day: day.shortName, ...timeslot };
                onChange([...value, newSlot]);
            }
        };

        return (
            <div>
                <div style={ { display: "flex", alignItems: "center", width: "100%" } }>
                    <Typography style={ { flex: "0 0 100px", padding: "4px 8px", fontSize: "80%", transform: "translateX(50%)", textAlign: "center" } }>0000</Typography>
                    {
                        TIME_SLOTS.map(timeslot =>
                            (
                                <Typography style={ { flex: "1 1 0", minWidth: "32px", fontSize: "80%", transform: "translateX(50%)", textAlign: "center" }} key={ timeslot.start + timeslot.end }>
                                    { timeslot.end }
                                </Typography>
                            )
                        )
                    }
                </div>
                {
                    WEEKDAYS.map(day =>
                        (
                            <DayRow key={ day.shortName } day={ day } value={ getDayValue(day, value) } onClickTimeslot={ handleChange } onMouseDown={ this.handleMouseDown } onMouseUp={ this.handleMouseUp } onMouseMove={ this.handleMouseMove }/>
                        )
                    )
                }
            </div>
        );
    }
});

export default WeekGrid;


