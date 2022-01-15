export const environment = {
    production: false,
    host: 'http://localhost',
    refreshTokenExpireLength: 86400, // 24 hours
    ngxBaseUrl: 'http://localhost:9001',
    port: 9002,
    secretKey: 'XK7HKvH#w_Km)hJ?-=kVs8Bh)g}$72e;,($.hnCJ.m;8Ux0S}._WM>z,W=G^t"nM',
    sendgrid: {
        apiKey: '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',
        fromEmail: 'support@caballus.dev',
        fromName: 'Caballus Support',
        overrideToEmail: ['dev@riafox.com']
    },
    mongo: {
        url:
            'riafoxdev0-shard-00-00-uwz72.gcp.mongodb.net:27017,riafoxdev0-shard-00-01-uwz72.mongodb.net:27017,riafoxdev0-shard-00-02-uwz72.mongodb.net:27017',
        dbName: 'caballus-dev',
        username: 'Deploy_Caballus_NonProduction',
        password: 'FwwgimbRp7qD5fbn',
        replicaSetName: 'RiafoxDev0-shard-0',
        authSource: 'admin'
    },
    google: {
        projectId: 'caballus',
        bucket: 'dev-rjhx7mog7t6e0vdfi1r76wdb',
        baseStorageUrl: 'https://storage.googleapis.com',
        keyfile: 'caballus-dev-environment.json'
    }
};
