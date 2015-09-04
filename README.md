## Fragments

Simple module system

## What? Yet another module system?

Well ... yeah. For today, Meteor does not play well with any kind of modules (es6/amd/commonjs). Fragments are not better than other module systems. Fragments will be deprecated someday. But for now it's a very easy-to-use solution for Meteor.

## Installation

This package is written in ES6, so you need to update your Meteor to 1.2 release candidate.

```
meteor update --release METEOR@1.2-rc.11
meteor add imkost:fragments
```

## What is a fragment?

Fragment is just a piece of javascript code wrapped in `f` function. Fragments are similar to AMD but with a little bit different logic.

## Syntax

Full syntax is:

```
f(moduleName, dependencies, action)
   |               |           |
 String   Array of strings   Function
```

List of possible allowed combinations:

```
f(moduleName, dependencies, action);
f(moduleName, action);
f(moduleName);
f(dependencies, action);
f(action);
```

## How to use

There is object `modules`:

```javascript
// modules == {}
```

Register module `foo`:

```javascript
f('foo');

// modules == { foo: {} }
```

Define some field for `foo` module:

```javascript
f('foo', function() {
  this.bar = 'baz';
});

// modules == { foo: { bar: 'baz' } }
```

Now let's create another module, which uses `foo`'s `bar` field:

```javascript
f('foo', function() {
  this.bar = 'baz';
});

// Use `foo.bar` as `bar` variable
f([ 'foo.bar' ], function(bar) {
  console.log(bar); // => 'baz'
});
```

But `modules` is not in global scope! You can't use `modules` variable.

## No matter load order

It has no matter in which order fragments were defined/loaded. Fragments are smart enough and will be executed only when all their dependencies are resolved (which means, that all dependencies are defined and not null).

## Example

```javascript
// Fragment A
f([ 'previews.showPreviews' ], function(showPreviews) {
  Template.body.events({
    'click .show-previews': showPreviews
  });
});

// Fragment B
f('previews', function() {
  this.showPreviews = function() { ... };
});

// Execution order:
// 1. B
// 2. A
// because A depends on B
```

## Good parts about fragments

1. Easy-to-use
2. No matter load order
3. No global variables (just `f` function)

## Bad parts about fragments

1. Yet another module system
2. Will be deprecated one day

## Should I use fragments?

As you wish. Personally I like fragments and use them in my projects.

## Using global variables

This is an experimental feature. I'm not sure if it's useful or not. Thing is, you can depend on global objects. It actually have no sense, but makes your code more meaningful:

```javascript
// Say that this fragment uses jQuery and underscore
f([ 'jQuery', 'underscore' ], function($, _) {
  // ...
});
```

## Access root modules variable

Previously I was saying that you don't have access to `modules` variable. Actually you can:

```javascript
f([ '' ], function(modules) {
  // ...
});
```

## Add description for fragment

Everything after first dot (`.`) in module's name will be ignored. You can use this feature to make note for fragment:

```javascript
f('previews.showPreviews', function() {
  this.showPreviews = function() { ... };
});

// Is equivalent to:

f('previews', function() {
  this.showPreviews = function() { ... };
});
```

## More complex example

```javascript
// client/itemsView/itemsView.js
f([ 'collections.Items', 'actions.addRandomItem' ], function(Items, addRandomItem) {
  Template.itemsView.helpers({
    items() {
      return Items.find();
    }
  });

  Template.itemsView.events({
    'click .add-random-item': addRandomItem
  });
});
```

```javascript
// lib/collections.js
f('collections', function() {
  this.Items = new Mongo.Collection('Items');
});
```

```javascript
// client/actions/actions.addRandomItem.js
f('actions.addRandomItem', [
  'collections.Items',
  'actions._generateRandomContent'
], function(Items, generateRandomContent) {  

  this.addRandomItem = () => {
    Items.insert({ content: generateRandomContent() });
  }

});

// client/actions/actions._generateRandomContent
f('actions._generateRandomContent', function() {
  this._generateRandomContent = () => {
    return Math.random();
  };
});
```
