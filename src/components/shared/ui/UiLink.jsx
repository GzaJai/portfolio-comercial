export default function UiLink({
	href,
	children,
	className = "",
	external = true,
	...props
}) {
	const target = external ? "_blank" : undefined;
	const rel = external ? "noopener noreferrer" : undefined;

	return (
		<a
			href={href}
			target={target}
			rel={rel}
			className={`cursor-pointer ${className}`}
			{...props}
		>
			{children}
		</a>
	);
}
