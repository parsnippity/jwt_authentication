import {redirect} from "next/navigation";
import {getSession, logout} from "../lib";
import {data} from "../data.js";
import Link from "next/link";
import { writeFileSync } from "fs";

export default async function Home() {
  const session = await getSession();

  if(session === null) {
    redirect("/login")
  }
  function findIt() {
    let val = {username: "", password: "", email: "", name: "", job: "", age: 0, quote: "", bio: "", image: ""};
    data.forEach((item) => {
      if(session.user.username === item.username && session.user.password === item.password) {
        val = item;
      }
    })
    return <form className="flex justify-center items-center w-9/12 flex-col" action={async (e) => {
        "use server"
          let extra = data.map((item) => {
            if(session.user.username === item.username) {
              return {username: session.user.username, password: session.user.password, email: e.get("email"), name: e.get("name"), job: e.get("job"), age: Number(e.get("age")), quote: e.get("quote"), bio: e.get("bio"), image: e.get("image") || "default"}
            } else return item;
          })
          writeFileSync("./app/data.js", "export const data =" + JSON.stringify(extra))
          redirect("/profile")
      }}>
        <label htmlFor="name">Name:</label>
        <input id="name" type="text" name="name" defaultValue={val.name}></input>
        <label htmlFor="email">Email:</label>
        <input id="email" type="email" name="email" defaultValue={val.email}></input>
        <label htmlFor="image">Profile Picture Link:</label>
        <input id="image" type="text" name="image" defaultValue={val.image == "default" ? "" : val.image}></input>
        <label htmlFor="job">Job:</label>
        <input id="job"  type="text" name="job" defaultValue={val.job}></input>
        <label htmlFor="age">Age:</label>
        <input id="age" type="number" name="age" defaultValue={val.age}></input>
        <label htmlFor="quote">Quote:</label>
        <input id="quote" type="text" name="quote" defaultValue={val.quote}></input>
        <label htmlFor="bio">Bio:</label>
        <textarea id="bio" name="bio" defaultValue={val.bio}></textarea>
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