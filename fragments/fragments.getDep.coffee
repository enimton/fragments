instances = fragments.instances

cachedDeps = { '': instances }

###*
# getDep("collections.Posts")    => instances.collections.Posts       OR null
# getDep("helpers.is-available") => instances.helpers['is-available'] OR null
# getDep("")                     => instances
# @param {String} dep
# @returns {Anything}
###
fragments.getDep = (dep) ->
  if dep of cachedDeps
    return cachedDeps[dep]

  value = instances
  for part in dep.split('.')
    value = value[part]
    if not value?
      return null

  cachedDeps[dep] = value

  return value
;
