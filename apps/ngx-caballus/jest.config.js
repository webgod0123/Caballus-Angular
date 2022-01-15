module.exports = {
    name: 'ngx-decaf',
    preset: '../../jest.config.js',
    coverageDirectory: '../../coverage/apps/ngx-decaf',
    snapshotSerializers: [
        'jest-preset-angular/AngularSnapshotSerializer.js',
        'jest-preset-angular/HTMLCommentSerializer.js'
    ]
};
