import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import dotenv from "dotenv"

const app = express();
const port = 3000;
dotenv.config();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req,res) => {
    res.render("index.ejs");
});
app.post("/weather", async(req,res) =>{
    const city = req.body.city;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}&units=metric`;
    try {
        const response = await axios.get(apiUrl);
        const data = response.data;
        const weatherData = {
          city: data.name,
          temp: data.main.temp,
          description: data.weather[0].description,
          icon: data.weather[0].icon,
        };
        res.render("index.ejs", { weatherData, error: null });
      } catch (error) {
        res.render("index.ejs", { weatherData: null, error: error.message });
        res.redirect("/");

      }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });