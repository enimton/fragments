const unresolved = {};

this.fragments = {
  queue: [],
  modules: {},

  setUnresolved({ fragmentName, dep }) {
    unresolved.fragmentName = fragmentName;
    unresolved.dep = dep;
  },

  getUnresolved() {
    return unresolved;
  },
};
