export interface DtoError {
    target: { key: any };
    value: any;
    property: string;
    constraints: { key: string };
    children: DtoError[];
}
