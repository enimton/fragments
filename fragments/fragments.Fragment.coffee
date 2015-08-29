getDep    = fragments.getDep
instances = fragments.instances

DOT = '.'

class fragments.Fragment
  ###
  # @param {Object} opts
  #  @param {String} opts.name <instanceName>[.<fragmentDescription>]
  #  @param {String[]} opts.deps
  #  @param {Function} opts.action
  ###
  constructor: ({ name, deps, action }) ->
    instanceName = name.split(DOT)[0]

    @name = name
    @deps = deps
    @action = action
    @instance = instances[instanceName] || (instances[instanceName] = {})
  ,

  run: ->
    depValues = []

    for dep in @deps
      depValue = getDep(dep)
      if depValue?
        depValues.push(depValue)
      else
        return { success: false, dep: dep }

    @action.apply(@instance, depValues)

    return { success: true }
;
