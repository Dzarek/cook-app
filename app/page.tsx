import RecipesList from "@/components/RecipesList";
import { tags } from "@/constants";
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
                      className="mb-5 w-[35%] bg-red-950 p-2 rounded-md"
                      href={`/tags/sniadanie`}
                      key={index}
                    >
                      {tag} (0)
                    </Link>
                  ) : (
                    <Link
                      className="mb-5 w-[35%] bg-red-950 p-2 rounded-md"
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
          Ostatnio dodane przepisy
        </h3>
        <RecipesList />
      </main>
    </div>
  );
}
