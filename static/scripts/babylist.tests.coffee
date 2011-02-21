setDown =
	setup : () ->
		BabyList.ViewModel.products = ko.observableArray([])
	teardown : () ->

######

module 'BabyList.Product', setDown

test 'If name is null throw exception', () ->
	raises () -> result = new BabyList.Product()

test 'If price is null throw exception', () ->
	raises () -> result = new BabyList.Product 'foobar'

test 'If id is null throw exception', () ->
	raises () -> result = new BabyList.Product 'foobar', 15

test 'Can init properties on product', () ->
	result = new BabyList.Product 'Foobar', 15, 1
	
	equals result.name, 'Foobar'
	equals result.price, 15
	equals result.id, 1


######

module 'BabyList.ViewModel', setDown

test 'get finds product by id', () ->
	vm = BabyList.ViewModel
	p1 = new BabyList.Product 'Foobar', 15, 1
	p2 = new BabyList.Product 'Foobar', 15, 2

	vm.products = ko.observableArray [ p1, p2 ]

	result1 = vm.get(1)
	result2 = vm.get(2)

	equals result1, p1
	equals result2, p2

test 'add raises error if product is null', () ->
	vm = BabyList.ViewModel
	
	raises ->
		vm.add()

test 'add adds a product to products', () ->
	vm = BabyList.ViewModel
	p = new BabyList.Product 'Foobar', 15, 1
	p2 = new BabyList.Product 'Foobar', 15, 2

	vm.add p
	equals vm.products().length, 1

	vm.add p2
	equals vm.products().length, 2

test 'add cannot add the same product twice', () ->
	vm = BabyList.ViewModel
	p = new BabyList.Product 'Foobar', 15, 1
	vm.add p
	equals vm.products().length, 1

	vm.add p
	equals vm.products().length, 1


test 'remove by id removes the product', () ->
	vm = BabyList.ViewModel
	p = new BabyList.Product 'Foobar', 15, 1
	p2 = new BabyList.Product 'Foobar', 15, 2

	vm.products = ko.observableArray [ p, p2 ]

	vm.remove(2)
	equals vm.products().length, 1

	vm.remove(1)
	equals vm.products().length, 0

test 'export returns person and products as json', () ->
	vm = BabyList.ViewModel
	p = new BabyList.Product 'Foobar', 15, 1

	vm.person.name('foobar')
	vm.person.phone('foobar')
	vm.person.email('foobar')

	vm.products = ko.observableArray [ p ]

	result = vm.export()
	equals result, '{"person":{"name":"foobar","email":"foobar","phone":"foobar"},"products":[{"name":"Foobar","price":15,"id":1}]}'
