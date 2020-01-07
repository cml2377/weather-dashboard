//API key for OpenWeather.
var weatherKey = 'd9370cf81c44dc3900380fcc44da127d';

$(document).ready(function () {
    //add var names here
    var searchButton = $("#searchBtn");
    var usCity = $("#cityInput");
    var austinEl = $("#austin");
    var chicagoEl = $("#chicago");
    var newYorkEl = $("#newYork");
    var orlandoEl = $("#orlando");
    var sanFranciscoEl = $("#sanFrancisco");
    var seattleEl = $("#seattle");
    var denverEl = $("#denver");
    var atlantaEl = $("#atlanta");

    //prompt for user location
    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };

    function success(pos) {
        var crd = pos.coords;
        //if user provides geolocation: 
        console.log('Your current position is:');
        console.log(`Latitude : ${crd.latitude}`);
        console.log(`Longitude: ${crd.longitude}`);
        console.log(`More or less ${crd.accuracy} meters.`);
        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/weather?lat=" + crd.latitude + "&lon=" + crd.longitude + "&units=imperial&appid=" + weatherKey,
            method: "GET"
        }).then(function (response) {
            //Log the resulting object
            console.log(response);

            var cityEl = response.name;
            $("#cityStats").html(cityEl);
            $("#cityForecast").html("Weather Forecast: " + cityEl);

            //This is for current weather!
            var currentTempEl = response.main.temp;
            $("#temperatureResponse").html("Current Temperature: " + currentTempEl + "&deg;F");
            $("#currentTemp").html(currentTempEl + "&deg;F");

            //stats for box above weather icons
            $("#humidityResponse").html("Humidity: " + response.main.humidity + "&#37;"); //humidity
            $("#windSpeedResponse").html("Wind Speed: " + response.wind.speed + " mph"); //wind speed

            //current weather conditions
            var currentConditionEl = response.weather[0].description; //this is in the icon box
            $("#currentCondition").text(currentConditionEl);
            //current weather icon
            var iconCode = response.weather[0].id;
            var flowersIcon = "wi wi-owm-" + iconCode;
            $("#currentIcon").attr('class', flowersIcon);

            //for UV index, you must pull lat and lon from response above and do another ajax function
            $.ajax({
                url: "https://api.openweathermap.org/data/2.5/uvi?appid=" + weatherKey + "&lat=" + response.coord.lat + "&lon=" + response.coord.lon,
                method: "GET"
            }).then(function (responseUV) {
                console.log(responseUV);
                $("#wikiUVLink").html(responseUV.value);
                //adds a link to wikipedia's page on UV ranges and their color codes
                $("#wikiUVLink").attr("href", "https://en.wikipedia.org/wiki/Ultraviolet_index#Index_usage");
                $("#wikiUVLink").attr("target", "_blank");

                if (responseUV.value <= 2) {
                    $("#wikiUVLink").css("background-color", "green");
                } else if ((2 < responseUV.value) && (responseUV.value <= 5)) {
                    $("#wikiUVLink").css("background-color", "yellow");
                } else if ((5 < responseUV.value) && (responseUV.value <= 7)) {
                    $("#wikiUVLink").css("background-color", "orange");
                } else if ((7 < responseUV.value) && (responseUV.value <= 10)) {
                    $("#wikiUVLink").css("background-color", "red");
                } else {
                    $("#wikiUVLink").css("background-color", "purple");
                }
            });
        });
    }

    function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
        //if user denies geolocation, run Austin as default.
        queryCurrentWeather("Austin");
    }

    navigator.geolocation.getCurrentPosition(success, error, options);


    //this will populate the date in the weather div.
    var momentDates = moment().format("MMMM Do YYYY");
    $("#currentDate").append(momentDates);
    $("#dateBox").append(momentDates);

    for (i = 1; i < 6; i++) {
        var addDay = moment().add(i, 'days');
        console.log(addDay.format("MMMM Do YYYY"));

        $("#day" + i + "Date").append(addDay.format("MMMM Do YYYY"));

    }


    //when page loads, weather should be default, Austin, TX OR LOCAL STORAGE. This is for current weather! 

    function queryCurrentWeather(cityName) {
        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=" + weatherKey,
            method: "GET"
        }).then(function (response) {
            //Log the resulting object
            console.log(response);

            //logging to see if query works.
            var cityEl = response.name;
            $("#cityStats").html(cityEl);
            $("#cityForecast").html("Weather Forecast: " + cityEl);

            //This is for current weather!
            var currentTempEl = response.main.temp;
            $("#temperatureResponse").html("Current Temperature: " + currentTempEl + "&deg;F");
            $("#currentTemp").html(currentTempEl + "&deg;F");

            //stats for box above weather icons
            $("#humidityResponse").html("Humidity: " + response.main.humidity + "&#37;"); //humidity
            $("#windSpeedResponse").html("Wind Speed: " + response.wind.speed + " mph"); //wind speed

            //current weather conditions
            var currentConditionEl = response.weather[0].description; //this is in the icon box
            $("#currentCondition").text(currentConditionEl);
            //current weather icon
            var iconCode = response.weather[0].id;
            var flowersIcon = "wi wi-owm-" + iconCode;
            $("#currentIcon").attr('class', flowersIcon);

            //for UV index, you must pull lat and lon from response above and do another ajax function
            $.ajax({
                url: "https://api.openweathermap.org/data/2.5/uvi?appid=" + weatherKey + "&lat=" + response.coord.lat + "&lon=" + response.coord.lon,
                method: "GET"
            }).then(function (responseUV) {
                console.log(responseUV);
                $("#wikiUVLink").html(responseUV.value);
                //adds a link to wikipedia's page on UV ranges and their color codes
                $("#wikiUVLink").attr("href", "https://en.wikipedia.org/wiki/Ultraviolet_index#Index_usage");
                $("#wikiUVLink").attr("target", "_blank");

                if (responseUV.value <= 2) {
                    $("#wikiUVLink").css("background-color", "green");
                } else if ((2 < responseUV.value) && (responseUV.value <= 5)) {
                    $("#wikiUVLink").css("background-color", "yellow");
                } else if ((5 < responseUV.value) && (responseUV.value <= 7)) {
                    $("#wikiUVLink").css("background-color", "orange");
                } else if ((7 < responseUV.value) && (responseUV.value <= 10)) {
                    $("#wikiUVLink").css("background-color", "red");
                } else {
                    $("#wikiUVLink").css("background-color", "purple");
                }
            });
        });
    }

    function forecast(cityName) {
        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial&appid=" + weatherKey,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            //THESE ARE FOR THE FORECAST!
            var tempEl1 = response.list[0].main.temp;
            console.log(tempEl1);
            $("#day1Temp").html(tempEl1 + "&deg;F");
            var day1ConditionEl = response.list[0].weather[0].description;
            $("#day1Condition").text(day1ConditionEl);
            var day1Icon = response.list[0].weather[0].id;
            var flowersD1Icon = "wi wi-owm-" + day1Icon;
            $("#day1Icon").attr('class', flowersD1Icon);

            var tempEl2 = response.list[8].main.temp;
            $("#day2Temp").html(tempEl2 + "&deg;F");
            var day2ConditionEl = response.list[8].weather[0].description;
            $("#day2Condition").text(day2ConditionEl);
            var day2Icon = response.list[8].weather[0].id;
            var flowersD2Icon = "wi wi-owm-" + day2Icon;
            $("#day2Icon").attr('class', flowersD2Icon);

            var tempEl3 = response.list[17].main.temp;
            $("#day3Temp").html(tempEl3 + "&deg;F");
            var day3ConditionEl = response.list[17].weather[0].description;
            $("#day3Condition").text(day3ConditionEl);
            var day3Icon = response.list[17].weather[0].id;
            var flowersD3Icon = "wi wi-owm-" + day3Icon;
            $("#day3Icon").attr('class', flowersD3Icon);

            var tempEl4 = response.list[26].main.temp;
            $("#day4Temp").html(tempEl4 + "&deg;F");
            var day4ConditionEl = response.list[26].weather[0].description;
            $("#day4Condition").text(day4ConditionEl);
            var day4Icon = response.list[26].weather[0].id;
            var flowersD4Icon = "wi wi-owm-" + day4Icon;
            $("#day4Icon").attr('class', flowersD4Icon);

            var tempEl5 = response.list[35].main.temp;
            $("#day5Temp").html(tempEl5 + "&deg;F");
            var day5ConditionEl = response.list[35].weather[0].description;
            $("#day5Condition").text(day5ConditionEl);
            var day5Icon = response.list[35].weather[0].id;
            var flowersD5Icon = "wi wi-owm-" + day5Icon;
            $("#day5Icon").attr('class', flowersD5Icon);
        });
    }

    //runs the forecast function
    forecast("Austin");

    //when you click on submit or press enter, run this callback function
    function callback() {
        //runs function queryCurrentWeather with this newly assigned currentWeather
        queryCurrentWeather(usCity[0].value);
        //runs forecast function with the newly assigned queryWeather
        forecast(usCity[0].value);
        //adds random image from Unsplash
        $("#randoImg").attr("src", "https://source.unsplash.com/featured/?" + usCity.val() + ",city");
    }

    searchButton.click(function () {
        callback();
    });

    usCity.keypress(function () {
        if (event.which == 13) callback();
    });

    austinEl.click(function () {
        queryCurrentWeather("Austin");
        forecast("Austin");
        $("#randoImg").attr("src", "https://source.unsplash.com/featured/?austin,city/");
    });

    chicagoEl.click(function () {
        queryCurrentWeather("Chicago");
        forecast("Chicago");
        $("#randoImg").attr("src", "https://source.unsplash.com/featured/?chicago,city/");
    });
    newYorkEl.click(function () {
        queryCurrentWeather("New+York");
        forecast("New+York");
        $("#randoImg").attr("src", "https://source.unsplash.com/featured/?new+york,city/");
    });
    orlandoEl.click(function () {
        queryCurrentWeather("Orlando");
        forecast("Orlando");
        $("#randoImg").attr("src", "https://source.unsplash.com/featured/?orlando,city/");
    });
    sanFranciscoEl.click(function () {
        queryCurrentWeather("San+Francisco");
        forecast("San+Francisco");
        $("#randoImg").attr("src", "https://source.unsplash.com/featured/?san+francisco,city/");
    });
    seattleEl.click(function () {
        queryCurrentWeather("Seattle");
        forecast("Seattle");
        $("#randoImg").attr("src", "https://source.unsplash.com/featured/?seattle,city/");
    });
    denverEl.click(function () {
        queryCurrentWeather("Denver");
        forecast("Denver");
        $("#randoImg").attr("src", "https://source.unsplash.com/featured/?denver,city/");
    });
    atlantaEl.click(function () {
        queryCurrentWeather("Atlanta");
        forecast("Atlanta");
        $("#randoImg").attr("src", "https://source.unsplash.com/featured/?atlanta,city/");
    });

});
