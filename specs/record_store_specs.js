var assert = require('assert');
var Record = require('../record.js');
var RecordStore = require('../record_store.js');
var RecordCollector = require('../record_collector.js');

describe ('RecordStore', function(){
  var hero;
  var hannahsHits;
  var stop;
  var gone;
  var twoone;

  beforeEach(function(){
    hero = new Record({title: "Hero", artist: "Enrique Iglesias", price: 9.99});
    stop = new Record({title: "Stop", artist: "Spice Girls", price: 1.99});
    hannahsHits = new RecordStore({name: "Hannah's Hits", city: "Seattle", balance: 200, inventory: [hero, stop]});
    charleysTunes = new RecordStore({name: "Charley's Tunes", city: "Aberdeen"});
    gone = new Record({title: "Gone", artist:"NSYNC", price: 2.99});
    twoone = new Record({title: "2 Become 1", artist: "Spice Girls", price: 1.99});
    gordon = new RecordCollector({name: "Gordon", balance: 50, inventory: [gone]});
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

  it("Should have empty array for inventory if none passed in", function(){
    assert.deepEqual([], charleysTunes.inventory);
  })

  it("Should have a balance", function(){
    assert.equal(200, hannahsHits.balance);
  })

  it("Should have balance of 0 if no balance passed in", function(){
    assert.equal(0, charleysTunes.balance);
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
    assert.deepEqual([twoone, stop], hannahsHits.findRecordsByArtist("Spice Girls"));
    console.log(hannahsHits.prettyList(hannahsHits.findRecordsByArtist("Spice Girls")));
  })

  it("can find records under a price", function(){
    assert.deepEqual([stop], hannahsHits.findRecordsUnderPrice(5));
    console.log(hannahsHits.prettyList(hannahsHits.findRecordsUnderPrice(5)));
  })

// WOULD LIKE TO KNOW HOW TO GET BELOW TO WORK - HAVE TWEAKED THE SYNTAX LOTS OF DIFFERENT WAYS BUT ALWAYS END UP WITH SOMETHING LIKE CALLBACK IS NOT DEFINED OR FINDRECORDSBYARTIST IS NOT DEFINED. THE BELOW IS NOT ERRORING AS IT'S WRITTEN NOW BUT IT'S NOT PRINTING ANYTHING AT ALL.
  it("can print pretty lists for different functions via callback", function(){
    hannahsHits.addRecord(twoone);
    console.log(hannahsHits.prettyListCallback(hannahsHits.findRecordsByArtist, "Spice Girls"));
  })

  it("can buy from a collector and reset price", function(){
    hannahsHits.buyRecordFromSeller(gordon, gone);
    assert.deepEqual([hero, stop, gone], hannahsHits.inventory);
    assert.deepEqual(4.19, gone.price);
    assert.deepEqual([], gordon.inventory);
    assert.deepEqual(52.99, gordon.balance);
  })



})