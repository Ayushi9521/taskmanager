import "./App.css";
import SearchBar from "./components/SearchBar";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import TaskContextProvider from "./store/task-store";

function App() {
  return (
    <>
      <TaskContextProvider>
        <div className="app-body">
          <SearchBar />
          <TaskList />
          <TaskForm />
        </div>
      </TaskContextProvider>
    </>
  );
}

export default App;
