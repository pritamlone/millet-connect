import type { Locale } from "../config";
import { en } from "./en";
import { hi } from "./hi";
import { mr } from "./mr";
import { pa } from "./pa";
import { gu } from "./gu";
import { ta } from "./ta";
import { kn } from "./kn";
import { te } from "./te";

export type { Messages } from "./en";

export const messages: Record<Locale, typeof en> = {
  en,
  hi,
  mr,
  pa,
  gu,
  ta,
  kn,
  te,
};
