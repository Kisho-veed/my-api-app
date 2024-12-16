import { NextRequest, NextResponse } from "next/server";

const CREATIFY_API_URL = "https://api.creatify.ai/api";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log(body, "body in settings");

    // First request
    const response1 = await fetch(`${CREATIFY_API_URL}/link_to_videos/`, {
      method: "POST",
      headers: {
        "X-API-ID": "51ee7e6a-21f6-461f-b80b-dc2d8b4d2f05",
        "X-API-KEY": "ec7aefc63c28104459ab60364e0e8fe5e3ef3d8d",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...body, request_id: "request1" }), // Add unique identifier
    });

    // Second request
    // const response2 = await fetch(`${CREATIFY_API_URL}/link_to_videos/`, {
    //   method: "POST",
    //   headers: {
    //     "X-API-ID": "51ee7e6a-21f6-461f-b80b-dc2d8b4d2f05",
    //     "X-API-KEY": "ec7aefc63c28104459ab60364e0e8fe5e3ef3d8d",
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ ...body, request_id: "request2" }), // Add unique identifier
    // });

    // Get both responses
    const responseData1 = await response1.json();
    // const responseData2 = await response2.json();

    // Combine the responses
    const combinedResponse = [responseData1];

    return NextResponse.json(combinedResponse, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
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

export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers":
          "Content-Type, Authorization, X-API-ID, X-API-KEY",
      },
    }
  );
}
