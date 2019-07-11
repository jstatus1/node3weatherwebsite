const request = require('request')

const forecast = (lat, long, callback) => {
    const url =  'https://api.darksky.net/forecast/3b471f1836c30798598732d52e6ecd76/'+ lat +','+ long

    request({ url, json: true}, (error, {body}) => {
    if(error)
    {
        callback("Unable to connect to weather service", undefined)
    }else if(body.error)
    {
        callback("Unable to find location", undefined)
    }
    else{
        callback(undefined, 
            body.daily.data[0].summary + " It is currently " + body.currently.temperature + 
            " degrees out. There is a " + (body.currently.precipProbability*100) + "% chance of rain."
        )
    }
    })
}
module.exports = forecast;

