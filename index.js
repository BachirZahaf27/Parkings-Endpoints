const express = require('express')
const app = express()
const parks = require('./db.json')
const reserves = require('./reservations.json')


//--- Middleware
app.use(express.json())


//--- ROUTES
app.get('/', (req,res) => {
    console.log('we are in home')
})

app.get('/parkings', (req,res) => {
    console.log('request: GET /parkings')
    res.status(200).json(parks.parkings)//"parks.pakings" is use to target the data inside the array "parkings" not the object itself
})

app.get('/parkings/:id', (req,res) => {
    const id = parseInt(req.params.id)
    const parking = parks.parkings.find(parking => parking.id === id)//"parks.pakings" is use to target the data inside the array "parkings" not the object itself
    console.log('request: GET /parkings/'+id+'')
    res.status(200).json(parking)
})

app.get('/parkings/:id/reservations', (req,res) => {
    const id = parseInt(req.params.id)
    const parking = parks.parkings.find(parking => parking.id === id)
    const reservation = reserves.reservations.find(reservation => reservation.parkingId === parking.id)
    console.log('request: GET /parkings/'+id+'/reservations')
    res.status(200).json(reservation)
})

//--- POSTES
app.post('/parkings', (req,res) => {
    parks.parkings.push(req.body)//push the data in the body of the request in the parkings array
    console.log('request: POST /parkings {'+req.body.name+','+req.body.type+','+req.body.city+'}')
    res.status(200).json(parks.parkings)
})


//--- MODIFY
app.put('/parkings/:id', (req,res) => {
    const id = parseInt(req.params.id)//get the id from the req
    let parking = parks.find(parking => parking.id === id)//find the parking that have the same id as the id the client insert
    parking.name =req.body.name,//set the name of the parking to the name that the client insert in the req body
    parking.type =req.body.type,//
    parking.city =req.body.city,//
    console.log('request: POST /parkings/'+id+'{'+req.body.name+','+req.body.type+','+req.body.city+'}')
    res.status(200).json(parking)
})


//--- DELETE
app.delete('/parkings/:id', (req,res) => {
    const id = parseInt(req.params.id)
    let parking = parks.parkings.find(parking => parking.id === id)
    parks.parkings.splice(parks.parkings.indexOf(parking),1)
    console.log('request: DELETE /parkings/'+id+'{'+req.body.name+','+req.body.type+','+req.body.city+'}')
    res.status(200).json(parks.parkings)
})

//--- LISTENING
app.listen(3000, () => {
    console.log('Serveur à lécoute')
  })