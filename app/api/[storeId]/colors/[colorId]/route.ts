import prismaDb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { storeId: string; colorId: string } }
) {
  try {
    if (!params.colorId) {
      return new NextResponse("Color ID is required.", { status: 400 });
    }

    const color = await prismaDb.color.findUnique({
      where: {
        id: params.colorId,
      },
    });

    return NextResponse.json(color);
  } catch (error) {
    console.log("[COLOR_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; colorId: string } }
) {
  try {
    if (!params.colorId) {
      return new NextResponse("Color ID si required.", { status: 400 });
    }

    const { userId } = auth();

    // not signed in
    if (!userId) {
      return new NextResponse("UnAuthenticated.", { status: 403 });
    }

    const { name, value } = await req.json();

    // name is not sent
    if (!name) {
      return new NextResponse("Name is  required.", { status: 400 });
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

    const color = await prismaDb.color.update({
      where: {
        id: params.colorId,
      },
      data: {
        name,
        value,
      },
    });

    return NextResponse.json(color);
  } catch (error) {
    console.log("[COLOR_PATCH]", error);
    return new NextResponse("Internal error.", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; colorId: string } }
) {
  try {
    if (!params.colorId) {
      return new NextResponse("Color ID is required.", { status: 400 });
    }

    const { userId } = auth();

    if (!userId) {
      return new NextResponse("UnAuthenticated.", { status: 403 });
    }

    const storeByUserId = await prismaDb.store.findFirst({
      where: {
        userId,
        id: params.storeId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("UnAuthorized.", { status: 405 });
    }

    const color = await prismaDb.color.delete({
      where: {
        id: params.colorId,
      },
    });

    return NextResponse.json(color);
  } catch (error) {
    console.log("[COLOR_DELETE]", error);
    return new NextResponse("Internal error.", { status: 500 });
  }
}
