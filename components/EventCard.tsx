import Image from "next/image";
import Link from "next/link";

interface Props {
    id: string;
    title: string;
    date: string;
    location: string;
    category: string;
    attendees: number;
    price: string;
    image: string;
    description: string;
}

const EventCard = ({ title, image }: Props) => {

    return (

        <Link href={'/events'} id="event-card">
            <Image src={image} alt={title} width={410} height={300} className="poster" />
            <p className="title">{title}</p>
        </Link>
    )
}

export default EventCard