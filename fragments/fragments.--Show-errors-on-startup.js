const getUnresolved = fragments.getUnresolved;
const queue         = fragments.queue;

Meteor.startup(() => {
  if (queue.length) {
    const { fragmentName, dep } = getUnresolved();

    console.error(
      `Unable to resolve dependency "${dep}" for ` +
      (fragmentName ? `fragment ${fragmentName}` : 'unnamed fragment')
    );
  }
});
