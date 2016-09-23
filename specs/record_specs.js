var assert = require('assert');
var Record = require('../record.js');

describe ('Record', function(){
  var hero;

  beforeEach(function(){
    hero = new Record({title: "Hero", artist: "Enrique Iglesias", price: 9.99})
  })

  it("Should have a title", function(){
    assert.equal("Hero", hero.title);
  })

  it("Should have an artist", function(){
    assert.equal("Enrique Iglesias", hero.artist);
  })

  it("Should have a price", function(){
    assert.equal(9.99, hero.price);
  })

})