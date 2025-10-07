import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [name, setName] = useState("");

  useEffect(() => {
    const isAuth = localStorage.getItem("isAuth");
    const storedName = localStorage.getItem("name");
    if (!isAuth) {
      navigate("/login");
    } else {
      setName(storedName || "Пользователь");
    }
  }, []);

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-6">
      <h1 className="text-3xl font-bold">Добро пожаловать, {name}!</h1>
      <button
        onClick={() => navigate("/weather")}
        className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
      >
        Погода
      </button>
    </div>
  );
}
