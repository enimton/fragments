const Fragment      = fragments.Fragment;
const queue         = fragments.queue;
const setUnresolved = fragments.setUnresolved;

function runQueue() {
  const queueLength = queue.length;

  for (let i = 0; i < queueLength; i++) {
    const fragment = queue.pop();
    const result = fragment.run();

    if ( ! result.success) {
      setUnresolved({
        fragmentName: fragment.name,
        dep: result.dep
      });
      queue.unshift(fragment);
    }
  }

  if (queue.length < queueLength) {
    runQueue();
  }
}

/**
 * @param {String} name <moduleName>[.<fragmentDescription>]
 * @param {[String]} [deps]
 * @param {Function} action
 */
fragments.registerFragment = (...args) => {
  const isArray = Array.isArray;
  const args0 = args[0];
  const args1 = args[1];
  const args2 = args[2];
  let name;
  let deps;
  let action;

  // string, array, function
  if (typeof args0 === 'string' && isArray(args1) && typeof args2 === 'function') {
    name = args0;
    deps = args1;
    action = args2;

  // string, action
  } else if (typeof args0 === 'string' && typeof args1 === 'function' && ! args2) {
    name = args0;
    deps = [];
    action = args1;

  // string
  } else if (typeof args0 === 'string' && ! args1 && ! args2) {
    name = args0;
    deps = [];
    action = function() {};

  // array, function
  } else if (isArray(args0) && typeof(args1) === 'function' && ! args2) {
    name = null;
    deps = args0;
    action = args1;

  // function
  } else if (typeof args0 === 'function' && ! args1 && ! args2) {
    name = null;
    deps = [];
    action = args0;

  // Throw error if wrong arguments
  } else {
    throw new Error(
      'Wrong arguments for `f` function. Should be: ' +
      'f(name, deps, action) or f(name, action) or f(name) or f(deps, action) or f(action)'
    );
  }

  queue.push(new Fragment({ name, deps, action }));

  runQueue();
};
