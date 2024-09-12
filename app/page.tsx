import RecipesList from "@/components/RecipesList";
import { tags } from "@/constants";
import Image from "next/image";
import Link from "next/link";

const welcomeVideo = "/assets/video/header.mp4";

export default function Home() {
  return (
    <div className="main mx-auto w-screen">
      <header className="relative mx-auto flex justify-center items-center w-full h-[60vh] mt-[12vh]">
        {/* <video
          src={welcomeVideo}
          autoPlay
          muted
          loop
          playsInline
          // type="video/mp4"
          className="w-full h-full object-fill"
        ></video> */}
        <Image
          src="/assets/images/header.png"
          width={2000}
          height={2000}
          alt="headerImg"
          className="w-full h-full object-cover"
        />
        <div className="tags w-2/6 h-full bg-stone-800 text-white p-5 flex flex-col items-center justify-center">
          <h3 className="text-center mb-5 text-2xl uppercase font-headingFont">
            Tagi:
          </h3>
          <nav className="flex flex-col items-center justify-center text-red-800 text-2xl capitalize">
            {tags.map((tag, index) => {
              return (
                <>
                  {tag === "śniadanie" ? (
                    <Link className="mb-2" href={`/tags/sniadanie`} key={index}>
                      {tag} (0)
                    </Link>
                  ) : (
                    <Link className="mb-2" href={`/tags/${tag}`} key={index}>
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
