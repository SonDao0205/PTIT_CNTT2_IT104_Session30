import { useEffect, useState } from "react";
import Action from "./Action";
import List from "./List";
import axios from "axios";

type Todo = {
  id: number;
  name: string;
  status: boolean;
};

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [edit, setEdit] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [addError, setAddError] = useState<string | undefined>(undefined);
  const getTodo = async (): Promise<void> => {
    try {
      const response = await axios.get("http://localhost:3000/Todo");
      setTodos(response.data);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    } catch (error) {
      console.log(`Error : `, error);
    }
  };

  useEffect(() => {
    setLoading(true);
    getTodo();
  }, []);

  const addTodo = async (newTask: Todo): Promise<void> => {
    if (!newTask.name.trim()) {
      setAddError("Tên công việc không được để trống!");
      return;
    }

    const exist = todos.some(
      (element) =>
        element.name.trim().toLowerCase() === newTask.name.trim().toLowerCase()
    );
    if (exist && edit == null) {
      setAddError("Tên công việc không được trùng!");
      return;
    }

    setAddError(undefined);

    if (edit == null) {
      try {
        await axios.post("http://localhost:3000/Todo", newTask);
        getTodo();
      } catch (error) {
        console.log(`Error : `, error);
      }
    } else {
      const findTask = todos.find((element) => element.id === edit);
      if (findTask) {
        try {
          await axios.put(`http://localhost:3000/Todo/${edit}`, {
            ...findTask,
            name: newTask.name,
          });
          getTodo();
          setEdit(null);
        } catch (error) {
          console.log("Error (edit):", error);
        }
      }
    }
  };

  const filter = async (value: string) => {
    try {
      const response = await axios.get("http://localhost:3000/Todo");
      const data: Todo[] = response.data;

      switch (value) {
        case "all":
          setTodos(data);
          break;
        case "pending":
          setTodos(data.filter((element) => element.status === false));
          break;
        case "completed":
          setTodos(data.filter((element) => element.status === true));
          break;
        default:
          setTodos(data);
          break;
      }
    } catch (error) {
      console.log("Filter error:", error);
    }
  };

  const deleteTask = async (id: number): Promise<void> => {
    try {
      const response = await axios.delete(`http://localhost:3000/Todo/${id}`);
      getTodo();
    } catch (error) {
      console.log(`Error : `, error);
    }
  };

  const deleteChoice = async (value: string): Promise<void> => {
    try {
      const response = await axios.get("http://localhost:3000/Todo");
      const data: Todo[] = response.data;

      switch (value) {
        case "deleteAll":
          await Promise.all(
            data.map((item) =>
              axios.delete(`http://localhost:3000/Todo/${item.id}`)
            )
          );
          break;

        case "deleteCompleted":
          const completed = data.filter((item) => item.status === true);
          await Promise.all(
            completed.map((item) =>
              axios.delete(`http://localhost:3000/Todo/${item.id}`)
            )
          );
          break;

        default:
          break;
      }
      getTodo();
    } catch (error) {
      console.log("DeleteChoice error:", error);
    }
  };

  const changeEdit = (id: number) => {
    setEdit(id);
  };

  const changeStatus = async (id: number): Promise<void> => {
    const findTask = todos.find((element) => element.id === id);
    if (!findTask) return;
    try {
      const response = await axios.put(`http://localhost:3000/Todo/${id}`, {
        ...findTask,
        status: findTask.status ? false : true,
      });
      getTodo();
    } catch (error) {
      console.log(`Error : `, error);
    }
  };

  return (
    <div
      className="todo-container border p-3 d-flex flex-column gap-3 text-center rounded"
      style={{ width: "500px" }}
    >
      <header>
        <h3>Quản lý công việc</h3>
      </header>
      <Action
        todos={todos}
        filter={filter}
        addTodo={addTodo}
        nextId={todos.length + 1}
        edit={edit}
        addError={addError}
      />
      <List
        todos={todos}
        changeEdit={changeEdit}
        deleteTask={deleteTask}
        changeStatus={changeStatus}
        deleteChoice={deleteChoice}
      />
      {loading && (
        <div className="loading-overlay">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </div>
  );
}
