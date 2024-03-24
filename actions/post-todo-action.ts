"use server";

import prismaDb from "@/lib/prismadb";
import { revalidatePath } from "next/cache";

export async function handleSubmit(formData: FormData) {
  const title = formData.get("title");

  const todo = await prismaDb.todo.create({
    data: {
      title: title as string,
    },
  });

  revalidatePath("/todo");
}
