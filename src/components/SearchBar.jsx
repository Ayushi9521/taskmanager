import { FaSearch } from "react-icons/fa";
import Logo from "../assets/task.jpg";
import { useContext } from "react";
import { TaskContext } from "../store/task-store";
const SearchBar = () => {
  const { searchTerm, setSearchTerm } = useContext(TaskContext);
  return (
    <div className="Header">
      <div className="SearchBox">
        <div className="input-group">
          <span className={`input-group-text searchIcon`} id="basic-addon1">
            <FaSearch />
          </span>
          <input
            type="text"
            className={`form-control SearchInput`}
            placeholder="Search Task"
            aria-label="search"
            aria-describedby="basic-addon1"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="logo">
        <img src={Logo} alt="logo" className="logo" />
      </div>
    </div>
  );
};
export default SearchBar;
