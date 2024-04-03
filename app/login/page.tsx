import {redirect} from "next/navigation";
import { useState } from "react";
import {getSession, login, logout} from "../lib";
import Link from "next/link";

export default async function Home() {
  return (
    <section>
      <section>
        <Link href="/">Home</Link>
        <Link href="./profile">Profile</Link>
      </section>
      <form action={async (formData) => {
        "use server"
        let success = await login(formData);
        if(success) {
            redirect("/")
        }
      }}>
        <input type="text" name="username" id="username"/>
        <input type="password" name="password" id="password"/>
        <button type="submit">Login</button>
      </form>
    </section>
  )
}