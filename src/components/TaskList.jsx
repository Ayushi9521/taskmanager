import { useContext, useState } from "react";
import { TaskContext } from "../store/task-store";
import TaskItem from "./TaskItem";
import Dashboard from "./Dashboard";
import { BiTask } from "react-icons/bi";
import { SlBriefcase } from "react-icons/sl";
import { FaRegClock } from "react-icons/fa6";

const TaskList = () => {
  const {
    filteredTasks,
    deleteItem,
    filter,
    setFilter,
    toggleCompletion,
    allTaskCount,
    completedTaskCount,
    ongoingTaskCount,
  } = useContext(TaskContext);
  const isActive = (buttonFilter) => (filter === buttonFilter ? "active" : "");
  return (
    <>
      <div className="taskContainer">
        <div className="heading-dashboard">Task Dashboard</div>
        <div className="dashboardContainer">
          <Dashboard
            color="blue"
            icon={<BiTask />}
            name="All Task"
            count={allTaskCount}
          />
          <Dashboard
            color="red"
            icon={<SlBriefcase />}
            name="Ongoing Task"
            count={ongoingTaskCount}
          />
          <Dashboard
            color="green"
            icon={<FaRegClock />}
            name="Completed Task"
            count={`${completedTaskCount} / ${allTaskCount}`}
          />
        </div>
        <div className="listconatiner">
          <div className="listheader">
            <div className="list-heading">Task List</div>
            <div className="d-flex gap-2">
              <button
                onClick={() => setFilter("all")}
                className={`btn btn-outline-warning ${isActive("all")}`}
              >
                All Tasks
              </button>
              <button
                onClick={() => setFilter("completed")}
                className={`btn btn-outline-warning ${isActive("completed")}`}
              >
                Completed Tasks
              </button>
              <button
                onClick={() => setFilter("ongoing")}
                className={`btn btn-outline-warning ${isActive("ongoing")}`}
              >
                Ongoing Tasks
              </button>
              <button
                onClick={() => setFilter("sort")}
                className={`btn btn-outline-warning ${isActive("sort")}`}
              >
                Sort Tasks
              </button>
            </div>
          </div>
          <div className="task-list">
            {filteredTasks.length === 0 && <h3>Opps! Please add your task</h3>}
            {filteredTasks.map((item) => (
              <TaskItem
                title={item.title}
                desc={item.description}
                priority={item.priority}
                isCompleted={item.isCompleted}
                key={item.id}
                data-id={item.id}
                onToggleComplete={toggleCompletion}
                onDelete={deleteItem}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskList;
