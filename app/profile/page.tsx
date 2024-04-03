import {redirect} from "next/navigation";
import {getSession, logout} from "../lib";
import Link from "next/link";

export default async function Home() {
  const session = await getSession();
  if(session === null) {
    redirect("/login")
  }
  return (
    <div>
        <section>
          <Link href="/">Home</Link>
          <Link href="./login">Login</Link>
        </section>
        <p>{session.user.name}</p>
        <p>{session.user.username}</p>
        <form action={async (formData) => {
          "use server"
          await logout();
          redirect("/")
        }}>
          <button type="submit">Logout</button>
        </form>
    </div>
  )
}