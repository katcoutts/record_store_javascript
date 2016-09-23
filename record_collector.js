var _ = require("lodash");

var RecordCollector = function(specs){
  this.name = specs['name'];
  this.balance = specs['balance'];
  this.inventory = specs['inventory'];
}

RecordCollector.prototype = {
  addRecord: function(record){
    this.inventory.push(record);
  },

  sellRecord: function(record){
    var index = this.inventory.indexOf(record);
    this.inventory.splice(index, 1);
    this.balance += record.price;
  },

  buyRecord: function(record){
    this.inventory.push(record);
    this.balance -= record.price;
  }


}


module.exports = RecordCollector; 