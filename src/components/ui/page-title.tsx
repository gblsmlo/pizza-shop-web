interface PageTitleProps {
	title: string
}

export function PageTitle({ title }: PageTitleProps) {
	return (
		<>
			<h1>{ title }</h1>
		</>
	)
}
