import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { Types } from "mongoose";

import Event from "@/database/event.model";
import connectDB from "@/lib/mongodb";

interface EventRecord {
  _id: Types.ObjectId;
  title: string;
  slug: string;
  description: string;
  overview: string;
  image: string;
  venue: string;
  location: string;
  date: string;
  time: string;
  mode: string;
  audience: string;
  agenda: string[];
  organizer: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

interface RouteParams {
  slug?: string;
}

const SLUG_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/**
 * GET /api/events/[slug]
 * Returns one event by URL slug.
 */
export async function GET(
  _request: NextRequest,
  context: { params: Promise<RouteParams> }
) {
  try {
    const { slug } = await context.params;

    // Validate route parameter before hitting the database.
    if (!slug) {
      return NextResponse.json(
        { message: "Missing required route parameter: slug." },
        { status: 400 }
      );
    }

    const normalizedSlug = slug.trim().toLowerCase();

    if (!SLUG_REGEX.test(normalizedSlug)) {
      return NextResponse.json(
        {
          message:
            "Invalid slug format. Use lowercase letters, numbers, and hyphens only.",
        },
        { status: 400 }
      );
    }

    await connectDB();

    const event = await Event.findOne({ slug: normalizedSlug })
      .lean<EventRecord>()
      .exec();

    if (!event) {
      return NextResponse.json(
        { message: `Event not found for slug: ${normalizedSlug}.` },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Event fetched successfully.", event },
      { status: 200 }
    );
  } catch (error: unknown) {
    const message =
      error instanceof Error
        ? error.message
        : "An unexpected error occurred while fetching the event.";

    return NextResponse.json(
      { message: "Failed to fetch event.", error: message },
      { status: 500 }
    );
  }
}
