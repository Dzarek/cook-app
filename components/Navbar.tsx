"use client";
import {
  RiFileList3Fill,
  RiHome5Fill,
  RiStickyNoteAddFill,
  RiLogoutCircleRLine,
} from "react-icons/ri";
import { GiCook } from "react-icons/gi";
import { FaRankingStar } from "react-icons/fa6";

import { usePathname } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import { logout } from "@/lib/user.actions";
import ModalName from "./ModalName";
import Loading from "./Loading";
import { useGlobalContext } from "./authContext";

import { signOut } from "next-auth/react";
import { CgMenuGridR } from "react-icons/cg";
import { FaRegArrowAltCircleUp } from "react-icons/fa";

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
    href: "/ranking",
    label: "ranking",
    icon: <FaRankingStar />,
  },
  {
    id: 6,
    href: "/logowanie",
    label: "logowanie",
    icon: <GiCook />,
  },
];

const Navbar = () => {
  const {
    isLogin,
    activeUser,
    modalName,
    name,
    email,
    avatar,
    loading,
    setIsLogin,
    setName,
    setAvatar,
    setModalName,
  } = useGlobalContext();
  const pathname = usePathname();
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = async () => {
    await logout();
    await signOut({ callbackUrl: "/" });
    setIsLogin(false);
    toast("Poprawnie wylogowano", {
      icon: "👋",
      style: {
        borderRadius: "10px",
        background: "#000",
        color: "#fff",
      },
    });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div className="bg-zinc-900 text-white w-screen h-[12vh] fixed top-0 left-0 z-10  items-center justify-between px-[8vw] hidden xl:flex">
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
                .filter(
                  (link) => link.href !== "/dodaj" && link.href !== "/ranking"
                )
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
                  pathname === "/profil" &&
                  "text-red-900 pr-2 py-1 bg-zinc-100 rounded-e-lg rounded-s-3xl "
                }
              `}
              >
                <span className="mr-2 text-xl">
                  <Image
                    src={avatar}
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
      <div className="bg-zinc-900 text-white w-screen h-[12vh] fixed top-0 left-0 z-10  items-center justify-between px-[5vw] flex xl:hidden">
        <div className="flex items-center">
          <Image
            src="/assets/images/logo.png"
            width={80}
            height={80}
            alt="logo"
            className="h-4/6 w-10 mr-3"
          />
          <h1 className="text-3xl capitalize font-bold logoFont">
            <span className="text-red-800">Stępki </span>Gotują
          </h1>
        </div>
        {!showMenu && (
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="navHamburger"
          >
            <CgMenuGridR />
          </button>
        )}
        <nav
          className={
            showMenu
              ? "fixed h-[100dvh] w-screen top-0 left-0  flex flex-col justify-between items-center z-50 bg-zinc-900 duration-1000  transition-all"
              : "fixed h-[100dvh] w-screen top-0 left-0  flex flex-col justify-between items-center z-50 bg-zinc-900 duration-1000  transition-all translate-y-[-115dvh]"
          }
        >
          <video
            src="/assets/video/nav3.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="absolute rotate-180 z-0 top-0 left-0 w-screen h-screen object-fill"
          ></video>
          <div className="flex flex-col justify-between items-center p-4 absolute z-1 bg-[rgba(20,20,20,0.8)] top-0 left-0 w-screen h-screen">
            <div className="flex flex-col items-center justify-center mt-10">
              <Image
                src="/assets/images/logo.png"
                width={80}
                height={80}
                alt="logo"
                className="h-4/6 w-14 mb-3"
              />
              <h1 className="text-4xl capitalize font-bold logoFont">
                <span className="text-red-700">Stępki </span>Gotują
              </h1>
            </div>
            <div className="flex flex-wrap items-center justify-around">
              {isLogin
                ? links
                    .filter((link) => link.href !== "/logowanie")
                    .map((link) => {
                      return (
                        <Link
                          href={link.href}
                          key={link.id}
                          onClick={() => setShowMenu(false)}
                          className={`w-[45%] rounded-md  bg-[rgba(0,0,0,0.3)] my-2 h-[14vh] text-center p-2 flex flex-col items-center justify-center font-bold text-red-700 text-sm uppercase transition  hover:text-red-900 
                ${
                  pathname === link.href &&
                  "text-zinc-800  bg-[rgba(255,255,255,1)] font-bold"
                }
              `}
                        >
                          <span
                            className={`mb-3 text-4xl  ${
                              pathname === link.href
                                ? "text-red-900"
                                : "text-white"
                            }`}
                          >
                            {link.icon}
                          </span>{" "}
                          {link.label}
                        </Link>
                      );
                    })
                : links
                    .filter(
                      (link) =>
                        link.href !== "/dodaj" && link.href !== "/ranking"
                    )
                    .map((link) => {
                      return (
                        <Link
                          href={link.href}
                          key={link.id}
                          onClick={() => setShowMenu(false)}
                          className={`w-[45%] bg-[rgba(0,0,0,0.3)] p-2 rounded-md h-[20vh] flex flex-col items-center justify-center font-bold text-red-700 text-md uppercase transition  hover:text-red-900 mb-5
                            ${
                              pathname === link.href &&
                              "text-zinc-800  bg-[rgba(255,255,255,1)] font-bold"
                            }
                          `}
                        >
                          <span
                            className={`mb-3 text-4xl  ${
                              pathname === link.href
                                ? "text-red-900"
                                : "text-white"
                            }`}
                          >
                            {link.icon}
                          </span>{" "}
                          {link.label}
                        </Link>
                      );
                    })}
              {isLogin && (
                <>
                  <Link
                    href="/profil"
                    onClick={() => setShowMenu(false)}
                    className={`w-[45%] h-[14vh] bg-[rgba(0,0,0,0.3)] p-2 mt-5 rounded-md flex flex-col items-center justify-center font-bold text-red-700 text-sm uppercase transition  hover:text-red-900 
                    ${
                      pathname === "/profil" &&
                      "text-zinc-800  bg-[rgba(255,255,255,1)] font-bold"
                    }
                  `}
                  >
                    <span className="mb-3 ">
                      <Image
                        src={avatar}
                        width={40}
                        height={40}
                        alt="avatar"
                        className="rounded-full border-2  h-[40px] w-[40px]"
                      />
                    </span>{" "}
                    {name}
                  </Link>
                </>
              )}
            </div>
            <div
              className={`flex items-center w-full ${
                isLogin ? "justify-between " : "justify-end"
              }`}
            >
              {isLogin && (
                <button
                  onClick={() => {
                    handleLogout();
                    setShowMenu(false);
                  }}
                  className="ml-4 flex items-center justify-center  capitalize transition  hover:text-red-900"
                >
                  <RiLogoutCircleRLine className="mr-2 text-3xl text-red-800" />{" "}
                  <p className="text-xl">Wyloguj</p>
                </button>
              )}
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="navHamburger2 mr-2"
              >
                <FaRegArrowAltCircleUp />
              </button>
            </div>
          </div>
        </nav>
      </div>
      {modalName && activeUser && (
        <ModalName
          email={email}
          name={name}
          setName={setName}
          setModalName={setModalName}
          avatar={avatar}
          setAvatar={setAvatar}
        />
      )}
    </>
  );
};

export default Navbar;
