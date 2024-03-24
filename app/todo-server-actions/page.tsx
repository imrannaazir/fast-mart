import ToDoForm from "@/components/ToDoForm";
import prismaDb from "@/lib/prismadb";

interface Todo {
  title: string;
}

async function TodoForm() {
  const toDos = await prismaDb.todo.findMany();

  return (
    <main className="w-1/2 mx-auto my-20">
      <h1>Create todo with Server action.</h1>

      <ToDoForm />

      <hr />

      <div>
        <h1>Todo List</h1>
        <div>
          {toDos.map((todo, i) => (
            <p key={todo.id}>
              {" "}
              {i + 1}. {todo.title}
            </p>
          ))}
        </div>
      </div>
    </main>
  );
}

export default TodoForm;
