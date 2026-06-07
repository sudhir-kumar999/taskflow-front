import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SelectChangeEvent } from "@mui/material/Select";
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
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { todo } from "../type.ts";
import { status } from '../type';

const Todo = () => {
  const { status, priority } = useParams();
  const [todos, setTodos] = useState<todo[]>([]);
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
  const navigate=useNavigate()
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
    if(res?.data?.message==="JWT expired login again"){
            window.location.href="/login"
            return
        }
    if (res?.data?.data) {
      setTodos(res.data.data);
      setLoading(false);
    }
  };
  useEffect(() => {
    getTodos();
  }, [status, priority]);
  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement, Element|SelectChangeEvent>,
  ) {
    setData({ ...data, [e.target.name]: e.target.value });
  }
  async function handleClick() {
    setResponse("");
    setLoading(true)
    const res = await addTodo(data);
    
    if (res?.data?.success === true) {
      toast.success(res.data.message);
      await getTodos();
    } else {
        if(res?.data?.message==="JWT expired login again"){
            window.location.href="/login"
            return
        }
      setResponse(res);

    }
    setLoading(false)
    setData({
      title: "",
      description: "",
      priority: "",
      dueDate: "",
    });
  }
  const handleTodoClick = (todos: todo) => {
    setSelectTodo({ ...todos });
    setMainTodo({ ...todos });
    setOpen(true);
  };

  return (
    <Box
      sx={{
        marginTop: "70px",
        ml: { md: "-250px" },
        width: "100%",
        p: 2,

        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "100%",
          gap: 1,
          maxWidth: {
            xs: "100%",
            sm: "100%",
            md: "100%",
            lg: "100%",
          },
          mx: "auto",
          mb: 3,
          flexDirection: "column",

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
            onChange={(e:SelectChangeEvent) => handleChange(e)}
          >
            <MenuItem value="LOW">LOW</MenuItem>
            <MenuItem value="MEDIUM">MEDIUM</MenuItem>
            <MenuItem value="HIGH">HIGH</MenuItem>
          </Select>
        </FormControl>

        <TextField
          name="dueDate"
          type="date"
          value={data.dueDate}
          onChange={(e) => handleChange(e)}
        />
        <Box sx={{ color: "red" }}>{response}</Box>
        <Button
          onClick={handleClick}
          variant="contained"
          sx={{ minWidth: 100 }}
        >
          {loading?"adding...":"Add"}
        </Button>
      </Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(1,1fr)",
            md: "repeat(2,1fr)",
            xl: "repeat(3,1fr)",
            width:"100%",
            gap: 2,
          },
        }}
      >
        {todos.length == 0 ? (
          <Box>No todo found</Box>
        ) : (
          todos.map((ele: todo) => (
            <Card
              key={ele.id}
              sx={{ cursor: "pointer", position: "relative" }}
              onClick={() => handleTodoClick(ele)}
            >
              <IconButton onClick={((e)=>{e.stopPropagation()})}>pin</IconButton>
              <CardContent>
                <Typography variant="h6">Title : {ele.title}</Typography>

                <Typography variant="body2">
                  Description : {ele.description || "no description"}
                </Typography>

                <Typography variant="body2">
                  Priority : {ele.priority}
                </Typography>
                <Typography variant="body2">Status : {ele.status}</Typography>
                <Typography variant="body2">DueDate: {ele.dueDate}</Typography>
              </CardContent>
              {/* <p>{ele.title}</p> */}
            </Card>
          ))
        )}
      </Box>
      <EditTodo getTodos={getTodos} />
    </Box>
  );
};

export default Todo;
