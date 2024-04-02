import {redirect} from "next/navigation";
import {getSession, login, logout} from "../lib";

export default async function Home() {
  const session = await getSession();
  if(session === null) {
    redirect("/login")
  }
  return (
    <div>
        <p>{session.user.email}</p>
    </div>
  )
}