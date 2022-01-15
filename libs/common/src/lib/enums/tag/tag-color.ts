export enum TagColor {
    Green = '[TagColor] green'
}

export namespace TagColor {
    export function toString(type: TagColor): string {
        switch (type) {
            case TagColor.Green:
                return 'Green';
            default:
                return '';
        }
    }

    export const members: TagColor[] = [TagColor.Green];

    export function toClass(type: TagColor): string {
        switch (type) {
            case TagColor.Green:
                return 'tag-green';
            default:
                return '';
        }
    }
}
