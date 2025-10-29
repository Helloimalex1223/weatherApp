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
        return(result);
    } 
    catch(error)
    {
        console.error(error.message);
    }
}

async function getDataNextThreeDays(city)
{
     try
    {
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=ffdb9cf05a08b15b5dff4666da0a0f1b&units=imperial`;

        const response = await fetch(url);
        if(!response.ok)
        {
            throw new Error(`Response status: ${response.status}`);
        }
        const nextThreeDaysResult = await response.json();

        let filterNextThreeDaysResult = nextThreeDaysResult.list.filter((item, index) => index % 8 === 0).slice(1, 5);

        console.log(filterNextThreeDaysResult);
        return nextThreeDaysResult;
    }
    catch(error)
    {
        console.error(error.message);
    }
}