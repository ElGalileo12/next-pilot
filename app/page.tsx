import AcmeLogo from "@/app/ui/acme-logo";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import styles from "./ui/home.module.css";
import Image from "next/image";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col">
      <section className="header relative items-center flex h-screen max-h-860-px">
        <div className="container mx-auto items-center flex flex-wrap">
          <div className="w-full md:w-8/12 lg:w-6/12 xl:w-6/12 px-4">
            <div className="pt-20 sm:pt-0">
              <h1 className="font-semibold text-4xl text-blueGray-700">
                Bienvenido a Goat Sport
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-gray-600">
                Gestiona equipos y partidos de fútbol fácilmente.
              </p>
              <p className="mt-2 text-lg leading-relaxed text-gray-600">
                Una herramienta para administrar equipos de fútbol, optimizando
                la gestión de partidos, pagos y actualizaciones del club.
              </p>
            </div>
            <div className="flex justify-start mt-4">
              <Link
                href="/auth/signin"
                className="flex items-center gap-5 self-start rounded-lg bg-sky-950 px-14 py-2.5 text-sm font-medium text-white transition-colors hover:bg-sky-950 md:text-base"
              >
                <span>Log in</span> <ArrowRightIcon className="w-5 md:w-5" />
              </Link>
            </div>
          </div>
        </div>
        <Image
          className="absolute top-0 b-auto right-5 pt-24 sm:w-1/2 mt-48 sm:mt-0 w-10/12 max-h-860-px hidden md:block"
          src="/home/alineacion.png"
          alt="..."
          width={1000}
          height={1000}
          style={{ background: "transparent" }}
        />
      </section>

      <section className="mt-10 md:mt-10 pb-40 relative">
        <div
          className="-mt-10 top-0 w-full absolute"
          style={{ transform: "translateZ(0)" }}
        >
          <div className=" relative bg-blue-100">
            <svg
              className="absolute left-0 top-0 right-0 w-full overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
            >
              <polygon
                className="text-sky-950 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </div>
        <div className="bg-sky-950">
          <div className="flex flex-wrap items-center">
            <div className="md:w-2/6 px-12 md:px-4 mr-auto ml-auto mt-6">
              <div className="relative flex flex-col break-words w-full mb-6 rounded-lg items-center">
                <div className="relative w-4/5 h-3/4">
                  <Image
                    alt="..."
                    src="/home/basquetbol.jpeg"
                    className="w-full h-full object-cover rounded-md "
                    width={500}
                    height={500}
                  />
                </div>
              </div>
            </div>

            <div className="w-full md:w-1/2 mx-10">
              <div className="flex flex-wrap">
                <div className="w-full md:w-6/12 px-4">
                  <div className="relative flex flex-col">
                    <div className="px-4 py-5 flex-auto">
                      <div className="p-2 text-center inline-flex items-center justify-center w-14 h-14 mb-5 shadow-lg rounded-full bg-white">
                        <Image
                          src="/home/campofutbol.png"
                          alt="..."
                          className="w-full h-full object-cover rounded-md "
                          width={600}
                          height={600}
                        />
                      </div>
                      <h6 className="text-lg mb-1 font-semibold text-white">
                        Próximo Partido
                      </h6>
                      <p className="mb-4 text-gray-300 text-base">
                        Consulta la alineación y estrategia del equipo para el
                        próximo partido, incluyendo posibles cambios de última
                        hora.
                      </p>
                    </div>
                  </div>
                  <div className="relative flex flex-col">
                    <div className="px-4 py-5 flex-auto">
                      <div className="p-2.5 text-center inline-flex items-center justify-center w-14 h-14 mb-5 shadow-lg rounded-full bg-white">
                        <Image
                          src="/home/tarjetcredito.png"
                          alt="..."
                          className="w-full h-full object-cover rounded-md "
                          width={512}
                          height={512}
                        />
                      </div>
                      <h6 className="text-lg mb-1 font-semibold text-white">
                        Pagos
                      </h6>
                      <p className="mb-4 text-gray-300 text-sm">
                        Accede a una plataforma segura para gestionar tus pagos
                        de manera rápida y sin complicaciones.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-6/12">
                  <div className="relative flex flex-col min-w-0">
                    <div className="px-4 py-5 flex-auto">
                      <div className="p-2.5 text-center inline-flex items-center justify-center w-14 h-14 mb-5 shadow-lg rounded-full bg-white">
                        <Image
                          src="/home/ubicacion.png"
                          alt="..."
                          className="w-full h-full object-cover rounded-md "
                          width={512}
                          height={512}
                        />
                      </div>
                      <h6 className="text-xl mb-1 font-semibold text-white">
                        Entrenamientos
                      </h6>
                      <p className="mb-4 text-gray-300">
                        Revisa horarios, ubicaciones y cambios en los
                        entrenamientos para no perderte ninguna sesión.
                      </p>
                    </div>
                  </div>

                  <div className="relative flex flex-col">
                    <div className="py-11 flex-auto">
                      <div className="p-2.5 text-center inline-flex items-center justify-center w-14 h-14 mb-5 shadow-lg rounded-full bg-white">
                        <Image
                          src="/home/noticias.png"
                          alt="..."
                          className="w-full h-full object-cover rounded-md "
                          width={512}
                          height={512}
                        />
                      </div>
                      <h6 className="text-lg mb-1 font-semibold text-white">
                        Noticias y Actualizaciones
                      </h6>
                      <p className="mb-4 text-gray-300 text-sm">
                        Infórmate sobre anuncios, logros y eventos especiales
                        del equipo en un solo lugar.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto overflow-hidden pb-20">
          <div className="flex flex-wrap items-center">
            <div className="w-full md:w-4/12 px-12 md:px-4 ml-auto mr-auto mt-24">
              <div className="p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white">
                <Image
                  alt="..."
                  src="/home/informe.png"
                  className="w-full h-full object-cover rounded-md "
                  width={500}
                  height={500}
                />
              </div>
              <h3 className="text-3xl mb-2 font-semibold leading-normal">
                Panel de Administración
              </h3>
              <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-gray-600">
                Desde el dashboard, los administradores podrán configurar y
                actualizar la plantilla del equipo para cada partidoasegurando
                que los jugadores correctos estén registrados y listos para el
                encuentro.
              </p>
              <div className="block pb-6">
                <span className="text-xs font-semibold inline-block py-2 px-2.5 rounded-full text-white bg-sky-900 uppercase last:mr-0 mr-2 mt-2">
                  Gestión de la Plantilla
                </span>
                <span className="text-xs font-semibold inline-block py-2 px-2.5 rounded-full text-white bg-sky-900 uppercase last:mr-0 mr-2 mt-2">
                  Control de Pagos
                </span>
                <span className="text-xs font-semibold inline-block py-2 px-2.5 rounded-full text-white bg-sky-900 uppercase last:mr-0 mr-2 mt-2">
                  Menus
                </span>
                <span className="text-xs font-semibold inline-block py-2 px-2.5 rounded-full text-white bg-sky-900 uppercase last:mr-0 mr-2 mt-2">
                  Navbars
                </span>
                <span className="text-xs font-semibold inline-block py-2 px-2.5 rounded-full text-white bg-sky-900 uppercase last:mr-0 mr-2 mt-2">
                  Pagination
                </span>
                <span className="text-xs font-semibold inline-block py-2 px-2.5 rounded-full text-white bg-sky-900 uppercase last:mr-0 mr-2 mt-2">
                  Publicación de Contenido
                </span>
                <span className="text-xs font-semibold inline-block py-2 px-2.5 rounded-full text-white bg-sky-900 uppercase last:mr-0 mr-2 mt-2">
                  Typography
                </span>
              </div>
            </div>

            <div className="w-full md:w-6/12 px-4 mr-auto ml-auto mt-32">
              <div className="justify-center flex flex-wrap relative">
                <div className="my-4 w-full lg:w-6/12 px-4">
                  <a
                    href="https://www.creative-tim.com/learning-lab/tailwind/svelte/alerts/notus?ref=vtw-index"
                    target="_blank"
                  >
                    <div className="bg-red-600 shadow-lg rounded-lg text-center p-8">
                      <img
                        alt="..."
                        className="shadow-md rounded-full max-w-full w-16 mx-auto p-2 bg-white"
                        src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/logos/svelte.jpg"
                      />
                      <p className="text-lg text-white mt-4 font-semibold">
                        Svelte
                      </p>
                    </div>
                  </a>
                  <a
                    href="https://www.creative-tim.com/learning-lab/tailwind/react/alerts/notus?ref=vtw-index"
                    target="_blank"
                  >
                    <div className="bg-lightBlue-500 shadow-lg rounded-lg text-center p-8 mt-8">
                      <img
                        alt="..."
                        className="shadow-md rounded-full max-w-full w-16 mx-auto p-2 bg-white"
                        src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/logos/react.jpg"
                      />
                      <p className="text-lg text-white mt-4 font-semibold">
                        ReactJS
                      </p>
                    </div>
                  </a>
                  <a
                    href="https://www.creative-tim.com/learning-lab/tailwind/nextjs/alerts/notus?ref=vtw-index"
                    target="_blank"
                  >
                    <div className="bg-blueGray-700 shadow-lg rounded-lg text-center p-8 mt-8">
                      <img
                        alt="..."
                        className="shadow-md rounded-full max-w-full w-16 mx-auto p-2 bg-white"
                        src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/logos/nextjs.jpg"
                      />
                      <p className="text-lg text-white mt-4 font-semibold">
                        NextJS
                      </p>
                    </div>
                  </a>
                </div>
                <div className="my-4 w-full lg:w-6/12 px-4 lg:mt-16">
                  <a
                    href="https://www.creative-tim.com/learning-lab/tailwind/js/alerts/notus?ref=vtw-index"
                    target="_blank"
                  >
                    <div className="bg-yellow-500 shadow-lg rounded-lg text-center p-8">
                      <img
                        alt="..."
                        className="shadow-md rounded-full max-w-full w-16 mx-auto p-2 bg-white"
                        src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/logos/js.png"
                      />
                      <p className="text-lg text-white mt-4 font-semibold">
                        JavaScript
                      </p>
                    </div>
                  </a>
                  <a
                    href="https://www.creative-tim.com/learning-lab/tailwind/angular/alerts/notus?ref=vtw-index"
                    target="_blank"
                  >
                    <div className="bg-red-700 shadow-lg rounded-lg text-center p-8 mt-8">
                      <img
                        alt="..."
                        className="shadow-md rounded-full max-w-full w-16 mx-auto p-2 bg-white"
                        src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/logos/angular.jpg"
                      />
                      <p className="text-lg text-white mt-4 font-semibold">
                        Angular
                      </p>
                    </div>
                  </a>
                  <a
                    href="https://www.creative-tim.com/learning-lab/tailwind/vue/alerts/notus?ref=vtw-index"
                    target="_blank"
                  >
                    <div className="bg-emerald-500 shadow-lg rounded-lg text-center p-8 mt-8">
                      <img
                        alt="..."
                        className="shadow-md rounded-full max-w-full w-16 mx-auto p-2 bg-white"
                        src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/logos/vue.jpg"
                      />
                      <p className="text-lg text-white mt-4 font-semibold">
                        Vue.js
                      </p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
