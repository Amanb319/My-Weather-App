const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;


app.use(express.static('public'));



app.get('/weather', async (req, res) => {
  const { city } = req.query;
  try {
    const apiKey = 'b9c1dc5114334a9dea7ec9ce8fa6fe7c'; 
    const response = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    );
    
    const weatherData = response.data;
    
    // Extract relevant weather information
    const temperature = weatherData.main.temp;
    const weatherDescription = weatherData.weather[0].description;
    
    res.json({ temperature, weatherDescription });
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch weather data' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
