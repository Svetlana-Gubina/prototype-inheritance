var PriceList = {
    HAMBURGER_LARGE: 100,
    HAMBURGER_SMALL: 50,
    STUFFING_CHEESE: 10,
    STUFFING_SALAD: 20,
    STUFFING_POTATO: 15,
    COFEE: 80,
    COLA: 50,
    CAESAR: 100,
    RUSSIAN_SALAD: 50
};

var Calories = {
    HAMBURGER_LARGE: 40,
    HAMBURGER_SMALL: 20,
    STUFFING_CHEESE: 20,
    STUFFING_SALAD: 5,
    STUFFING_POTATO: 10,
    COFEE: 20,
    COLA: 40,
    CAESAR: 20,
    RUSSIAN_SALAD: 80
};

var AvailableDrink = {
    COFEE: 'cofee',
    COLA: 'cola',
};

var AvailableSalad = {
    CAESAR: 'caesar',
    RUSSIAN_SALAD: 'russian salad'
};

var HamburgerSize = {
    LARGE: 'large',
    SMALL: 'small'
};

var AvailableStuffing = {
    STUFFING_CHEESE: 'cheese',
    STUFFING_SALAD: 'salad',
    STUFFING_POTATO: 'potato',
};

var MIN_SALAD_WEIGHT = 100;

// Dish
var Dish = (function () {
    function DishConstructor() {
      this.name = '';
      this.price = 0;
      this.calories = 0;
    }
    DishConstructor.prototype.getName = function () {
        return this.name;
    };
    DishConstructor.prototype.calculatePrice = function () {
        return this.price;
    };
    DishConstructor.calculateCalories = function calculateCalories() {
        return this.calories;
    };
    return DishConstructor;
})();

// Hamburger
var Hamburger = (function () {
    function HamburgerConstructor(size, stuffing){
        Dish.call(this);

        if(!size || !stuffing) {
            throw new Error('Need params');
        }
        if(Object.values(HamburgerSize).indexOf(size) === -1) {
            throw new Error('Wrong size');
        }

        this.name = 'hamburger';
        this.size = size;

        if(size === HamburgerSize.LARGE) {
            this.price = PriceList.HAMBURGER_LARGE;
            this.calories = Calories.HAMBURGER_LARGE;
        }
        if(size === HamburgerSize.SMALL) {
            this.price = PriceList.HAMBURGER_SMALL;
            this.calories = Calories.HAMBURGER_SMALL;
        }

        this.stuffing = stuffing;

        switch (stuffing) {
            case AvailableStuffing.STUFFING_CHEESE:
                this.price += PriceList.STUFFING_CHEESE;
                this.calories += Calories.STUFFING_CHEESE;
                break;
             
            case AvailableStuffing.STUFFING_SALAD: 
                this.price += PriceList.STUFFING_SALAD;
                this.calories += Calories.STUFFING_SALAD;
                break;
            
            case AvailableStuffing.STUFFING_POTATO:
                this.price += PriceList.STUFFING_POTATO;
                this.calories += Calories.STUFFING_POTATO;
                break;
     
            default:
                throw new Error('Wrong stuffing');     
        }
    }
  
    // prototypal inheritance
    HamburgerConstructor.prototype = Object.create(Dish.prototype);
    HamburgerConstructor.prototype.constructor = Dish;

    HamburgerConstructor.prototype.getSize = function () {
        return this.size;
    };

    HamburgerConstructor.prototype.getStuffing = function () {
        return this.stuffing;
    }

    return HamburgerConstructor;
})();


// Drink
var Drink = (function () {
    function DrinkConstructor(type){
        Dish.call(this);

        if(!type) {
            throw new Error('Need params!');
        }
        if(Object.values(AvailableDrink).indexOf(type) === -1) {
            throw new Error('Wrong type');
        }

        this.name = 'drink';
        this.type = type;

        if(type === AvailableDrink.COFEE) {
            this.price = PriceList.COFEE;
            this.calories = Calories.COFEE;
        }
        if(type === AvailableDrink.COLA) {
            this.price = PriceList.COLA;
            this.calories = Calories.COLA;
        }
    }
  
    // prototypal inheritance
    DrinkConstructor.prototype = Object.create(Dish.prototype);
    DrinkConstructor.prototype.constructor = Dish;
  
    DrinkConstructor.prototype.getType = function () {
        return this.type;
    };
    
    return DrinkConstructor;
})();
  

