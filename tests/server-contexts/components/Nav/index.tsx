import Link from "next/link";

export default function Nav() {
  return (
    <nav>
      <Link href="/after" id="to-after">after</Link>
      <Link href="/inside" id="to-inside">inside</Link>
      <Link href="/uninitialized" id="to-uninitialized">uninitialized</Link>
    </nav>
  );
}
