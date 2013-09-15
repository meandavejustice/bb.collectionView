/* jshint indent:2 */

/*
The MIT License (MIT)

Copyright (c) 2013 Dave Justice

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

/* version 0.0.1 */

/*
Necessary arguments:
collection: your backbone collection to be rendered.
listContainer: STRING of css selectors that point to the container where you want the list to be appended.
childView: The view to render each item with.
*/

(function(_, Backbone) {

  CollectionView = Backbone.View.extend({
    childViews: {},

    initialize: function() {
      if (this.collection){
        this.listenTo(this.collection, 'add', this.onItemAdded, this);
        this.listenTo(this.collection, 'remove', this.onItemRemoved, this);
        this.listenTo(this.collection, 'reset', this.renderCollection, this);
      }
    },

    renderCollection: function(){
      this.listContainer = this.el.querySelector(this.listContainer);

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

    _renderChildView: function(item) {
      var child = new this.childView({item: item});
      child.render();
      this.addToCache(item, child);

      // this only need to be set once :(
      this.listItem = child.el.tagName;
      return child;
    },

    _addToCache: function(item, view) {
      if (!this.childViewInCache(view)) return;
      this.childViews[item.get('pk')] = view;
    },

    _removeFromCache: function(item) {
      if (!this.childViewInCache(item)) return;
      delete this.childViews[item.get('pk')];
    },

    _childViewInCache: function(view) {
      // here we will check if the view already exists in
      return this.childViews[view.cid] !== undefined;
    },

    // collection event handlers
    onItemAdded: function(item) {
      var view = this.renderItem(item);
      this.addToCache(item, view);
      this.appendItem(view);
      this.sortList();
    },

    onItemRemoved: function(item) {
      var view = this.childViews[item.get('pk')];
      this.removeFromCache(item);
      view.remove();
    },

    _appendItem: function(view) {
      this.listContainer.append(view.el);
    },

    _sortList: function(direction) {
      var listContainer = this.listContainer;

      var items = list.childNodes;
      var itemsArr = [];
      for (var i in items) {
          if (items[i].nodeType == 1) { // get rid of the whitespace text nodes
              itemsArr.push(items[i]);
          }
      }

      itemsArr.sort(function(a, b) {
        return a.innerHTML == b.innerHTML
                ? 0
                : (a.innerHTML > b.innerHTML ? 1 : -1);
      });

      for (i = 0; i < itemsArr.length; ++i) {
        list.appendChild(itemsArr[i]);
      }
    },

    _sortList: function(direction) {
      var listContainer = this.listContainer,
          listItems = this.listContainer.querySelector(this.listItem.tagName);
          itemsArr = [];

      for (var i in listItems) {
        if (listItems[i].nodeType === 1) {
          itemsArr.push(listItems[i]);
        }
      }

      listItems.detach().sort(function(a, b) {
        if (direction === "descending") {
          return $(b).data('sort') - $(a).data('sort');
        } else {
          return $(a).data('sort') - $(b).data('sort');
        }
      });

      listContainer.append(listItems);
    }


  });

})(_, Backbone);;
