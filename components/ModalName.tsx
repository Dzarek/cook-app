"use client";

import { updateUser } from "@/lib/user.actions";
import { useState } from "react";
import toast from "react-hot-toast";
import ConfirmBtn from "./uiverse/ConfirmBtn";

type ModalType = {
  name: string;
  setName: (name: string) => void;
  setModalName: (modalName: boolean) => void;
};

const ModalName = ({ name, setName, setModalName }: ModalType) => {
  //   const [newName, setNewName] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name && name !== "") {
      updateUser(name);
      setModalName(false);
    } else {
      toast("Proszę uzupełnić nazwę użytkownika", {
        icon: "✖",
        style: {
          borderRadius: "10px",
          background: "#280505",
          color: "#fff",
        },
      });
    }
  };

  return (
    <div className="bg-[rgba(0,0,0,0.8)] w-screen h-screen z-30 fixed top-0 left-0 flex items-center justify-center">
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="bg-white p-3 w-[50vw] h-[60vh] rounded-md flex flex-col items-center justify-center"
      >
        <h3 className="text-2xl font-normal mb-10">
          Witaj w aplikacji{" "}
          <span className="text-3xl mr-1 text-red-900 font-bold font-logoFont">
            Stępki Gotują
          </span>
          !
        </h3>
        <label className="text-lg mb-2" htmlFor="name">
          Wprowadź swój nick:
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="nazwa użytkownika"
          required
          minLength={3}
          className="adminInput"
        />
        <p className="mt-10 mb-5 text-center">
          Na adres email zostanie przesłany link do zmiany hasła. <br />{" "}
          (sprawdź również spam)
        </p>
        {/* <button
          type="submit"
          className="p-1 bg-red-900 text-white font-semibold uppercase rounded-md"
        >
          Potwierdź
        </button> */}
        <ConfirmBtn />
      </form>
    </div>
  );
};

export default ModalName;
