//array to store values
var stores = Array();
//input field text
var inputField = document.getElementById('inputString');
var clearItems = document.getElementById('clearItems');
var addItems = document.getElementById('addItems');
var reviewItems = document.getElementById('reviewItems');


//clear the storage
var clearItemsClick = function clearStorage() {
    //clear the storage
    stores = Array();
    localStorage.clear("database");
    //visually cleared
    document.getElementById('write').innerHTML = "storage cleared.";
}
clearItems.addEventListener('click', clearItemsClick, false);

// save the string
var addItemsClick = function saveStatusLocally() {
    //grab the value of the text box
    var stringToSave = inputField.value;
    if ((stringToSave == null) || (stringToSave == "")) {
        document.getElementById('write').innerHTML = "nothing to store.";
    } else {
        //push that value to the array
        stores.push(stringToSave);
        //clear the input field for visual 
        inputField.value = "";
        //print that value into the local storage named database and joing by a non-breaking space
      window.localStorage.setItem("database", stores.join("<br>"));
        //confirm write
        document.getElementById('write').innerHTML = "data stored.";
        //clear message after 1s
        setTimeout(function() {
            document.getElementById('write').innerHTML = "";
        }, 1000);

    }
}
addItems.addEventListener('click', addItemsClick, false);

// read the string
var reviewItemsClick = function readStatus() {
    //print the value of the local storage "database" key
    if (window.localStorage.getItem("database") == null) {
        document.getElementById('write').innerHTML = "nothing stored.";
    } else {
        document.getElementById('write').innerHTML = window.localStorage.getItem("database");
    }
}
reviewItems.addEventListener('click', reviewItemsClick, false);


$("#MainCoursePopup li").hover(

function () {
    $(this).append($("<span> Select your Choice</span>"));
},

function () {
    $(this).find("span:last").remove();
}
);

// Show local locations
function initialize() {
  var myLatlng = new google.maps.LatLng(38.913209, -94.760504);
  var myLatlng2 = new google.maps.LatLng(38.957052,-94.663555);
  var mapOptions = {
    zoom: 10,
    center: myLatlng
  }
  var map = new google.maps.Map(document.getElementById('map'), mapOptions);

  var marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      title: 'OGarden Location 1'
  });

    var marker2 = new google.maps.Marker({
      position: myLatlng2,
      map: map,
      title: 'OGarden Location 2'
  });

}
var button = document.getElementById('btnFind');

var onClick = function() {
    initialize();
};
button.addEventListener('click', onClick, false);

// Initialize for Show directions
var directionsDisplay;
var directionsService = new google.maps.DirectionsService();

function initializeDir() {
  directionsDisplay = new google.maps.DirectionsRenderer();
  var mapOptions = {
    zoom: 7,
    center: new google.maps.LatLng(41.850033, -87.6500523)
  };
  var map = new google.maps.Map(document.getElementById('map'),
      mapOptions);
  directionsDisplay.setMap(map);
  directionsDisplay.setPanel(document.getElementById('directions-panel'));
}

// Show direction to location 1
function calcRoute(dirChoice) {
    var start = '15095 West 123rd Street Olathe, KS 66062';
    var end;
    if (dirChoice == 1){
        end = new google.maps.LatLng(38.913209, -94.760504);
    }
    else{
        end = new google.maps.LatLng(38.957052,-94.663555);
    }
  var request = {
    origin: start,
    destination: end,
    travelMode: google.maps.TravelMode.DRIVING
  };
  directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
    }
  });
}


var btnDir1 = document.getElementById('btnDirLocation1');
var onClick1 = function() {
    initializeDir();
    calcRoute("1");
};
var btnDir2 = document.getElementById('btnDirLocation2');
var onClick2 = function() {
    initializeDir();
    calcRoute("2");
};

btnDir1.addEventListener('click', onClick1, false);
btnDir2.addEventListener('click', onClick2, false);

var btnMashup = document.getElementById('btnShowWeather');

function showWeatherMap() {
  var mapOptions = {
    zoom: 6,
    center: new google.maps.LatLng(38.913209, -94.760504)
  };

 // alert("mashup click");
    
  var map = new google.maps.Map(document.getElementById('Weather'),
      mapOptions);

  var weatherLayer = new google.maps.weather.WeatherLayer({
    temperatureUnits: google.maps.weather.TemperatureUnit.FAHRENHEIT
  });
  weatherLayer.setMap(map);

  var cloudLayer = new google.maps.weather.CloudLayer();
  cloudLayer.setMap(map);
}

//google.maps.event.addDomListener(window, 'load', initializeWeather);

var onMashupClick = function() {
  //  alert("click fired");
    showWeatherMap();
};

btnMashup.addEventListener('click', onMashupClick, false);

// Call RESTful service
$('#btnCallAjax').click(function () {
    //jQuery.support.cors = true;

    $.ajax(
        {
            type: "GET",
            url: "http://localhost:53231/Service1.svc/data/40",
            //data: "{}",
            //contentType: "application/json; charset=utf-8",
            //dataType: "json",
            success: function (data) {

                alert('success. data = ' + data);
                /*$.each(data, function (i, theItem) {
                    var combo = document.getElementById("cboFastBikes");
                    var option = document.createElement("option");
                    option.text = theItem.toString();
                    option.value = theItem.toString();
                    try {
                        //alert('success add combo');
                        combo.add(option, null); // Other browsers
                    }
                    catch (error) {
                        alert('error found');
                        combo.add(option); // really old browser
                    }

                });*/
            },
            error: function (msg, url, line) {
                alert('error trapped in error: function(msg, url, line)');
                alert('msg = ' + msg + ', url = ' + url + ', line = ' + line);

            }
        });


    alert('Service button click');

});

$('#MenuItems li').click(function () {
    var selMenuItem = $(this).text();
    //alert(selMenuItem);

    $.ajax(
        {
            type: "GET",
            url: "http://localhost/aspnet_client/WcfService1/Service1.svc/data/"+selMenuItem,
            //data: "{}",
            //contentType: "application/json; charset=utf-8",
            //dataType: "json",
            success: function (data) {

                //alert('success. data = ' + data.Price);
				document.getElementById('menuitemprice').innerHTML = "The price for " + selMenuItem + " is $" + data.Price;    
            },
            error: function (msg, url, line) {
                alert('error trapped in error: function(msg, url, line)');
                alert('msg = ' + msg + ', url = ' + url + ', line = ' + line);

            }
        });
    
});