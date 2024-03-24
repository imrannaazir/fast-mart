"use client";
import { handleSubmit } from "@/actions/post-todo-action";
import React, { useRef } from "react";

export default function ToDoForm() {
  const ref = useRef<HTMLFormElement>(null);
  return (
    <form
      ref={ref}
      action={async (formData) => {
        await handleSubmit(formData);
        ref?.current?.reset();
      }}
      className="flex flex-col gap-2"
    >
      <input
        type="text"
        name="title"
        placeholder="Add a title"
        className="px-6 py-2"
        required
      />
      <button type="submit" className="bg-green-500 px-6 py-2 rounded-md">
        Add Todo
      </button>
    </form>
  );
}
