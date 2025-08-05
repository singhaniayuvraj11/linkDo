import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const formData = await request.formData();

    const handle = formData.get("handle");
    const links = JSON.parse(formData.get("links") || "[]");
    const picFile = formData.get("pic");

    // Convert file to base64 (optional — if you want to store it in MongoDB)
    let picBase64 = null;
    if (picFile && typeof picFile.arrayBuffer === "function") {
      const buffer = Buffer.from(await picFile.arrayBuffer());
      picBase64 = buffer.toString("base64");
    }

    const client = await clientPromise;
    const db = client.db("LinkDo");
    const collection = db.collection("links");

    const doc = await collection.findOne({handle})
    if (doc) {
      return NextResponse.json({
        success: false,
        error: true,
        message: "Username already exists. Please choose a different username.",
      }, { status: 400 });
    }

    const result = await collection.insertOne({
      handle,
      links,
      pic: picBase64, // You can skip storing this if you don't need it
      uploadedAt: new Date(),
    });

    return NextResponse.json({
      success: true,
      message: "LinkDo generated!",
      error: false,
      result,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: true, message: error.message },
      { status: 500 }
    );
  }
}
