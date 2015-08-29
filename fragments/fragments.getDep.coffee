instances = fragments.instances

cachedDeps = { '': instances }
globalObject = this

find = (object, getString) ->
  prevValue = null
  value = object

  for part in getString.split('.')
    prevValue = value
    value = value[part]
    if not value?
      return null

  if typeof(value) is 'function'
    return ->
      value.apply(prevValue, arguments)

  return value
;

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

  value = find(instances, dep) or find(globalObject, dep)

  if not value
    return null

  cachedDeps[dep] = value

  return value
;
