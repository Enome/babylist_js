(function() {
  var BabyList, Product, ViewModel;
  Product = (function() {
    function Product(name, price, id) {
      if (!(name != null)) {
        throw new Error('Name is null');
      }
      if (!(price != null)) {
        throw new Error('Price is null');
      }
      if (!(id != null)) {
        throw new Error('Id is null');
      }
      this.name = name;
      this.price = price;
      this.id = id;
    }
    return Product;
  })();
  ViewModel = {
    person: {
      name: ko.observable(),
      email: ko.observable(),
      phone: ko.observable()
    },
    products: ko.observableArray([]),
    get: function(id) {
      var p, _i, _len, _ref;
      _ref = this.products();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        p = _ref[_i];
        if (p.id === id) {
          return p;
        }
      }
    },
    add: function(p) {
      if (!(p != null)) {
        throw new Error('Product is null');
      }
      if (!this.get(p.id)) {
        return this.products.push(p);
      }
    },
    remove: function(id) {
      var p;
      p = this.get(id);
      if (p != null) {
        return this.products.remove(p);
      }
    },
    totalPrice: function() {
      var product, total, _i, _len, _ref;
      total = 0;
      _ref = this.products();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        product = _ref[_i];
        total += product.price;
      }
      return total;
    }
  };
  BabyList = {
    Product: Product,
    ViewModel: ViewModel
  };
  window.BabyList = BabyList;
}).call(this);
