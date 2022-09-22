import React, { useState, useEffect } from "react";
import "./list.css";
import "./listitems.css";
import ListItems from "./ListItems";

const List = ({ theme, setTheme }) => {
  const [name, setName] = useState("");
  const [list, setList] = useState([]);
  const [filter, setFilter] = useState("all");

  const nameHandler = (e) => {
    setName(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const newList = { id: Math.random() * 99, listItem: name, status: true };
    if (name.trim().length > 0) {
      setList([...list, newList]);
      setName("");
    } else {
      alert("Please enter a to-do");
    }
  };

  useEffect(() => {
    const localList = localStorage.getItem("list");
    setList(JSON.parse(localList));
  }, []);

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  });

  useEffect(() => {
    const localTheme = localStorage.getItem("theme");
    setTheme(JSON.parse(localTheme));
  }, [setTheme]);

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(theme));
  });

  const themeHandler = () => {
    setTheme(!theme);
  };

  return (
    <section className="wrapper">
      <div className="todo-container">
        <div className="heading">
          <h2>TODO</h2>
          <span className={`${theme}`} onClick={themeHandler}></span>
        </div>
        <form onSubmit={submitHandler} className="todo-form" action="">
          <input
            onChange={nameHandler}
            className="todo-input"
            type="text"
            placeholder="Create a new todo..."
            value={name}
          />
        </form>
        {/*list items*/}
        <ListItems
          filter={filter}
          setFilter={setFilter}
          list={list}
          setList={setList}
        />
      </div>
    </section>
  );
};

export default List;
