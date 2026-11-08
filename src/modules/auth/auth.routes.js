import express from 'express'
import { login, signUp } from './auth.controller.js';
const authRoutes=express.Router()

authRoutes.post("/signup",signUp)
authRoutes.post("/signin",login)


export default authRoutes;