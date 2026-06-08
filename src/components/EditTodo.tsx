import Box from "@mui/material/Box";
import React, { useContext, useState } from "react";
import { userContext } from "../userContext/userContext.tsx";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";
import { priority, todo } from "../type.ts";
import PushPinIcon from "@mui/icons-material/PushPin";
import { allAPICall } from "../api2.ts";
import Typography from "@mui/material/Typography";
type props = {
  getTodos: () => Promise<void>;
};
const EditTodo = ({ getTodos }: props) => {
  const { selectTodo, setSelectTodo, mainTodo, open, setOpen } =
    useContext(userContext)!;
  const [res, setRes] = useState("");

  const upDateTodoNew = async () => {
    if (!selectTodo) {
      return;
    }
    if (!mainTodo) {
      return;
    }
    const res = await allAPICall("updateTodo", {
      title: selectTodo.title,
      description: selectTodo.description,
      priority: selectTodo.priority,
      status: selectTodo.status,
      dueDate: selectTodo.dueDate,
      id: selectTodo.id,
    });
    if (res?.data.success) {
      toast.success("todo updated successfully");
      await getTodos();
      setOpen(false);
    } else {
      setRes(res?.data?.message);
    }
  };

  const handleDeleteTodo = async () => {
    if (!selectTodo) return null;
    const res = await allAPICall("deleteTodo", { id: selectTodo.id });
    if (res?.data?.success) {
      toast.success(res.data.message);
      await getTodos();
      setOpen(false);
    }
  };
  return (
    <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
      <DialogTitle>Edit Todo</DialogTitle>
      <DialogContent
        sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
      >
        <TextField
          label="title"
          value={selectTodo?.title || ""}
          onChange={(e) => {
            if (!selectTodo) return null;
            setSelectTodo({ ...selectTodo, title: e.target.value });
          }}
        />

        <TextField
          label="description"
          value={selectTodo?.description || ""}
          onChange={(e) => {
            if (!selectTodo) return null;
            setSelectTodo({ ...selectTodo, description: e.target.value });
          }}
        />
        <FormControl>
          <InputLabel>Status</InputLabel>
          <Select
            name="status"
            value={selectTodo?.status || "ACTIVE"}
            label="status"
            onChange={(e) => {
              if (!selectTodo) return null;
              setSelectTodo({ ...selectTodo, status: e.target.value });
            }}
          >
            <MenuItem value="ACTIVE">ACTIVE</MenuItem>
            <MenuItem value="COMPLETED">COMPLETED</MenuItem>
          </Select>
        </FormControl>

        <FormControl>
          <InputLabel>Priority</InputLabel>
          <Select
            name="priority"
            value={selectTodo?.priority || "LOW"}
            label="status"
            onChange={(e) => {
              if (!selectTodo) return null;
              setSelectTodo({ ...selectTodo, priority: e.target.value });
            }}
          >
            <MenuItem value="LOW">LOW</MenuItem>
            <MenuItem value="MEDIUM">MEDIUM</MenuItem>
            <MenuItem value="HIGH">HIGH</MenuItem>
          </Select>
        </FormControl>
        <Typography sx={{ color: "red" }}>{res}</Typography>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button variant="contained" onClick={upDateTodoNew}>
          Save
        </Button>
        <Button variant="contained" onClick={handleDeleteTodo}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditTodo;
