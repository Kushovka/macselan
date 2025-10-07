import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password || (!isLogin && (!confirm || !name))) {
      alert("Заполните все поля");
      return;
    }

    if (!isLogin && password !== confirm) {
      alert("Пароли не совпадают");
      return;
    }

    localStorage.setItem("isAuth", "true");
    localStorage.setItem(
      "name",
      isLogin ? localStorage.getItem("name") || "Пользователь" : name
    );
    navigate("/");
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-600">
      <div className="bg-white rounded-2xl shadow-xl p-10 w-full max-w-sm transition-all duration-300">
        <h1 className="text-2xl font-bold text-center text-gray-700 mb-6">
          {isLogin ? "Вход в аккаунт" : "Регистрация"}
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {!isLogin && (
            <input
              type="text"
              placeholder="Имя"
              autoComplete="off"
              className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}
          <input
            type="email"
            placeholder="Email"
            autoComplete="off"
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Пароль"
            autoComplete="new-password"
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {!isLogin && (
            <input
              type="password"
              placeholder="Повторите пароль"
              autoComplete="new-password"
              className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
          )}
          <button
            type="submit"
            className="bg-indigo-500 hover:bg-indigo-600 text-white py-3 rounded-lg font-semibold transition-colors"
          >
            {isLogin ? "Войти" : "Зарегистрироваться"}
          </button>
        </form>

        <p className="text-center text-gray-500 text-sm mt-4">
          {isLogin ? "Нет аккаунта?" : "Уже есть аккаунт?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-indigo-500 font-semibold focus:outline-none"
          >
            {isLogin ? "Регистрация" : "Вход"}
          </button>
        </p>
      </div>
    </div>
  );
}
