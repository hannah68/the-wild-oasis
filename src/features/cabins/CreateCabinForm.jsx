import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import { Textarea } from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin.js";

function CreateCabinForm({ cabinToEdit = {} }) {
	const { isCreating, createCabinMutate } = useCreateCabin();
	const { isEditing, editCabinMutate } = useEditCabin();
	const isWorking = isCreating || isEditing;

	const { id: editId, ...editValues } = cabinToEdit;
	const isEditForm = Boolean(editId);

	const { register, handleSubmit, reset, getValues, formState } = useForm({
		defaultValues: isEditForm ? editValues : {},
	});

	const onSubmit = (data) => {
		const image = typeof data.image === "string" ? data.image : data.image[0];
		if (isEditForm)
			editCabinMutate(
				{ newCabinData: { ...data, image }, id: editId },
				{ onSuccess: () => reset() }
			);
		else createCabinMutate({ ...data, image }, { onSuccess: () => reset() });
	};

	const onError = () => {
		//console.log(error)
	};

	return (
		<Form onSubmit={handleSubmit(onSubmit, onError)}>
			<FormRow label={"Cabin name"} error={formState.errors?.name?.message}>
				<Input
					type="text"
					id="name"
					{...register("name", { required: "This field is required" })}
				/>
			</FormRow>

			<FormRow
				label="Maximum capacity"
				error={formState.errors?.maxCapacity?.message}
			>
				<Input
					type="number"
					id="maxCapacity"
					disabled={isWorking}
					{...register("maxCapacity", {
						required: "This field is required",
						min: { value: 1, message: "Capacity should be at least 1" },
					})}
				/>
			</FormRow>

			<FormRow
				label="Regular price"
				error={formState.errors?.regularPrice?.message}
			>
				<Input
					type="number"
					id="regularPrice"
					disabled={isWorking}
					{...register("regularPrice", {
						required: "This field is required",
						min: { value: 1, message: "Price should be at least 1" },
					})}
				/>
			</FormRow>

			<FormRow label="Discount" error={formState.errors?.discount?.message}>
				<Input
					type="number"
					id="discount"
					disabled={isWorking}
					defaultValue={0}
					{...register("discount", {
						required: "This field is required",
						validate: (value) =>
							value <= getValues().regularPrice ||
							"Discount should be less than regular price",
					})}
				/>
			</FormRow>

			<FormRow
				label="Description for website"
				error={formState.errors?.description?.message}
			>
				<Textarea
					type="number"
					id="description"
					disabled={isWorking}
					defaultValue=""
					{...register("description", { required: "This field is required" })}
				/>
			</FormRow>

			<FormRow label="Cabin photo">
				<FileInput
					id="image"
					accept="image/*"
					{...register("image", {
						required: isEditForm ? false : "This field is required",
					})}
				/>
			</FormRow>

			<FormRow>
				{/* type is an HTML attribute! */}
				<Button variation="secondary" type="reset">
					Cancel
				</Button>
				<Button disabled={isWorking}>
					{isEditForm ? "Edit cabin" : "Create new cabin"}
				</Button>
			</FormRow>
		</Form>
	);
}

export default CreateCabinForm;
