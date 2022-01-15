export const environment = {
    production: true,
    port: 80, // This has to always be 80 for kubernetes
    refreshTokenExpireLength: 86400, // 24 hours
    host: 'http://nst-caballus.production.riafox.dev',
    ngxBaseUrl: 'http://ngx-caballus.production.riafox.dev',
    secretKey: '$RFX_SECRET_KEY',
    mongo: {
        // These environment variables can be whatever, the deploy scripts do
        // not touch these other than to fill them in with the matching var in
        // the build env. Just make sure that these are filled out in pipelines
        // configuration.
	url: 'riafoxlive0-shard-00-00.uwz72.mongodb.net:27017,riafoxlive0-shard-00-01.uwz72.mongodb.net:27017,riafoxlive0-shard-00-02.uwz72.mongodb.net:27017',
        dbName: 'caballus',
        username: '$RFX_DB_USER',
        password: '$RFX_DB_PASSWORD',
        replicaSetName: 'RiafoxLive0-shard-0',
        authSource: 'admin'
    },
    sendgrid: {
        apiKey: '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',
        fromEmail: 'support@caballus.dev',
        fromName: 'Caballus Support',
        overrideToEmail: ['dev@riafox.com']
    },
    google: {
        projectId: 'caballus',
        bucket: 'production-l5n3reww6eu1v74erbcg0csm',
        baseStorageUrl: 'https://storage.googleapis.com',
        keyfile: undefined
    },
};
