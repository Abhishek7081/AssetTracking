document.addEventListener('DOMContentLoaded', () => {
  const socket = io('/')//to create the socket

  const positionOptions = {
    enableHighAccuracy: true,//more high accuracy, if we use mobile phone
    maximumAge: 0//no caching, we want every location fresh every time
  }

//to get the name of person for each location
  const data;
  function handleInput(e){
    data = e.value;
  }
  function submitData(){
    console.log(data); //get first name from object
  }


  setInterval(() => {
    navigator.geolocation.getCurrentPosition(pos => {
      const { latitude: lat, longitude: lng } = pos.coords
      socket.emit('updateLocation', { lat, lng })
    }, err => {
      console.error(err)
    }, positionOptions)
  }, 2000)

})
