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


  prettyList: function(records){
    var newList = _.sortBy(records, ['artist', 'price', 'title']);
    var newArray = newList.map(function(item){
      return "Artist: " + item['artist'] + ", Title: " + item['title'] + ", Price: " + item['price'];
    });
    var result = newArray.join('\n');
    return result;
  },

  findRecordsUnderPrice: function(price){
    // an alternative method that saves a method to a variable and uses that method in Array.prototype's filter that also works
    // var isLessThan = function(item){
    //   return item.price <= price
    // }
    // records = this.inventory.filter(isLessThan);
    // return records;

    // an alternative method from scratch that works
    // var records = [];
    // for (var item of this.inventory){
    //   if(item.price <= price){
    //     records.push(item);
    //   }
    // }
    // var newRecords = _.sortBy(records, ['price', 'artist', 'title']);
    // return newRecords;

// a method using lodash and an anonymous function
    records = _.filter(this.inventory, function(item){return item.price <= price});
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

// the below alteration to the record price means the store won't put the record available for sale for what it paid for it as it needs to make profit. An alternative might be to have a boughtRecords variable within RecordStore which is an array. When you buy a record you put it in there. And then there's another step to put the record on sale in which you set the price and add it to the inventory, as this model is assuming that records in the inventory are at the point of being for sale.
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

