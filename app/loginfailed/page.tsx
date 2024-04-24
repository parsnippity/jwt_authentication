import {redirect} from "next/navigation";
import {getSession, login} from "../lib";
import Link from "next/link";

export default async function Home() {
  const session = await getSession();
  if(session != null) {
    redirect("/profile")
  }
  return (
    <section className="text-center flex flex-col justify-center min-h-screen items-center">
      <h1 className="text-8xl m-8 lg:text-9xl">Login Page</h1>
      <form action={async (formData) => {
        "use server"
        let success = await login(formData);
        if(success) {
            redirect("/")
        } else redirect("/loginfailed")
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
          <Link href="/" className="m-8">Home Page</Link>
          <Link href="/signup" className="m-8">Sign Up Page</Link>
          <button type="submit" className="m-8">Login</button>
        </div>
        <h1 className="text-red-500 text-2xl">Username or password is incorrect</h1>
      </form>
    </section>
  )
}