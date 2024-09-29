"use client";
import {
  RiFileList3Fill,
  RiHome5Fill,
  RiStickyNoteAddFill,
  RiAdminFill,
  RiLogoutCircleRLine,
} from "react-icons/ri";
import { GiCook } from "react-icons/gi";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import {
  User,
  getAuth,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from "firebase/auth";
import { db, auth } from "@/app/firebase/clientApp";
import { setDoc, doc } from "firebase/firestore";
import { logout, updateName } from "@/lib/user.actions";
import ModalName from "./ModalName";

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

  {
    id: 4,
    href: "/dodaj",
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
  const [isLogin, setIsLogin] = useState(false);
  const [activeUser, setActiveUser] = useState<User | null>(null);
  const [modalName, setModalName] = useState(false);
  const [name, setName] = useState<string>("");

  const getUser = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setActiveUser(user);
        setIsLogin(true);
        if (user.displayName === null) {
          setModalName(true);
        }
      } else {
        setActiveUser(null);
      }
    });

    return unsubscribe;
  }, []);

  console.log(activeUser);

  const handleLogout = async () => {
    await logout();
    // try {
    //   await signOut(auth);
    // } catch (error) {
    //   console.error("Błąd podczas wylogowywania", error);
    // }
    setIsLogin(false);
    toast("Poprawnie wylogowano", {
      icon: "👋",
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
  };

  return (
    <>
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
          {isLogin
            ? links
                .filter((link) => link.href !== "/logowanie")
                .map((link) => {
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
                      <span className="mr-2 text-xl">{link.icon}</span>{" "}
                      {link.label}
                    </Link>
                  );
                })
            : links
                .filter((link) => link.href !== "/dodaj")
                .map((link) => {
                  return (
                    <Link
                      href={link.href}
                      key={link.id}
                      className={`ml-12 flex items-center text-md capitalize transition  hover:text-red-900 
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
          {isLogin && (
            <>
              <Link
                href="/profil"
                className={`ml-12  flex items-center text-md capitalize transition  hover:text-red-900 
                ${
                  pathname === "profil" &&
                  "text-red-900 p-2 bg-zinc-100 rounded-md"
                }
              `}
              >
                <span className="mr-2 text-xl">
                  <Image
                    src="/assets/images/avatars/avatarm1.jpg"
                    width={40}
                    height={40}
                    alt="avatar"
                    className="rounded-full h-[35px] w-[35px]"
                  />
                </span>{" "}
                {name}
              </Link>
              <button
                onClick={handleLogout}
                className="border-l-2 border-white pl-4 ml-4 flex items-center text-md capitalize transition  hover:text-red-900"
              >
                <RiLogoutCircleRLine className="mr-2 text-xl" /> Wyloguj
              </button>
            </>
          )}
        </nav>
      </div>
      {modalName && (
        <ModalName name={name} setName={setName} setModalName={setModalName} />
      )}
    </>
  );
};

export default Navbar;
