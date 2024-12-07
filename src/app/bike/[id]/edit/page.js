"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import Head from "next/head";

const EditBike = () => {
  const router = useRouter();
  const { id } = useParams();

  const [bike, setBike] = useState(null);
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchBike = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/bikes/${id}`);
        const bikeData = response.data;
        setBike(bikeData);
        setTitle(bikeData.title);
        setValue(bikeData.price);
        setImage(bikeData.imageUrl);
        setDescription(bikeData.description);
      } catch (error) {
        console.error("Error fetching bike:", error);
      }
    };

    if (id) fetchBike();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedBike = {
        title,
        price: value,
        imageUrl: image,
        description,
      };

      await axios.put(`http://localhost:5000/api/bikes/${id}`, updatedBike);
      router.push("/bikes");
    } catch (error) {
      setErrorMessage("Error actualizando la bicicleta. Inténtalo nuevamente.");
      console.error("Error updating bike:", error);
    }
  };

  if (!bike) {
    return <div className="text-white text-center mt-20">Cargando...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-300 p-6 sm:p-12">
      <Head>
        <title>Editar Bicicleta</title>
      </Head>

      <div className="max-w-3xl mx-auto bg-gray-800 p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Editar Bicicleta</h1>
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium">
                Referencia
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="mt-2 w-full px-4 py-2 bg-gray-700 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="value" className="block text-sm font-medium">
                Valor
              </label>
              <input
                id="value"
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                required
                className="mt-2 w-full px-4 py-2 bg-gray-700 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="image" className="block text-sm font-medium">
                Nombre Imagen
              </label>
              <input
                id="image"
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                required
                className="mt-2 w-full px-4 py-2 bg-gray-700 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium">
                Descripción
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                required
                className="mt-2 w-full px-4 py-2 bg-gray-700 rounded-md focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>
          </div>
          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-400"
            >
              Guardar Cambios
            </button>
          </div>
          {errorMessage && (
            <div className="mt-4 p-4 bg-red-600 text-white rounded">{errorMessage}</div>
          )}
        </form>
      </div>
    </div>
  );
};

export default EditBike;
