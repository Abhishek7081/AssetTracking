let map
let markers = new Map()
// var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
// var labelIndex = 0;
var name = "Abhi"

//The DOMContentLoaded event fires when the initial HTML document
//has been completely loaded and parsed, without waiting for 
//stylesheets, images, and subframes to finish loading.(use load to detect a fully-loaded page only)
document.addEventListener('DOMContentLoaded', () => {
  const socket = io('/')

  socket.on('locationsUpdate', locations => {
    markers.forEach((marker, id) => {
      marker.setMap(null)
      markers.delete(id)
    })

    locations.forEach(([id, position]) => {
      if (position.lat && position.lng) {
        const marker = new google.maps.Marker({
          position,
          map,
          label: name
        })
        markers.set(id, marker)
      }
    })
  })
 
  setInterval(() => {
    socket.emit('requestLocations')
  }, 2000)
})

// We define a JavaScript function that creates a map in the div.
function initMap() {

  //below line returns geolocation object that gives webcontent access to current position
  navigator.geolocation.getCurrentPosition(pos => {
    const { latitude: lat, longitude: lng } = pos.coords

    //Creates a new map inside of the given HTML container, DIV element
    map = new google.maps.Map(document.getElementById('map'), {
      center: { lat, lng },
      zoom: 16
    })
  }, err => {
    console.error(err)
  })
}
