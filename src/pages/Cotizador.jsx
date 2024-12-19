import React, { useState } from 'react';

function Cotizador() {
  const [placa, setPlaca] = useState('');
  const [modelo, setModelo] = useState('');
  const [marca, setMarca] = useState('');
  const [valor, setValor] = useState(0);
  const [cotizacion, setCotizacion] = useState(0);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const vehiculo = {
      placa,
      modelo,
      marca,
      valor,
      idUsuario: 'string', // Aquí debes reemplazar con el ID del usuario que corresponda
      cotizacion: 0 // Inicialmente la cotización es 0
    };

    try {
      // Enviar datos a la API
      const response = await fetch('http://localhost:8080/vehiculos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(vehiculo),
      });

      if (!response.ok) {
        throw new Error('Error al enviar datos');
      }

      // Calcular cotización (este cálculo es ficticio y deberías adaptarlo según tus necesidades)
      const data = await response.json();
      const calculatedCotizacion = data.valor * 0.02; // Ejemplo: 2% del valor del vehículo como cotización
      setCotizacion(calculatedCotizacion);

      console.log('Vehículo registrado y cotización calculada:', data);
    } catch (error) {
      setError(error.message);
      console.error('Error al enviar datos de vehículo:', error);
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Cotizador de Seguro de Vehículo</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Placa</label>
          <input
            type="text"
            value={placa}
            onChange={(e) => setPlaca(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Modelo</label>
          <input
            type="text"
            value={modelo}
            onChange={(e) => setModelo(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Marca</label>
          <input
            type="text"
            value={marca}
            onChange={(e) => setMarca(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Valor del Vehículo</label>
          <input
            type="number"
            value={valor}
            onChange={(e) => setValor(parseFloat(e.target.value))}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700">
          Cotizar
        </button>
      </form>
      {cotizacion > 0 && (
        <p className="mt-4 text-lg font-semibold">Cotización Calculada: ${cotizacion.toFixed(4)} <hr /> Vehículo guardado en la base de Datos</p>
        
      )}
    </div>
  );
}

export default Cotizador;
