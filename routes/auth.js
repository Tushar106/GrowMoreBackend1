import e from "express";
import {login}  from "../controllers/auth.js";
const app=e();
app.post("/login",login)
export default app;