async function getData(city)
{
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ffdb9cf05a08b15b5dff4666da0a0f1b&units=imperial
`;
    try
    {
        const response = await fetch(url);
        if(!response.ok)
        {
            throw new Error(`Response status: ${response.status}`);
        }
        const result = await response.json();
        // console.log(result);
        return(result);
    } 
    catch(error)
    {
        console.error(error.message);
    }
}