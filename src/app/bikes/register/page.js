"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";

export default function CrearBicicleta() {
  const [bike, setBike] = useState({
    title: "",
    value: "",
    image: "",
    description: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    setBike({
      ...bike,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/bikes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: bike.title,
          description: bike.description,
          price: bike.value,
          imageUrl: bike.image,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Error al registrar la bicicleta");
      }

      const data = await res.json();
      console.log("Respuesta de la API:", data);

      // Redirecciona a la lista de bicicletas
      router.push("/bikes");
    } catch (error) {
      setErrorMessage(error.message);
      setTimeout(() => setErrorMessage(""), 3000); // Limpia el mensaje después de 3 segundos
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center justify-center p-6">
      <Head>
        <title>Crear Bicicleta</title>
        <meta name="description" content="Registrar una nueva bicicleta" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="max-w-md w-full bg-gray-800 rounded-md p-6 shadow-lg">
        <h1 className="text-2xl font-semibold text-center mb-6">
          Registrar Nueva Bicicleta
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium">
              Referencia
            </label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Referencia de la bicicleta"
              value={bike.title}
              onChange={handleChange}
              className="mt-2 w-full px-3 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="value" className="block text-sm font-medium">
              Valor
            </label>
            <input
              type="text"
              id="value"
              name="value"
              placeholder="Valor de la bicicleta"
              value={bike.value}
              onChange={handleChange}
              className="mt-2 w-full px-3 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="image" className="block text-sm font-medium">
              Nombre Imagen
            </label>
            <input
              type="text"
              id="image"
              name="image"
              placeholder="URL de la imagen"
              value={bike.image}
              onChange={handleChange}
              className="mt-2 w-full px-3 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium">
              Descripción
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="Descripción de la bicicleta"
              value={bike.description}
              onChange={handleChange}
              className="mt-2 w-full px-3 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring focus:ring-blue-500"
              rows="4"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 rounded-md text-white hover:bg-blue-700 focus:outline-none"
          >
            Registrar
          </button>
        </form>

        {errorMessage && (
          <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
            {errorMessage}
          </div>
        )}
      </div>
    </div>
  );
}
