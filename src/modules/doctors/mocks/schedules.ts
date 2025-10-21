import type { ScheduleResponse } from "../types/ScheduleResponse";

export const mockSchedules: ScheduleResponse[] = [
  {
    id: 1,
    doctorId: "7e43bb34-3ab1-4cf0-b5b9-d2e7f8740f12",
    dayOfWeek: "MONDAY",
    startTime: "08:00",
    endTime: "16:00",
    zoneId: "America/Managua",
  },
  {
    id: 2,
    doctorId: "7e43bb34-3ab1-4cf0-b5b9-d2e7f8740f12",
    dayOfWeek: "TUESDAY",
    startTime: "09:00",
    endTime: "17:00",
    zoneId: "America/Managua",
  },
  {
    id: 3,
    doctorId: "7e43bb34-3ab1-4cf0-b5b9-d2e7f8740f12",
    dayOfWeek: "WEDNESDAY",
    startTime: "08:00",
    endTime: "15:00",
    zoneId: "America/Managua",
  },
  {
    id: 4,
    doctorId: "7e43bb34-3ab1-4cf0-b5b9-d2e7f8740f12",
    dayOfWeek: "FRIDAY",
    startTime: "10:00",
    endTime: "18:00",
    zoneId: "America/Managua",
  },
];
