import {redirect} from "next/navigation";
import {getSession, logout} from "../lib";
import {data} from "../data.js";
import Link from "next/link";
import { useRef } from "react";

export default async function Home() {
  const session = await getSession();
  // const name = useRef(null)
  // const job = useRef(null)
  // const age = useRef(null)
  // const quote = useRef(null)
  // const bio = useRef(null)
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
    return <form className="flex justify-center items-center w-9/12 flex-col" action={async (formData) => {
        "use server"
        console.log("-----------------------------------------")
        console.log(formData.entries())
        for (const pair of formData.entries()) {
          console.log(pair[0], pair[1]);
        }
        console.log("-----------------------------------------")
          data.map((item) => {
            if(session.user.username === item.username) {
              return {username: session.user.username, password: session.user.password, name: document.getElementById("name"), job: document.getElementById("job"), age: document.getElementById("age"), quote: document.getElementById("quote"), bio: document.getElementById("bio")}
            }
          })
          redirect("/profile")
      }}>
        <label htmlFor="name">Name:</label>
        <input id="name" type="text" defaultValue={val.name}></input>
        <label htmlFor="job">Job:</label>
        <input id="job"  type="text" defaultValue={val.job}></input>
        <label htmlFor="age">Age:</label>
        <input id="age" type="number" defaultValue={val.age}></input>
        <label htmlFor="quote">Quote:</label>
        <input id="quote" type="text" defaultValue={val.quote}></input>
        <label htmlFor="bio">Bio:</label>
        <input id="bio" type="text" defaultValue={val.bio}></input>
        <button type="submit" className="buttons">Edit</button>
    </form>
  }
  return (
    <div className="text-center flex flex-col justify-center min-h-screen items-center">
        <h1 className="text-8xl m-8 lg:text-9xl">Edit Profile Page</h1>
          {findIt()}
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