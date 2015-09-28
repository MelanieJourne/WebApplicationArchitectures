'use strict';

var data ={
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
      "distance": 100,
      "options":{
        "deductibleReduction": false
      }
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
      "distance": 300,
      "options":{
        "deductibleReduction": true
      }
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
      "distance": 1000,
      "options":{
        "deductibleReduction": true
      }
    }
  ],
  "rentalModifications": [
    {
      "id": 1,
      "rentalId": "1-pb-92" ,
      "returnDate": "2015-09-13",
      "distance": 150
    },
    {
      "id": 2,
      "rentalId": "3-sa-92",
      "pickupDate": "2015-09-01"
    }
  ]
}

var rentals = data.rentals;
var rental;
var returnDay, pickupDay, timeMs, timeDay;
var car = data.cars[0];
var pricePerDay = car.pricePerDay;
var distancePrice, timePrice;
var rentalPrice, newRentalPrice;
var actions, newActions;
var option;

function function6()
{
	var result = [];
	
	for(var i = 0; i< rentals.length; i++)
	{	
		//compute first valor
		rental = rentals[i];
		rentalPrice = computeRentalPrice(rental);
		actions = computeActions(rentalPrice);
		//by default, no modification
		rental.modification = "No";
		option = rental.options.deductibleReduction;
		if(option)
		{
			rentalPrice += 4*timeDay;
			actions.driver.price += 4*timeDay;
			actions.drivy.price += 4*timeDay;
		}
		var modifications = data.rentalModifications;
		
		//search for change and take effect
		for(var j = 0; j < modifications.length; j++)
		{
			if(modifications[j].rentalId == rental.id)
			{	
				//recompute everything
				modifyRental(modifications[j]);
				rental.modification = "Yes";				
			}
		}
		
		if(rental.modification == "No")
			rental.actions = actions;
		else{
			//recompute valor
			newRentalPrice = computeRentalPrice(rental);
			newActions = computeActions(newRentalPrice);
			if(option)
			{
				newRentalPrice += 4*timeDay;
				newActions.driver.price += 4*timeDay;
				newActions.drivy.price += 4*timeDay;
			}
			newActions.driver.delta = rentalPrice - newRentalPrice;
			newActions.insurance.delta = newActions.insurance.price - actions.insurance.price;
			newActions.roadside.delta = newActions.roadside.price - actions.roadside.price;
			newActions.drivy.delta = newActions.drivy.price - actions.drivy.price;
			newActions.owner.delta = newActions.owner.price - actions.owner.price;
			
			rental.actions = newActions;
		}
		
		
		result.push(rental);
	}
	
	return result;
}

function computeActions(value)
{
	var comissionValue = Math.round(value*0.3);
    var output = {
			driver :{
				price : value,
				delta : 0
			},
            insurance :{
				price: comissionValue/2,
				delta:0
			},
            roadside :{
				price : timeDay,
				delta :0
			},
            drivy :{
				price : comissionValue/2 - timeDay,
				delta :0
			},
			owner :{
				price : value - comissionValue,
				delta : 0
			}
    };
	
	return output;
}

function computeRentalPrice(contract)
{
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
	return timePrice + distancePrice;
}

function modifyRental(modification)
{
	if(modification.distance != undefined)
	{
		rental.distance = modification.distance;
	}
	if(modification.returnDate != undefined)
	{
		rental.returnDate = modification.returnDate;
	}
	if(modification.pickupDate != undefined)
	{
		rental.pickupDate = modification.pickupDate;		
	}
}



new Vue({
  el : "#function6",
  data : {
    rentals : function6()
  }
});