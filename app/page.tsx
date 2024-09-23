import RecipesList from "@/components/RecipesList";
import { tags } from "@/constants";
import Image from "next/image";
import Link from "next/link";

const welcomeVideo = "/assets/video/intro3.mp4";

const authors = [
  {
    id: 1,
    name: "Dorota",
    avatar: "/assets/images/avatars/avatark2.webp",
  },
  {
    id: 2,
    name: "Jarek",
    avatar: "/assets/images/avatars/avatarm1.jpg",
  },
  {
    id: 3,
    name: "Kamil",
    avatar: "/assets/images/avatars/avatarm6.jpg",
  },
  {
    id: 4,
    name: "Ela",
    avatar: "/assets/images/avatars/avatark3.webp",
  },
  {
    id: 5,
    name: "Ania",
    avatar: "/assets/images/avatars/avatark1.webp",
  },
  {
    id: 6,
    name: "Agata",
    avatar: "/assets/images/avatars/avatark4.webp",
  },
  {
    id: 7,
    name: "Justyna",
    avatar: "/assets/images/avatars/avatark5.webp",
  },
  {
    id: 8,
    name: "Paweł",
    avatar: "/assets/images/avatars/avatarm9.jpg",
  },
];

export default function Home() {
  return (
    <div className="main mx-auto w-screen">
      <header className="relative mx-auto flex justify-center items-center w-full h-[65vh] mt-[12vh]">
        <div className="w-4/6 h-full relative">
          <video
            src={welcomeVideo}
            autoPlay
            muted
            loop
            playsInline
            // type="video/mp4"
            className="w-full h-full object-fill border-r-[1px] border-t-[1px] border-white"
          ></video>
        </div>

        <div className="tags w-2/6 h-full bg-zinc-900 text-white p-5 flex flex-col items-center justify-center">
          <h3 className="text-center mb-10 text-2xl font-bold uppercase font-headingFont">
            Kategorie:
          </h3>
          <ul className="flex flex-wrap items-center justify-around  text-white text-md capitalize text-center">
            {tags.map((tag, index) => {
              return (
                <>
                  {tag === "śniadanie" ? (
                    <Link
                      className="mb-5 w-[35%] bg-red-950 p-2 rounded-md hover:bg-red-900 transition-colors"
                      href={`/tags/sniadanie`}
                      key={index}
                    >
                      {tag} (0)
                    </Link>
                  ) : (
                    <Link
                      className="mb-5 w-[35%] bg-red-950 p-2 rounded-md hover:bg-red-900 transition-colors"
                      href={`/tags/${tag}`}
                      key={index}
                    >
                      {tag} (0)
                    </Link>
                  )}
                </>
              );
            })}
          </ul>
        </div>
      </header>
      <main className="mt-[8vh] w-3/4 mx-auto">
        <section>
          <p className="text-center text-lg">
            Szukasz nowych kulinarnych inspiracji? Nasza strona to kopalnia
            sprawdzonych przepisów rodzinnych, które pomogą Ci urozmaicić
            codzienne posiłki i zaskoczyć bliskich. Łatwe instrukcje i piękne
            zdjęcia sprawią, że gotowanie stanie się czystą przyjemnością.
          </p>
        </section>
        <h3 className="text-2xl font-bold text-center font-headingFont mt-[10vh]">
          Ostatnio dodane przepisy:
        </h3>
        <RecipesList />
        <section className="my-[10vh] w-4/5 mx-auto">
          <div className="bg-red-950 w-[35vw] h-[2px] mb-10 mx-auto"></div>
          <h3 className="text-2xl font-bold text-center font-headingFont ">
            Członkowie:
          </h3>
          <ul className="mt-5 flex flex-wrap justify-center items-center">
            {authors.map((author) => {
              return (
                <li
                  key={author.id}
                  className="flex flex-col items-center justify-center m-2"
                >
                  <Image
                    src={author.avatar}
                    width={100}
                    height={100}
                    alt="avatar"
                    className="rounded-full w-14 h-14 object-fill border-[2px] border-red-950"
                  />
                  <span className="px-2 py-1 text-sm text-red-900 rounded-md font-semibold font-bodyFont">
                    {author.name}
                  </span>
                </li>
              );
            })}
          </ul>
        </section>
      </main>
    </div>
  );
}
