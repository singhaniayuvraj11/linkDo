import clientPromise from "@/lib/mongodb";

const findPage = async (handle) => {
  const client = await clientPromise;
  const db = client.db("LinkDo");
  const collection = db.collection("links");

  const page = await collection.findOne({ handle });
  return page;
};

export default findPage;
