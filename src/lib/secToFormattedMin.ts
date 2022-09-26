import { addSeconds, format } from "date-fns";

export function secToFormattedMin(sec: number): string {
  const totalSec = addSeconds(new Date(0), sec);
  return format(totalSec, "mm:ss");
}
