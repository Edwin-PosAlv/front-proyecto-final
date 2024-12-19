import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const navigate = useNavigate();

  const manejarEnvio = async (e) => {
    e.preventDefault();

    try {
      const respuesta = await fetch("http://localhost:8080/usuarios");
      if (!respuesta.ok) {
        throw new Error("Error al obtener los usuarios");
      }

      const usuarios = await respuesta.json();

      // Validar el correo y la contraseña en la lista de usuarios
      const usuarioValido = usuarios.find(
        (usuario) => usuario.correo === correo && usuario.contrasena === contrasena
      );

      if (usuarioValido) {
        alert(`¡Bienvenido, ${usuarioValido.nombre}!`);
        navigate("/cotizacion");
      } else {
        alert("Usuario no encontrado o credenciales incorrectas");
      }
    } catch (error) {
      console.error("Error en la petición:", error);
      alert("Ocurrió un error, por favor intenta de nuevo");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={manejarEnvio} className="w-full max-w-sm bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Iniciar Sesión</h2>

        <div className="mb-4">
          <label htmlFor="correo" className="block text-sm font-medium text-gray-700">
            Correo Electrónico
          </label>
          <input
            type="email"
            id="correo"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="contrasena" className="block text-sm font-medium text-gray-700">
            Contraseña
          </label>
          <input
            type="password"
            id="contrasena"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Iniciar Sesión
        </button>

        <button
          type="button"
          onClick={() => navigate("/registro")}
          className="w-full mt-4 bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          Registrarse
        </button>
      </form>
    </div>
  );
}

export default Login;
