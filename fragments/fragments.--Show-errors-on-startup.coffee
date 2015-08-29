queue            = fragments.queue
getUnresolvedDep = fragments.getUnresolvedDep

Meteor.startup ->
  if queue.length
    { fragmentName, dep } = getUnresolvedDep()

    console.error """
      Unable to resolve dependency "#{dep}" for fragment "#{fragmentName}"
      """
;
