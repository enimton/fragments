Package.describe({
  name          : 'imkost:fragments',
  version       : '0.0.1',
  summary       : 'Simple module system',
  git           : 'https://github.com/imkost/fragments',
  documentation : 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');

  api.use('coffeescript');

  api.addFiles([
    'fragments/fragments.coffee',
    'fragments/fragments.getDep.coffee',
    'fragments/fragments.Fragment.coffee',
    'fragments/fragments.registerFragment.coffee',
    'fragments/fragments.--Show-errors-on-startup.coffee',
    'fragments/fragments.--Export-f.coffee'
  ]);

  api.export('f');
});
