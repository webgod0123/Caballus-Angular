import { environment as defaults } from './environment.defaults';

export const environment = {
    ...defaults,
    port: 80,
    host: 'https://nst-caballus.qa.riafox.dev',
    ngxBaseUrl: 'https://ngx-caballus.qa.riafox.dev',
    mongo: {
        ...defaults.mongo,
        dbName: 'caballus-qa'
    },
    google: {
        ...defaults.google,
        bucket: 'qa-4l96rdh99uldnmd4ov2e6daa',
        keyfile: undefined
    }
};

