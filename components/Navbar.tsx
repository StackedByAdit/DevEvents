'use client'
import Image from "next/image"
import Link from "next/link"
import posthog from "posthog-js"


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
                <Link href='/' onClick={() => posthog.capture('nav_link_clicked', { link: 'Home' })}>Home</Link>
                <Link href='/' onClick={() => posthog.capture('nav_link_clicked', { link: 'Events' })}>Events</Link>
                <Link href='/' onClick={() => posthog.capture('nav_link_clicked', { link: 'Create Event' })}>Create Event</Link>
                </div>
            </nav>
        </header>
    )
}

export default Navbar