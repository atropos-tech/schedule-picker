import React from "react";
import createReactClass from "create-react-class";
import { render } from "react-dom";
import SchedulePicker from "../src/index";
import { MuiThemeProvider, createMuiTheme } from "material-ui/styles";
import { blue, red } from "material-ui/colors";
import { Typography } from "material-ui";
import { getZones } from "country-tz";

const sandboxTheme = createMuiTheme({
    palette: {
        primary: blue,
        secondary: red
    }
});

const Docs = createReactClass({
    getInitialState() {
        return { schedule: { timezone: getZones()["Europe/London"] } };
    },
    handleScheduleChange(schedule) {
        this.setState({ schedule });
    },
    render() {
        const { schedule } = this.state;
        return (
            <MuiThemeProvider theme={ sandboxTheme }>
                <section>
                    <Typography variant='display2'>Schedule Picker</Typography>
                    <div style={ { width: "700px" } }>
                        <SchedulePicker
                            value={ schedule }
                            onChange={ this.handleScheduleChange }
                        />
                    </div>
                </section>
            </MuiThemeProvider>
        );
    }
});

render(<Docs />, document.getElementById("docs"));
