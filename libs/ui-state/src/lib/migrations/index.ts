import { MigrationStrategy, MigrationResponse } from './types';

/**
 * Migrations should be in their own files in this folder
 * Each migration should be named with a number then a description:
 * ie. 1-migrateAuthState
 * The order of migrations in this file is important! They progress from top
 * to bottom
 */
// Migrations should be in their own files in this folder
export const migrations: MigrationStrategy[] = [];

/**
 * This is only an example of how to create a migration strategy
 */
const exampleMigration: MigrationStrategy = {
    version: 1,
    key: 'example',
    versionKey: 'example1',
    migrate: (state): MigrationResponse => {
        const dot = null;
        return {
            version: 2,
            other: 'cool'
        };
    }
};
