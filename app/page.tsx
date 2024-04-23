import Link from "next/link";
import { getSession, logout } from "./lib";
// get the error messages working
// get the edit page working (it doesn't write)

export default async function Home() {
  const session = await getSession();
  return (
    <section className="text-center flex flex-col justify-center min-h-screen items-center">
      <h1 className="text-8xl m-8 lg:text-9xl">Home Page</h1>
      {session ? <div className="navButtons buttons flex flex-wrap justify-center w-9/12"><Link className="my-4 mx-6" href="./profile">Profile</Link>        <form action={async (formData) => {
          "use server"
          await logout();
        }}>
          <button className="my-4 mx-6" type="submit">Logout</button>
        </form></div> : <div className="navButtons buttons flex flex-wrap justify-center w-9/12"><Link className="my-4 mx-6" href="./login">Login</Link><Link className="my-4 mx-6" href="./signup">Sign up</Link></div>}
    </section>
  )
}