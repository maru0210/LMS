import Link from "next/link";

export default function Root() {
  return (
    <div className="flex flex-col gap-4 px-8 py-4">
      <Link href="/login">/login</Link>
      <Link href="/register">/register</Link>
      <Link href="/home">/home</Link>
    </div>
  );
}
