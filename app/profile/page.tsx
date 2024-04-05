import {redirect} from "next/navigation";
import {getSession, logout} from "../lib";
import {data} from "../data.js";
import Link from "next/link";

export default async function Home() {
  const session = await getSession();
  if(session === null) {
    redirect("/login")
  }
  return (
    <div className="text-center flex flex-col justify-center min-h-screen items-center">
        <h1 className="text-8xl m-8 lg:text-9xl">Profile Page</h1>
        <div className="flex justify-center items-center w-9/12 flex-col lg:flex-row">
          <img src="./images/pexels-wojciech-kumpicki-2071873.jpg" className="w-6/12 lg:w-4/12 h-fit"/>
          <div className="lg:w-6/12 text-center lg:text-left">
            <div className="m-3">
              <p className="text-4xl">{data.name}</p>
              <p className="text-xl">{data.job}, {data.age}</p>
              <p className="text-xl">{session.user.username}</p>
            </div>
            <div className="m-3">
              <p className="text-xl">"{data.quote}"</p>
              <p className="text-xl">{data.bio}</p>
            </div>
          </div>
        </div>
        <div>
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
    </div>
  )
}