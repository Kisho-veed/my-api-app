import { NextRequest, NextResponse } from "next/server";

const CREATIFY_API_URL =
  process.env.CREATIFY_API_URL || "https://api.creatify.ai";

export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers":
          "Content-Type, Authorization, X-API-ID, X-API-KEY",
      },
    }
  );
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    console.log(body, "body in render");
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Video ID is required" },
        { status: 400 }
      );
    }

    const response = await fetch(
      `${CREATIFY_API_URL}/link_to_videos/${id}/render`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-ID": "51ee7e6a-21f6-461f-b80b-dc2d8b4d2f05",
          "X-API-KEY": "ec7aefc63c28104459ab60364e0e8fe5e3ef3d8d",
        },
      }
    );

    const responseData = await response.json();

    return NextResponse.json(responseData, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers":
          "Content-Type, Authorization, X-API-ID, X-API-KEY",
      },
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
