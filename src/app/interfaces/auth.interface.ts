
export interface RegisterUser {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
}

export interface LoginUser {
    email: string;
    password: string;
}

export interface LoginUserResponse {
    token: string;
}
  
export interface GenericResponse {
    message: string;
}

export interface ErrorResponse {
    error: string;
}



