import React, { useEffect } from "react";
import axios from "axios";

import type User from "./types/User";
import UsersList from "./components/UsersList";
import UserCard from "./components/UserCard";

import "./App.css";

function App() {
  const [users, setUsers] = React.useState<User[]>([]);
  const [query, setQuery] = React.useState("");

  const fetchData = async () => {
    const { data } = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    setUsers(data);
  };

  // Fetch all data once on mount
  useEffect(() => {
    fetchData();
  }, []);

  function onSearchBar(e: React.ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);
  }

  return (
    <div className="App">
      <div className="container">
        <div className="row d-flex justify-content-center">
          <h1 className="display-3">Coding Challenge</h1>
          <input
            className="form-control form-control-lg m-2"
            value={query}
            type="text"
            onChange={onSearchBar}
            placeholder="Search name, username or email"
          />
          <UsersList users={users} query={query} ItemRenderer={UserCard} />
        </div>
      </div>
    </div>
  );
}

export default App;
