"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

const API_URL = "http://localhost:5000/api/bikes"; // Cambia esto según tu configuración.

export default function Bikes() {
  const [bikes, setBikes] = useState([]);

  // Fetch inicial de bicicletas
  useEffect(() => {
    const fetchBikes = async () => {
      try {
        const response = await axios.get(API_URL);
        console.log(response);
        setBikes(response.data);
      } catch (error) {
        console.error("Error al obtener las bicicletas:", error);
      }
    };
    fetchBikes();
  }, []);

  // Eliminar bicicleta
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setBikes(bikes.filter((bike) => bike.id !== id));
    } catch (error) {
      console.error("Error al eliminar la bicicleta:", error);
    }
  };

  return (
    <main className="p-4">
      <section>
        <div className="container px-6 py-8 mx-auto">
          <div className="lg:flex lg:-mx-2">
            <div className="space-y-3 lg:w-1/5 lg:px-2 lg:space-y-4">
              <a href="#" className="block font-medium text-gray-500 hover:underline">
                Trek
              </a>
              <a href="#" className="block font-medium text-gray-500 hover:underline">
                Specialized
              </a>
              <a href="#" className="block font-medium text-gray-500 hover:underline">
                Scott
              </a>
            </div>

            <div className="mt-6 lg:mt-0 lg:px-2 lg:w-4/5">
              <div className="flex items-center justify-between text-sm tracking-widest uppercase">
                <p className="text-gray-500">Productos Disponibles</p>
                <div className="flex items-center">
                  <p className="text-gray-500">Filtrar</p>
                  <select className="font-medium text-gray-700 bg-transparent focus:outline-none">
                    <option value="#">Recomendación</option>
                    <option value="#">Tamaño</option>
                    <option value="#">Precio</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-8 mt-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {bikes.map((bike) => (
                  <div
                    key={bike.id}
                    className="bg-gray-800 rounded-lg flex flex-col items-center justify-center w-full max-w-lg mx-auto"
                  >
                    <Image
                      className="w-55 h-64 mx-auto rounded-lg mb-4 shadow-lg shadow-teal-500"
                      src={
                        bike.imageUrl && bike.imageUrl.startsWith("http")
                          ? bike.imageUrl
                          : `/default-image.png`
                      }
                      alt={bike.title}
                      width={220}
                      height={250}
                    />
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <h2 className="block text-xl font-semibold text-center text-white">
                          {bike.title}
                        </h2>
                        <p className="block text-gray-300 text-sm text-center">
                          ${bike.price.toLocaleString()}
                        </p>
                      </div>
                      <p className="block text-sm text-gray-300">
                        {bike.description}
                      </p>
                    </div>
                    <button className="flex items-center justify-center w-full px-2 py-2 mt-4 bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700">
                      <span className="mx-1">Añadir al carrito</span>
                    </button>
                    <Link
                      href={`/bike/${bike.id}/edit`}
                      className="flex items-center justify-center w-full px-2 py-2 mt-4 bg-orange-500 rounded-md hover:bg-orange-400 focus:outline-none focus:bg-orange-400"
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => handleDelete(bike.id)}
                      className="flex items-center justify-center w-full px-2 py-2 mt-4 bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:bg-red-500"
                    >
                      Eliminar
                    </button>
                  </div>
                ))}

                {/* Nueva bicicleta */}
                <div className="bg-gray-800 rounded-lg flex flex-col items-center justify-center w-full max-w-lg mx-auto">
                  <div className="p-6">
                    <h2 className="block text-xl font-semibold text-center text-white">
                      Añadir nueva bicicleta
                    </h2>
                  </div>
                  <Link
                    href="/bikes/register"
                    className="flex items-center justify-center w-full px-2 py-2 mt-4 bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                  >
                    +
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
