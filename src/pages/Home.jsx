import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {

  const navigate = useNavigate();

  const irALogin = () => {
    navigate('/login');
  };

  return (
    <div>
      <h1 className="text-4xl font-bold underline">PAGINA PRINCIPAL</h1>
      <div>
      <button onClick={irALogin} class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">Login</button>
      </div>
    </div>
  );
}

export default Home;
