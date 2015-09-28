'use strict';
		
	var data = {
  "cars": [
    {
      "id": "p306",
      "vehicule": "peugeot 306",
      "pricePerDay": 20,
      "pricePerKm": 0.10
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
      "returnDate": "2015-09-12",
      "distance": 100
    },
    {
      "id": "2-rs-92",
      "driver": {
        "firstName": "Rebecca",
        "lastName": "Solanas"
      },
      "carId": "p306",
      "pickupDate": "2015-09-10",
      "returnDate": "2015-09-15",
      "distance": 300
    },
    {
      "id": "3-sa-92",
      "driver": {
        "firstName": " Sami",
        "lastName": "Ameziane"
      },
      "carId": "p306",
      "pickupDate": "2015-08-31",
      "returnDate": "2015-09-13",
      "distance": 1000
    }
  ]
}

		//rentals is a tab of 3 elements (=location contract)
		var rentals = data.rentals; 
		//car is now unique
		var car = data.cars[0];
		//rental represents one contract of the rentals tab
		var rental;
		//date & time var
		var returnDay, pickupDay, timeMs,timeDay;
		//total ans sub price var
		var timePrice, distancePrice, rentalPrice;
		//discount for longer contract 
		var pricePerDay = car.pricePerDay;

function function2()
{

  var result = [];

  for(var i = 0; i< rentals.length; i++)
	{
		//stock the current contract the individual object rental
		rental = rentals[i];
		//in case of discount in the previous rental, reset pricePerDay at its original value
		pricePerDay = car.pricePerDay;
		//we get the contract date to compute the location time in day
		returnDay = new Date(rental.returnDate);
		pickupDay = new Date(rental.pickupDate);
		//difference between 2 date using getTime() gives us milliseconds
		timeMs = returnDay.getTime() - pickupDay.getTime(); 
		//convert milliseconds in days
		timeDay = (timeMs/86400000) + 1;
		if( timeDay > 10)
			pricePerDay -= pricePerDay*0.5;
		else if (timeDay >4)
			pricePerDay -= pricePerDay*0.3;
		else if (timeDay >1)
			pricePerDay -= pricePerDay*0.1;
		//computation of the time price = time in day * price per day
		timePrice = timeDay*pricePerDay;
		//computation of the distanceprice =  distance * Km price
		distancePrice = car.pricePerKm*rental.distance;
		//computation of the rental price = timeprice + distance price
		rental.price = timePrice + distancePrice;


      result.push(rental);
    }
  return result;

}

new Vue({
  el : "#function2",
  data : {
    rentals : function2()
  }

});