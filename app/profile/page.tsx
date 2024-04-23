import {redirect} from "next/navigation";
import {getSession, logout} from "../lib";
import {data} from "../data.js";
import Link from "next/link";
import { Vidaloka } from "next/font/google";

export default async function Home() {
  const session = await getSession();
  if(session === null) {
    redirect("/login")
  }
  function findIt() {
    let val = {username: "", password: "", name: "", job: "", age: 0, quote: "", bio: ""};
    data.forEach((item) => {
      if(session.user.username === item.username && session.user.password === item.password) {
        val = item;
      }
    })
    return <div className="lg:w-6/12 text-center lg:text-left">
            <div className="m-3">
              <p className="text-4xl">{val.name.length > 0 ? val.name : "There is no name"}</p>
              <p className="text-xl">{val.job.length > 0 ? val.job : "There is no job"}, {val.age > 0 ? val.age : "There is no age"}</p>
              <p className="text-xl">{session.user.username}</p>
            </div>
            <div className="m-3">
              <p className="text-xl">{val.quote.length > 0 ? '"' + val.quote + '"' : "There is no quote"}</p>
              <p className="text-xl">{val.bio.length > 0 ? val.bio : "There is no bio"}</p>
            </div>
          </div>
  }
  return (
    <div className="text-center flex flex-col justify-center min-h-screen items-center">
        <h1 className="text-8xl m-8 lg:text-9xl">Profile Page</h1>
        <div className="flex justify-center items-center w-9/12 flex-col lg:flex-row">
          <img src="./images/pexels-wojciech-kumpicki-2071873.jpg" className="w-6/12 lg:w-4/12 h-fit"/>
          {findIt()}
        </div>
        <div>
          <div className="buttons">
            <Link href="/edit">Edit Profile</Link>
          </div>
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