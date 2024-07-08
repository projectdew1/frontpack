"use client";

import Axios from "axios"
import {  getCookie } from 'cookies-next';
import Config from "./Config";





const Http = Axios.create({
	timeout: 1000000000, // เพิ่มค่า timeout
	headers: {
		"X-Requested-With": "XMLHttpRequest",
	},
})

Http.interceptors.request.use(
	async function  (config) {
		const token = getCookie(Config.master)
		if (token) config.headers.Authorization = `Bearer ${token}`
		return config
	},
	function (error) {
		return Promise.reject(error)
	}
)

Http.interceptors.response.use(
	function (response) {
		return response
	},
	function (error) {
		if (typeof error !== undefined) {
			if (error.hasOwnProperty("response")) {
				if (error.response.status === 401 || error.response.status === 403) {
					window.location = "/administrator"
				}
			}
		}
		return Promise.reject(error)
	}
)

export default Http
