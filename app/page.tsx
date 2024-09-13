import RecipesList from "@/components/RecipesList";
import { tags } from "@/constants";
import Image from "next/image";
import Link from "next/link";

const welcomeVideo = "/assets/video/intro3.mp4";

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

          {/* <h1 className="absolute  top-1/2 left-1/2 text-center text-white uppercase font-bold font-headingFont text-2xl -translate-x-2/4 -translate-y-2/4">
            stępki gotują
          </h1> */}
        </div>

        {/* <Image
          src="/assets/images/header.png"
          width={2000}
          height={2000}
          alt="headerImg"
          className="w-full h-full object-cover"
        /> */}
        <div className="tags w-2/6 h-full bg-zinc-900 text-white p-5 flex flex-col items-center justify-center">
          <h3 className="text-center mb-14 text-2xl font-bold uppercase font-headingFont">
            Tagi:
          </h3>
          <nav className="flex flex-wrap items-center justify-around  text-white text-md capitalize text-center">
            {tags.map((tag, index) => {
              return (
                <>
                  {tag === "śniadanie" ? (
                    <Link
                      className="mb-5 w-[35%] bg-red-900 p-2 rounded-md"
                      href={`/tags/sniadanie`}
                      key={index}
                    >
                      {tag} (0)
                    </Link>
                  ) : (
                    <Link
                      className="mb-5 w-[35%] bg-red-900 p-2 rounded-md"
                      href={`/tags/${tag}`}
                      key={index}
                    >
                      {tag} (0)
                    </Link>
                  )}
                </>
              );
            })}
          </nav>
        </div>
      </header>
      <main className="mt-[10vh] w-3/4 mx-auto">
        <h3 className="text-2xl font-bold text-center font-headingFont">
          Ostatnio dodane przepisy
        </h3>
        <RecipesList />
      </main>
    </div>
  );
}
