import styled from "styled-components";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";

import CreateCabinForm from "./CreateCabinForm";
import { formatCurrency } from "../../utils/helpers";
import { useDeleteCabin } from "./useDeleteCabin";
import { useCreateCabin } from "./useCreateCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

const Img = styled.img`
	display: block;
	width: 6.4rem;
	aspect-ratio: 3 / 2;
	object-fit: cover;
	object-position: center;
	transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
	font-size: 1.6rem;
	font-weight: 600;
	color: var(--color-grey-600);
	font-family: "Sono";
`;

const Price = styled.div`
	font-family: "Sono";
	font-weight: 600;
`;

const Discount = styled.div`
	font-family: "Sono";
	font-weight: 500;
	color: var(--color-green-700);
`;

export default function CabinRow({ cabin }) {
	const { isDeleting, deleteCabinMutate } = useDeleteCabin();
	const { createCabinMutate } = useCreateCabin();

	const {
		id: cabinId,
		name,
		maxCapacity,
		regularPrice,
		discount,
		image,
		description,
	} = cabin;

	const handleDuplicate = () => {
		createCabinMutate({
			name: `Copy of ${name}`,
			maxCapacity,
			regularPrice,
			discount,
			image,
			description,
		});
	};

	return (
		<Table.Row>
			<Img src={image} />
			<Cabin>{name}</Cabin>
			<div>Fits up to {maxCapacity} guests</div>
			<Price>{formatCurrency(regularPrice)}</Price>
			{discount ? (
				<Discount>{formatCurrency(discount)}</Discount>
			) : (
				<span>&mdash;</span>
			)}
			<div>
				<Modal>
					<Menus.Menu>
						<Menus.Toggle id={cabinId} />

						<Menus.List id={cabinId}>
							{/* Duplicate */}
							<Menus.Button icon={<HiSquare2Stack />} onClick={handleDuplicate}>
								Duplicate
							</Menus.Button>
							{/* Edit */}
							<Modal.Toggle opens={"edit"}>
								<Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
							</Modal.Toggle>
							{/* Delete */}
							<Modal.Toggle opens={"delete"}>
								<Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
							</Modal.Toggle>
						</Menus.List>

						{/* Edit button */}
						<Modal.Window name={"edit"}>
							<CreateCabinForm cabinToEdit={cabin} />
						</Modal.Window>

						{/* Delete button */}
						<Modal.Window name={"delete"}>
							<ConfirmDelete
								resourceName={"cabins"}
								disabled={isDeleting}
								onConfirm={() => deleteCabinMutate(cabinId)}
							/>
						</Modal.Window>
					</Menus.Menu>
				</Modal>
			</div>
		</Table.Row>
	);
}
