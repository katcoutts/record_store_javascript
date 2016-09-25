var _ = require("lodash");

var RecordCollector = function(specs){
  this.name = specs['name'];
  this.balance = specs['balance'] || 0;
  this.inventory = specs['inventory'] || [];
}

RecordCollector.prototype = {
  addRecord: function(record){
    this.inventory.push(record);
  },

  sellRecord: function(record, price){
    if (price !== undefined){
      record.price = price;
    }
    var index = this.inventory.indexOf(record);
    this.inventory.splice(index, 1);
    this.balance += record.price;
  },

  buyRecord: function(record){
    if (this.balance >= record.price){
    this.inventory.push(record);
    this.balance -= record.price;
  }
  },

  buyRecordFromSeller: function(seller, record){
    if (this.balance >= record.price){
    seller.sellRecord(record); 
    this.balance -= record.price;
    this.addRecord(record);
  }
  }


}


module.exports = RecordCollector; 