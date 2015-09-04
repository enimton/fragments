const getDep  = fragments.getDep;
const modules = fragments.modules;

const globalObject = this;
const DOT = '.';

fragments.Fragment = class {
  /**
   * @param {Object} opts
   *  @param {String|null} opts.name <moduleName>[.<fragmentDescription>]
   *  @param {String[]} opts.deps
   *  @param {Function} opts.action
   */
  constructor({ name, deps, action }) {
    this.name = name;
    this.deps = deps;
    this.action = action;
    this.module = (() => {
      if (name === null) {
        return globalObject;
      }

      const moduleName = name.split(DOT)[0];

      return modules[moduleName] || (modules[moduleName] = {});
    })();
  }

  run() {
    const depValues = [];

    for (let dep of this.deps) {
      const depValue = getDep(dep);

      if ( ! depValue) {
        return { success: false, dep };
      }

      depValues.push(depValue);
    }

    this.action.apply(this.module, depValues);

    return { success: true };
  }
};
