import { useState } from "react";
import { useNavigate } from "react-router-dom";

const KEY = "11552129f9494b7889c125322250510";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function getWeather(e) {
    e.preventDefault();
    if (!city.trim()) {
      setError("Введите название города");
      return;
    }

    setError("");
    setLoading(true);
    setWeather(null);

    try {
      const res = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${KEY}&q=${city}`
      );
      const data = await res.json();

      if (data.error) {
        setError(data.error.message);
        return;
      }

      setWeather(data);
    } catch (err) {
      setError("Ошибка при получении данных");
    } finally {
      setLoading(false);
    }
  }

  function handleBack() {
    localStorage.removeItem("isAuth");
    navigate("/login");
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold">Погода</h1>

      <form onSubmit={getWeather} className="flex gap-2">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Введите город"
          className="border p-2 rounded"
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Поиск
        </button>
      </form>

      {loading && <p>Загрузка...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {weather && (
        <div className="border p-4 rounded text-center">
          <h2 className="text-xl font-semibold">
            {weather.location.name}, {weather.location.country}
          </h2>
          <img
            src={weather.current.condition.icon}
            alt={weather.current.condition.text}
            className="mx-auto"
          />
          <p className="text-lg">{Math.round(weather.current.temp_c)}°C</p>
          <p>{weather.current.condition.text}</p>
        </div>
      )}

      <button
        onClick={handleBack}
        className="bg-gray-400 text-white px-4 py-2 rounded mt-4"
      >
        Назад к авторизации
      </button>
    </div>
  );
}

export default App;
