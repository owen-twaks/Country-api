export function removeParenthesisContentFromString (str:string){
	// Removing parenthesis, as well as the content limited by them.
	return str.replace(/ *\([^)]*\) */g, '');
}