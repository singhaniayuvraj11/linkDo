import { notFound } from "next/navigation";
import { Poppins } from "next/font/google";
import clientPromise from "@/lib/mongodb";
import { ProfileImage } from "./components/ProfileImage";
import { LinkButton } from "./components/LinkButton";
import { ShareButton } from "./components/ShareButton";
import { ThemeSwitcher } from "./components/ThemeSwitcher";
// 1. Import the new VideoBackground component
import VideoBackground from "./components/VideoBackground";
import { HomeButton } from "./components/HomeButton";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export default async function Page({ params }) {
  const { handle } = await params;
  const client = await clientPromise;
  const db = client.db("LinkDo");
  const collection = db.collection("links");
  const item = await collection.findOne({ handle });

  if (!item) {
    return notFound();
  }

  return (
    // 2. Remove 'animated-gradient' and add a plain div wrapper
    <div className={`min-h-screen ${poppins.className}`}>
      {/* 3. Add the VideoBackground component here */}
      <VideoBackground />

      
      {/* 4. Add 'relative z-10' to the main content to ensure it appears on top */}
      <main className="relative z-10 flex items-center justify-center min-h-screen px-4 py-24">
        <ThemeSwitcher />
      <ShareButton />
      <HomeButton />
        <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl max-w-md w-full rounded-2xl shadow-2xl p-6 md:p-8 text-center ring-1 ring-black/5">
          <ProfileImage
            src={item.pic ? `data:image/jpeg;base64,${item.pic}` : null}
            alt={`Profile picture of @${item.handle}`}
          />
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mt-4">
            @{item.handle}
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 px-4">{item.desc}</p>
          <div className="mt-8 flex flex-col gap-4 w-full">
            {item.links.map((link, index) => (
              <LinkButton
                key={index}
                href={link.link}
                title={link.linkText}
                type={
                  link.link.includes("youtube") ? "youtube" :
                  link.link.includes("twitter") ? "twitter" :
                  link.link.includes("shop") ? "shop" :
                  link.link.includes("instagram") ? "instagram" :
                  link.link.includes("facebook") ? "facebook" :
                  link.link.includes("github") ? "github" :
                  link.link.includes("linkedin") ? "linkedin" : "default"
                }
                priority={link.priority || false}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}