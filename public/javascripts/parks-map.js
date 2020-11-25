function initMap() {
    const mapInstance = new google.maps.Map(document.querySelector('#trainingsMap'),
        {
            center: directions.retiro.coords,
            zoom: 12,
            styles: mapStyles.yellowParks
        }
    )


    new google.maps.Marker({
        map: mapInstance,
        position: directions.retiro.coords,
        title: directions.retiro.title
    })
}