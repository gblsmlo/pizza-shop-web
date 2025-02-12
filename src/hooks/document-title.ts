import { useEffect } from "react";

export function useDocumentTitle(title: string) {
	title ?
		useEffect(() => {
			document.title = title
		}, [title])
		: null
}
