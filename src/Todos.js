import React from "react";
import cross from "./images/icon-cross.svg";

const Todos = ({ title, todos, list, setList }) => {
  const statusHandler = () => {
    setList(
      list.map((item) => {
        if (item.id === todos.id) {
          return {
            ...item,
            status: !item.status,
          };
        }
        return item;
      })
    );
  };

  const deleteHandler = () => {
    setList(list.filter((element) => element.id !== todos.id));
  };

  return (
    <>
      <li
        className={`${todos.status ? "not-completed-todo" : "completed-todo"}`}
      >
        <span onClick={statusHandler} className={`circle-icon`}></span>
        <span className="todo-text" onClick={statusHandler}>
          {title}
        </span>

        <span onClick={deleteHandler} className="cross-icon">
          <img src={cross} alt="cross" />
        </span>
      </li>
    </>
  );
};

export default Todos;
