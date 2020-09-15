import React from "react";

// import Material UI componenets
import { makeStyles } from "@material-ui/core/styles";

// icons
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

// custom Material UI styles
const useStyles = makeStyles({
  formContainer: {
    display: "flex",
    margin: "1rem 0 3rem 0"
  }
});

export default function Form({ inputText, setInputText, todos, setTodos }) {
  //custom styles
  const classes = useStyles();

  // handle input text
  const inputTextHandler = (e) => {
    setInputText(e.target.value);
  };
  // submit new todo list item
  const submitTodoHandler = (e) => {
    e.preventDefault();
    setTodos([
      ...todos,
      { text: inputText, completed: false, id: Math.random() * 1000 }
    ]);
    setInputText("");
  };

  // return template JSX
  return (
    <form className={classes.formContainer}>
      <TextField
        variant="outlined"
        autoFocus
        color="primary"
        fullWidth="true"
        value={inputText}
        onChange={inputTextHandler}
        label="add todo item..."
      />
      <Button
        variant="filled"
        color="primary"
        onClick={submitTodoHandler}
        type="submit"
      >
        <AddIcon />
      </Button>
    </form>
  );
}
