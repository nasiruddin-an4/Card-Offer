import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // STRICTLY ENFORCE IMAGE TYPES
    // The user requested: "only image not pdf.. only all type image"
    if (!file.type.startsWith("image/")) {
      console.error(`Rejected non-image file: ${file.name} (${file.type})`);
      return NextResponse.json(
        {
          error:
            "Only image files are allowed (JPG, PNG, WEBP, etc). PDF is not accepted.",
        },
        { status: 400 },
      );
    }

    console.log(`Uploading valid image: ${file.name} (${file.type})`);

    // Upload to Cloudinary with explicit 'image' resource type
    return new Promise((resolve) => {
      cloudinary.uploader
        .upload_stream(
          { folder: "betopia_promotions", resource_type: "auto" },
          (error, result) => {
            if (error) {
              console.error("Cloudinary Error:", error);
              resolve(
                NextResponse.json({ error: "Upload failed" }, { status: 500 }),
              );
            } else {
              resolve(NextResponse.json({ url: result.secure_url }));
            }
          },
        )
        .end(buffer);
    });
  } catch (error) {
    console.error("Upload Route Error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
