//API key for OpenWeather.
var weatherKey = 'd9370cf81c44dc3900380fcc44da127d';

$(document).ready(function () {
    //add var names here
    var searchButton = $("#searchBtn");
    var usCity = $("#cityInput");

    //when page loads, weather should be default, Austin, TX OR LOCAL STORAGE. This is for current weather! 

    var currentWeather = "https://api.openweathermap.org/data/2.5/weather?q=Austin,us&units=imperial&appid=" + weatherKey;
    //We then create an AJAX call for Austin.

    function queryCurrentWeather() {
        $.ajax({
            url: currentWeather,
            method: "GET"
        }).then(function (response) {
            //Log the queryURL
            console.log(currentWeather);
            //Log the resulting object
            console.log(response);
            //logging to see if query works.
            var cityEl = response.name;
            $("#cityForecast").html("Weather Forecast: " + cityEl);
            //This is for current weather!
            var currentTempEl = response.main.temp;
            console.log(currentTempEl);
            $("#currentTemp").html(currentTempEl + "&deg;F");
            //current weather conditions
            var currentConditionEl = response.weather[0].description;
            $("#currentCondition").text(currentConditionEl);
            //current weather icon
            var iconCode = response.weather[0].id;
            var flowersIcon = "wi wi-owm-" + iconCode;
            console.log(flowersIcon);
            $("#currentIcon").attr('class', flowersIcon);
        });
    }

    //runs the function queryCurrentWeather
    queryCurrentWeather();

    // This is for forecast weather!
    var queryWeather = "https://api.openweathermap.org/data/2.5/forecast?q=Austin,us&units=imperial&appid=" + weatherKey;

    function forecast() {
        $.ajax({
            url: queryWeather,
            method: "GET"
        }).then(function (response) {
            //Log the queryURL
            console.log(queryWeather);

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
    forecast();

    //when you click on submit or press enter, run this callback function
    function callback() {
        //reassigns currentWeather value to this
        currentWeather = "https://api.openweathermap.org/data/2.5/weather?q=" + usCity[0].value + ",us&units=imperial&appid=" + weatherKey;
        //runs function queryCurrentWeather with this newly assigned currentWeather
        queryCurrentWeather();

        //reassigns queryWeather value to this
        queryWeather = "https://api.openweathermap.org/data/2.5/forecast?q=" + usCity[0].value + ",us&units=imperial&appid=" + weatherKey;

        //runs forecast function with the newly assigned queryWeather
        forecast();
    }

    searchButton.click(function () {
        callback();
    });

    $("#cityInput").keypress(function () {
        if (event.which == 13) callback();
    });
});
