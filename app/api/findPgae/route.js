import clientPromise from "@/lib/mongodb";

export async function POST(req) {
  try {
    const { handle } = await req.json();

    if (!handle) {
      return new Response(JSON.stringify({ error: "Handle is required" }), { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("LinkDo");
    const collection = db.collection("links");

    const page = await collection.findOne({ handle });

    return new Response(JSON.stringify({ exists: !!page }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
