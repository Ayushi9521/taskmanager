import { createContext, useEffect, useReducer, useState } from "react";

// Create the TaskContext and provide default structure and methods
export const TaskContext = createContext({
  taskItems: [],
  addNewItem: () => {},
  deleteItem: () => {},
  filter: "all",
  setFilter: () => {},
  toggleCompletion: () => {},
  filteredTasks: [],
  searchTerm: "",
  setSearchTerm: () => {},
});

// Reducer function to manage task actions and state updates
const TaskReducer = (currentItem, action) => {
  let newItem = currentItem;

  // Handle adding a new task
  if (action.type === "NEW_ITEM") {
    newItem = [
      {
        id: Date.now(), // Unique ID for the task based on timestamp
        title: action.payload.taskTitle,
        description: action.payload.taskDescription,
        priority: action.payload.taskPriority,
        isCompleted: false, // New tasks are incomplete by default
      },
      ...currentItem,
    ];
  }
  // Handle deleting a task
  else if (action.type === "DELETE_ITEM") {
    newItem = currentItem.filter(
      (item) => item.title !== action.payload.taskTitle
    );
  }
  // Handle toggling task completion status
  else if (action.type === "TOGGLE_COMPLETE") {
    newItem = currentItem.map((item) =>
      item.title === action.payload.taskTitle
        ? { ...item, isCompleted: !item.isCompleted }
        : item
    );
  }

  // Save updated tasks to local storage
  localStorage.setItem("taskItems", JSON.stringify(newItem));
  return newItem;
};

// Context provider to manage state and provide task-related methods
const TaskContextProvider = ({ children }) => {
  // Initialize tasks from local storage or start with an empty array
  const initialTasks = JSON.parse(localStorage.getItem("taskItems")) || [];
  const [taskItems, dispatchItem] = useReducer(TaskReducer, initialTasks);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Function to add a new task
  const addNewItem = (taskTitle, taskDescription, taskPriority) => {
    const newItemAction = {
      type: "NEW_ITEM",
      payload: {
        taskTitle,
        taskDescription,
        taskPriority,
      },
    };
    dispatchItem(newItemAction);
    handleAddTask(taskTitle);
  };

  // Function to delete a task
  const deleteItem = (taskTitle) => {
    handleDeleteTask(taskTitle); // Call animation function for deletion
    setTimeout(() => {
      const deleteItemAction = {
        type: "DELETE_ITEM",
        payload: { taskTitle },
      };
      dispatchItem(deleteItemAction);
    }, 500); // Delay for animation
  };

  // Function to toggle task completion
  const toggleCompletion = (taskTitle) => {
    const toggleCompleteAction = {
      type: "TOGGLE_COMPLETE",
      payload: { taskTitle },
    };
    dispatchItem(toggleCompleteAction);
  };

  // Add animation class for newly added tasks
  const handleAddTask = () => {
    const taskElements = document.querySelectorAll(".task-list .TaskItem");
    if (taskElements.length > 0) {
      const lastAddedTask = taskElements[0];
      lastAddedTask.classList.add("new");
      setTimeout(() => {
        lastAddedTask.classList.remove("new");
      }, 500); // Match CSS animation duration
    }
  };

  // Add animation class for deleted tasks
  const handleDeleteTask = (taskTitle) => {
    const taskElement = document.querySelector(`[data-title="${taskTitle}"]`);
    if (taskElement) {
      taskElement.classList.add("removed");
    }
  };

  // Effect to animate the last added task
  useEffect(() => {
    if (taskItems.length > 0) {
      const lastAddedTask = document.querySelector(
        `[data-id="${taskItems[0].id}"]`
      );
      if (lastAddedTask) {
        lastAddedTask.classList.add("new");
        setTimeout(() => {
          lastAddedTask.classList.remove("new");
        }, 500); // Animation duration
      }
    }
  }, [taskItems]);

  // Search function to filter tasks by title
  const handleSearch = () => {
    return taskItems.filter((task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  // Define the priority order for sorting
  const priorityOrder = ["High", "Medium", "Low"];

  // Filter and sort tasks based on current state and search term
  const filteredTasks = handleSearch()
    .filter((item) => {
      if (filter === "completed") return item.isCompleted;
      if (filter === "ongoing") return !item.isCompleted;
      return true; // Show all tasks for 'all' filter
    })
    .sort((a, b) => {
      if (filter === "sort") {
        // Sort based on priorityOrder
        return (
          priorityOrder.indexOf(a.priority) - priorityOrder.indexOf(b.priority)
        );
      }
      return 0; // No sorting if filter is not "sort"
    });

  // Update local storage whenever tasks change
  useEffect(() => {
    localStorage.setItem("taskItems", JSON.stringify(taskItems));
  }, [taskItems]);

  // Calculate task counts
  const allTaskCount = taskItems.length;
  const completedTaskCount = taskItems.filter(
    (task) => task.isCompleted
  ).length;
  const ongoingTaskCount = taskItems.filter((task) => !task.isCompleted).length;

  // Provide state and functions to children components
  return (
    <TaskContext.Provider
      value={{
        taskItems,
        addNewItem,
        deleteItem,
        filter,
        setFilter,
        toggleCompletion,
        filteredTasks,
        searchTerm,
        setSearchTerm,
        allTaskCount,
        completedTaskCount,
        ongoingTaskCount,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContextProvider;
