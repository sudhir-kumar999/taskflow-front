import React, { useEffect, useReducer, useState } from "react";
import { userContext } from "./userContext.tsx";
import { todo } from "../type.ts";
import { allAPICall } from "../api2.ts";

export type child = {
  children: React.ReactNode;
};
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
const UserProvider = ({ children }: child) => {
  const [user, setUser] = useState<userres | null>(null);
  const [backError, setBackError] = useState("");
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectTodo, setSelectTodo] = useState<todo | null>(null);
  const [mainTodo, setMainTodo] = useState<todo | null>(null);
  const [formField, setFormField] = useState<userdetails>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  useEffect(() => {
    async function users() {
      try {
        let res = await allAPICall("getUser");
        if (res?.data?.data) {
          setUser(res.data.data);
        }
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    users();
  }, []);
  return (
    <userContext.Provider
      value={{
        user,
        setUser,
        formField,
        setFormField,
        loading,
        setLoading,
        selectTodo,
        setSelectTodo,
        open,
        setOpen,
        mainTodo,
        setMainTodo,
      }}
    >
      {children}
    </userContext.Provider>
  );
};

export default UserProvider;
