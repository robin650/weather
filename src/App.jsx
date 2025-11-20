import { useEffect, useState } from "react";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const API_KEY = "6f5101feb73a4eec96d3ebd578c8fb6f"; 

  useEffect(() => {
    if (city === "") return;

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.main) {
          setWeather({
            temp: data.main.temp,
            humidity: data.main.humidity,
            wind: data.wind.speed,
            name: data.name,
          });
        } else {
          setWeather("NOT_FOUND");
        }
      })
      .catch((err) => console.log(err));
  }, [city]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center p-4">
      <div className="bg-white/20 backdrop-blur-lg shadow-2xl p-8 rounded-3xl w-full max-w-md text-center text-white">
        <h1 className="text-3xl font-bold mb-6">Weather App</h1>

        {/* Input */}
        <input
          type="text"
          placeholder="Enter city name..."
          className="w-full p-3 rounded-xl text-black mb-6 outline-none border border-gray-300"
          onChange={(e) => setCity(e.target.value)}
        />

        {/* Weather Card */}
        {weather === "NOT_FOUND" && (
          <p className="text-red-100 text-lg font-semibold">City Not Found</p>
        )}

        {weather && weather !== "NOT_FOUND" && (
          <div className="bg-white/30 p-6 rounded-2xl shadow-xl">
            <h2 className="text-2xl font-semibold mb-4">{weather.name}</h2>

            <div className="grid grid-cols-1 gap-4 text-lg">
              <p className="font-medium">
                🌡 Temperature: <span className="font-bold">{weather.temp}°C</span>
              </p>
              <p className="font-medium">
                💧 Humidity: <span className="font-bold">{weather.humidity}%</span>
              </p>
              <p className="font-medium">
                🌬 Wind Speed: <span className="font-bold">{weather.wind} m/s</span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
