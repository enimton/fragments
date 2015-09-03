## Fragments

Simple module system

## Installation

```
meteor add imkost:fragments
```

## Documentation

I'll write documentation. Someday. Maybe.

<!--
What is a fragment?
Fragment is just a piece of javascript code wrapped in `f` function.

Fragments are similar to AMD but with a little bit different logic.

Full syntax:

f(moduleName, dependencies, action)
   |               |           |
 String   Array of strings   Function

but can be used in different ways:

f(moduleName, dependencies, action)
f(moduleName, action)
f(moduleName)
f(dependencies, action)
f(action)

## Caveats

This package is written in ES6, so you need to upgrade your Meteor to 1.2 release candidate:

```
meteor update --release METEOR@1.2-rc.11
```

## How to use

There is global object `modules`:

```javascript
// modules == {}
```

Register fragment `foo`:

```javascript
// modules == {}

f('foo');

// modules == { foo: {} }
```

Define some field for `foo` module:

```javascript
// modules == {}

f('foo', function() {
  this.bar = 'baz';
});

// modules == { foo: { bar: 'baz' } }
```

Now let's create another module, which uses foo's `bar` variable:

```javascript
// modules == {}

f('foo', function() {
  this.bar = 'baz';
});

// modules == { foo: { bar: 'baz' } }

// Use `foo.bar` as `bar` variable
f([ 'foo.bar' ], function(bar) {
  console.log(bar); // => 'baz'
});
```




## Lets talk

*— What? Yet another module system?*

Well ... yeah. For today, Meteor does not play well with any kind of modules (es6/amd/commonjs). Fragments are not better, than other module systems. Fragments will be deprecated someday. But for now it's a very easy-to-use solution for Meteor.

*— Ok, how can I use fragments?*

First, install:

```
meteor add imkost:fragments
```

Then you can use global function `f` to register fragments:

```
f(fragmentName, [dependencies...,] action)
      |               |             |
   String          Strings       Function
```

*— I want to see how to use it, not syntax!*

Calm down and look:

```javascript
// Here we describe fragment `collections` which will have one field, `Posts`
f('collections', function() {
  this.Posts = new Mongo.Collection('Posts');
});

// Here we describe fragment `postMethods` which will have one method, `removePost`
f('postMethods'        // <- fragment's name
, 'collections.Posts'  // <- dependency
, function(Posts) {    // <- action
  this.removePost = function(id) {
    Posts.update(id, { $set: { removed: true } });
  };
});
```

In this example, we have two fragments: `collections` and `postMethods`.

Fragment `collections` has one field (`Posts`) and fragment `postMethods` has one method (`removePost`). These fields and methods can be used by other fragments. Fragment `postMethods` uses field `Posts` of `collections` fragment.

*— It looks very like AMD*

Yes! But with a little bit different syntax and logic. With fragments, we operate on fields and methods and don't have to know anything about file paths.

*— And what about load order? What if fragment A uses fragment B, but fragment B is loaded earlier?*

It has no matter in which order fragments were described. They are smart enough to resolve their dependencies and to be executed in right order. So, in your example, fragment A will be executed before fragment B even if B was loaded earlier. That is a really cool thing about fragments: **no load order pain**.

*— Sounds good. What else should I know?*

Let me show and example:

```javascript
f('collections', function() {
  this.Posts = new Mongo.Collection('Posts');
});

// fragment B
f('posts'
, 'collections.Posts'
, 'collections.Comments'
, function(Posts, Comments) {
  // register helpers
});

// fragment C
f('posts'
, 'collections.Posts'
, 'collections.Comments'
, function(Posts, Comments) {
  // register events
});

// fragment D
f('collections', function() {
  this.Comments = new Mongo.Collection('Comments');
});
```

After executing, `collections` fragment will have two fields: `Posts` and `Comments`. Execution order will be: fragment A, fragment C, fragment B.

Additionally, you can use dot-notation to make your fragments more meaningful



Additionally, you can use dot-notation to describe your

-->
<!--

Glad you ask! Look:

```javascript
f('collections', function() {
  this.Posts = new Mongo.Collection('posts');
});

f('postMethods'
, 'collections.Posts'
, function(Posts) {

  this.removePost = function(id) {
    Posts.update(id, { $set: { removed: true } });
  };

});

f('postView'
, 'postMethods.removePost'
, function(removePost) {

  Template.postView.events({
    'click .postView__remove': function() {
      removePost(this._id);
    }
  });

});
```

---

### *– I don't understand*

> I see. There is a special function f, which registers fragments. First argument is fragment's name. Then you define dependencies which are mapped to last-argument function:
 f(name, deps..., action)
    |        |      |
  String  Strings  Function

That's absolutely right.

---

### *— Can I define fragments in different files?*

Yes. Even more. It's recommended to write fragments in separate files.

---

### *— And what about file load order?*

It does not matter in which order files are loaded. Fragments are smart, they will be executed in right order.

---

### *– It looks pretty similar to AMD*

Yes, but with more simple syntax.

>




https://github.com/meteor-rocket/module
https://github.com/vazco/universe-modules/

to be honest, I didn't try them. I just read docs.

And as I see they force to do some configuration, they use words like npm, cli, webpack, SystemJs to just describe how to use these pacakages. Also, they force to create special names for files (like `*.entry.js`). Also load order is still important.

I don't say they are bad. They are just not so easy as I would like them to be.

Fragments are easy. No configuration needed. Load order does not matter, fragments resolve dependencies behind the scene. And is's just 2kb minified.

-->
