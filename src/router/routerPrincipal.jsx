import Home from "../pages/Home";
import Login from "../pages/Login";
import Cotizador from "../pages/Cotizador";
import Registro from "../pages/Registro";

export let router = [
    {
        path: "/",
        element: <Home /> 
    },
    {
        path: "/login",
        element: <Login/>
    },
    {
        path: "/registro",
        element: <Registro/>
    },
    {
        path: "/cotizacion",
        element: <Cotizador/>
    }
]
