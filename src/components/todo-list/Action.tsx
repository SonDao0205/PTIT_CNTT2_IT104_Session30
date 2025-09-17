import { useEffect, useState } from "react";
import Swal from "sweetalert2";
type Todo = {
  id: number;
  name: string;
  status: boolean;
};

export default function Action({
  todos,
  filter,
  addTodo,
  nextId,
  edit,
  addError,
}: {
  todos: Todo[];
  filter: (value: string) => void;
  addTodo: (newTask: Todo) => void;
  nextId: number;
  edit: number | null;
  addError: string | undefined;
}) {
  const [input, setInput] = useState<string>("");
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const exist = todos.find((element) => element.name === input);
    if (exist) return;
    const newTask = {
      id: nextId,
      name: input,
      status: false,
    };
    setInput("");
    addTodo(newTask);
  };

  useEffect(() => {
    const index = todos.findIndex((element) => element.id === edit);
    if (index !== -1 || edit !== null) {
      setInput(todos[index].name);
    }
  }, [edit]);

  return (
    <div className="d-flex flex-column gap-3">
      <form
        onSubmit={handleSubmit}
        className="d-flex flex-column w-100 gap-2 border p-3 rounded"
      >
        <input
          type="text"
          name="nameTask"
          id="nameTask"
          className="form-control"
          value={input}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setInput(event.target.value)
          }
        />
        <button type="submit" className="btn btn-primary">
          Thêm công việc
        </button>
        {addError !== undefined && <p className="text-danger">{addError}</p>}
      </form>
      <div className="filter border p-3 rounded d-flex justify-content-evenly">
        <button
          className="btn btn-outline-primary"
          value="all"
          onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
            filter(event.currentTarget.value)
          }
        >
          Tất cả
        </button>

        <button
          className="btn btn-outline-primary"
          value="completed"
          onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
            filter(event.currentTarget.value)
          }
        >
          Hoàn thành
        </button>
        <button
          className="btn btn-outline-primary"
          value="pending"
          onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
            filter(event.currentTarget.value)
          }
        >
          Đang thực hiện
        </button>
      </div>
    </div>
  );
}
