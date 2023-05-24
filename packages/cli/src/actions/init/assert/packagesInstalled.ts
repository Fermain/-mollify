import { log } from "console";
import { PACKAGE_INVENTORY } from "../../../constants";

export function assertPackagesInstalled(report: Record<string, boolean>) {
  const [LMS, ...packages] = PACKAGE_INVENTORY
  if (!report[LMS]) {
    throw new Error('LMS package not installed');
  }

  return true
}