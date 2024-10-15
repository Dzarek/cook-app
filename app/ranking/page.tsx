import { getRankingUsers } from "@/lib/actions";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

type RankingModalType = {};

const RankingModal = async () => {
  const allUsers = await getRankingUsers();
  console.log(allUsers);

  return (
    <div className="z-1 fixed w-screen h-screen bg-[rgba(0,0,0,0.8)] top-0 left-0">
      <div className="overflow-hidden w-[70vw] h-[80vh] bg-white rounded-md border-2 border-red-900 fixed top-[15%] left-[50%] translate-x-[-50%]  z-30">
        <h2 className="flex justify-center items-center mx-auto text-red-900 w-full text-center mt-10 text-2xl font-bold  mb-14">
          <FaStar className="text-xl text-yellow-500 mx-2" />{" "}
          <FaStar className="text-xl text-yellow-500 mx-2" />
          <FaStar className="text-xl text-yellow-500 mx-2" />
          <span className="mx-5">Ranking Kucharzy</span>
          <FaStar className="text-xl text-yellow-500 mx-2" />
          <FaStar className="text-xl text-yellow-500 mx-2" />
          <FaStar className="text-xl text-yellow-500 mx-2" />
        </h2>
        <main className="flex justify-between items-center px-[5vw]">
          <div className="w-2/5 pr-5  border-r-2 border-red-900">
            <p className="mb-8 text-lg">
              Dodawaj smaczne przepisy w aplikacji{" "}
              <span className="font-logoFont text-2xl text-red-900 font-bold">
                Stępki Gotują
              </span>
              ! Im więcej zdobędzisz polubień od innych kucharzy tym wyżej
              znajdziesz się w rankingu.
            </p>
            <p className="mb-8 text-lg">
              Kucharz z największą liczbą smacznych przepisów, oprócz szacunku
              reszty kucharzy zdobędzie (lub obroni) tytuł MISTRZA KUCHNI!
            </p>
            <p className="mb-8 text-lg">
              Podsumowanie sezonu:{" "}
              <span className="bg-red-900 p-2 text-white font-semibold rounded-md">
                24 GRUDNIA
              </span>{" "}
            </p>
          </div>

          <ul className="pb-[5%] overflow-auto  flex flex-col items-center justify-center">
            {allUsers.map((user, index) => {
              const numberOfLikes = user.itemsArray.reduce((sum, item) => {
                return sum + item.likes.length;
              }, 0);
              return (
                <li className="flex items-center justify-start w-[500px] border-b-2 py-2 pt-5">
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
                    <span className="ml-1  text-2xl font-bold">
                      {numberOfLikes}
                    </span>
                  </p>
                </li>
              );
            })}
          </ul>
        </main>
      </div>
    </div>
  );
};

export default RankingModal;
