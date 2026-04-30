'use client'
import Image from "next/image";
import Link from "next/link";
import posthog from "posthog-js";
import { IEvent } from "@/database/event.model";

type Props = Pick<IEvent, "title" | "image" | "date" | "location" | "time" | "slug" | "mode">;

const EventCard = ({ title, image, date, location, mode, time , slug}: Props) => {

    return (
        <Link href={`/events/${slug}`} id="event-card" onClick={() => posthog.capture('event_card_clicked', { event_title: title, event_mode: mode, event_location: location, event_date: date })}>
            <Image src={image} alt={title} width={410} height={300} className="poster" />

            <div className="flex flex-row gap-2">
                <Image src="/icons/pin.svg" alt="location" width={14} height={14} />
                <p>{location}</p>
            </div>
            <p className="title">{title}</p>

            <div className="datetime">
                <div>
                    <Image src="/icons/calendar.svg" alt="date" width={14} height={14} />
                    <p>{date}</p>

                    <p>{time}</p>
                </div>
            </div>
        </Link>
    )
}

export default EventCard