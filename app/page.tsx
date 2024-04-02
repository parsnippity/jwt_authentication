import Link from "next/link"

export default async function Home() {
  return (
    <section>
      <Link href="./login">Login</Link>
      <Link href="./profile">Profile</Link>
    </section>
  )
}