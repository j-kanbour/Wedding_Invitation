"use client";

import type { Attendance, Member } from "@/app/components/rsvp/types";

interface MemberRowProps {
  member: Member;
  attendance: Attendance | undefined;
  dietary: string;
  onAttendance: (value: Attendance) => void;
  onDietary: (value: string) => void;
  optional?: boolean;
  firstName?: string;
  lastName?: string;
  onFirstName?: (value: string) => void;
  onLastName?: (value: string) => void;
}

export default function MemberRow({
  member,
  attendance,
  dietary,
  onAttendance,
  onDietary,
  optional,
  firstName,
  lastName,
  onFirstName,
  onLastName,
}: MemberRowProps) {
  const attending = attendance === "yes";
  return (
    <div className={`rsvp-member${optional ? " is-optional" : ""}`}>
      <div className="rsvp-member-head">
        <div className="rsvp-member-name">
          {member.isUnnamed ? (
            <div className="rsvp-name-inputs">
              <input
                type="text"
                className="rsvp-name-input"
                placeholder="First name"
                value={firstName ?? ""}
                onChange={(e) => onFirstName?.(e.target.value)}
              />
              <input
                type="text"
                className="rsvp-name-input"
                placeholder="Last name"
                value={lastName ?? ""}
                onChange={(e) => onLastName?.(e.target.value)}
              />
            </div>
          ) : (
            <>
              {member.name}
              {member.age === "under16" && <span className="rsvp-tag">under 16</span>}
              {member.isGuest && <span className="rsvp-tag">plus one</span>}
            </>
          )}
        </div>
        <div
          className="rsvp-toggle"
          role="radiogroup"
          aria-label={`Attendance for ${member.name}`}
        >
          <button
            type="button"
            role="radio"
            aria-checked={attendance === "yes"}
            className={`rsvp-toggle-btn${attendance === "yes" ? " is-on" : ""}`}
            onClick={() => onAttendance("yes")}
          >
            attending
          </button>
          <button
            type="button"
            role="radio"
            aria-checked={attendance === "no"}
            className={`rsvp-toggle-btn${attendance === "no" ? " is-on" : ""}`}
            onClick={() => onAttendance("no")}
          >
            with regrets
          </button>
        </div>
      </div>
      {attending && (
        <div className="rsvp-member-diet">
          <span className="rsvp-diet-label">dietary req.</span>
          <input
            type="text"
            className="rsvp-diet-input"
            value={dietary}
            onChange={(e) => onDietary(e.target.value)}
            placeholder="e.g. vegetarian, gluten-free, no shellfish…"
          />
        </div>
      )}
    </div>
  );
}
