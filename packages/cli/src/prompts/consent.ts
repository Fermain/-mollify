import { prompt } from "enquirer";
import { PROMPT_CONSENT } from "../localisation";

export async function consent(message = PROMPT_CONSENT, initial = false) {
  const { consented } = await prompt<{ consented: boolean }>({
    type: 'confirm',
    name: 'consented',
    message,
    initial
  });
  return consented;
}