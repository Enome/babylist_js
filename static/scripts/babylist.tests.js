(function() {
  var setDown;
  setDown = {
    setup: function() {
      return BabyList.ViewModel.products = ko.observableArray([]);
    },
    teardown: function() {}
  };
  module('BabyList.Product', setDown);
  test('If name is null throw exception', function() {
    return raises(function() {
      var result;
      return result = new BabyList.Product();
    });
  });
  test('If price is null throw exception', function() {
    return raises(function() {
      var result;
      return result = new BabyList.Product('foobar');
    });
  });
  test('If id is null throw exception', function() {
    return raises(function() {
      var result;
      return result = new BabyList.Product('foobar', 15);
    });
  });
  test('Can init properties on product', function() {
    var result;
    result = new BabyList.Product('Foobar', 15, 1);
    equals(result.name, 'Foobar');
    equals(result.price, 15);
    return equals(result.id, 1);
  });
  module('BabyList.ViewModel', setDown);
  test('get finds product by id', function() {
    var p1, p2, result1, result2, vm;
    vm = BabyList.ViewModel;
    p1 = new BabyList.Product('Foobar', 15, 1);
    p2 = new BabyList.Product('Foobar', 15, 2);
    vm.products = ko.observableArray([p1, p2]);
    result1 = vm.get(1);
    result2 = vm.get(2);
    equals(result1, p1);
    return equals(result2, p2);
  });
  test('add raises error if product is null', function() {
    var vm;
    vm = BabyList.ViewModel;
    return raises(function() {
      return vm.add();
    });
  });
  test('add adds a product to products', function() {
    var p, p2, vm;
    vm = BabyList.ViewModel;
    p = new BabyList.Product('Foobar', 15, 1);
    p2 = new BabyList.Product('Foobar', 15, 2);
    vm.add(p);
    equals(vm.products().length, 1);
    vm.add(p2);
    return equals(vm.products().length, 2);
  });
  test('add cannot add the same product twice', function() {
    var p, vm;
    vm = BabyList.ViewModel;
    p = new BabyList.Product('Foobar', 15, 1);
    vm.add(p);
    equals(vm.products().length, 1);
    vm.add(p);
    return equals(vm.products().length, 1);
  });
  test('remove by id removes the product', function() {
    var p, p2, vm;
    vm = BabyList.ViewModel;
    p = new BabyList.Product('Foobar', 15, 1);
    p2 = new BabyList.Product('Foobar', 15, 2);
    vm.products = ko.observableArray([p, p2]);
    vm.remove(2);
    equals(vm.products().length, 1);
    vm.remove(1);
    return equals(vm.products().length, 0);
  });
  test('export returns person and products as json', function() {
    var p, result, vm;
    vm = BabyList.ViewModel;
    p = new BabyList.Product('Foobar', 15, 1);
    vm.person.name('foobar');
    vm.person.phone('foobar');
    vm.person.email('foobar');
    vm.products = ko.observableArray([p]);
    result = vm["export"]();
    return equals(result, '{"person":{"name":"foobar","email":"foobar","phone":"foobar"},"products":[{"name":"Foobar","price":15,"id":1}]}');
  });
}).call(this);
