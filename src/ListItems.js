import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./listitems.css";
import Todos from "./Todos";

const ListItems = ({ list, setList, filter, setFilter }) => {
  const todosFiltered = (filter) => {
    if (filter === "all") {
      return list;
    } else if (filter === "active") {
      return list.filter((todo) => todo.status === true);
    } else if (filter === "completed") {
      return list.filter((todo) => todo.status === false);
    }
  };

  const todoRemain = () => {
    return list.filter((todo) => todo.status).length;
  };

  const clearTodos = () => {
    setList([]);
  };

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const onEnd = (result) => {
    console.log(result);
    setList(reorder(list, result.source.index, result.destination.index));
  };

  return (
    <>
      <div className="list-items-container">
        <ul className="list-items">
          <DragDropContext onDragEnd={onEnd}>
            <Droppable droppableId="112">
              {(provided, snapshot) => (
                <div ref={provided.innerRef}>
                  {todosFiltered(filter).map((todos, index) => (
                    <Draggable
                      draggableId={todos.id.toString()}
                      key={todos.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <div>
                            <Todos
                              key={todos.id}
                              title={todos.listItem}
                              todos={todos}
                              setList={setList}
                              list={list}
                            />
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </ul>

        <div className="user-cta-wrapper">
          <div className="item-counter">{`${todoRemain()} items left`}</div>
          <div className="user-buttons">
            <div
              onClick={() => {
                setFilter("all");
              }}
              className={`all-btn btn ${
                filter === "all" ? "active-button" : ""
              }`}
            >
              All
            </div>
            <div
              onClick={() => {
                setFilter("active");
              }}
              className={`active-btn btn ${
                filter === "active" ? "active-button" : ""
              }`}
            >
              Active
            </div>
            <div
              onClick={() => {
                setFilter("completed");
              }}
              className={`completed-btn btn ${
                filter === "completed" ? "active-button" : ""
              }`}
            >
              Completed
            </div>
          </div>
          <div className="clear-button" onClick={clearTodos}>
            Clear Completed
          </div>
        </div>
      </div>
      <div className="mobile-user-buttons">
        <div
          onClick={() => {
            setFilter("all");
          }}
          className={`mobile-all-btn btn ${
            filter === "all" ? "active-button" : ""
          }`}
        >
          All
        </div>
        <div
          onClick={() => {
            setFilter("active");
          }}
          className={`mobile-active-btn btn ${
            filter === "active" ? "active-button" : ""
          }`}
        >
          Active
        </div>
        <div
          onClick={() => {
            setFilter("completed");
          }}
          className={`mobile-completed-btn btn ${
            filter === "completed" ? "active-button" : ""
          }`}
        >
          Completed
        </div>
      </div>
    </>
  );
};

export default ListItems;
