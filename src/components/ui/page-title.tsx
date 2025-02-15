interface PageTitleProps {
	text: string
}

export function PageTitle({ text }: PageTitleProps) {
	return (
		<>
			<h1 className="font-bold text-3xl tracking-tight">{text}</h1>
		</>
	)
}
