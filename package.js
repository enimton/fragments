Package.describe({
  name:          'imkost:fragments',
  version:       '0.1.0',
  summary:       'Simple module system',
  git:           'https://github.com/imkost/fragments',
  documentation: 'README.md',
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');

  api.use('ecmascript@0.1.3-rc.2');

  api.addFiles([
    'fragments/fragments.js',
    'fragments/fragments.getDep.js',
    'fragments/fragments.Fragment.js',
    'fragments/fragments.registerFragment.js',
    'fragments/fragments.--Show-errors-on-startup.js',
    'fragments/fragments.--Export-f.js',
  ]);

  api.export('f');
});
