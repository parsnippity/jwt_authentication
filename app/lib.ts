import {SignJWT, jwtVerify} from "jose";
import {cookies} from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import {data} from "./data.js"
import { writeFileSync } from "fs";

//Make your secret
const secretKey = process.env.SECRET;
const key = new TextEncoder().encode(secretKey);

//Encrypt your data
export async function encrypt(payload:any) {
    return await new SignJWT(payload)
    .setProtectedHeader({alg: "HS256"})
    .setIssuedAt()
    .setExpirationTime("60 sec")
    .sign(key);
}

export async function decrypt(input:string) : Promise<any> {
    const {payload} = await jwtVerify(input, key, {algorithms: ["HS256"]})
    return payload;
}

export async function login(formData:FormData) {
    //Verify credentials and get the user
    let found = false;
    data.forEach((item) => {
        if(formData.get("username") === item.username && formData.get("password") === item.password) {
            found = true;
        }
    })
    if(found) {
        const user = {username: formData.get("username"), password: formData.get("password")}

        //create the session
        const expires = new Date(Date.now() + 60 * 1000);
        const session = await encrypt({user, expires});

        //save the session in a cookie
        cookies().set("session", session, {expires, httpOnly: true})
        return true;
    } else return false;
}

export async function signup(formData:FormData) {
    let found = false;
    data.forEach((item) => {
        if(formData.get("username") === item.username && formData.get("password") === item.password) {
            found = true;
        }
    })
    if(found) {
        return false
    } else {
        let extra = [...data, {
            username: formData.get("username"),
            password: formData.get("password"),
            email: "",
            name: "",
            job: "",
            age: 0,
            quote: "",
            bio: ""
        }]
        
        writeFileSync("./app/data.js", "export const data =" + JSON.stringify(extra))
        //Verify credentials and get the user
        const user = {username: formData.get("username"), password: formData.get("password")}

        //create the session
        const expires = new Date(Date.now() + 60 * 1000);
        const session = await encrypt({user, expires});

        //save the session in a cookie
        cookies().set("session", session, {expires, httpOnly: true})
        return true;
    }
}

export async function logout() {
    //destroy the session
    cookies().set("session", "", {expires: new Date(0)})
}

export async function getSession() {
    const session = cookies().get("session")?.value;
    if(!session) return null;
    return await decrypt(session);
}

export async function updateSession(request: NextRequest) {
    const session = request.cookies.get("session")?.value;
    if(!session) return;

    //Refresh the session so it doesn't expire
    const parsed = await decrypt(session);
    parsed.expires = new Date(Date.now() + 60 * 1000)
    const res = NextResponse.next();
    res.cookies.set({
        name: "session",
        value: await encrypt(parsed),
        httpOnly: true,
        expires: parsed.expires
    })
    return res;
}