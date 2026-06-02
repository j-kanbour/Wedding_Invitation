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
  for (const [id, name] of Object.entries(families)) {
    if (name.toLowerCase().includes(q)) {
      matches.push({ familyId: id, familyName: name });
      if (matches.length >= limit) break;
    }
  }
  return matches;
}
