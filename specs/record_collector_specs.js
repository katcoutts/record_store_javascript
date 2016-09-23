var assert = require('assert');
var Record = require('../record.js');
var RecordStore = require('../record_store.js')
var RecordCollector = require('../record_collector.js')

describe ('RecordCollector', function(){
  var gordon;
  var stop;
  var gone;

  beforeEach(function(){
    stop = new Record({title: "Stop", artist: "Spice Girls", price: 1.99});
    gone = new Record({title: "Gone", artist:"NSYNC", price: 2.99});
    gordon = new RecordCollector({name: "Gordon", balance: 50, inventory: [stop]})
  })

  it("has a name", function(){
    assert.equal("Gordon", gordon.name);
  })

  it("has a balance", function(){
    assert.equal(50, gordon.balance);
  })

  it("has an inventory of records", function(){
    assert.deepEqual([stop], gordon.inventory);
  })

  it("can sell a record", function(){
    gordon.sellRecord(stop);
    assert.deepEqual([], gordon.inventory);
    assert.deepEqual(51.99, gordon.balance);
  })

  it("can buy a record", function(){
    gordon.buyRecord(gone);
    assert.deepEqual(47.01, gordon.balance);
  })



})