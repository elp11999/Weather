//
// Weather API JavaScript
//

//
// Map current weather to a playlist-id
//
var weatherList = [
    {
        "main": "clear",
        "playlistid": "aa012345678"
    },
    {
        "main": "clouds",
        "playlistid": "bb012345678"
    },
    {
        "main": "rain",
        "playlistid": "cc012345678"
    },
    {
        "main": "snow",
        "playlistid": "dd012345678"
    },
    {
        "main": "thunderstorm",
        "playlistid": "ee012345678"
    },
    {
        "main": "mist",
        "playlistid": "ff012345678"
    },
    {
        "main": "smoke",
        "playlist-id": "gg012345678"
    },
    {
        "main": "haze",
        "playlistid": "hh012345678"
    },
    {
        "main": "sand, dust whirls",
        "playlistid": "ii012345678"
    },
    {
        "main": "fog",
        "playlistid": "jj012345678"
    },
    {
        "main": "sand",
        "playlistid": "kk012345678"
    },
    {
        "main": "dust",
        "playlist-id": "ll012345678"
    },
    {
        "main": "volcanic ash",
        "playlistid": "mm012345678"
    },
    {
        "main": "squalls",
        "playlistid": "nn012345678"
    },
    {
        "main": "tornado",
        "playlistid": "oo012345678"
    }
];

// Weather API key
var APIKey = "5d1cc1876b69aaa35b49428d6c8f441b";

// Default Playlist id
var defaultPlayListID = "000-000-000";

// Call back function for the submit button
$("#submit").click(function(event) {

    // Clear the message area      
    $("#userMsg").text("");

    // Get the zipcode
    var zipCode = $("#zipcode").val().trim();

    // Ensure we have a zip code
    if (zipCode.length > 0) {
        getWeather(zipCode);
    } else
        $("#userMsg").text("Please enter a zip code");
});

// Function to create the weather query
function createWeatherQuery(zipCode) {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?zip=" + zipCode + ",us&appid=" + APIKey;
    return queryURL;
}

// Function to get the playlist-id base on the current weather
function getPlayListID(weatherType) {
    var playListID = defaultPlayListID;
    weatherList.forEach(function(weather) {
        if (weather.main == weatherType) {
            playListID = weather.playlistid;
            return;
        }
    });
    return playListID;
}

// AJAX function to get the weather based on the zip code
function getWeather(zipCode) {
    $.ajax({
        url: createWeatherQuery(zipCode),
        method: "GET"
    }).then(function(response) {
        console.log(response);
        $(".city").text(response.name);
        $(".wind").text(response.wind.speed);
        $(".humidity").text(response.main.humidity);
        $(".temp").text((response.main.temp - 273.15) * 1.80 + 32);
        $(".weather").text(response.weather[0].main);
        var playlistID = getPlayListID(response.weather[0].main.toLowerCase());        
        $("#userMsg").text("PlayList ID is " + playlistID);
    });
};