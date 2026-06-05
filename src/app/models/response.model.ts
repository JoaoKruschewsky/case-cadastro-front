export interface Response<T> {
  message: string;
  data: T;
}

export interface LoginResponse {
  loginResponse: string;
}


export interface ResponseUser {
  name: string;
  login: string;
}