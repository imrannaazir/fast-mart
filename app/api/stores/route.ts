import prismaDb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { name } = body;

    // if user id is undefined
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // if name is undefined
    if (!name) {
    }

    // create new store to db
    const store = await prismaDb.store.create({
      data: {
        name,
        userId,
      },
    });
    return NextResponse.json(store);
  } catch (error) {
    console.log("[STORES_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
