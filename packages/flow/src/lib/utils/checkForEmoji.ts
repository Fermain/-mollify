//RegEx pattern comes from this blog article https://www.freecodecamp.org/news/how-to-use-regex-to-match-emoji-including-discord-emotes/
export function checkForEmoji(text: string): boolean {
	const emojiRegex = /<a?:.+?:\d{18}>|\p{Extended_Pictographic}/gu;
	return emojiRegex.test(text);
}
