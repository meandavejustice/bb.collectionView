## bb.collectionView
a simple collection view for backbone apps

### Why
After looking at [thorax.js]() and [marionette]() we decided we just wanted a custom collection view,
as to not have to rewrite all of our collections and models. but still extract much of the logic we found
in many of our views.

Hopefully this can serve as a template for someone in a similiar situation.

### dependencies
* [Backbone](http://backbonejs.org/)
* [Underscore](http://underscorejs.org/)

### test
`npm install`
`mocha index.js`

(if you've already included jQuery in your project you can use [jq.bb.collectionView.js]())

### TODO
* create annotated source for non jQ version
* full test coverage