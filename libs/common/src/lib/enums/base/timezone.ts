export enum Timezone {
    Eastern = 'America/New_York',
    Centeral = 'America/Chicago',
    Mountain = 'America/Denver',
    MountanNoDST = 'America/Phoenix',
    Pacific = 'America/Los_Angeles',
    Alaska = 'America/Anchorage',
    HawaiiAleutian = 'America/Adak',
    HawaiiAleutianNoDST = 'America/Honolulu'
}
export namespace Timezone {
    export function toString(type: Timezone): string {
        switch (type) {
            case Timezone.Eastern:
                return 'Eastern Time';
            case Timezone.Centeral:
                return 'Centeral Time';
            case Timezone.Mountain:
                return 'Mountain Time';
            case Timezone.MountanNoDST:
                return 'Mountain Time (no DST)';
            case Timezone.Pacific:
                return 'Pacific Time';
            case Timezone.Alaska:
                return 'Alaska Time';
            case Timezone.HawaiiAleutian:
                return 'Hawaii-Aleutian Time';
            case Timezone.HawaiiAleutianNoDST:
                return 'Hawaii-Aleutian Time (no DST)';
            default:
                return '';
        }
    }

    export const members: Timezone[] = [
        Timezone.Eastern,
        Timezone.Centeral,
        Timezone.Mountain,
        Timezone.MountanNoDST,
        Timezone.Pacific,
        Timezone.Alaska,
        Timezone.HawaiiAleutian,
        Timezone.HawaiiAleutianNoDST
    ];
}
