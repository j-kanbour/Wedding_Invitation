// familyId → familyName
export interface FamilyData {
  [key: string]: string;
}

export interface GuestInfo {
  familyName: string;
  firstName: string;
  lastName: string;
  rsvp: string;
  dietary: string;
  message: string;
  isUnnamed?: boolean;
}

// guestId → guest details
export interface GuestData {
  [guestId: string]: GuestInfo;
}

export type Attendance = "yes" | "no";

export interface Member {
  id: string;
  name: string;
  age?: string;
  isGuest?: boolean;
  isUnnamed?: boolean;
}
