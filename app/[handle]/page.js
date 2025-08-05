import Link from "next/link";
import clientPromise from "@/lib/mongodb";
import { notFound } from "next/navigation";

export default async function Page({ params }) {
  const handle = (await params).handle;
  const client = await clientPromise;
  const db = client.db("LinkDo");
  const collection = db.collection("links");

  const item = await collection.findOne({ handle });
  if (!item) return notFound();

  return (
    <>
      <div>
        <Link href="/">
          <button className="absolute top-4 left-4 p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors duration-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 9.75L12 3l9 6.75M4.5 10.5v9.75h15v-9.75"
              />
            </svg>
          </button>
        </Link>
      </div>
      <div className="min-h-screen bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center px-4 py-12">
        <div className="bg-white max-w-md w-full rounded-2xl shadow-xl p-6 md:p-10 text-center">
          {item.pic == null ? (
            <img
              src="profPic.png"
              alt="Profile"
              className="w-28 h-28 md:w-32 md:h-32 rounded-full object-cover mx-auto shadow-md border-4 border-black hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <img
              src={`data:image/jpeg;base64,${item.pic}`}
              alt="Profile"
              className="w-28 h-28 md:w-32 md:h-32 rounded-full object-cover mx-auto shadow-md border-4 border-black hover:scale-105 transition-transform duration-300"
            />
          )}
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mt-4">
            @{item.handle}
          </h1>
          <p className="text-sm text-gray-600 mt-2">{item.desc}</p>
          <div className="mt-6 flex flex-col gap-4">
            {item.links.map((link, index) => (
              <Link
                key={index}
                href={link.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="w-full bg-purple-100 hover:bg-purple-200 transition-all duration-200 px-4 py-3 rounded-lg shadow text-purple-800 font-medium">
                  {link.linkText}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
