import ListOfToDos from "@/components/ListOfToDos";
import TodoForm from "@/components/ToDoForm";

function TodoPage() {
  return (
    <div className="w-1/2 mx-auto my-20">
      <h1>Todo Page</h1>
      <TodoForm />
      <hr />
      <ListOfToDos />
    </div>
  );
}

export default TodoPage;
