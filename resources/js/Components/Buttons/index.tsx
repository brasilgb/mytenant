import { Link, useForm } from "@inertiajs/react";
import React, { useState } from "react";
import {
    IoAdd,
    IoArrowBackOutline,
    IoCheckmarkDone,
    IoClose,
    IoConstruct,
    IoImageSharp,
    IoLogoWhatsapp,
    IoPrint,
    IoSave,
    IoTrash,
} from "react-icons/io5";
import { TbEdit } from "react-icons/tb";
import { FaCalendarDays, FaRegTrashCan } from "react-icons/fa6";

interface ButtonsProps {
    url?: any;
    label?: string;
    processing?: any;
    onclick?: any;
    param?: string;
    identify?: string;
    value?: string;
    status?: string;
    id?: string;
    sttmessage?: number;
    active?: boolean;
}

export const AnaliseButton = ({ onclick, label, active }: ButtonsProps) => {
    return (
        <button
            onClick={onclick}
            className={`px-3 py-1.5 w-48 text-xs uppercase font-bold shadow border border-white ${active ? 'text-gray-50 bg-automa-green-secundary' : 'bg-automa-green-primary/60 text-gray-50'} hover:bg-automa-green-secundary hover:text-gray-50 rounded-md transition-colors duration-300`}
        >
            {label}
        </button>
    )
}

export const AddButton = ({ url, label }: ButtonsProps) => {
    return (
        <Link
            className="flex items-center justify-center bg-blue-700 hover:bg-blue-600 py-1.5 px-3 rounded-md shadow text-gray-50 self-end"
            href={url}
            as="button"
            type="button"
        >
            <IoAdd size={18} />
            <span>{label}</span>
        </Link>
    );
};

export const BackButton = ({ url, label }: ButtonsProps) => {
    return (
        <Link
            className="flex items-center justify-center bg-blue-700 hover:bg-blue-600 py-1.5 px-3 rounded-md shadow text-gray-50 self-end"
            href={url}
            as="button"
            type="button"
        >
            <IoArrowBackOutline size={18} />
            <span>{label}</span>
        </Link>
    );
};

export const EditButton = ({ url, param }: ButtonsProps) => {
    return (
        <Link
            className="flex items-center justify-center bg-orange-600 hover:bg-orange-500 py-1.5 px-3 rounded-md shadow text-gray-50 self-end"
            href={url}
            as="button"
            type="button"
            title={`Editar registro`}
            data={{ page: param }}
        >
            <TbEdit size={18} />
        </Link>
    );
};

export const DeleteButton = ({ identify, param, url }: ButtonsProps) => {
    const [showConfirme, setShowConfirme] = useState(false);
    const { delete: destroy } = useForm();

    function onsubmit(e: any) {
        e.preventDefault();
        destroy(route(url, param));
        setShowConfirme(false);
    }

    const ModalDelete = () => {
        return (
            <div
                onClick={() => setShowConfirme(false)}
                className={`fixed z-20 top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-gray-500 bg-opacity-40`}
            >
                <div className="md:w-1/4 w-full mx-2 bg-gray-50 rounded-md shadow-md border border-white">
                    <div className="text-gray-400 flex justify-end pt-0.5 pr-0.5">
                        <button onClick={() => setShowConfirme(false)}>
                            <IoClose size={18} />
                        </button>
                    </div>
                    <div className="flex items-center justify-center">
                        <div className="flex flex-col items-center justify-center">
                            <div className="text-red-500 pb-2">
                                <FaRegTrashCan size={40} />
                            </div>
                            <div className="text-xl">Excluir registro</div>
                        </div>
                    </div>
                    <div className="my-2 flex flex-col items-center justify-center">
                        <h2 className="text-base text-center">
                            Você realmente deseja excluir {identify}?
                        </h2>
                        <h2 className="test-sm mt-1">
                            Esta operação não pode ser desfeita.
                        </h2>
                    </div>

                    <div className="flex items-center justify-end gap-3 p-3 mt-2">
                        <button
                            onClick={() => setShowConfirme(false)}
                            className="py-2 px-3 flex-1 bg-zinc-600 hover:bg-zinc-700 rounded-md"
                        >
                            <span className="text-sm text-gray-50">
                                Cancelar
                            </span>
                        </button>
                        <button
                            onClick={onsubmit}
                            className="py-2 px-3 flex-1 bg-red-500 hover:bg-red-600 rounded-md"
                        >
                            <span className="text-sm text-gray-50">
                                Excluir
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <>
            {showConfirme && <ModalDelete />}
            <button
                className="flex items-center justify-center bg-red-600 hover:bg-red-500 py-1.5 px-3 rounded-md shadow text-gray-50 self-end"
                onClick={() => setShowConfirme(true)}
                title={`Deletar registro ${param}`}
            >
                <IoTrash size={18} />
            </button>
        </>
    );
};

export const SaveButton = ({ processing, value = "Salvar" }: ButtonsProps) => {
    return (
        <div className="flex justify-end">
            <button
                className="flex items-center justify-center bg-blue-700 hover:bg-blue-600 py-1.5 px-3 rounded-md shadow text-gray-50 self-end"
                disabled={processing}
                type="submit"
            >
                <IoSave size={18} />
                <span className="ml-1">{value}</span>
            </button>
        </div>
    );
};
