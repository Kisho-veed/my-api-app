import { NextRequest, NextResponse } from "next/server";

const CREATIFY_API_URL = "https://api.creatify.ai/api";

export async function POST(request: NextRequest) {
  try {
    // Get the video ID from the URL parameters
    const body = await request.json();
    const { videoId } = body;

    if (!videoId) {
      return NextResponse.json(
        { error: "Video ID is required" },
        { status: 400 }
      );
    }

    console.log("Checking status for video:", videoId);

    const response = await fetch(
      `${CREATIFY_API_URL}/link_to_videos/${videoId}/`,
      {
        method: "GET",
        headers: {
          "X-API-ID": "51ee7e6a-21f6-461f-b80b-dc2d8b4d2f05",
          "X-API-KEY": "ec7aefc63c28104459ab60364e0e8fe5e3ef3d8d",
          "Cache-Control": "no-cache, no-store, must-revalidate",
        },
      }
    );

    if (!response.ok) {
      const text = await response.text();
      console.error("Error response:", text);
      throw new Error(`API responded with status ${response.status}: ${text}`);
    }

    const data = await response.json();
    console.log("Video status data:", data);

    return NextResponse.json(data, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers":
          "Content-Type, Authorization, X-API-ID, X-API-KEY",
      },
    });
  } catch (error) {
    console.error("Error checking video status:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal Server Error",
      },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers":
          "Content-Type, Authorization, X-API-ID, X-API-KEY",
      },
    }
  );
}
