"use client";

import { avatars } from "@/constants";
import { users } from "@/constants";
import Image from "next/image";
import { useState } from "react";
import { MdClose } from "react-icons/md";

interface ModalProps {
  setOpenAvatarModal: (open: boolean) => void;
}

const currentUser = users.find((user) => user.id === 1);

const userAvatars = users.map((user) => user.avatar);

const notAvailableAvatars = avatars.map((category) => {
  return category.images.filter((img) => userAvatars.includes(img));
});
const availableAvatars = avatars.map((category) => {
  return category.images.filter((img) => !userAvatars.includes(img));
});

const AvatarModal = ({ setOpenAvatarModal }: ModalProps) => {
  const [category, setCategory] = useState("wszystkie");
  const [activeAvatar, setActiveAvatar] = useState(currentUser?.avatar);
  return (
    <div className="z-30 fixed w-screen h-screen bg-[rgba(0,0,0,0.8)] top-0 left-0">
      <div className="overflow-hidden w-[70vw] h-[80vh] bg-white rounded-md border-2 border-red-900 fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-30">
        <MdClose
          onClick={() => setOpenAvatarModal(false)}
          className="absolute top-5 right-5 cursor-pointer text-4xl hover:text-red-600 hover:rotate-180 duration-[0.4s]"
        />

        <main className="flex justify-between items-center">
          <ul className="w-1/5 pr-1  mr-1 ml-[5%] border-r-2 border-red-900">
            {activeAvatar && (
              <Image
                src={activeAvatar}
                width={300}
                height={300}
                alt="avatar"
                className={`rounded-full -ml-[5%]  w-[12vw] h-[12vw]  object-fill m-3`}
              />
            )}
            <li
              onClick={() => setCategory("wszystkie")}
              className={`uppercase text-xl font-semibold my-10 hover:text-red-700 cursor-pointer duration-[0.5s] ${
                category === "wszystkie" && "text-red-700 ml-[20%]"
              }`}
            >
              wszystkie
            </li>
            {avatars.map((avatar) => {
              return (
                <li
                  key={avatar.id}
                  onClick={() => setCategory(avatar.name)}
                  className={`uppercase text-xl font-semibold my-10 hover:text-red-700 cursor-pointer duration-[0.5s] ${
                    category === avatar.name && "text-red-700  ml-[20%]"
                  }`}
                >
                  {avatar.name}
                </li>
              );
            })}
          </ul>
          <section className="pr-[2%] pb-[5%] overflow-auto w-4/6 h-[80vh] flex flex-wrap items-center justify-center">
            <h2 className="mx-auto w-full text-center mt-10 text-2xl font-bold  mb-10">
              Wybierz Avatara
            </h2>
            {category === "wszystkie" ? (
              <>
                {availableAvatars.map((item) => {
                  return item.map((img, index) => {
                    return (
                      <Image
                        key={index}
                        src={img}
                        width={150}
                        height={150}
                        alt="avatar"
                        onClick={() => setActiveAvatar(img)}
                        className={`rounded-full cursor-pointer border-2 w-[9vw] h-[9vw] border-red-900 object-fill m-3
                            ${activeAvatar === img && "border-4"}
                            `}
                      />
                    );
                  });
                })}
                {notAvailableAvatars.map((item) => {
                  return item.map((img, index) => {
                    return (
                      <Image
                        key={index}
                        src={img}
                        width={150}
                        height={150}
                        alt="avatar"
                        className={`rounded-full border-2 w-[9vw] h-[9vw] border-red-900 object-fill m-3 saturate-[0] opacity-50 brightness-[0.8]
                            ${activeAvatar === img && "border-4"}
                            `}
                      />
                    );
                  });
                })}
              </>
            ) : (
              avatars
                .filter((avatar) => avatar.name === category)
                .map((item) => {
                  return item.images.map((img, index) => {
                    return (
                      <Image
                        key={index}
                        src={img}
                        width={150}
                        height={150}
                        alt="avatar"
                        onClick={() => setActiveAvatar(img)}
                        className={`rounded-full border-2 w-[9vw] h-[9vw] border-red-900 object-fill m-3 ${
                          activeAvatar === img && "border-4"
                        } `}
                      />
                    );
                  });
                })
            )}
          </section>
        </main>
      </div>
    </div>
  );
};

export default AvatarModal;
