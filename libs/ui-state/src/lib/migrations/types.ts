export type MigrationResponse = { version: number; [key: string]: any };

export interface MigrationStrategy {
    // The version we are migrating
    version: number;
    // The key for the item to migrate.
    // If not provided, it takes the entire storage state
    key?: string;
    // The identifier for the version key (defaults to 'version')
    versionKey?: string;
    // A function that accepts a state and expects the new state in return
    migrate: (state: any) => MigrationResponse;
}
