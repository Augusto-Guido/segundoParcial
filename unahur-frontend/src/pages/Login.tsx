import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("Email:", email);
    console.log("Password:", password);
    
    //  conectar tu API de autenticación
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-md bg-slate-900 p-8 rounded-2xl shadow-2xl border border-slate-800">

        <div className="text-center mb-8">
          <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-blue-600 flex items-center justify-center">
            <span className="text-white text-2xl font-bold">L</span>
          </div>

          <h1 className="text-3xl font-bold text-white">
            Bienvenido
          </h1>

          <p className="text-slate-400 mt-2">
            Inicia sesión en tu cuenta
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Correo electrónico
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ejemplo@correo.com"
              required
              className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
            />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium text-slate-300">
                Contraseña
              </label>

              <button
                type="button"
                className="text-sm text-blue-400 hover:text-blue-300"
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingresa tu contraseña"
                required
                className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400 hover:text-white"
              >
                {showPassword ? "Ocultar" : "Mostrar"}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="remember"
              className="w-4 h-4 accent-blue-600"
            />

            <label
              htmlFor="remember"
              className="text-sm text-slate-400"
            >
              Recordarme
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-200 shadow-lg shadow-blue-600/20"
          >
            Iniciar sesión
          </button>

        </form>

        <div className="mt-8 text-center text-xs text-slate-500">
          © 2026 - Todos los derechos reservados
        </div>

      </div>
    </div>
  );
}
