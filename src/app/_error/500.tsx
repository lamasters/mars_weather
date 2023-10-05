import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div>
      <h1>500 - Server Error</h1>
      <p>An internal error has occured.</p>
      <Link href="/">
        <a>Go back to home</a>
      </Link>
    </div>
  );
}
