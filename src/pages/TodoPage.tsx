import Todo from "components/Todo/Todo";
import TodoAdd from "components/Todo/TodoAdd";
import TodoHeader from "components/Todo/TodoHeader";
import TodoList from "components/Todo/TodoList";

function TodoPage() {
  return (
    <Todo>
      <TodoHeader />
      <TodoList />
      <TodoAdd />
    </Todo>
  );
}

export default TodoPage;
