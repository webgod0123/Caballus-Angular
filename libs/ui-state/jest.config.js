module.exports = {
    name: 'ui-state',
    preset: '../../jest.config.js',
    coverageDirectory: '../../coverage/libs/ui-state',
    snapshotSerializers: [
        'jest-preset-angular/AngularSnapshotSerializer.js',
        'jest-preset-angular/HTMLCommentSerializer.js'
    ]
};
