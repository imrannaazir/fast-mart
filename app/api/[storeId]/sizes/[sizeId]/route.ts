import prismaDb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { storeId: string; sizeId: string } }
) {
  try {
    if (!params.sizeId) {
      return new NextResponse("Size ID is required.", { status: 400 });
    }

    const size = await prismaDb.size.findUnique({
      where: {
        id: params.sizeId,
      },
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log("[SIZE_GET]", error);
    return new NextResponse("Internal error.", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; sizeId: string } }
) {
  try {
    const { userId } = auth();

    // if not signed in
    if (!userId) {
      return new NextResponse("UnAuthenticated.", { status: 403 });
    }

    if (!params.sizeId) {
      return new NextResponse("Store ID is required.", { status: 400 });
    }

    const { name, value } = await req.json();

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
        id: params.storeId,
        userId,
      },
    });

    // if user is not authorized
    if (!storeByUserId) {
      return new NextResponse("UnAuthorized.", {
        status: 405,
      });
    }

    const size = await prismaDb.size.update({
      where: {
        id: params.sizeId,
      },
      data: {
        name,
        value,
      },
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log("[SIZE_PATCH]", error);
    return new NextResponse("Internal error.", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; sizeId: string } }
) {
  try {
    const { userId } = auth();

    // user is not signed in
    if (!userId) {
      return new NextResponse("UnAuthenticated.", { status: 403 });
    }

    // if size id is not there
    if (!params.sizeId) {
      return new NextResponse("Size ID is required.", { status: 400 });
    }

    const storeByUserId = await prismaDb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    // user is not authorized
    if (!storeByUserId) {
      return new NextResponse("UnAuthorized.", { status: 405 });
    }

    const size = await prismaDb.size.delete({
      where: {
        id: params.sizeId,
      },
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log("[SIZE_DELETE]", error);
    return new NextResponse("Internal error.", { status: 500 });
  }
}
