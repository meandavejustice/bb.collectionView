//     bb.collectionView.js 0.0.1

//     (c) 2013 Dave Justice
//     bb.collectionView may be freely distributed under the MIT license.

//     (highly inspired by marionette.js)
/*
Necessary arguments:
collection: your backbone collection to be rendered.
listContainer: STRING of css selectors that point to the container where you want the list to be appended.
childView: The view to render each item with.
*/

// dependencies: jQuery, underscore, Backbone
(function($, _, Backbone) {

  CollectionView = Backbone.View.extend({
    // object to track child view
    childViews: {},

    // set up listeners for collection events.
    initialize: function() {
      if (this.collection){
        this.listenTo(this.collection, 'add', this.onItemAdded, this);
        this.listenTo(this.collection, 'remove', this.onItemRemoved, this);
        this.listenTo(this.collection, 'reset', this.renderCollection, this);
      }
    },

    // render full collection
    renderCollection: function(){
      this.listContainer = this.$(this.listContainer);

      _.each(this.collection.models, function(item) {
        var view = this.renderChildView(item);
        this.appendItem(view);
      }, this);

      var children = this.collection.models;

      for (var i = 0; i < children.length; i+=1) {
        var view = this.renderChildView(children[i]);
        this.appendItem(view);
      }

      return this;
    },

    // takes an item(model) from collection,
    // adds it to our childView cache object
    // and returns the child view.
    _renderChildView: function(item) {
      var child = new this.childView({item: item});
      child.render();
      this.addToCache(item, child);

      // this only need to be set once :(
      this.listItem = child.el.tagName;
      return child;
    },

    // private method for adding our view to the cache object
    _addToCache: function(item, view) {
      if (!this.childViewInCache(view)) return;
      this.childViews[item.cid] = view;
    },

    // private method for removing out view from the cache object
    _removeFromCache: function(item) {
      if (!this.childViewInCache(item)) return;
      delete this.childViews[item.cid];
    },

    // private: checking existance of view in cache
    _childViewInCache: function(view) {
      // here we will check if the view already exists in
      return this.childViews[view.cid] !== undefined;
    },

    // collection event handlers
    // ---------------

    // collection.add
    // render a view for the item
    // add to cache,
    // append item and set the list
    onItemAdded: function(item) {
      var view = this.renderItem(item);
      this.addToCache(item, view);
      this.appendItem(view);
      this.sortList();
    },

    // collection.remove
    // remove the childview from cache
    // remove view
    onItemRemoved: function(item) {
      var view = this.childViews[item.cid];
      this.removeFromCache(item);
      view.remove();
    },

    // method for appending to dom
    _appendItem: function(view) {
      this.listContainer.append(view.el);
    },

    // method for sorting the list
    // dependant on sort attribute per childview.el
    _sortList: function(direction) {
      var listContainer = this.listContainer,
          listItems = this.listContainer.children(this.listItem.tagName);

      listItems.detach().sort(function(a, b) {
        if (direction === 'descending') {
          return $(b).data('sort') - $(a).data('sort');
        } else {
          return $(a).data('sort') - $(b).data('sort');
        }
      });

      listContainer.append(listItems);
    }


  });

})($, _, Backbone);
