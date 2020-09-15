//import react
import React, { useState, useEffect } from "react";

// import Material UI
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";

// import components
import Nav from "./components/Nav";
import Form from "./components/Form";
import Todo from "./components/Todo";

export default function App() {
  // state stuff
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [value, setValue] = React.useState(0);
  // run once
  useEffect(() => {
    // get local todos
    if (localStorage.getItem("todos") === null) {
      localStorage.setItem("todos", JSON.stringify([]));
    } else {
      let todoLocal = JSON.parse(localStorage.getItem("todos"));
      setTodos(todoLocal);
    }
  }, []);
  // useEffect - run every time 'todos' or 'status' states are changed
  useEffect(() => {
    // filter handler
    switch (status) {
      case "completed":
        setFilteredTodos(todos.filter((todo) => todo.completed === true));
        break;
      case "incomplete":
        setFilteredTodos(todos.filter((todo) => todo.completed === false));
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
    // save todos to local storage
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos, status]);
  return (
    <React.Fragment>
      <CssBaseline />
      <Nav value={value} setStatus={setStatus} setValue={setValue} />
      <Container maxWidth="md">
        <Typography variant="h1" gutterBottom align="center" color="primary">
          Todo list
        </Typography>
        <Form
          inputText={inputText}
          setInputText={setInputText}
          todos={todos}
          setTodos={setTodos}
          setStatus={setStatus}
        />
        <section>
          {filteredTodos.map((todo) => (
            <Todo
              setTodos={setTodos}
              todo={todo}
              todos={todos}
              text={todo.text}
              key={todo.id}
            />
          ))}
        </section>
      </Container>
    </React.Fragment>
  );
}
