import { useContext } from "react";
import { TaskContext } from "../store/task-store";

const TaskItem = ({ title, desc, priority, isCompleted, onToggleComplete }) => {
  const { deleteItem } = useContext(TaskContext);

  const handleCheckboxChange = () => {
    onToggleComplete(title); // Notify parent about the change
  };

  return (
    <div className="TaskItem" data-title={`${title}`} data-id={Date.now()}>
      <div className="d-flex justify-content-between align-items-center">
        <div className={`priority ${priority}`}>{priority}</div>
        <button
          className="btn delete btn-danger"
          onClick={() => deleteItem(title)}
        >
          Delete
        </button>
      </div>
      <div className="tTitle">
        <input
          className="form-check-input me-2"
          type="checkbox"
          checked={isCompleted}
          onChange={handleCheckboxChange}
          id={`CompletedTask-${title}`}
        />
        <span htmlFor={`CompletedTask-${title}`}>{title}</span>
      </div>
      <div className="desc">{desc}</div>
    </div>
  );
};

export default TaskItem;
