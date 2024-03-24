import prismaDb from "../../../lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title } = body;

    // if name is undefined
    if (!title) {
    }

    // create new store to db
    const todo = await prismaDb.todo.create({
      data: {
        title,
      },
    });
    return NextResponse.json(todo);
  } catch (error) {
    console.log("[STORES_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
