import { NextRequest, NextResponse } from "next/server";

const CREATIFY_API_URL = "https://api.creatify.ai/api";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const response = await fetch(`${CREATIFY_API_URL}/links/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-ID": "51ee7e6a-21f6-461f-b80b-dc2d8b4d2f05",
        "X-API-KEY": "ec7aefc63c28104459ab60364e0e8fe5e3ef3d8d",
      },
      redirect: "follow",
      cache: "no-store",
      next: { revalidate: 0 },
      body: JSON.stringify(body),
    });

    const responseData = await response.json();
    console.log(responseData, "responseData");

    return NextResponse.json(responseData, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers":
          "Content-Type, Authorization, X-API-ID, X-API-KEY",
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
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

export async function PUT(request: NextRequest) {
  try {
    // Get the id from the URL params
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const requestBody = await request.json();

    const response = await fetch(`${CREATIFY_API_URL}/links/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-API-ID": "51ee7e6a-21f6-461f-b80b-dc2d8b4d2f05",
        "X-API-KEY": "ec7aefc63c28104459ab60364e0e8fe5e3ef3d8d",
      },
      body: JSON.stringify(requestBody),
    });

    const responseData = await response.json();

    return NextResponse.json(responseData, {
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
