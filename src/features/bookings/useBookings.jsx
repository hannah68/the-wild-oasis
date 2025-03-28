import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export const useBookings = () => {
	const [searchParams] = useSearchParams();
	const filterValue = searchParams.get("status");
	const sortByRaw = searchParams.get("sortBy") || "startDate-desc";

	const filter =
		!filterValue || filterValue === "all"
			? null
			: { field: "status", value: filterValue, method: "eq" };

	const [field, direction] = sortByRaw.split("-");
	const sortBy = { field, direction };

	const {
		isLoading,
		data: bookings,
		error,
	} = useQuery({
		queryKey: ["bookings", filter, sortBy],
		queryFn: () => getBookings({ filter, sortBy }),
	});

	return { isLoading, bookings, error };
};
