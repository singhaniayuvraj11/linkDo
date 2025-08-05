import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function PUT(request) {
  try {
    const formData = await request.formData();

    const handle = formData.get("handle")?.trim().toLowerCase();
    const newHandle = formData.get("newHandle")?.trim().toLowerCase() || handle;
    const links = JSON.parse(formData.get("links") || "[]");
    const picFile = formData.get("pic");

    if (!handle) {
      return NextResponse.json(
        { success: false, error: true, message: "Handle is required." },
        { status: 400 }
      );
    }

    // Convert file to base64 if present
    let picBase64 = null;
    if (picFile && typeof picFile.arrayBuffer === "function") {
      const buffer = Buffer.from(await picFile.arrayBuffer());
      picBase64 = buffer.toString("base64");
    }

    const client = await clientPromise;
    const db = client.db("LinkDo");
    const collection = db.collection("links");

    // Check if profile exists
    const existing = await collection.findOne({ handle });
    if (!existing) {
      return NextResponse.json(
        {
          success: false,
          error: true,
          message: "No profile found for this handle.",
        },
        { status: 404 }
      );
    }

    // Check if newHandle is already taken (by another user)
    if (newHandle !== handle) {
      const duplicate = await collection.findOne({ handle: newHandle });
      if (duplicate) {
        return NextResponse.json(
          {
            success: false,
            error: true,
            message: "New handle is already taken.",
          },
          { status: 409 }
        );
      }
    }

    // Build update fields
    const updateData = {
      handle: newHandle,
      links,
      updatedAt: new Date(),
    };
    if (picBase64) updateData.pic = picBase64;

    // Update the document
    const result = await collection.updateOne({ handle }, { $set: updateData });

    return NextResponse.json({
      success: true,
      error: false,
      message: "Profile updated successfully.",
      result,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: true, message: error.message },
      { status: 500 }
    );
  }
}
