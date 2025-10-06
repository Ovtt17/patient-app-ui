export interface ScheduleRes {
 id: number;
 doctorId: string; 
 dayOfWeek: DayOfWeek;
 tartTime: string; 
 endTime: string;
 zoneId: string;
}

export interface ScheduleReq {
 dayOfWeek: DayOfWeek;
 startTime: string; 
 endTime: string;   
 doctorId: string;

}

export type DayOfWeek =
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY"
  | "SUNDAY";