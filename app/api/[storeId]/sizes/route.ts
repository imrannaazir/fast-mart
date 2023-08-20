import prismaDb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();

    // if user is not signed in
    if (!userId) {
      return new NextResponse("UnAuthenticated.", { status: 403 });
    }

    const body = await req.json();
    const { name, value } = body;

    // if name is not sent
    if (!name) {
      return new NextResponse("Name is required.", { status: 400 });
    }

    // if value is not sent
    if (!value) {
      return new NextResponse("Value is required.", { status: 400 });
    }

    const storeByUserId = await prismaDb.store.findFirst({
      where: {
        userId,
      },
    });

    //if user is not authorized
    if (!storeByUserId) {
      return new NextResponse("UnAuthorized.", { status: 405 });
    }

    const size = await prismaDb.size.create({
      data: {
        name,
        value,
        storeId: params.storeId,
      },
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log("[SIZES_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    if (!params.storeId) {
      return new NextResponse("Store ID is required.", { status: 400 });
    }

    const sizes = await prismaDb.size.findMany({
      where: {
        storeId: params.storeId,
      },
    });

    return NextResponse.json(sizes);
  } catch (error) {
    console.log("[SIZES_GET]", error);
    return new NextResponse("Internal error.", { status: 500 });
  }
}
