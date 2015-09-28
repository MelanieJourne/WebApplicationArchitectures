'use strict';
		
var data = {
"cars": [
	{
      "id": "p306",
      "vehicule": "peugeot 306",
      "pricePerDay": 20,
      "pricePerKm": 0.10
    },
    {
      "id": "rr-sport",
      "pricePerDay": 60,
      "pricePerKm": 0.30
    },
    {
      "id": "p-boxster",
      "pricePerDay": 100,
      "pricePerKm": 0.45
    }
  ],
  "rentals": [
     {
      "id": "1-pb-92",
      "driver": {
        "firstName": "Paul",
        "lastName": "Bismuth"
      },
      "carId": "p306",
      "pickupDate": "2015-09-12",
      "returnDate": "2015-09-14",
      "distance": 150
    },
    {
      "id": "2-rs-92",
      "driver": {
        "firstName": "Rebecca",
        "lastName": "Solanas"
      },
      "carId": "rr-sport",
      "pickupDate": "2015-09-09",
      "returnDate": "2015-09-13",
      "distance": 550
    },
    {
      "id": "3-sa-92",
      "driver": {
        "firstName": " Sami",
        "lastName": "Ameziane"
      },
      "carId": "p-boxster",
      "pickupDate": "2015-09-12",
      "returnDate": "2015-09-14",
      "distance": 100
    }
  ]
}

//rentals is a tab of 3 elements (=location contract)
var rentals = data.rentals; 
//cars is a tab of 3 elements(=available cars)
var cars = data.cars;

//date & time var
var returnDay, pickupDay, timeMs,timeDay;
//total ans sub price var
var timePrice, distancePrice, rentalPrice;
//result

function function1()
{
  var result = [];

		for(var i = 0; i< rentals.length; i++)
		{
			//stock the current contract the individual object rental
			var rental = rentals[i];
            var car;
			//for this rental, we must find the corresponding car
			for(var j =0; j<cars.length;j++)
			{	
				//if the contract id and the car id match then we use this car
				if(cars[j].id == rental.carId)
					 car = cars[j];
			}
			//we get the contract date to compute the location time in day
			returnDay = new Date(rental.returnDate);
			pickupDay = new Date(rental.pickupDate);
			//difference between 2 date using getTime() gives us milliseconds
			timeMs = returnDay.getTime() - pickupDay.getTime(); 
			//convert milliseconds in days
			timeDay = (timeMs/86400000) + 1;
			//computation of the time price = time in day * price per day
			timePrice = timeDay*car.pricePerDay;
			//computation of the distanceprice =  distance * Km price
			distancePrice = car.pricePerKm*rental.distance;
			//computation of the rental price = timeprice + distance price
			rental.price = timePrice + distancePrice;

            result.push(rental);
		}
  return result;
}

new Vue({
  el : "#function1",
  data : {
    rentals : function1()
  }

});