import {redirect} from "next/navigation";
import {getSession, logout} from "../lib";
import Link from "next/link";

export default async function Home() {
  const session = await getSession();
  if(session === null) {
    redirect("/login")
  }
  return (
    <div className="text-center">
        <h1 className="text-9xl m-8">Profile Page</h1>
        <p>{session.user.name}</p>
        <p>{session.user.username}</p>
        <div className="buttons">
          <Link href="/">Go Home</Link>
        </div>
        <form action={async (formData) => {
          "use server"
          await logout();
          redirect("/")
        }}>
          <button type="submit" className="buttons">Logout</button>
        </form>
    </div>
  )
}