import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SelectChangeEvent } from "@mui/material/Select";
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
import PushPinIcon from "@mui/icons-material/PushPin";
import { allAPICall } from "../api2.ts";
import { RiUnpinFill } from "react-icons/ri";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
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
  const {  setOpen, setSelectTodo, setMainTodo } =
    useContext(userContext)!;
  const [response, setResponse] = useState("");
  const [isOpen, setIsOpen] = React.useState(false);
  const [deleteId, setDeleteId] = useState("");

  const handleClickOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const getTodos = async () => {
    setLoading(true);
    let res;
    if (status) {
      setLoading(true);
      res = await allAPICall("fetchTodosByStatus", { status });
      setLoading(false);
    } else if (priority) {
      res = await allAPICall("fetchTodosByPriority", { priority });
    } else {
      res = await allAPICall("fetchTodos");
    }
    if (res?.data?.data) {
      setTodos(res.data.data);
      setLoading(false);
    } else {
      setTodos([]);
    }
  };
  useEffect(() => {
    getTodos();
  }, [status, priority]);
  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement,
      Element | SelectChangeEvent
    >,
  ) {
    setData({ ...data, [e.target.name]: e.target.value });
  }
  async function handleClick() {
    setResponse("");
    setLoading(true);
    const res = await allAPICall("addTodo", data);
    if (res?.data?.success === true) {
      toast.success(res.data.message);
      await getTodos();
      setData({
        title: "",
        description: "",
        priority: "",
        dueDate: "",
      });
    } else {
      setResponse(res?.data?.message);
    }
    setLoading(false);
  }
  const handleTodoClick = (todos: todo) => {
    setSelectTodo({ ...todos });
    setMainTodo({ ...todos });
    setOpen(true);
  };
  const handlePinMes = async (id: string) => {
    const res = await allAPICall("togglePin", { id });
    if (res?.data?.success) {
      getTodos();
    }
  };
  const handleDeleteTodo = async (id: string) => {
    const res = await allAPICall("deleteTodo", { id });
    if (res?.data?.success) {
      toast.success(res.data.message);
      getTodos();
      setOpen(false);
    }
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
          placeholder="Enter description Optional"
          size="medium"
        />
        <FormControl>
          <InputLabel>Select Priority</InputLabel>
          <Select
            name="priority"
            value={data.priority}
            label="priority"
            onChange={(e: SelectChangeEvent) => handleChange(e)}
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
          ADD
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
            width: "100%",
            gap: 2,
          },
        }}
      >
        {todos.length == 0 ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              height: "100vh",
            }}
          >
            <p>No todo Found</p>
          </Box>
        ) : (
          todos.map((ele: todo) => (
            <Card
              key={ele.id}
              sx={{
                cursor: "pointer",
                position: "relative",
                display: "flex",
                flexDirection: "column",
                m: 1,
              }}
              onClick={() => handleTodoClick(ele)}
            >
              <Card
                elevation={0}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  ml: 2,
                  mr: 2,
                }}
              >
                <IconButton
                  onClick={(e) => {
                    {
                      e.stopPropagation();
                      handlePinMes(ele.id);
                    }
                  }}
                >
                  {ele?.isPinned ? <RiUnpinFill /> : <PushPinIcon />}
                </IconButton>
                <IconButton
                  onClick={(e) => {
                    {
                      e.stopPropagation();
                      //   handleDeleteTodo(ele.id);
                      setDeleteId(ele?.id);
                      handleClickOpen();
                    }
                  }}
                >
                  <DeleteForeverIcon />
                </IconButton>
              </Card>
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
            </Card>
          ))
        )}
        {isOpen && (
          <React.Fragment>
            <Dialog
              open={isOpen}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              role="alertdialog"
            >
              <DialogTitle id="alert-dialog-title">
                {"Delete Confirmation"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  are you sure want to delete
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} autoFocus>
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    handleClose();
                    handleDeleteTodo(deleteId);
                  }}
                >
                  Delete
                </Button>
              </DialogActions>
            </Dialog>
          </React.Fragment>
        )}
      </Box>
      <EditTodo getTodos={getTodos} />
    </Box>
  );
};

export default Todo;
