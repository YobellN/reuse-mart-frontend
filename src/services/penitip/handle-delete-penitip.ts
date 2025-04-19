'use server'

import axiosInstance from "../axios-instance";
import { IResponse } from "../utils";

export default async function handleDeletePenitip(id: string) : Promise<IResponse<any>>{
    try {
        const res = await axiosInstance.delete(`/penitip/${id}`);
        return {
            message: res.data.message,
            data: res.data.data
        }
    } catch (error : any) {
        console.log(error)
        if(error.response?.data) {
            return {
                message: error.response.data.message,
                errors: error.response.data.errors
            }
        } else {
            return {
                message: "Terjadi kesalahan"
            }
        }
    }
}