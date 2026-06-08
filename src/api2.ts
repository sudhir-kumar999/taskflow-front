import axios from "axios";
import { useContext } from "react";
import { userContext } from "./userContext/userContext.tsx";
import { todo, userdetails } from "./type.ts";

const BASE_URL = process.env.BASE_URL!;

const AxiosInstance = axios.create({
  baseURL: BASE_URL,
});
AxiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (
      error?.response?.data?.message == "wrong token or token expired" ||
      error?.response?.data?.message == "no tokens found"
    ) {
      window.location.href = "/login";
      return;
    }
    if (error?.response?.data?.message == "JWT expired login again") {
      let res = await axios.post(
        `${BASE_URL}/api/auth/new-token`,
        {},
        {
          withCredentials: true,
        },
      );
      const originalRequest = error.config;
      return await axios(originalRequest);
    }
    return Promise.reject(error);
  },
);

export const allAPICall = async (
  type: string,
  data?: Partial<userdetails & todo>,
  p0?: { selectTodo: todo; "": any },
) => {
  try {
    let res;
    switch (type) {
      case "getUser":
        res = await axios.get(`${BASE_URL}/api/auth/me`, {
          withCredentials: true,
        });
        break;

      case "signup":
        res = await AxiosInstance.post(`${BASE_URL}/user/data`, data, {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        });
        break;

      case "fetchLogin":
        res = await AxiosInstance.post(`${BASE_URL}/user/login`, data, {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        });
        break;

      case "sendLink":
        res = await AxiosInstance.post(`${BASE_URL}/api/resend/link`, data, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        break;

      case "addTodo":
        res = await AxiosInstance.post(`${BASE_URL}/todo/post-todo`, data, {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        });
        break;

      case "fetchTodos":
        res = await AxiosInstance.get(`${BASE_URL}/todo/get-todo`, {
          withCredentials: true,
        });
        break;

      case "fetchTodosByStatus":
        res = await AxiosInstance.get(
          `${BASE_URL}/todo/filter-todo/${data?.status}`,
          {
            withCredentials: true,
          },
        );
        break;

      case "fetchTodosByPriority":
        res = await AxiosInstance.get(
          `${BASE_URL}/todo/filter-prior/${data?.priority}`,
          {
            withCredentials: true,
          },
        );
        break;

      case "updateTodo":
        res = await AxiosInstance.patch(
          `${BASE_URL}/todo/update-todo/${data?.id}`,
          data,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
        break;

      case "deleteTodo":
        res = await AxiosInstance.delete(
          `${BASE_URL}/todo/delete-todo/${data?.id}`,
          {
            withCredentials: true,
          },
        );
        break;

      case "logout":
        res = await AxiosInstance.get(`${BASE_URL}/user/logout`, {
          withCredentials: true,
        });
        break;

      case "togglePin":
        res = await AxiosInstance.patch(
          `${BASE_URL}/todo/toggle-pin/${data?.id}`,
          {},
          {
            withCredentials: true,
          },
        );
        break;
    }

    return res;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return error?.response;
    }
  }
};
