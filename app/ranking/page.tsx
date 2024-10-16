import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Link from "next/link";
import RankingDate from "@/components/uiverse/RankingDate";
import { getRankingUsers } from "@/lib/actions";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import AwardModal from "@/components/AwardModal";

const RankingModal = async () => {
  const session = await getServerSession(authOptions);

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

  const allUsers = await getRankingUsers();
  const userID = session.uid;

  return (
    <div className="mt-[10vh] h-[80vh] w-[80vw] mx-auto flex flex-col">
      <h2 className="flex justify-center items-center mx-auto text-red-900 w-full text-center mt-[10vh] text-2xl font-bold  mb-[5vh]">
        <FaStar className="text-xl text-yellow-500 mx-2" />{" "}
        <FaStar className="text-xl text-yellow-500 mx-2" />
        <FaStar className="text-xl text-yellow-500 mx-2" />
        <span className="mx-5">Ranking Kucharzy</span>
        <FaStar className="text-xl text-yellow-500 mx-2" />
        <FaStar className="text-xl text-yellow-500 mx-2" />
        <FaStar className="text-xl text-yellow-500 mx-2" />
      </h2>
      <div className="flex justify-between w-full h-[55vh]">
        <div className="w-[45%] pr-16 border-r-2 border-red-900 h-full flex flex-col justify-center">
          <p className="my-[3vh] text-lg">
            Dodawaj smaczne przepisy w aplikacji{" "}
            <span className="font-logoFont text-2xl text-red-900 font-bold">
              Stępki Gotują
            </span>
            ! Im więcej zdobędzisz polubień od innych kucharzy tym wyżej
            znajdziesz się w rankingu.
          </p>
          <p className="my-[3vh]  text-lg">
            Kucharz z największą liczbą smacznych przepisów, oprócz szacunku
            reszty kucharzy zdobędzie (lub obroni) tytuł MISTRZA KUCHNI!{" "}
            <AwardModal />
          </p>
          <div className="my-[3vh] flex items-center justify-start ">
            <p className="mr-5 text-lg">Podsumowanie sezonu: </p>
            <RankingDate />
          </div>
        </div>

        <ul className="rankingList h-full w-[55%] overflow-y-auto flex flex-col items-center justify-start px-0 pl-[2vw] bg-white">
          {allUsers.map((user, index) => {
            const numberOfLikes = user.itemsArray.reduce((sum, item) => {
              return sum + item.likes.length;
            }, 0);
            return (
              <li
                key={user.id}
                className={`flex items-center justify-start w-[90%] border-b-2 py-4 rounded-md px-4 ${
                  userID === user.id && "bg-red-50 "
                }`}
              >
                <span className="text-3xl font-bold text-gray-500 mr-10">
                  {numberOfLikes === 0 ? allUsers.length - 1 : index + 1}.
                </span>
                <Image
                  src={user.avatar}
                  height={60}
                  width={60}
                  alt="avatar"
                  className="rounded-full object-cover border-2 border-red-900 mr-5"
                />
                <h4 className="capitalize text-xl font-semibold mr-5">
                  {user.userName}
                </h4>
                <p className="ml-auto flex items-center text-xl border-l-2 border-red-950 pl-5">
                  smaczne przepisy: <FaHeart className="text-red-900 ml-5" />
                  <span className="ml-1 text-2xl font-bold">
                    {numberOfLikes}
                  </span>
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default RankingModal;
