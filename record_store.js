var _ = require("lodash");

var RecordStore = function(specs){
  this.name = specs['name'];
  this.city = specs['city'];
  this.balance = specs['balance'];
  this.inventory = specs['inventory'];
}

RecordStore.prototype = {
  addRecord: function(record){
    this.inventory.push(record);
  },

  listInventory: function(){
    var newInventory = _.sortBy(this.inventory, ['artist']);
    var newArray = newInventory.map(function(item){
      return "Artist: " + item['artist'] + ", Title: " + item['title'] + ", Price: " + item['price'];
    });
    var result = newArray.join('\n');
    return result;
  },

  findRecord: function(title){
    var record = _.find(this.inventory, ["title", title]);
    return record;
  },

  findRecordsByArtist: function(artist){
    var records = [];
    for (var item of this.inventory){
      if(item.artist === artist){
        records.push(item);
      }
    }
    return records;
  },

  findRecordsUnderPrice: function(price){
    var records = [];
    for (var item of this.inventory){
      if(item.price <= price){
        records.push(item);
      }
    }
    return records;
  },

  sellRecord: function(record){
    var index = this.inventory.indexOf(record);
    this.inventory.splice(index, 1);
    this.balance += record.price;
  },

  inventoryValue: function(){
    var total = 0;
    _.forEach(this.inventory,
        function(item){
        total += item.price;
      })
    return total;
  },

  financialRecords: function(){
    return "Store balance: " + this.balance + "\nInventory value: " + this.inventoryValue();
  }
 
}






module.exports = RecordStore;