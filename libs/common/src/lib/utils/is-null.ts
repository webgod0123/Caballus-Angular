export function isNull<TValue>(value: TValue | null | undefined): boolean {
    return value === null || value === undefined;
}
