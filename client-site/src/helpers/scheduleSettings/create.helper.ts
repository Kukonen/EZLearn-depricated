import {ScheduleInformation} from "../../types/schedule.types.ts";

export function checkScheduleForEmpty(scheduleInformation: ScheduleInformation): boolean {
    if (scheduleInformation.university && scheduleInformation.university !== '') {
        return false;
    }

    if (scheduleInformation.group && scheduleInformation.group !== '') {
        return false;
    }

    if (scheduleInformation.template && scheduleInformation.template !== '') {
        return false;
    }

    return true;
}