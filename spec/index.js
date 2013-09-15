var assert = require('assert');
// var instanceof = require('instanceof');
var _ = require('underscore');
var Backbone = require('Backbone');
var $ = require('jQuery');
var CollectionView = require('../src/bb.collectionView.js');
describe('Backbone', function(){
  describe('existence', function(){
    it('should check that Backbone is defined', function(){
      assert.equal(typeof Backbone, 'object');
    });
  });
});

describe('', function(){
  describe('existence', function(){
    it('should check that Backbone is defined', function(){
      console.log(CollectionView);
      var cV = new CollectionView({});
      console.log(cV);
      // assert.equal(instanceof CollectionView, cV);
    });
  });
});
