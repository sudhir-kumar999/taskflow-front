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
    description:string
    priority:priority
    status:status
    dueDate:string
    pinned?:boolean
}

export type todoResponse={
    success:boolean
    message:string
    data:todo[]
}
export type status="ACTIVE"|"COMPLETED"
export type priority="LOW"|"MEDIUM"|"HIGH"