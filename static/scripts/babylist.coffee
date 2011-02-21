#Product object
class Product
	constructor: (name, price, id) ->
		if not name?
			throw new Error 'Name is null'

		if not price?
			throw new Error 'Price is null'
		
		if not id?
			throw new Error 'Id is null'

		@name = name
		@price = price
		@id = id

ViewModel =
	person :
		name : ko.observable()
		email : ko.observable()
		phone : ko.observable()

	products : ko.observableArray([])

	get :  (id) ->
		for p in @products()
			if p.id is id
				return p

	add : (p) ->
		if not p?
			throw new Error 'Product is null'
		
		if !@get p.id
			@products.push p
	
	remove : (id) ->
		p = @get(id)
		if p?
			@products.remove(p)
	
	
	totalPrice : () ->
		total = 0
		for product in @products()
			total += product.price

		return total
	
	export : () ->
		return ko.toJSON
			person: @person
			products: @products
		
BabyList =
	Product : Product
	ViewModel : ViewModel

#manually attach to global object
window.BabyList = BabyList
