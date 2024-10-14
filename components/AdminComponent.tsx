"use client";
import Image from "next/image";
import { useState } from "react";
import { MdOutlineAddCircle } from "react-icons/md";
import { FaDownload, FaUpload } from "react-icons/fa";
import ImportModal from "@/components/ImportModal";
import { createNewUser, disableUser } from "@/lib/admin.actions";
import { logout } from "@/lib/user.actions";
import { signOut } from "next-auth/react";
import { useGlobalContext } from "./authContext";

const AdminComponent = ({ users }: { users: User[] }) => {
  const [confirmDelete, setConfirmDelete] = useState<User | null>(null);
  const [newNick, setNewNick] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [openImportModal, setOpenImportModal] = useState(false);
  const [activeUsers, setActiveUsers] = useState(users);

  const { setIsLogin } = useGlobalContext();

  // const exportData = () => {
  //   if (isAdmin) {
  //     const wb = XLSX.utils.book_new();
  //     downloadData.map((item) => {
  //       const { name, itemsArray } = item;
  //       if (itemsArray.length > 0) {
  //         const sortedTransfers = itemsArray.sort((a, b) => {
  //           let tA = a.time; // hh:mm
  //           let msA =
  //             Number(tA.split(":")[0]) * 60 * 60 * 1000 +
  //             Number(tA.split(":")[1]) * 60 * 1000;
  //           const firstDate = new Date(a.date).getTime() + msA;
  //           let tB = b.time; // hh:mm
  //           let msB =
  //             Number(tB.split(":")[0]) * 60 * 60 * 1000 +
  //             Number(tB.split(":")[1]) * 60 * 1000;
  //           const secondDate = new Date(b.date).getTime() + msB;
  //           return firstDate - secondDate;
  //         });

  //         const newItemsArray = sortedTransfers.map((ob) => {
  //           const objectOrder = {
  //             date: null,
  //             time: null,
  //             nameOfGuest: null,
  //             direction: null,
  //             flight: null,
  //             people: null,
  //             phone: null,
  //             price: null,
  //             provision: null,
  //             details: null,
  //             status: null,
  //             id: null,
  //           };
  //           return Object.assign(objectOrder, ob);
  //         });
  //         const sheet1 = XLSX.utils.book_append_sheet(
  //           wb,
  //           XLSX.utils.json_to_sheet(newItemsArray),
  //           name
  //         );
  //       }
  //     });
  //     XLSX.writeFile(wb, "Transfery.xlsx");

  //     // JSON
  //     const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
  //       JSON.stringify(downloadData)
  //     )}`;
  //     const link = document.createElement("a");
  //     link.href = jsonString;
  //     link.download = "TransferyBackUp.json";
  //     link.click();
  //   }
  // };

  // const uploadData = async () => {
  //   file.map(async (el) => {
  //     const userRef = doc(db, "usersList", el.id);
  //     await setDoc(userRef, {
  //       activeAccount: true,
  //       userName: el.name,
  //       money: el.money,
  //     });
  //     el.itemsArray.map(async (item) => {
  //       const backupCollection = doc(
  //         collection(db, `usersList/${el.id}/transfers`)
  //       );

  //       await setDoc(backupCollection, {
  //         id: item.id,
  //         status: item.status,
  //         date: item.date,
  //         time: item.time,
  //         nameOfGuest: item.nameOfGuest,
  //         direction: item.direction,
  //         people: item.people,
  //         details: item.details,
  //         flight: item.flight,
  //         phone: item.phone,
  //         price: item.price,
  //         provision: item.provision,
  //       });
  //     });
  //   });
  //   getAllUsers();
  // };

  const handleDelete = (id: string) => {
    disableUser(id);
    setActiveUsers(activeUsers.filter((user) => user.id !== id));
    setConfirmDelete(null);
  };

  const handleCreateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createNewUser(newEmail, newPassword, newNick);
    setNewEmail("");
    setNewPassword("");
    setNewNick("");
    setIsLogin(false);
    await logout();
    await signOut({ callbackUrl: "/" });
  };

  return (
    <div>
      <main className="w-4/5 mx-auto">
        {confirmDelete && (
          <div className="z-20 rounded-md border-2 border-white flex flex-col fixed w-[40vw] h-[40vh] bg-red-950 text-white top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] p-4 items-center justify-center">
            <h2 className="text-2xl text-center">
              Czy napewo chcesz usunąć kucharza{" "}
              <span className="uppercase font-bold">
                {confirmDelete.userName}
              </span>
              ?
            </h2>
            <div className="flex items-center justify-center mt-10">
              <button
                onClick={() => setConfirmDelete(null)}
                className="p-5 bg-white text-red-900 uppercase rounded-md text-2xl mx-4 transition-all border-2 border-white hover:bg-black hover:text-white"
              >
                NIE
              </button>
              <button
                onClick={() => handleDelete(confirmDelete.id)}
                className="p-5 bg-white text-red-900 uppercase rounded-md text-2xl mx-4 transition-all border-2 border-white hover:bg-black hover:text-white"
              >
                TAK
              </button>
            </div>
          </div>
        )}
        <div className="mt-[10vh]">
          <h2 className="text-center text-2xl font-semibold uppercase mb-[5vh]">
            Kopia zapasowa
          </h2>
          <div className="flex items-center justify-center">
            <article className="flex flex-col items-center justify-center mx-[10vw]">
              <p className="text-xl font-semibold">exportuj dane</p>
              <FaDownload
                className="text-red-900 text-5xl mt-5 transition-all hover:text-red-700 cursor-pointer"
                // onClick={exportData}
              />
            </article>
            <article className="flex flex-col items-center justify-center mx-[10vw]">
              <p className="text-xl font-semibold">importuj dane</p>
              <FaUpload
                className="text-red-900 text-5xl mt-5 transition-all hover:text-red-700 cursor-pointer"
                onClick={() => setOpenImportModal(true)}
              />
            </article>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center w-full mt-[10vh]">
          <h2 className="text-center text-2xl font-semibold uppercase mb-[5vh]">
            Lista kucharzy
          </h2>
          <ul className="flex items-center justify-center  w-full flex-wrap">
            {activeUsers.map((user) => {
              return (
                <li
                  key={user.id}
                  className="pb-5 m-5 h-[20vw] w-[16vw] rounded-md mx-[3vw]  border-2 border-red-900 overflow-hidden flex flex-col justify-between items-center bg-red-50"
                >
                  <Image
                    src={user.avatar}
                    width={500}
                    height={500}
                    alt={user.userName}
                    className="object-cover border-b-2 border-red-900 h-2/3"
                  />
                  <p className=" text-lg font-semibold">{user.userName}</p>
                  <button
                    onClick={() => setConfirmDelete(user)}
                    className="bg-red-900 px-2 py-1 text-white text-semibold text-md rounded-md hover:bg-black transition-all"
                  >
                    usuń konto
                  </button>
                </li>
              );
            })}
          </ul>
          <div className="bg-zinc-950 w-screen mt-[10vh] text-white py-10">
            <h2 className="text-center text-2xl font-semibold uppercase  mb-[5vh]">
              Stwórz nowego kucharza
            </h2>
            <div className="flex items-center justify-center">
              <Image
                src="/assets/images/createCooker.png"
                width={400}
                height={400}
                alt="kucharz"
                className="w-[24vw] object-fill mr-14"
              />
              <form
                onSubmit={handleCreateUser}
                className="flex flex-col items-center "
              >
                <input
                  type="text"
                  placeholder="nick kucharza"
                  className="adminInput"
                  value={newNick}
                  onChange={(e) => setNewNick(e.target.value)}
                />
                <input
                  type="email"
                  placeholder="adres email"
                  className="adminInput"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="hasło"
                  className="adminInput"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <button type="submit">
                  <MdOutlineAddCircle className="text-5xl text-red-900 hover:text-red-700 transition-all mt-5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
      {openImportModal && (
        <ImportModal setOpenImportModal={setOpenImportModal} />
      )}
    </div>
  );
};

export default AdminComponent;
