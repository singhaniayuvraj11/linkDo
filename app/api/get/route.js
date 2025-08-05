import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

// /api/get?handle=username
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const handle = searchParams.get("handle");

    if (!handle) {
      return NextResponse.json(
        { success: false, error: true, message: "Handle is required." },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("LinkDo");
    const collection = db.collection("links");

    const data = await collection.findOne({ handle });

    if (!data) {
      return NextResponse.json(
        { success: false, error: true, message: "No profile found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      error: false,
      data,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: true, message: error.message },
      { status: 500 }
    );
  }
}
