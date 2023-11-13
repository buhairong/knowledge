import axios from './axios';
import { AxiosResponse } from 'axios'

export const signin = (username: string, password: string, ...rest: any) =>
  axios.post<any, AxiosResponse<{ code: number; access_token: string; message: string }, any>>(
    '/auth/signin',
    {
      username,
      password,
      ...rest
    }
  )