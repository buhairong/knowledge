import type { User, Response, ListReq, ListResponse } from '@/types'
import { AxiosResponse } from 'axios'
import axios from './axios'

export const getAllUsers = (params: ListReq) =>
  axios.get<any, AxiosResponse<ListResponse<User>, any>>('/user', {
    params
  })

export const updatePassword = (id: number, oldPassword: string, newPassword: string, ...rest: any) =>
  axios.patch<any, AxiosResponse<Response<User>, any>>(`/user/update_password/${id}`, {
    oldPassword,
    newPassword,
    ...rest
  })

export const removeUser = (id: number) => axios.delete<any, AxiosResponse<Response<User>, any>>(`/user/${id}`)