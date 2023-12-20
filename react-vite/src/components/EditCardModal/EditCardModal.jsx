import { useModal } from "../../context/Modal";
import { useState } from "react";

function EditCardModal() {
    const { closeModal } = useModal()

    return (
        <>
            <h1>Edit Card</h1>
        </>
    )
}

export default EditCardModal