import { environment as defaults } from './environment.defaults';

export const environment = {
    ...defaults,
    port: 80,
    host: 'https://nst-caballus.uat.riafox.dev',
    ngxBaseUrl: 'https://ngx-caballus.uat.riafox.dev',
    mongo: {
        ...defaults.mongo,
        dbName: 'caballus-uat'
    },
    google: {
        ...defaults.google,
        bucket: 'uat-1dh8qxix3avs0qiyhrexmmjs',
        keyfile: undefined
    }
};
