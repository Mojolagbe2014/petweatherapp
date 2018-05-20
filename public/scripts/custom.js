$(document).ready(function(){
    var thisPet = $('#temp-details');
    var messageBox = $('.message-box');
    var responseBox = $('#weather-response');
    var thisURL = window.location.href;
    var addForm = $("form");
    
    if (thisURL.indexOf("/pets/") >= 0){
        checkWeather(thisPet, messageBox, responseBox);
    }
    
    if (thisURL.indexOf("/pet/") >= 0){
        getLocation(addForm);
    }
    
    $('#latitude, #longitude').on('change paste keyup', function() {
        var latit = $('#latitude').val();
        var longit = $('#longitude').val();
        reverseGeoLocation(latit, longit, addForm);
    });
});

function checkWeather(pet, messageBox, responseBox){
    const apiKey = '752ca7ee5d3924bfb68660d1ad417709';
    const api_url = 'https://api.darksky.net/forecast/'+apiKey+'/'+pet.attr('data-latitude')+','+pet.attr('data-longitude');
    
    $.ajax(api_url, {
        type:"GET",
        dataType:"jsonp",
        data:{}, 
        beforeSend: function() {
            responseBox.addClass('hidden').hide(); 
            messageBox.show().html('<img src="/images/loading.gif" alt="Loading..."/>');
        },
        success:function(data, status, jqXHR) {
            messageBox.hide();
            responseBox.removeClass('hidden').show();
            console.log(data);
            if(data.hourly.icon === 'rain'){
                responseBox.find('h3').text('It looks like '+pet.attr('data-name')+' is going to need one in '+pet.attr('data-location')+'.');
                responseBox.find('h2').text('Yup!');
                responseBox.find('img').attr('src', '/images/cat-holding-umbrella.png');
                responseBox.find('#alert-head').addClass('alert-warning');
            } else {
                responseBox.find('h3').text('It looks like '+pet.attr('data-name')+' does not need one in '+pet.attr('data-location')+'.');
                responseBox.find('h2').text('Nope!');
                responseBox.find('img').attr('src', '/images/cat-no-umbrella.png');
                responseBox.find('#alert-head').addClass('alert-info');
            }
        },
        error: function(xhr, status, error) {console.log(error);;}
    });
}

function getLocation(selector) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position){
            var latitude = position.coords.latitude,
                longitude = position.coords.longitude;
                
            selector.find('#latitude').val(latitude);
            selector.find('#longitude').val(longitude);
            reverseGeoLocation(latitude, longitude, selector);
        });
    } else {
        selector.find('.message-box').html('Geolocation not supported!!!');
    }
}

function reverseGeoLocation(latitude, longitude, selector) {
    $.ajax({
        type: "GET",
        dataType: "json",
        url:'https://maps.googleapis.com/maps/api/geocode/json?latlng='+latitude+','+longitude+'&sensor=true&key=AIzaSyDQ27WgInDdmdUlbeM_-CsTmfY_Jx0LCyg',
        success: function(data)  {
            //console.log(data);
            var city = '';
            var province = '';
            
            for (var i = 0; i < data.results[4].address_components.length; i++) {
                for (var j = 0; j < data.results[4].address_components[i].types.length; j++) {
                    if(data.results[4].address_components[i].types[j] === 'locality') {
                        city = data.results[4].address_components[i].long_name;
                    }
                    if(data.results[4].address_components[i].types[j] === 'administrative_area_level_1') {
                        province = data.results[4].address_components[i].short_name;
                    }
                }
            }
            selector.find('#location1').val(city+', '+province);
            selector.find('#location').val(city+', '+province);
        }
    });  
}