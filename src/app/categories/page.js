import Image from 'next/image';

export default function Categories() {
  return (
    <div className="p-4">
      <section>
        <div className="container px-6 py-8 mx-auto">
          <div className="lg:flex lg:-mx-2">
            <div className="space-y-3 lg:w-1/5 lg:px-2 lg:space-y-4"></div>

            <div className="mt-6 lg:mt-0 lg:px-2 lg:w-4/5">
              <div className="flex items-center justify-between text-sm tracking-widest uppercase">
                <p className="text-gray-500 dark:text-gray-300">Categorias Disponibles</p>
                <div className="flex items-center">
                  <p className="text-gray-500 dark:text-gray-300">Filtrar</p>
                  <select className="font-medium text-gray-700 bg-transparent dark:text-gray-500 focus:outline-none">
                    <option value="#">Recomendacion</option>
                    <option value="#">Precio</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-8 mt-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {/* Tarjetas de Categoría */}
                {[
                  {
                    name: 'Trek',
                    description:
                      'Trek ofrece una amplia gama de bicicletas, desde modelos de carretera hasta de montaña y urbanas, y es conocida por su compromiso con el desarrollo de tecnología avanzada, como el sistema de suspensión IsoSpeed y los cuadros de carbono de alto rendimiento.',
                    imageSrc: '/images/trek.jpg',
                  },
                  {
                    name: 'Specialized',
                    description:
                      'Specialized es conocida por su enfoque en el rendimiento y la innovación. La marca se especializa en bicicletas de alta gama y componentes, y ha sido pionera en muchas tecnologías, como el uso de cuadros de carbono y la optimización de geometrías.',
                    imageSrc: '/images/Specialized.jpg',
                  },
                  {
                    name: 'Scott',
                    description:
                      'Scott se destaca por su innovación y diseño, especialmente en bicicletas de montaña y de carretera. La empresa se enfoca en mejorar la experiencia del ciclista a través de tecnología avanzada y productos de alta calidad.',
                    imageSrc: '/images/scott.jpg',
                  },
                ].map((category, index) => (
                  <div
                    key={index}
                    className="bg-gray-800 rounded-lg flex flex-col items-center justify-center w-full max-w-lg mx-auto"
                  >
                    <Image
                      className="w-55 h-64 mx-auto rounded-lg mb-4 shadow-lg shadow-teal-500"
                      src={category.imageSrc}
                      alt={category.name}
                      width={220}
                      height={256}
                    />
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <h2 className="block text-xl font-semibold text-center text-white">
                          {category.name}
                        </h2>
                      </div>
                      <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-300 opacity-75 sm:text-xs md:text-sm">
                        {category.description}
                      </p>
                    </div>
                    <button className="flex items-center justify-center w-full px-2 py-2 mt-4 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700">
                      <span className="mx-1">Ver productos</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
