import type { User, Response } from '@/types'
import { AxiosResponse } from 'axios'
import axios from './axios'

export const getAllUsers = () => axios.get('/user')

export const updatePassword = (id: number, oldPassword: string, newPassword: string, ...rest: any) =>
  axios.patch<any, AxiosResponse<Response<User>, any>>(`/user/update_password/${id}`, {
    oldPassword,
    newPassword,
    ...rest
  })