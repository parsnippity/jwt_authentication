import {redirect} from "next/navigation";
import {getSession, login, logout} from "../lib";
import Link from "next/link";

export default async function Home() {
  return (
    <section className="text-center flex flex-col justify-center h-screen items-center">
      <h1 className="text-9xl m-8">Login Page</h1>
      <form action={async (formData) => {
        "use server"
        let success = await login(formData);
        if(success) {
            redirect("/")
        }
      }} className="flex flex-col">
        <div>
          <label htmlFor="username" className="buttons">Username:</label>
          <input type="text" name="username" id="username" className="align-bottom mx-2 p-2"/>
        </div>
        <div>
          <label htmlFor="password" className="buttons">Password:</label>
          <input type="password" name="password" id="password" className="align-bottom mx-2 p-2"/>
        </div>
        <div className="buttons">
          <Link href="/" className="m-8">Go Home</Link>
          <button type="submit" className="m-8">Login</button>
        </div>
      </form>
    </section>
  )
}