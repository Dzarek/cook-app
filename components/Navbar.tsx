"use client";
import {
  RiFileList3Fill,
  RiHome5Fill,
  RiStickyNoteAddFill,
  RiAdminFill,
  RiHashtag,
} from "react-icons/ri";
import { GiCook } from "react-icons/gi";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const links = [
  {
    id: 1,
    href: "/",
    label: "strona główna",
    icon: <RiHome5Fill />,
  },
  {
    id: 2,
    href: "/przepisy",
    label: "przepisy",
    icon: <RiFileList3Fill />,
  },
  // {
  //   id: 3,
  //   href: "/kategorie",
  //   label: "kategorie",
  //   icon: <RiHashtag />,
  // },

  {
    id: 4,
    href: "/dodaj-przepis",
    label: "dodaj przepis",
    icon: <RiStickyNoteAddFill />,
  },
  {
    id: 5,
    href: "/logowanie",
    label: "logowanie",
    icon: <GiCook />,
  },
];

const Navbar = () => {
  const pathname = usePathname();
  return (
    <div className="bg-zinc-900 text-white w-screen h-[12vh] fixed top-0 left-0 z-10 flex items-center justify-between px-[8vw]">
      <div className="flex items-center">
        <Image
          src="/assets/images/logo.png"
          width={80}
          height={80}
          alt="logo"
          className="h-4/6 w-14 mr-5"
        />
        <h1 className="text-4xl capitalize font-bold logoFont">
          <span className="text-red-800">Stępki </span>Gotują
        </h1>
      </div>
      <nav className="flex justify-end items-center font-bodyFont font-bold">
        {pathname !== "/"
          ? links.map((link) => {
              return (
                <Link
                  href={link.href}
                  key={link.id}
                  className={`ml-8 flex items-center text-md capitalize transition  hover:text-red-900 
                ${
                  pathname === link.href &&
                  "text-red-900 p-2 bg-zinc-100 rounded-md"
                }
              `}
                >
                  <span className="mr-2 text-xl">{link.icon}</span> {link.label}
                </Link>
              );
            })
          : links
              .filter((link) => link.label !== "kategorie")
              .map((link) => {
                return (
                  <Link
                    href={link.href}
                    key={link.id}
                    className={`ml-10 flex items-center text-md capitalize transition  hover:text-red-900 
              ${
                pathname === link.href &&
                "text-red-900 p-2 bg-zinc-100 rounded-md"
              }
            `}
                  >
                    <span className="mr-2 text-xl">{link.icon}</span>{" "}
                    {link.label}
                  </Link>
                );
              })}
      </nav>
    </div>
  );
};

export default Navbar;
