import React from "react";
type userdetails={
name:string
email:string
password:string
confirmPassword:string
}
type login={
    email:string
    password:string
}

type userres={
    id:string
    name:string
    email:string
}
type contextType={
   formField:userdetails
   user:userres|null
   loading:boolean,
   selectTodo:any,
   setSelectTodo:React.Dispatch<React.SetStateAction<any>>,
   open:boolean,
   mainTodo:any
   setMainTodo:React.Dispatch<React.SetStateAction<any>>,
   setOpen:React.Dispatch<React.SetStateAction<boolean>>,
   setLoading:React.Dispatch<React.SetStateAction<boolean>>,
   setUser:React.Dispatch<React.SetStateAction<userres|null>>
   setFormField:React.Dispatch<React.SetStateAction<userdetails>>
   fetchData:(formField:userdetails)=>Promise<any>
   fetchLogin:(formField:login)=>Promise<any>
   sendLink:(email:string)=>Promise<any>
    getUser:()=>Promise<any>
   backError:string,    
   setBackError:React.Dispatch<React.SetStateAction<string>>
}

export const userContext=React.createContext<contextType|null>(null)
