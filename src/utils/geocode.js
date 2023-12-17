const request = require('request');

const geocode = (address, callback) => {
    const url = 'http://api.positionstack.com/v1/forward?access_key=51973b38e0aea8594ff107ad389944ce&query=' + encodeURIComponent(address) + '&limit=1';

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback("Unable to connect to Internet", undefined);
        } else if (body.error) {
            callback("Unable to find the location", undefined);
        } else {
            callback(undefined, {
                 latitude: body.data[0].latitude,
                 longitude: body.data[0].longitude,
                 location: body.data[0].name
            })
        }
    })
}

module.exports = geocode;