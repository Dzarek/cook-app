import AdminComponent from "@/components/AdminComponent";
import { getAllUsers } from "@/lib/actions";

import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Link from "next/link";

// import { useGlobalContext } from "@/components/authContext";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";

const AdminPage = async () => {
  const session = await getServerSession(authOptions);
  const allowedUID = process.env.NEXT_PUBLIC_ADMIN_ID;

  const users = await getAllUsers();
  // const [users, setUsers] = useState<User[]>([]);
  // const { activeUser } = useGlobalContext();
  // const router = useRouter();

  // useEffect(() => {
  //   const getUsers = async () => {
  //     const users = await getAllUsers();
  //     if (users) {
  //       setUsers(users);
  //     }
  //   };
  //   getUsers();
  // }, []);

  // if (activeUser && activeUser.uid === "c1FiOkr5JhXxEJrc3WFtWwcgWza2") {
  //   router.replace("/");
  //   return;
  // } else {

  if (!session) {
    return (
      <div className="page flex flex-col items-center justify-center">
        <p className="text-2xl">Odmowa dostępu!</p>
        <Link
          href="/logowanie"
          className="mt-5 p-2 rounded-md bg-red-900 text-white"
        >
          {" "}
          zaloguj się
        </Link>
      </div>
    );
  }
  if (session.uid !== allowedUID) {
    return (
      <div className="page flex flex-col items-center justify-center">
        <p className="text-2xl">
          You do not have permission to access this page.
        </p>
      </div>
    );
  }

  return (
    <div className="page w-screen">
      <header className="bg-red-950 text-white text-center w-full py-[10vh] flex justify-center items-center">
        <h1 className="text-3xl font-bold font-bodyFont">Panel Admina</h1>
        <p>Your UID: {session.uid}</p>
      </header>
      {users && <AdminComponent users={users} />}
    </div>
  );
};
// };
export default AdminPage;
