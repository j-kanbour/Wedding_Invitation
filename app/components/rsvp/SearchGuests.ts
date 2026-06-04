"use client";

import type { FamilyData } from "@/app/components/rsvp/types";

export interface FamilyMatch {
  familyId: string;
  familyName: string;
}

export function findFamilyMatches(
  query: string,
  families: FamilyData,
  limit = 5
): FamilyMatch[] {
  const q = query.trim().toLowerCase();
  if (q.length < 2) return [];

  const matches: FamilyMatch[] = [];
  for (const [id, entry] of Object.entries(families)) {
    const hitFamily = entry.name.toLowerCase().includes(q);
    const hitGuest = entry.guests.some((n) => n.toLowerCase().includes(q));
    if (hitFamily || hitGuest) {
      matches.push({ familyId: id, familyName: entry.name });
      if (matches.length >= limit) break;
    }
  }
  return matches;
}
