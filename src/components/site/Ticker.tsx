import { db } from "@/lib/db";
import { safeQuery } from "@/lib/queries";
import TickerBand from "@/components/site/TickerBand";

/** The departures board: a slim cobalt band narrating the journey from live data. */
export default async function Ticker() {
  const [destinations, frameCount] = await Promise.all([
    safeQuery([], () =>
      db.destination.findMany({
        orderBy: { createdAt: "desc" },
        take: 6,
        select: { name: true, latitude: true, longitude: true },
      })
    ),
    safeQuery(0, () => db.media.count({ where: { inGallery: true } })),
  ]);

  const items = [
    "Field log of one traveler",
    ...destinations.map((d) =>
      d.latitude != null && d.longitude != null
        ? `Now logging: ${d.name} ${Math.abs(d.latitude).toFixed(1)}°${d.latitude >= 0 ? "N" : "S"} ${Math.abs(d.longitude).toFixed(1)}°${d.longitude >= 0 ? "E" : "W"}`
        : `Now logging: ${d.name}`
    ),
    ...(frameCount > 0 ? [`${frameCount} frames in the gallery`] : []),
    "Next stop: uncharted",
    "No hurry, no itinerary",
  ];

  return <TickerBand line={items.join("  ✦  ").toUpperCase()} />;
}
