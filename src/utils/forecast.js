const request = require('request');



const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=898a8a9383e6f156969c0e5455ae541d&query=' + encodeURIComponent(latitude) + ',' +encodeURIComponent(longitude) + '&units=m';

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('No network connection', undefined);
        } else if (body.error) {
            callback('Cannot find the given location', undefined);
        } else {
            const temp = body.current.temperature;
            const feelLikeTemp = body.current.feelslike;
            const location = body.location.name;
            const weather_description = body.current.weather_descriptions;
            const report = `${weather_description}. It is ${temp} degree outside in ${location}, but feels like ${feelLikeTemp} degree`;
            callback(undefined, report);
        }
    })
}



module.exports = forecast;