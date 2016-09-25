var _ = require("lodash");

var RecordStore = function(specs){
  this.name = specs['name'];
  this.city = specs['city'];
  if (specs['balance'] === undefined){
    this.balance = 0
  }
  else this.balance = specs['balance']
  // this.balance = specs['balance'] || 0;
  this.inventory = specs['inventory'] || [];
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
    // var records = [];
    // for (var item of this.inventory){
    //   if(item.artist === artist){
    //     records.push(item);
    //   }
    // }
    // var newRecords = _.sortBy(records, ['title', 'price']);
    // return newRecords;
    records = _.filter(this.inventory, { 'artist': artist});
    var newRecords = _.sortBy(records, ['title', 'price']);
    return newRecords;
  },

  findRecordsByTitle: function(title){
    records = _.filter(this.inventory, { 'title': artist});
    var newRecords = _.sortBy(records, ['artist', 'price']);
    return newRecords;
  },

  prettyListCallback: function(callback, param){
    var records = callback(param);
    var newArray = records.map(function(item){
      return "Artist: " + item['artist'] + ", Title: " + item['title'] + ", Price: " + item['price'];
    });
    var result = newArray.join('\n');
    return result;
  },

  prettyList: function(records){
    var newList = _.sortBy(records, ['artist', 'price', 'title']);
    var newArray = newList.map(function(item){
      return "Artist: " + item['artist'] + ", Title: " + item['title'] + ", Price: " + item['price'];
    });
    var result = newArray.join('\n');
    return result;
  },

  findRecordsUnderPrice: function(value){
    var records = [];
    for (var item of this.inventory){
      if(item.price <= value){
        records.push(item);
      }
    }
    var newRecords = _.sortBy(records, ['price', 'artist', 'title']);
    return newRecords;
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
  },

  buyRecordFromSeller: function(seller, record, markup){
    if (this.balance >= record.price){
    seller.sellRecord(record); 
    this.balance -= record.price;
    if (markup === undefined){
      markup = 1.4;
    }
    record.price = Math.round((record.price * markup) * 100) / 100;
    this.addRecord(record);
  }
  }
 
}






module.exports = RecordStore;