// Salad
var Salad = (function () {
    function SaladConstructor(type, weight){
        Dish.call(this);

        if(!type || !weight) {
            throw new Error('Need params');
        }
        if(Object.values(AvailableSalad).indexOf(type) === -1) {
            throw new Error('Wrong type');
        }
        if(Number.isNaN(weight) || weight < MIN_SALAD_WEIGHT) {
            throw new Error('Wrong weight');
        }

        this.name = 'salad';
        this.weight = weight;
        this.type = type;

        switch (type) {
            case AvailableSalad.CAESAR:
                this.price = PriceList.CAESAR * weight / MIN_SALAD_WEIGHT;
                this.calories = Calories.CAESAR;
                break;
            
            case AvailableSalad.RUSSIAN_SALAD: 
                this.price = PriceList.RUSSIAN_SALAD * weight / MIN_SALAD_WEIGHT;
                this.calories = Calories.RUSSIAN_SALAD;
                break;
            
            default:
                throw new Error('Wrong salad type');     
        }
    }
  
    // prototypal inheritance
    SaladConstructor.prototype = Object.create(Dish.prototype);
    SaladConstructor.prototype.constructor = Dish;

    SaladConstructor.prototype.getType = function () {
        return this.type;
    };

    SaladConstructor.prototype.getWeight = function () {
        return this.weight;
    };
  
    return SaladConstructor;
})();


// Order
var getTotalPrice = function(arr) {
    if(!arr.length) {
        return 0;
    }
    var total = 0;
    for(var i = 0; i < arr.length; i++) { 
        total += arr[i].calculatePrice();
    }
    return total;
};

var getTotalCalories = function(arr) {
    if(!arr.length) {
        return 0;
    }
    var total = 0;
    for(var i = 0; i < arr.length; i++) { 
        total += arr[i].calculateCalories();
    }
    return total;
};

var Order = (function () {
    function OrderConstructor() {
        this.isPaid = false;
        this.drink = [];
        this.salad = [];
        this.hamburger = [];
        this.totalPrice = 0;
        this.totalCalories = 0;
    }

    // clear order
    OrderConstructor.prototype.clear = function() {
      this.drink = [];
      this.salad = [];
      this.hamburger = [];
      this.totalPrice = 0;
      this.totalCalories = 0;
    };

    // pay order
    OrderConstructor.prototype.pay = function() {
        this.isPaid = true;
    };

    // add dish
    OrderConstructor.prototype.add = function(dish) {
      if(this.isPaid) {
          throw new Error('Order is isPaid');
      }
      if(dish instanceof Dish !== true) {
          throw new Error('Not a Dish');
      }
      this[dish.getName()].push(dish);
      return this;
    };

    // remove dish
    OrderConstructor.prototype.remove = function(dish) {
      if(this.isPaid) {
          throw new Error('Order is isPaid');
      }
      var index = this[dish.getName()].indexOf(dish);
      if(index === -1) {
          throw new Error('Not in order');
      }
      var filteredList = this[dish.getName()].slice(0, index).concat(this[dish.getName()].slice(index + 1, this[dish.getName()].length));
      this[dish.getName()] = filteredList;
      return this;
    };

    // calculate price
    OrderConstructor.prototype.calculatePrice = function () {
        this.totalPrice = getTotalPrice(this.drink) + getTotalPrice(this.salad) + getTotalPrice(this.hamburger);
        // console.log(this.totalPrice);
        return this.totalPrice;
    };

    // calculate calories
    OrderConstructor.prototype.calculateCalories = function () {
        this.totalCalories = getTotalCalories(this.drink) + getTotalCalories(this.salad) + getTotalCalories(this.hamburger);
        // console.log(this.totalCalories);
        return this.totalCalories;
    };

    return OrderConstructor;
})();


// Example
var order = new Order();
var burger1 = new Hamburger('large', 'salad');
var burger2 = new Hamburger('small', 'salad');
var salad = new Salad('caesar', 120);
var cofee = new Drink('cofee');

// order.clear();

order.add(burger1).add(burger2).add(salad).add(cofee);
var cola = new Drink('cola');
order.remove(cofee).add(cola);
var total = order.calculatePrice();

console.log(total); // 360

order.pay();
var cola2 = new Drink('cola');
order.add(cola2); // Error: 'Order is isPaid'
