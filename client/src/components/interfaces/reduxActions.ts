export interface loginPayload {
    username : string,
    password : string
}

export interface inviteInfo{
    requesterId : string,
    requestedId : string,
    status : string
}

export interface dataSearch{
    content : string,
}

export interface userBasicInfo{
    userId? : string,
    username : string,
    user_id ? : string
}

export interface PayloadCreateUser{
    username : string
    email : string;
    password : string;
}