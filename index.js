const express = require('express')
const app = express()
const parkings = require('./parkings.json')
const reservations = require('./reservations.json')


//--- Middleware
app.use(express.json())


//--- ROUTES
app.get('/parkings', (req,res) => {
    console.log('request: GET /parkings')
    res.status(200).json(parkings)
})

app.get('/parkings/:id', (req,res) => {
    const id = parseInt(req.params.id)
    const parking = parkings.find(parking => parking.id === id)
    console.log('request: GET /parkings/'+id+'')
    res.status(200).json(parking)
})

app.get('/parkings/:id/reservation', (req,res) => {
    const id = parseInt(req.params.id)
    const parking = parkings.find(parking => parking.id === id)
    const reservation = reservations.find(reservation => reservation.parkingId === parking.id)
    console.log('request: GET /parkings/'+id+'/reservation')
    res.status(200).json(reservation)
})

//--- POSTES
app.post('/parkings', (req,res) => {
    parkings.push(req.body)//push the data in the body of the request in the parkings array
    console.log('request: POST /parkings {'+req.body.name+','+req.body.type+','+req.body.city+'}')
    res.status(200).json(parkings)
})


//--- MODIFY
app.put('/parkings/:id', (req,res) => {
    const id = parseInt(req.params.id)//get the id from the req
    let parking = parkings.find(parking => parking.id === id)//find the parking that have the same id as the id the client insert
    parking.name =req.body.name,//set the name of the parking to the name that the client insert in the req body
    parking.type =req.body.type,//
    parking.city =req.body.city,//
    console.log('request: POST /parkings/'+id+'{'+req.body.name+','+req.body.type+','+req.body.city+'}')
    res.status(200).json(parking)
})


//--- DELETE
app.delete('/parkings/:id', (req,res) => {
    const id = parseInt(req.params.id)
    let parking = parkings.find(parking => parking.id === id)
    parkings.splice(parkings.indexOf(parking),1)
    console.log('request: DELETE /parkings/'+id+'{'+req.body.name+','+req.body.type+','+req.body.city+'}')
    res.status(200).json(parkings)
})

//--- LISTENING
app.listen(8080, () => {
    console.log('Serveur à lécoute')
  })