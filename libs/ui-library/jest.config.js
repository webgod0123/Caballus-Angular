module.exports = {
  name: 'ui-library',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/ui-library',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
