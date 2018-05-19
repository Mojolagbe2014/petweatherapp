$(document).ready(function(){
    var thisPet = $('#temp-details');
    var messageBox = $('.message-box');
    var responseBox = $('#weather-response');
    var thisURL = window.location.href;
    
    if (thisURL.indexOf("pets") >= 0)
        checkWeather(thisPet, messageBox, responseBox);
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