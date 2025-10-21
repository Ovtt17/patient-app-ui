import type { DoctorAvailabilityResponse } from "../types/DoctorAvailabilityResponse";

export const mockAvailability: DoctorAvailabilityResponse = {
  doctorId: "7e43bb34-3ab1-4cf0-b5b9-d2e7f8740f12",
  zoneId: "America/Managua",
  availability: [
    {
      date: "2025-10-20",
      dayOfWeek: "MONDAY",
      intervals: [
        {
          start: "2025-10-20T14:00:00Z", // 08:00 local Nicaragua
          end: "2025-10-20T16:00:00Z",   // 10:00 local Nicaragua
        },
        {
          start: "2025-10-20T17:00:00Z", // 11:00 local Nicaragua
          end: "2025-10-20T21:00:00Z",   // 15:00 local Nicaragua
        },
      ],
      unavailable: [
        {
          start: "2025-10-20T16:00:00Z", // 10:00 local Nicaragua
          end: "2025-10-20T17:00:00Z",   // 11:00 local Nicaragua
        },
      ],
    },
    {
      date: "2025-10-21",
      dayOfWeek: "TUESDAY",
      intervals: [
        {
          start: "2025-10-21T15:00:00Z", // 09:00 local Nicaragua
          end: "2025-10-21T19:00:00Z",   // 13:00 local Nicaragua
        },
        {
          start: "2025-10-21T20:00:00Z", // 14:00 local Nicaragua
          end: "2025-10-21T23:00:00Z",   // 17:00 local Nicaragua
        },
      ],
      unavailable: [],
    },
  ],
};