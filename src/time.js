export const WEEKDAYS = [
    { fullName: "Monday", shortName: "mon", initial: "M" },
    { fullName: "Tuesday", shortName: "tue", initial: "T" },
    { fullName: "Wednesday", shortName: "wed", initial: "W" },
    { fullName: "Thursday", shortName: "thu", initial: "T" },
    { fullName: "Friday", shortName: "fri", initial: "F" },
    { fullName: "Saturday", shortName: "sat", initial: "S" },
    { fullName: "Sunday", shortName: "sun", initial: "S" },
];

export const TIME_SLOTS = [
    { start: "0000", end: "0200" },
    { start: "0200", end: "0400" },
    { start: "0400", end: "0600" },
    { start: "0600", end: "0800" },
    { start: "0800", end: "1000" },
    { start: "1000", end: "1200" },
    { start: "1200", end: "1400" },
    { start: "1400", end: "1600" },
    { start: "1600", end: "1800" },
    { start: "1800", end: "2000" },
    { start: "2000", end: "2200" },
    { start: "2200", end: "2400" }
];

const WORK_DAY = [
    { start: "0800", end: "1000" },
    { start: "1000", end: "1200" },
    { start: "1200", end: "1400" },
    { start: "1400", end: "1600" },
    { start: "1600", end: "1800" }
];

function getWorkDaySlots(day) {
    return WORK_DAY.map(slot => ({ ...slot, day }));
}

export const WORK_WEEK = ["mon", "tue", "wed", "thu", "fri"].map(getWorkDaySlots).flat();

