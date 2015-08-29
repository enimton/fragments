Fragment         = fragments.Fragment
queue            = fragments.queue
setUnresolvedDep = fragments.setUnresolvedDep

runQueue = ->
  queueLength = queue.length

  for i in [ 0...queueLength ]
    fragment = queue.pop()
    result = fragment.run()
    if not result.success
      setUnresolvedDep(fragment.name, result.dep)
      queue.unshift(fragment)

  if queue.length < queueLength
    runQueue()
;

###*
# @param {String} name <instanceName>[.<fragmentDescription>]
# @param {String...} [deps]
# @param {Function} action
###
fragments.registerFragment = (name, deps..., action) ->
  fragment = new Fragment({ name, deps, action })
  queue.push(fragment)
  runQueue()
;
