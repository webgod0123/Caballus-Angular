module.exports = {
    name: 'ion-caballus',
    preset: '../../jest.config.js',
    coverageDirectory: '../../coverage/apps/ion-caballus',
    snapshotSerializers: [
        'jest-preset-angular/AngularSnapshotSerializer.js',
        'jest-preset-angular/HTMLCommentSerializer.js'
    ]
};
