unresolvedDep = {}

@fragments = {
  queue: []
  instances: {}

  setUnresolvedDep: (fragmentName, dep) ->
    unresolvedDep = { fragmentName, dep }
  ,

  getUnresolvedDep: ->
    return unresolvedDep
}
