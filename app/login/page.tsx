import {redirect} from "next/navigation";
import {getSession, login, logout} from "../lib";

export default async function Home() {
  return (
    <section>
      <form action={async (formData) => {
        "use server"
        let success = await login(formData);
        if(success) {
            redirect("/profile")
        } else redirect("/")
      }}>
        <input type="email" name="email" id="email"/>
        <input type="password" name="password" id="password"/>
        <button type="submit">Login</button>
      </form>
      <form action={async (formData) => {
        "use server"
        await logout();
        redirect("/")
      }}>
        <button type="submit">Logout</button>
      </form>
    </section>
  )
}