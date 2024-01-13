import { Router,Request,Response } from "express";
import { getLogin, getSignup, logout, postLogin, postSignup } from "../controllers/userController";

const router=Router();


router.get("/login",getLogin)

router.post("/login",postLogin)

router.get("/signup",getSignup)

router.post("/signup",postSignup)

router.get("/logout",logout)

export default router