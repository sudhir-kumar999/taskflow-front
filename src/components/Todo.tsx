import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  addTodo,
  fetchTodos,
  fetchTodosByPriority,
  fetchTodosByStatus,
  updateTodo,
} from "../api.ts";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { userContext } from "../userContext/userContext.tsx";
import EditTodo from "./EditTodo.tsx";
import { toast } from "react-toastify";

const Todo = () => {
  const { status, priority } = useParams();
  const [todos, setTodos] = useState([]);
  const [data, setData] = useState({
    title: "",
    description: "",
    priority: "",
    dueDate: "",
  });
  const [loading, setLoading] = useState(false);
  const { open, setOpen, selectTodo, setSelectTodo, mainTodo, setMainTodo } =
    useContext(userContext)!;
  const [response, setResponse] = useState("");
  const getTodos = async () => {
    setLoading(true);

    let res;
    if (status) {
      res = await fetchTodosByStatus(status);
    } else if (priority) {
      res = await fetchTodosByPriority(priority);
    } else {
      res = await fetchTodos();
    }
    if (res?.data?.data) {
      setTodos(res.data.data);
    } else {
      setLoading(false);
    }
  };
  useEffect(() => {
    getTodos();
  }, [status, priority]);
  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement, Element>,
  ) {
    setData({ ...data, [e.target.name]: e.target.value });
  }
  async function handleClick() {
    setResponse("");
    const res = await addTodo(data);
    if (res?.data?.success===true) {
      toast.success(res.data.message);
      await getTodos();
    } else {
      setResponse(res);
    }
    setData({
      title: "",
      description: "",
      priority: "",
      dueDate: "",
    });
  }
  const handleTodoClick = (todos: any) => {
    setSelectTodo({ ...todos });
    setMainTodo({ ...todos });
    setOpen(true);
  };

  return (
    <Box
      sx={{
        marginTop: "70px",
        ml: { md: "250px" },
        p: 2,
        display: "flex",
        flexDirection: "column",

      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: 1,
          maxWidth: 900,
          mb: 3,
          flexDirection: "column",
          md: { width: "800px" },
          justifyContent: "center",
        }}
      >
        <TextField
          fullWidth
          name="title"
          value={data.title}
          onChange={(e) => handleChange(e)}
          placeholder="Enter Tasks to Add"
          size="medium"
        />

        <TextField
          fullWidth
          name="description"
          value={data.description}
          onChange={(e) => handleChange(e)}
          placeholder="Enter Tasks to Add"
          size="medium"
        />
        <FormControl>
          <InputLabel>Priority</InputLabel>
          <Select
            name="priority"
            value={data.priority}
            label="priority"
            onChange={(e) => handleChange(e)}
          >
            <MenuItem value="LOW">LOW</MenuItem>
            <MenuItem value="MEDIUM">MEDIUM</MenuItem>
            <MenuItem value="HIGH">HIGH</MenuItem>
          </Select>
        </FormControl>

        <TextField
          //   label="dueDate"
          name="dueDate"
          type="date"
          value={data.dueDate}
          onChange={(e) => handleChange(e)}
          // InputLabelProps={{shrink:true}}
        />
        <Box sx={{ color: "red" }}>{response}</Box>
        <Button
          onClick={handleClick}
          variant="contained"
          sx={{ minWidth: 100 }}
        >
          Add
        </Button>
      </Box>
      <Box>
        {todos.length == 0 ? (
          <Box>No todo found</Box>
        ) : (
          todos.map((ele: any) => (
            <Box key={ele.id} onClick={() => handleTodoClick(ele)}>
              <p>{ele.title}</p>
            </Box>
          ))
        )}
      </Box>
      <EditTodo getTodos={getTodos} />
    </Box>
  );
};

export default Todo;
