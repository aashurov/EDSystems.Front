import React from "react";
import Button from "../button/Button";

interface BranchDeleteModalProps{
    readonly titleText: string;
    readonly onClick: (value: boolean) => void;
}

export default function YesOrNoModal({onClick, titleText}:BranchDeleteModalProps){
    return (
        <div className="delete-modal-container d-flex justify-content-center align-items-center flex-column p-4">
            <div className="delete-title">
                <span className="fw-bold fs-4">
                   {titleText}
                </span>
            </div>
                <div className="delete-button-group d-flex justify-content-center gap-3 mt-3">
                    <Button className="bg-success text-light px-3 py-1" onClick={()=>onClick(true)}>
                        Да
                    </Button>
                    <Button className="bg-danger text-light px-3 py-1" onClick={()=>onClick(false)}>
                        Отмена
                    </Button>
                </div>
        </div>
    )
}