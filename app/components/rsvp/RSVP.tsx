"use client";

import { useEffect, useMemo, useState } from "react";
import { findFamilyMatches } from "@/app/components/rsvp/SearchGuests";
import type { Attendance, FamilyData, GuestData, Member } from "@/app/components/rsvp/types";
import MemberRow from "@/app/components/rsvp/MemberRow";

type Stage = "search" | "loading" | "party" | "done";

export default function RSVP() {
  const [stage, setStage] = useState<Stage>("search");
  const [query, setQuery] = useState("");

  const [families, setFamilies] = useState<FamilyData | null>(null);
  const [familiesLoading, setFamiliesLoading] = useState(true);
  const [familiesError, setFamiliesError] = useState<string | null>(null);

  const [selectedFamilyId, setSelectedFamilyId] = useState<string | null>(null);
  const [guests, setGuests] = useState<GuestData | null>(null);

  const [attendance, setAttendance] = useState<Record<string, Attendance>>({});
  const [dietary, setDietary] = useState<Record<string, string>>({});
  const [names, setNames] = useState<Record<string, { firstName: string; lastName: string }>>({});
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function fetchFamilies() {
    setFamiliesLoading(true);
    setFamiliesError(null);
    fetch("/api/FetchFamilies", { cache: "no-store" })
      .then((r) => r.json())
      .then((data: FamilyData) => setFamilies(data))
      .catch(() => setFamiliesError("Could not load guest list. Please try again."))
      .finally(() => setFamiliesLoading(false));
  }

  useEffect(() => {
    fetchFamilies();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const matches = useMemo(
    () => (families && query.length >= 2 ? findFamilyMatches(query, families) : []),
    [query, families]
  );

  async function pickFamily(familyId: string) {
    setSelectedFamilyId(familyId);
    setStage("loading");
    setQuery("");
    try {
      const r = await fetch(`/api/FetchGuests?paramFamilyID=${encodeURIComponent(familyId)}`);
      const data: GuestData = await r.json();
      setGuests(data);

      // Pre-populate from existing RSVP data
      const a: Record<string, Attendance> = {};
      const d: Record<string, string> = {};
      const n: Record<string, { firstName: string; lastName: string }> = {};
      let sharedNote = "";
      for (const [guestId, info] of Object.entries(data)) {
        if (info.rsvp === "yes" || info.rsvp === "no") a[guestId] = info.rsvp;
        d[guestId] = info.dietary || "";
        n[guestId] = { firstName: info.firstName, lastName: info.lastName };
        if (info.message) sharedNote = info.message;
      }
      setAttendance(a);
      setDietary(d);
      setNames(n);
      setNote(sharedNote);
      setStage("party");
    } catch {
      setStage("search");
      setSelectedFamilyId(null);
    }
  }

  function setAtt(guestId: string, value: Attendance) {
    setAttendance((s) => ({ ...s, [guestId]: value }));
  }
  function setDiet(guestId: string, value: string) {
    setDietary((s) => ({ ...s, [guestId]: value }));
  }
  function setFirstName(guestId: string, value: string) {
    setNames((s) => ({ ...s, [guestId]: { ...s[guestId], firstName: value } }));
  }
  function setLastName(guestId: string, value: string) {
    setNames((s) => ({ ...s, [guestId]: { ...s[guestId], lastName: value } }));
  }

  function resetAll() {
    setStage("search");
    setSelectedFamilyId(null);
    setGuests(null);
    setAttendance({});
    setDietary({});
    setNames({});
    setNote("");
    fetchFamilies();
  }

  async function submit() {
    if (!guests || !selectedFamilyId) return;
    setSubmitting(true);
    try {
      const updated: GuestData = {};
      for (const [guestId, info] of Object.entries(guests)) {
        updated[guestId] = {
          ...info,
          firstName: info.isUnnamed ? (names[guestId]?.firstName || "") : info.firstName,
          lastName: info.isUnnamed ? (names[guestId]?.lastName || "") : info.lastName,
          rsvp: attendance[guestId] || "",
          dietary: dietary[guestId] || "",
          message: note,
        };
      }
      await fetch("/api/UpdateGuests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });
      setStage("done");
    } finally {
      setSubmitting(false);
    }
  }

  const selectedFamilyName =
    families && selectedFamilyId ? families[selectedFamilyId] : "";

  if (stage === "done" && guests) {
    const yesCount = Object.values(attendance).filter((v) => v === "yes").length;
    return (
      <div className="rsvp-card rsvp-done">
        <div className="rsvp-eyebrow">Thank you</div>
        <h3 className="rsvp-done-title">Your reply is in.</h3>
        <p className="rsvp-done-body">
          We&apos;ve received an RSVP for{" "}
          <em>
            {yesCount} guest{yesCount === 1 ? "" : "s"}
          </em>{" "}
          from the <em>{selectedFamilyName}</em> invitation. We can&apos;t wait
          to celebrate with you on the seventeenth of January.
        </p>
        <p className="rsvp-done-body small">
          Need to change something? Re-submit any time before the 1<sup>st</sup>{" "}
          of December and your latest reply will be used.
        </p>
        <button type="button" className="rsvp-link-btn" onClick={resetAll}>
          ← submit another reply
        </button>
      </div>
    );
  }

  if (stage === "loading") {
    return (
      <div className="rsvp-card">
        <div className="rsvp-helper">Loading your invitation…</div>
      </div>
    );
  }

  if (stage === "party" && guests && selectedFamilyId) {
    const members: Member[] = Object.entries(guests).map(([guestId, info]) => ({
      id: guestId,
      name: `${info.firstName} ${info.lastName}`.trim(),
      isUnnamed: info.isUnnamed,
    }));

    return (
      <div className="rsvp-card">
        <button
          type="button"
          className="rsvp-back"
          onClick={() => {
            setStage("search");
            setSelectedFamilyId(null);
            setGuests(null);
            fetchFamilies();
          }}
        >
          ← back
        </button>
        <div className="rsvp-eyebrow">Invitation for</div>
        <h3 className="rsvp-group-name">{selectedFamilyName}</h3>
        <p className="rsvp-hint">
          Please confirm who will be joining us, and add any dietary requirements.
        </p>

        <div className="rsvp-members">
          {members.map((m) => (
            <MemberRow
              key={m.id}
              member={m}
              attendance={attendance[m.id]}
              dietary={dietary[m.id] || ""}
              onAttendance={(v) => setAtt(m.id, v)}
              onDietary={(v) => setDiet(m.id, v)}
              firstName={m.isUnnamed ? (names[m.id]?.firstName || "") : undefined}
              lastName={m.isUnnamed ? (names[m.id]?.lastName || "") : undefined}
              onFirstName={m.isUnnamed ? (v) => setFirstName(m.id, v) : undefined}
              onLastName={m.isUnnamed ? (v) => setLastName(m.id, v) : undefined}
            />
          ))}
        </div>

        <div className="rsvp-note-block">
          <label className="rsvp-label" htmlFor="rsvp-note">
            A note for Jayden &amp; Jamelle (optional)
          </label>
          <textarea
            id="rsvp-note"
            className="rsvp-textarea"
            rows={3}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Send the couple a message…"
          />
        </div>

        <div className="rsvp-fineprint">
          We kindly ask that individuals under the age of 16 do not attend the
          reception unless they are specifically named on the wedding invitation.
        </div>

        <button
          type="button"
          className="rsvp-submit"
          onClick={submit}
          disabled={submitting}
        >
          {submitting ? "Sending…" : "Send our reply"}
        </button>
      </div>
    );
  }

  // Search stage
  return (
    <div className="rsvp-card">
      <label htmlFor="rsvp-search" className="rsvp-label">
        Search your name
      </label>
      <div className="rsvp-search-row">
        <svg
          className="rsvp-search-ico"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
        >
          <circle cx="11" cy="11" r="6.5" />
          <line x1="16" y1="16" x2="21" y2="21" />
        </svg>
        <input
          id="rsvp-search"
          className="rsvp-search"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type your first or last name…"
          autoComplete="off"
          disabled={familiesLoading}
        />
      </div>

      {familiesError && <div className="rsvp-empty">{familiesError}</div>}

      {query.length >= 2 ? (
        <div className="rsvp-results">
          {matches.length === 0 ? (
            <div className="rsvp-empty">
              We can&apos;t find that name. Please check the spelling on your
              invitation, or reach out to Jayden or Jamelle directly.
            </div>
          ) : (
            matches.map(({ familyId, familyName }) => (
              <button
                type="button"
                key={familyId}
                className="rsvp-result"
                onClick={() => pickFamily(familyId)}
              >
                <div className="rsvp-result-name">{familyName}</div>
                <div className="rsvp-result-arrow">→</div>
              </button>
            ))
          )}
        </div>
      ) : (
        <div className="rsvp-helper">
          {familiesLoading
            ? "Loading guest list…"
            : "Find your name as it appears on your invitation. Once you select your party, you’ll be able to confirm everyone who’s coming and share any dietary requirements."}
        </div>
      )}
    </div>
  );
}
