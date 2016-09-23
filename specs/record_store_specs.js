var assert = require('assert');
var Record = require('../record.js');
var RecordStore = require('../record_store.js');

describe ('Record', function(){
  var hero;
  var hannahsHits;
  var stop;
  var gone;
  var twoone;

  beforeEach(function(){
    hero = new Record({title: "Hero", artist: "Enrique Iglesias", price: 9.99});
    hannahsHits = new RecordStore({name: "Hannah's Hits", city: "Seattle", balance: 200, inventory: [hero, stop]});
    stop = new Record({title: "Stop", artist: "Spice Girls", price: 1.99});
    gone = new Record({title: "Gone", artist:"NSYNC", price: 2.99});
    twoone = new Record({title: "2 Become 1", artist: "Spice Girls", price: 1.99})
  })

  it("Should have a name", function(){
    assert.equal("Hannah's Hits", hannahsHits.name);
  })

  it("Should have a city", function(){
    assert.equal("Seattle", hannahsHits.city);
  })

  it("Should have records in inventory", function(){
    assert.deepEqual([hero, stop], hannahsHits.inventory);
  })

  it("Should have a balance", function(){
    assert.equal(200, hannahsHits.balance);
  })

  it("Can add a record", function(){
    hannahsHits.addRecord(gone);
    assert.deepEqual([hero, stop, gone], hannahsHits.inventory);
  })

  it("can list inventory", function(){
    hannahsHits.addRecord(gone);
    console.log(hannahsHits.listInventory());
  })

  it("can find a record", function(){
    assert.deepEqual(stop, hannahsHits.findRecord("Stop"))
  })

  it("can sell a record", function(){
    hannahsHits.sellRecord(stop);
    assert.equal(201.99, hannahsHits.balance);
    assert.deepEqual([hero], hannahsHits.inventory);
  })

  it("can get inventory value", function(){
    assert.equal(11.98, hannahsHits.inventoryValue());
  })

  it("can return financial report", function(){
    console.log(hannahsHits.financialRecords());
  })

  it("can find all records by artist", function(){
    hannahsHits.addRecord(twoone);
    assert.deepEqual([stop, twoone], hannahsHits.findRecordsByArtist("Spice Girls"));
  })

  it("can find records under a price", function(){
    assert.deepEqual([stop], hannahsHits.findRecordsUnderPrice(5));
  })



})