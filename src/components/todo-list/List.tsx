import Swal from "sweetalert2";
type Todo = {
  id: number;
  name: string;
  status: boolean;
};

export default function List({
  todos,
  changeEdit,
  deleteTask,
  changeStatus,
  deleteChoice,
}: {
  todos: Todo[];
  changeEdit: (id: number) => void;
  deleteTask: (id: number) => void;
  changeStatus: (id: number) => void;
  deleteChoice: (value: string) => void;
}) {
  return (
    <div>
      {todos.map((element) => {
        return (
          <div
            key={element.id}
            className="task border rounded d-flex flex-row justify-content-between align-items-center p-2 mb-3"
          >
            <div className="d-flex gap-2">
              <input
                className="form-check-input"
                type="checkbox"
                name="status"
                id={`status-${element.id}`}
                checked={element.status}
                onChange={() => changeStatus(element.id)}
              />
              <div
                className={
                  element.status ? "text-decoration-line-through" : "name"
                }
              >
                {element.name}
              </div>
            </div>
            <div className="action d-flex gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#FFFF55"
                onClick={() => changeEdit(element.id)}
              >
                <path d="M80 0v-160h800V0H80Zm160-320h56l312-311-29-29-28-28-311 312v56Zm-80 80v-170l448-447q11-11 25.5-17t30.5-6q16 0 31 6t27 18l55 56q12 11 17.5 26t5.5 31q0 15-5.5 29.5T777-687L330-240H160Zm560-504-56-56 56 56ZM608-631l-29-29-28-28 57 57Z" />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#EA3323"
                onClick={() => {
                  Swal.fire({
                    title: "Are you sure?",
                    text: "You won't be able to revert this!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, delete it!",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      deleteTask(element.id);
                      Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success",
                      });
                    }
                  });
                }}
              >
                <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
              </svg>
            </div>
          </div>
        );
      })}
      <div className="deleteTask d-flex justify-content-between">
        <button
          className="btn btn-danger"
          value="deleteCompleted"
          onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
            const value = event.currentTarget.value;
            Swal.fire({
              title: "Are you sure?",
              text: "You won't be able to revert this!",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Yes, delete it!",
            }).then((result) => {
              if (result.isConfirmed) {
                deleteChoice(value);
                Swal.fire({
                  title: "Deleted!",
                  text: "Your file has been deleted.",
                  icon: "success",
                });
              }
            });
          }}
        >
          Xoá công việc hoàn thành
        </button>
        <button
          className="btn btn-danger"
          value="deleteAll"
          onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
            const value = event.currentTarget.value;
            Swal.fire({
              title: "Are you sure?",
              text: "You won't be able to revert this!",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Yes, delete it!",
            }).then((result) => {
              if (result.isConfirmed) {
                deleteChoice(value);
                Swal.fire({
                  title: "Deleted!",
                  text: "Your file has been deleted.",
                  icon: "success",
                });
              }
            });
          }}
        >
          Xoá tất cả công việc
        </button>
      </div>
    </div>
  );
}
