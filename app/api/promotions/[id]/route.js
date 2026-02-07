import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

const DB_NAME = process.env.MONGODB_DB;

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const promotion = await db
      .collection("promotions")
      .findOne({ _id: new ObjectId(id) });

    if (!promotion) {
      return NextResponse.json(
        { error: "Promotion not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(promotion);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch promotion" },
      { status: 500 },
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const data = await request.json();
    const { _id, ...updateData } = data; // Remove _id if present

    const client = await clientPromise;
    const db = client.db(DB_NAME);

    const result = await db
      .collection("promotions")
      .updateOne(
        { _id: new ObjectId(id) },
        { $set: { ...updateData, updatedAt: new Date() } },
      );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: "Promotion not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update promotion" },
      { status: 500 },
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const client = await clientPromise;
    const db = client.db(DB_NAME);

    const result = await db
      .collection("promotions")
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: "Promotion not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete promotion" },
      { status: 500 },
    );
  }
}
