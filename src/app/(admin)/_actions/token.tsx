'use server'

import Config from '@/hook/setApi/Config'
import { cookies } from 'next/headers'
const cookieStore = cookies()
 const setToken = async (data:any) => cookieStore.set(Config.master,data)
 const deleteToken = async () => cookieStore.delete(Config.master)
 const getToken = async () =>  cookieStore.get(Config.master)


export  {
	setToken,
	deleteToken,
	getToken,
	
}
