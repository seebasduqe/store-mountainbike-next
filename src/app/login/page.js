"use client";
import Head from 'next/head';
import Image from "next/image"
import axios from "axios"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { LockClosedIcon } from '@heroicons/react/24/solid'
import { useAuth } from '../AuthContext';

export default function Login() {

  const [credentials, setCredentials] = useState({email: "",password: "",});
  const [errorMessage, setErrorMessage] = useState('');

  const router = useRouter();

  const { login } = useAuth();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.post("/api/auth/login", credentials);
      if (res.status === 200) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("idUser", res.data.idUser);
        login();
        router.push("/");
      }
    }
    catch (error) {
      if (error.response) {
        if (error.response.status === 401) setErrorMessage("Credenciales inválidas. Intenta nuevamente.");
        else setErrorMessage("Error: " + error.response.data.message);
      }
    }
  }

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage('');
      }, 2000);

      return () => clearTimeout(timer); // Limpiar el temporizador al desmontar
    }
  }, [errorMessage]);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-6xl font-bold text-white">
            Grupo Espacios Compartidos
          </h1>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
      
        <div className="flex gap-9 items-center flex-col sm:flex-row">
        <form onSubmit={handleSubmit}>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                <div className="sm:col-span-3">
                  <label className="block text-sm font-medium leading-6 text-gray-400">
                    Usuario
                  </label>
                  <div className="mt-2">
                    <input
                      id="usuario"
                      name="usuario"
                      type="text"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      onChange={(e) =>
                        setCredentials({
                          ...credentials,
                          email: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-sm font-medium leading-6 text-gray-400">
                    Contraseña
                  </label>
                  <div className="mt-2">
                    <input
                      id="last-name"
                      name="last-name"
                      type="password"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      onChange={(e) =>
                        setCredentials({
                          ...credentials,
                          password: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
                type="submit"
                className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
                href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                target="_blank"
                rel="noopener noreferrer"
            >
              <LockClosedIcon className="h-5 w-5 mr-2" />
              Iniciar Sesión
            </button>
          </div>
        </form>
  
        </div>

        {errorMessage && (
          <div className="mt-4 p-4 bg-red-100 text-red-700 border border-red-300 rounded">
            {errorMessage}
          </div>
        )}
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <span
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Patrones de Diseño
        </span>
        <span
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          App web Gestion de Espacios
        </span>
        <span
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Pablo, Nicole, Sebas, Fabricio y Juan
        </span>
      </footer>
    </div>
  );
}
