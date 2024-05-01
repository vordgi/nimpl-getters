import Link from "next/link";

export default function Nav() {
    return (
        <nav>
            <Link href="/dynamic/auto" id="to-dynamic-auto">
                dynamic/auto
            </Link>
            <Link href="/intercepted" id="to-intercepted">
                intercepted
            </Link>
            <Link href="/nested" id="to-nested">
                nested
            </Link>
            <Link href="/nested-intercepted" id="to-nested-intercepted">
                nested-intercepted
            </Link>
        </nav>
    );
}
