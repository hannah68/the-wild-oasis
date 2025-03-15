import { useEffect, useRef } from "react";

function useOutsideClick(closeHandler, listenCapturing = true) {
	const ref = useRef();

	useEffect(() => {
		const handleClick = (e) => {
			if (ref.current && !ref.current.contains(e.target)) closeHandler();
		};

		document.addEventListener("click", handleClick, listenCapturing);
		return () =>
			document.removeEventListener("click", handleClick, listenCapturing);
	}, [closeHandler, listenCapturing]);

	return ref;
}

export default useOutsideClick;
