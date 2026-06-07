import axios from "axios";
import { useContext } from "react";
import { userContext } from "./userContext/userContext.tsx";
type userdetails = {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};

const BASE_URL = process.env.BASE_URL!;
export const getUser = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/api/auth/me`, {
      withCredentials: true,
    });
    console.log(res);
    return res;
  } catch (error: any) {
    return error.response.data.message;
  }
};

export const fetchData = async (formField: userdetails) => {
  console.log(formField);
  try {
    const res = await axios.post(`${BASE_URL}/user/data`, formField, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res
  } catch (error: any) {
    return error.response;
  }
};

export const fetchLogin = async (formField: userdetails): Promise<any> => {
  try {
    const res = await axios.post(`${BASE_URL}/user/login`, formField, {
      withCredentials: true,

      headers: {
        "Content-Type": "application/json",
      },
    });
    // return res.data.message;
    return res;
  } catch (error: any) {
    // return error.response.data.message
    return error.response

  }
};

export const sendLink = async (email: string) => {
  try {
    const res = await axios.post(
      `${BASE_URL}/api/resend/link`,
      { email },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return res.data.message;
  } catch (error: any) {
    return error.response.data.message;
  }
};

export const fetchTodos = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/todo/get-todo`, {
      withCredentials: true,
    });
    return res;
    // return res.data.message;

  } catch (error:any) {
    return error.response.data.message
  }
};

export const fetchTodosByStatus = async (status: string) => {
  try {
    const res = await axios.get(`${BASE_URL}/todo/filter-todo/${status}`, {
      withCredentials: true,
    });
    return res;
  } catch (error:any) {
    return error.response.data.message
  }
};

export const fetchTodosByPriority = async (priority: string) => {
  try {
    const res = await axios.get(`${BASE_URL}/todo/filter-prior/${priority}`, {
      withCredentials: true,
    });
    return res;
  } catch (error:any) {
    return error.response.data.message
  }
};

type data = {
  title: string;
  description?: string;
  priority?: string;
  dueDate: string;
};
export const addTodo = async (todoData: data) => {
  try {
    const res = await axios.post(`${BASE_URL}/todo/post-todo`, todoData, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res
  } catch (error:any) {
    return error.response
  }
};

export const updateTodo = async (taskId: string, data: any) => {
  try {
    const res = await axios.patch(
      `${BASE_URL}/todo/update-todo/${taskId}`,
      data,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return res
  } catch (error:any) {
    return error.response.data.message
  }
};

export const deleteTodo=async(taskId:string)=>{
    try {
        const res=await axios.delete(`${BASE_URL}/todo/delete-todo/${taskId}`,{
            withCredentials:true
        })
        return res
    } catch (error:any) {
        return error.response.data.message
    }
}


export const logout=async()=>{
    try {
        const res=await axios.get(`${BASE_URL}/user/logout`,{
            withCredentials:true
        })
        return res
    } catch (error:any) {
        return error.response.data.message
    }
}