const checkInButton = document.querySelector('#checkInButton');
const latHTML = document.querySelector('#lat');
const lonHTML = document.querySelector('#lon');

checkInButton.addEventListener('click', checkIn);

async function checkIn(){

    if('geolocation' in navigator){
        console.log('available, navigator is working')
        navigator.geolocation.getCurrentPosition(submitToServer)
    } else {
        console.log('not available')
    }

}

async function submitToServer(){
    console.log('rdy to submit');

    const location = document.querySelector('#location').value;
   

    const response = await fetch('/location', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify({location})
    })
    const data = await response.json();

    await htmlPopulate(data);

    function htmlPopulate(value){
            const {lat, lon} = value.location;
        latHTML.innerHTML = lat;
        lonHTML.innerHTML = lon;

        const {temp_c} = value.current;
        const {text} = value.current.condition;

        console.log(temp_c);
        console.log(text);

        document.querySelector('#conditions').innerHTML = text;
        document.querySelector('#temp').innerHTML = temp_c;
    }

}
