
const logs = document.querySelector('#logs');

async function getData(){
    const response = await fetch('/api');
    const data = await response.json();
    console.log(data);

    await populate(data)

    function populate(data){
        
        const dataHTML = data.map(value=> {
            const {longitude, latitude, _id, time, city} = value;
            return `
                <div class='pinkBack'>
                    <p>City: ${city}</p>
                    <p>Time: ${new Date(time)}</p>
                    <p>Latitude: ${latitude}</p>
                    <p>Longitude: ${longitude}</p>
                </div>
            `
        });

        document.querySelector('#logs').innerHTML = dataHTML.join('');

    }

}

getData();