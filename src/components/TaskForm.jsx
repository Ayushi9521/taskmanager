import { useContext, useRef } from "react";
import { TaskContext } from "../store/task-store";

const TaskForm = () => {
  const taskTitle = useRef();
  const taskDescription = useRef();
  const taskPriority = useRef();
  const { addNewItem } = useContext(TaskContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const title = taskTitle.current.value;
    const desc = taskDescription.current.value;
    const priority = taskPriority.current.value.toLowerCase();
    addNewItem(title, desc, priority);
    taskTitle.current.value = " ";
    taskDescription.current.value = " ";
    taskPriority.current.value = " ";
  };

  return (
    <div className="container my-5">
      <div className="position-relative p-5 text-center text-muted bg-gray  rounded-5">
        <h1 className="text-body-emphasis">Add Task</h1>
        <form className="add-form" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="titleTask" className="form-label">
              Task Title
            </label>
            <input
              type="text"
              className="form-control"
              id="titleTask"
              placeholder="Enter Your Task Title"
              ref={taskTitle}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="taskBody" className="form-label">
              Task Description
            </label>
            <textarea
              type="text"
              className="form-control"
              id="taskBody"
              placeholder="Enter Your Task Description"
              rows={5}
              ref={taskDescription}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="priority" className="form-label">
              Task Priority
            </label>
            <input
              type="text"
              className="form-control"
              id="priority"
              placeholder="Enter Your Task Priority eg. low, medium ,high"
              ref={taskPriority}
            />
          </div>
          <button type="submit" className="btn btn-primary px-5 mb-5">
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
};
export default TaskForm;
