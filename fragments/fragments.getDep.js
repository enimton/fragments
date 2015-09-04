const modules = fragments.modules;

const globalObject = this;
const cachedDeps = { '': modules };

function safeGet(object, getString) {
  let prevValue = null;
  let value = object;

  for (let part of getString.split('.')) {
    prevValue = value;
    value = value[part];

    if ( ! value) {
      return null;
    }
  }

  if (typeof value === 'function') {
    return () => {
      value.apply(prevValue, arguments);
    };
  }

  return value;
}

/**
 * getDep("collections.Posts")    => modules.collections.Posts       OR null
 * getDep("helpers.is-available") => modules.helpers['is-available'] OR null
 * getDep("")                     => modules
 * @param {String} dep
 * @returns {Anything}
 */
fragments.getDep = (dep) => {
  if (dep in cachedDeps) {
    return cachedDeps[dep];
  }

  value = safeGet(modules, dep) || safeGet(globalObject, dep);

  if ( ! value) {
    return null;
  }

  cachedDeps[dep] = value;

  return value;
};
