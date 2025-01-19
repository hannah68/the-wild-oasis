import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteCabin } from "../../services/apiCabins";

export const useDeleteCabin = () => {
	const queryClient = useQueryClient();

	const { isLoading: isDeleting, mutate: deleteCabinMutate } = useMutation({
		mutationFn: (id) => deleteCabin(id),
		// what to do as soons as the mutation is successful
		onSuccess: () => {
			toast.success("Cabin successfully deleted.");
			// we want to refetch the data
			// invalidating the cache as soon as the mutation is done => it immediately fetch again
			queryClient.invalidateQueries({
				queryKey: ["cabins"],
			});
		},
		onError: (err) => toast.error(err.message),
	});

	return { isDeleting, deleteCabinMutate };
};
