import React, { useState } from "react";
import "./App.css";
import List from "./List";

function App() {
  const [theme, setTheme] = useState(true);
  return (
    <section className={`main-wrapper ${theme ? "" : "dark"}`}>
      <div className="header-bg-container"></div>
      <div className="container">
        <List theme={theme} setTheme={setTheme} />
      </div>
    </section>
  );
}

export default App;
