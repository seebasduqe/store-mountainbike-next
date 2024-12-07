"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Head from 'next/head'
import Image from "next/image"
import { ArrowRightIcon } from '@heroicons/react/24/solid'
import axios from "axios"

export default function Register() {

  const [credentials, setCredentials] = useState({
    username: "",
    nombre: "",
    apellido1: "",
    apellido2: "",
    email: "",
    passoword: "",
    direccion: "",
    telefono: ""
  });
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const res = await axios.post("/api/auth/register", credentials);
      if (res.status === 201) {
        console.log(res.data);
        router.push("/login");
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
       <Head>
        <title>Gestion Espacios</title>
        <meta name="description" content="App web Gestion Espacios" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="text-6xl font-bold text-white">
            Grupo Espacios Compartidos
        </h1>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
      
        <div className="flex gap-9 items-center flex-col sm:flex-row">
          <form onSubmit={handleSubmit}>
            <div className="space-y-12">
              <div className="border-b border-gray-900/10 pb-12">

                <h2 className="text-base font-semibold leading-7 text-gray-400 text-center">REGISTRO DE USUARIO</h2>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                  <div className="sm:col-span-3">
                    <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-400">
                      Usuario
                    </label>
                    <div className="mt-2">
                      <input
                        id="username"
                        name="username"
                        type="text"
                        autoComplete="given-name"
                        className="block w-full bg-gray-800 rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        onChange={(e) =>
                          setCredentials({
                            ...credentials,
                            username: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-400">
                      Nombre
                    </label>
                    <div className="mt-2">
                      <input
                        id="nombre"
                        name="nombre"
                        type="text"
                        autoComplete="family-name"
                        className="block w-full bg-gray-800  rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        onChange={(e) =>
                          setCredentials({
                            ...credentials,
                            nombre: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-400">
                      Apellido 1
                    </label>
                    <div className="mt-2">
                      <input
                        id="apellido1"
                        name="apellido1"
                        type="text"
                        autoComplete="given-name"
                        className="block w-full bg-gray-800 rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        onChange={(e) =>
                          setCredentials({
                            ...credentials,
                            apellido1: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-400">
                      Apellido 2
                    </label>
                    <div className="mt-2">
                      <input
                        id="apellido2"
                        name="apellido2"
                        type="text"
                        autoComplete="family-name"
                        className="block w-full bg-gray-800  rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        onChange={(e) =>
                          setCredentials({
                            ...credentials,
                            apellido2: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                      <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-400">
                        Email
                      </label>
                      <div className="mt-2">
                        <input
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          className="block w-full bg-gray-800 rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                        id="password"
                        name="password"
                        type="password"
                        className="block w-full bg-gray-800 rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        onChange={(e) =>
                          setCredentials({
                            ...credentials,
                            password: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-400">
                      Dirección
                    </label>
                    <div className="mt-2">
                      <input
                        id="street-address"
                        name="direccion"
                        type="text"
                        autoComplete="street-address"
                        className="block w-full bg-gray-800 rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        onChange={(e) => 
                          setCredentials({
                            ...credentials,
                            direccion: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-400">
                      Telefono
                    </label>
                    <div className="mt-2">
                      <input
                        id="street-address"
                        name="telefono"
                        type="text"
                        autoComplete="street-address"
                        className="block w-full bg-gray-800 rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        onChange={(e) =>
                          setCredentials({
                            ...credentials,
                            telefono: e.target.value,
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
                <ArrowRightIcon className="h-5 w-5 mr-2" />
                Registrarse
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