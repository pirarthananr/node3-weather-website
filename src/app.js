const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to server
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Pirarthan'
    })
})

app.get('/about', (req, res) => {
    res.render('about' , {
        title: 'About Page',
        name: 'Pirarthan'
    })
})

app.get('/help', (req, res) => {
    res.render('help' , {
        message: 'What will you be needing?',
        title: 'Help page',
        name: 'Pirarthan'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error:'You must enter an address'
        })
    } else {
        geocode(req.query.address, (error, {latitude, longitude, location} = {}) =>{
            if (error) {
                return res.send({
                    error: error
                }) 
            } 

            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({
                        error:error
                    })
                }

                res.send({
                    location : location,
                    weather : forecastData
                })

            })
        })

    }
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error:'You must provide a search term'
        })
    } 
    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title : "404 Error : Help page",
        message : "Help page units not found",
        name : "Pirarthan"
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title : "404 Error",
        message : "Page not found",
        name : "Pirarthan"
    })
})
app.listen(3000, () => {
    console.log('Server is up on port 3000')
});