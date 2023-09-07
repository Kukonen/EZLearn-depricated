import {request} from "../../utils/request.ts";
import {BasicScheduleInformation, ScheduleInformation} from "../../types/schedule.types.ts";

export async function getUniversity() : Promise<string> {
    const {university} = await request('/v1/schedule/settings/basic/university');

    return university;
}

export async function getGroup(key: string): Promise<string> {
    const {group} = await request(`/v1/schedule/settings/basic/group/${key}`);

    return group;
}

export async function getTemplate(key: string): Promise<string> {
    const {template} = await request(`/v1/schedule/settings/basic/template/${key}`);

    return template;
}

export async function selectSchedule(university: string, group: string, template: string): Promise<ScheduleInformation> {
    const scheduleBasicInformation: BasicScheduleInformation = {
        university,
        group,
        template
    }

    const {scheduleInformation} = await request(
        '/v1/schedule/settings/basic/select',
        'POST',
        JSON.stringify(scheduleBasicInformation)
    )

    return scheduleInformation;
}