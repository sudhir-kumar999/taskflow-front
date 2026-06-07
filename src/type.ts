export type User={
    id:string
    name:string
    email:string
}

export type userDetails={
    name:string
    email:string
    password:string
    confirmPassword:string
}

export type login={
    email:string
    password:string
}

export type todo={
    id:string
    title:string
    isPinned:boolean
    description:string
    priority:string
    status:string
    dueDate:string
    pinned?:boolean
}

export type todoResponse={
    success:boolean
    message:string
    data:todo[]
}
export type userdetails = {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};
export type status="ACTIVE"|"COMPLETED"
export type priority="LOW"|"MEDIUM"|"HIGH"