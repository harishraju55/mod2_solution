(function () {
  'use strict';

  angular.module('ShoppingListCheckOff', [])
  .controller('ToBuyController', ToBuyController)
  .controller('AlreadyBoughtController', AlreadyBoughtController)
  .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService) {
    var toBuyList = this;
    toBuyList.items = ShoppingListCheckOffService.getItemsToBuy();
    toBuyList.buyItem = function (itemIndex) {
      try{
        ShoppingListCheckOffService.buyItem(itemIndex);
      }
      catch(error)
      {
        toBuyList.errorMessage = error.message;
      }
    }
  }

  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var boughtList = this;
    boughtList.items = ShoppingListCheckOffService.getItemsBought();
  }

  function ShoppingListCheckOffService() {
    var service = this;
    var itemsToBuy = [{name: "Milk", quantity: "10"},{name: "Donuts",quantity: "10"},{name: "Cookies",quantity: "10"},{name: "Chocolate",quantity: "10"},{name: "Apples",quantity: "10"}];
    var itemsBought = [];
    service.buyItem = function(itemIndex){
      service.addItem(itemIndex);
      service.removeItem(itemIndex);
    };
    service.removeItem = function(itemIndex) {
      itemsToBuy.splice(itemIndex, 1);
      if (itemsToBuy.length==0){
        throw new Error("itemsToBuy");
      }
    };
    service.addItem = function(itemIndex) {
      itemsBought.push(itemsToBuy[itemIndex]);
    };
    service.getItemsToBuy = function () {
      return itemsToBuy;
    }
    service.getItemsBought = function () {
      return itemsBought;
    };
  }
})();
