import type { User, Response } from '@/types'
import { AxiosResponse } from 'axios'
import axios from './axios'

export const signin = (username: string, password: string, ...rest: any) =>
  axios.post<any, AxiosResponse<Response<User>, any>>('/auth/signin', {
    username,
    password,
    ...rest
  })
