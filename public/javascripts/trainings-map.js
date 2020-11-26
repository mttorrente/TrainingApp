let mapInstance

function initApp() {
    drawMap()
    getTrainingsFromAPI()
}


function drawMap() {
    mapInstance = new google.maps.Map(
        document.querySelector('#trainingsMap'),
        { center: { lat: 40.41142, lng: -3.69153 }, zoom: 13, styles: mapStyles.retro }
    )
}


function getTrainingsFromAPI() {

    axios
        .get('/api/entrenamientos')
        .then(response => drawMarkers(response.data))
        .catch(err => console.log(err))
}


function drawMarkers(trainings) {

    trainings.forEach(elm => {

        let position = { lat: elm.location.coordinates[0], lng: elm.location.coordinates[1] }
        console.log(position)
        new google.maps.Marker({
            map: mapInstance,
            position,
            title: elm.description
            
        })
    })

    mapInstance.setCenter({ lat: trainings[1].location.coordinates[0], lng: trainings[1].location.coordinates[1] })
}
