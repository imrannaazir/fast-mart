import prismaDb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  {
    params,
  }: {
    params: {
      storeId: string;
    };
  }
) {
  try {
    const { userId } = auth();

    // not signed in
    if (!userId) {
      return new NextResponse("UnAuthenticated.", { status: 403 });
    }

    const { name, value } = await req.json();

    // name not sent
    if (!name) {
      return new NextResponse("Name is required.", { status: 400 });
    }

    // value is not sent
    if (!value) {
      return new NextResponse("Value is required.", { status: 400 });
    }

    const storeByUserId = await prismaDb.store.findFirst({
      where: {
        userId,
        id: params.storeId,
      },
    });

    // not authorized
    if (!storeByUserId) {
      return new NextResponse("UnAuthorized.", { status: 405 });
    }

    const color = await prismaDb.color.create({
      data: {
        name,
        value,
        storeId: params.storeId,
      },
    });

    return NextResponse.json(color);
  } catch (error) {
    console.log("[COLORS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    if (!params.storeId) {
      return new NextResponse("Store ID is required.", {
        status: 400,
      });
    }

    const colors = await prismaDb.color.findMany({
      where: {
        storeId: params.storeId,
      },
    });

    return NextResponse.json(colors);
  } catch (error) {
    console.log("[COLORS_GET]", error);
    return new NextResponse("Internal error.", { status: 500 });
  }
}
