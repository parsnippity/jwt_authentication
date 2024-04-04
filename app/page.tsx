import Link from "next/link";
import { getSession, logout } from "./lib";

export default async function Home() {
  const session = await getSession();
  return (
    <section className="text-center flex flex-col justify-center h-screen items-center">
      <h1 className="text-9xl m-8">Home Page</h1>
      {session ? <div className="navButtons buttons flex flex-wrap justify-center w-9/12"><Link className="my-4 mx-6" href="./profile">Profile</Link>        <form action={async (formData) => {
          "use server"
          await logout();
        }}>
          <button className="my-4 mx-6" type="submit">Logout</button>
        </form></div> : <div className="navButtons buttons flex flex-wrap justify-center w-9/12"><Link className="my-4 mx-6" href="./login">Login</Link></div>}
    </section>
  )
}