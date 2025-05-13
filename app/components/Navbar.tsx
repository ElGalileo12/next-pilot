import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const links = [
    {
      name: "Sobre nosotros",
      href: "#sobre-nosotros",
    },
    { name: "Torneos", href: "#torneos" },
    {
      name: "Precios",
      href: "#precios",
    },
    { name: "Tienda", href: "#tienda" },
  ];

  return (
    <>
      <nav
        className="bg-white fixed w-full z-20 top-0 start-0 border-b border-gray-200 shadow"
        aria-label="Barra de navegación principal"
      >
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a
            href="https://flowbite.com/"
            className="flex items-center space-x-3 rtl:space-x-reverse w-1/2"
          >
            <h1 className="self-center text-2xl font-semibold whitespace-nowrap ">
              Goat Sport
            </h1>
          </a>
          <div className="flex items-center justify-evenly w-1/2">
            <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
              <Link
                href={"/contact"}
                className="text-white bg-sky-800 hover:bg-sky-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-lg text-sm px-4 py-2 text-center"
              >
                Contáctenos
              </Link>
            </div>
            <div
              className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
              id="navbar-sticky"
            >
              <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
                {links.map((link) => {
                  return (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="block py-2 pl-3 pr-4 text-black rounded md:bg-transparent md:p-0 hover:text-sky-600 font-bold"
                        aria-current="page"
                      >
                        {link.name}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
