"use client";

import { changePassword, login } from "@/lib/user.actions";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { MdKeyboardReturn } from "react-icons/md";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import ConfirmBtn from "@/components/uiverse/ConfirmBtn";
import { sendNewUserRequest } from "@/lib/api";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [forgotPassword, setForgotPassword] = useState(false);
  const [newPasswordSend, setNewPasswordSend] = useState(false);
  const [newRegistrationSend, setNewRegistrationSend] = useState(false);
  const [openRegistration, setOpenRegistration] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) {
      toast("Proszę uzupełnić pola logowania!", {
        icon: "✖",
        style: {
          borderRadius: "10px",
          background: "#5b0f0f",
          color: "#fff",
        },
      });
      return;
    }
    try {
      await login(email, password);
      router.push("/");
    } catch (err) {
      toast("Nieprawidłowy email lub hasło!", {
        icon: "✖",
        style: {
          borderRadius: "10px",
          background: "#5b0f0f",
          color: "#fff",
        },
      });
    }
  };

  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) {
      toast("Proszę podać adres email!", {
        icon: "✖",
        style: {
          borderRadius: "10px",
          background: "#5b0f0f",
          color: "#fff",
        },
      });
      return;
    }
    try {
      await changePassword(email);
      setNewPasswordSend(true);
      setEmail("");
    } catch (error) {
      toast("Nieprawidłowy email!", {
        icon: "✖",
        style: {
          borderRadius: "10px",
          background: "#5b0f0f",
          color: "#fff",
        },
      });
      setNewPasswordSend(false);
    }
  };

  const handleChangeStart = () => {
    setForgotPassword(true);
    setNewPasswordSend(false);
  };

  const handleRegistration = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) {
      toast("Proszę podać adres email!", {
        icon: "✖",
        style: {
          borderRadius: "10px",
          background: "#5b0f0f",
          color: "#fff",
        },
      });
      return;
    }
    try {
      await sendNewUserRequest(email);
      setNewRegistrationSend(true);
      setEmail("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="wrapperBG">
      {openRegistration ? (
        <div className="wrapperLogin">
          <div className="containerLogin relative">
            <h2 className="font-semibold">Rejestracja</h2>
            {newRegistrationSend ? (
              <>
                <h4 className="errorInfo">
                  Prośba o dodanie konta do aplikacji STĘPKI GOTUJĄ została
                  przesłana do administratora. <br /> Niedługo otrzymasz
                  odpowiedź na podanego maila.
                </h4>
                <button
                  type="button"
                  className="forgotPasswordLinkBtn"
                  onClick={() => {
                    setNewRegistrationSend(false);
                    setOpenRegistration(false);
                  }}
                >
                  Panel Logowania
                </button>
              </>
            ) : (
              <>
                <h4 className="errorInfo mb-10">
                  Chcesz do nas dołączyć? Podaj swój adres email, by admin mógł
                  dodać Cię do naszej społeczności.
                </h4>
                <section>
                  <div className="flex flex-col items-center w-1/2 mb-10">
                    <Image
                      src="/assets/images/logo.png"
                      width={500}
                      height={500}
                      alt="logo"
                      className="w-1/3"
                    />
                    <h1 className="text-4xl flex items-center justify-center capitalize font-bold logoFont text-center w-90%">
                      <span className="text-red-800 mr-2">Stępki </span>Gotują
                    </h1>
                  </div>
                  <form onSubmit={(e) => handleRegistration(e)}>
                    <input
                      type="email"
                      placeholder="Adres Email"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      required
                    />
                    <ConfirmBtn text="wyślij" />
                  </form>
                </section>
                <p
                  className="font-semibold flex items-center justify-center text-zinc-500 cursor-pointer absolute top-5 left-5 hover:text-red-900 transition-all"
                  onClick={() => {
                    setForgotPassword(false);
                    setOpenRegistration(false);
                  }}
                >
                  <MdKeyboardReturn className="mr-1" /> Panel Logowania
                </p>
              </>
            )}
          </div>
        </div>
      ) : (
        <div className="wrapperLogin">
          {forgotPassword ? (
            <div className="containerLogin relative">
              <h2 className="font-semibold">Resetowanie hasła</h2>
              {newPasswordSend ? (
                <>
                  <h4 className="errorInfo">
                    Link do resetowania hasła został przesłany. Sprawdź swoją
                    skrzynkę email.
                  </h4>
                  <button
                    type="button"
                    className="forgotPasswordLinkBtn"
                    onClick={() => setForgotPassword(false)}
                  >
                    Panel Logowania
                  </button>
                </>
              ) : (
                <>
                  <h4 className="errorInfo mb-5">
                    Podaj adres email na który zostanie przesłany link do
                    resetowania hasła.
                  </h4>

                  <section className="mt-5">
                    <div className="flex flex-col items-center w-1/2 mb-10">
                      <Image
                        src="/assets/images/logo.png"
                        width={500}
                        height={500}
                        alt="logo"
                        className="w-1/3"
                      />
                      <h1 className="text-4xl flex items-center justify-center capitalize font-bold logoFont text-center w-90%">
                        <span className="text-red-800 mr-2">Stępki </span>Gotują
                      </h1>
                    </div>
                    <form onSubmit={(e) => handleResetPassword(e)}>
                      <input
                        type="email"
                        placeholder="Adres Email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                      />

                      <ConfirmBtn text="wyślij nowe" />
                    </form>
                  </section>
                  <p
                    className="font-semibold flex items-center justify-center text-zinc-500 cursor-pointer absolute top-5 left-5 hover:text-red-900 transition-all"
                    onClick={() => {
                      setForgotPassword(false);
                      setOpenRegistration(false);
                    }}
                  >
                    <MdKeyboardReturn className="mr-1" /> Panel Logowania
                  </p>
                </>
              )}
            </div>
          ) : (
            <div className="containerLogin relative">
              <Link href="/">
                <MdKeyboardReturn className="absolute top-5 left-5 text-red-950 text-4xl" />
              </Link>
              <h2 className="font-semibold">Logowanie</h2>
              <section>
                <div className="flex flex-col items-center w-1/2 mb-10">
                  <Image
                    src="/assets/images/logo.png"
                    width={500}
                    height={500}
                    alt="logo"
                    className="w-1/2"
                  />
                  <h1 className="text-4xl flex items-center justify-center capitalize font-bold logoFont text-center w-90%">
                    <span className="text-red-800 mr-2">Stępki </span>Gotują
                  </h1>
                </div>
                <form onSubmit={(e) => handleSubmit(e)}>
                  <input
                    type="email"
                    placeholder="Adres Email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                  />
                  <input
                    type="password"
                    placeholder="Hasło"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                  />
                  <p className="forgotPasswordLink" onClick={handleChangeStart}>
                    Nie pamiętam hasła...
                  </p>
                  <ConfirmBtn text="zaloguj się" />
                </form>
              </section>
              <div className="flex items-center  border-t-2 pt-7 border-red-900">
                <h3 className="font-semibold ">Nie masz jeszcze konta? </h3>
                <button
                  className="registrationBtn"
                  onClick={() => setOpenRegistration(true)}
                >
                  Dołącz do nas!
                </button>{" "}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LoginPage;
