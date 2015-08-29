## Fragments

Simple module system

```
meteor add imkost:fragments
```

## Documentation

Maybe I'll write documentation some day.


<!--
---

### *

- — What? Yet another module system?*
- — Well ... yeah. For today, Meteor does not play well with es6 modules or amd modules or commonjs modules.

Fragments are not better than other module systems. They will be deprecated someday. But for now, they are so easy-to-use solution for Meteor.

---


### *— Ok. So how can I use it?*

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
