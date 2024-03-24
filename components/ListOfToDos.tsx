import prismaDb from "@/lib/prismadb";

export default async function ListOfToDos() {
  const toDos = await prismaDb.todo.findMany();
  return (
    <main>
      ListOfToDos
      <div>
        {toDos.map((todo) => (
          <p key={todo.id}>{todo.title}</p>
        ))}
      </div>
    </main>
  );
}
