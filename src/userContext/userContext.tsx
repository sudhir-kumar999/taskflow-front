import React from "react";
import { todo } from "../type.ts";
type userdetails = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type userres = {
  id: string;
  name: string;
  email: string;
};
type contextType = {
  formField: userdetails;
  user: userres | null;
  loading: boolean;
  logData:string|null
  setLogData:React.Dispatch<React.SetStateAction<string|null>>
  selectTodo: todo | null;
  setSelectTodo: React.Dispatch<React.SetStateAction<todo | null>>;
  open: boolean;
  mainTodo: todo | null;
  setMainTodo: React.Dispatch<React.SetStateAction<todo | null>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setUser: React.Dispatch<React.SetStateAction<userres | null>>;
  setFormField: React.Dispatch<React.SetStateAction<userdetails>>;
};

export const userContext = React.createContext<contextType | null>(null);
