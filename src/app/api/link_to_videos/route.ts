import { NextRequest, NextResponse } from "next/server";

const CREATIFY_API_URL = "https://api.creatify.ai/api";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log(body, "body in settings");

    const objectsArray = Object.values(body);

    // Ensure there are at least two objects

    const [object1, object2] = objectsArray;

    console.log(object1, "first object");
    console.log(object2, "second object");

    const [response1, response2] = await Promise.all([
      fetch(`${CREATIFY_API_URL}/link_to_videos/`, {
        method: "POST",
        headers: {
          "X-API-ID": "51ee7e6a-21f6-461f-b80b-dc2d8b4d2f05",
          "X-API-KEY": "ec7aefc63c28104459ab60364e0e8fe5e3ef3d8d",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...(object1 || {}), request_id: "request1" }),
      }),
      fetch(`${CREATIFY_API_URL}/link_to_videos/`, {
        method: "POST",
        headers: {
          "X-API-ID": "51ee7e6a-21f6-461f-b80b-dc2d8b4d2f05",
          "X-API-KEY": "ec7aefc63c28104459ab60364e0e8fe5e3ef3d8d",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...(object2 || {}), request_id: "request2" }),
      }),
    ]);

    // Parse both responses
    const [responseData1, responseData2] = await Promise.all([
      response1.json(),
      response2.json(),
    ]);

    // Combine the responses
    const combinedResponse = [responseData1, responseData2];

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
