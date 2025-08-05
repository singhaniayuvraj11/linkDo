import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function PUT(request) {
  try {
    const body = await request.json();
    const { handle, username } = body;

    if (!handle || !username) {
      return NextResponse.json(
        {
          success: false,
          error: true,
          message: "Both handle and username are required.",
        },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("LinkDo");
    const collection = db.collection("links");

    const existing = await collection.findOne({ handle });

    if (!existing) {
      return NextResponse.json(
        {
          success: false,
          error: true,
          message: "No profile found with this handle.",
        },
        { status: 404 }
      );
    }

    const result = await collection.updateOne(
      { handle },
      {
        $set: {
          username,
          updatedAt: new Date(),
        },
      }
    );

    return NextResponse.json({
      success: true,
      error: false,
      message: "Username updated successfully.",
      result,
    });

  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: true,
        message: error.message || "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
