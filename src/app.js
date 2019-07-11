const express = require('express')
const path = require('path')
const hbs = require('hbs')
const forecast = require('../src/utils/forecast')
const geocode = require('../src/utils/geocode')

const app = express()

//Define paths for Express Configs
const publicDirectorPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

//Setup Handlebars Engine and Views Location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath)

//Setup static directory to serve
app.use(express.static(publicDirectorPath))


app.get('', (req, res) => {
    res.render('index', {
        title: "Weather App",
        name: 'Johnson Tran'
    })
})

app.get('/about',(req, res) => {
    res.render('about', {
        title: 'About'
    })
})

app.get('/help', (req, res) => {
    res.render('help',{
        title: "Help Page"
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address)
    {
        return res.send({
            error: "You Must Provide A Valid Address"
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error)
        {
            return error
        }
        forecast(latitude, longitude, (error, forecast) => {
            if(error)
            {
                return error
            }
            res.send({
                forecast,
                location: location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search)
    {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
    error: "Help Article Not Found"
    })
})

app.get('*', (req, res) => {
    res.render("404", {
        error: "My 404 Page"
    })
})

app.listen(3000, () => {
    console.log("Server is up on port 3000")
})