import Image from "next/image"
import Link from "next/link"


const Navbar = () => {
    return (
        <header>
            <nav className="flex justify-between">
                <div>
                <Link href='/' className="logo">
                    <Image src="/icons/logo.png" alt="logo" width={24} height={24} />
                    <p>DevExpo</p>
                </Link>
                </div>
                <div className="flex gap-6">
                <Link href='/'>Home</Link>
                <Link href='/'>Events</Link>
                <Link href='/'>Create Event</Link>
                </div>
            </nav>
        </header>
    )
}

export default Navbar