'use client';
import {
    Dropdown,
    Table,
    TableHead,
    TableHeadCell,
    TableBody,
    TableRow,
    TableCell,
    DropdownItem,
    Pagination,
    TextInput
} from 'flowbite-react';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { Icon } from "@iconify/react";
import { useState } from 'react';

const tableActionData = [
    {
        icon: "solar:pen-new-square-broken",
        listtitle: "Editar",
    },
    {
        icon: "solar:trash-bin-minimalistic-outline",
        listtitle: "Eliminar",
    },
];

export interface Cliente {
    _id: string;
    activo: boolean;
    razonSocial: string;
    tipoIdentificacion: string;
    numeroIdentificacion: string;
    telefono: string;
    mail: string;
    direccion: string;
}

interface IClientesTableProps {
    clientes: Cliente[];
}
export default function ClientesTable({ clientes }: IClientesTableProps) {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [searchTerm, setSearchTerm] = useState<string>(''); // Estado para la búsqueda
    const itemsPerPage = 10; // Cambia esto según tus necesidades

    // Filtrar clientes según el término de búsqueda
    const filteredClientes = clientes.filter((cliente) =>
        Object.values(cliente).some((value) =>
            value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    const totalPages = Math.ceil(clientes.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentClientes = filteredClientes.slice(startIndex, endIndex);

    const onPageChange = (page: number) => setCurrentPage(page);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1); // Reiniciar a la primera página al buscar
    };

    return (
        <>
            <div className="rounded-xl dark:shadow-dark-md shadow-md bg-white dark:bg-darkgray p-6 relative w-full break-words">
                <h5 className="card-title">Clientes</h5>
                {/* Campo de búsqueda */}
                <div className="mb-4">
                    <TextInput
                        type="text"
                        placeholder="Buscar por cualquier columna..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="w-full"
                    />
                </div>
                <div className="mt-3">
                    <div className="overflow-x-auto">
                        <Table hoverable>
                            <TableHead>
                                <TableRow>
                                    <TableHeadCell className="p-6 text-dark dark:text-lightgray">Razon Social</TableHeadCell>
                                    <TableHeadCell>Identificación</TableHeadCell>
                                    <TableHeadCell>Mail</TableHeadCell>
                                    <TableHeadCell>Teléfono</TableHeadCell>
                                    <TableHeadCell></TableHeadCell>
                                </TableRow>
                            </TableHead>
                            <TableBody className="divide-y divide-border dark:divide-darkborder">
                                {currentClientes?.map((cliente, index) => (
                                    <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800" key={index}>
                                        <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white capitalize">
                                            {cliente.razonSocial.toLowerCase()}
                                        </TableCell>
                                        <TableCell>
                                            {cliente.numeroIdentificacion}
                                        </TableCell>
                                        <TableCell>
                                            {cliente.mail}
                                        </TableCell>
                                        <TableCell>
                                            {cliente.telefono}
                                        </TableCell>
                                        <TableCell>
                                            <Dropdown
                                                label=""
                                                dismissOnClick={false}
                                                renderTrigger={() => (
                                                    <span className="h-9 w-9 flex justify-center items-center rounded-full hover:bg-lightprimary hover:text-primary cursor-pointer">
                                                        <HiOutlineDotsVertical />
                                                    </span>
                                                )}
                                            >
                                                {tableActionData.map((action, index) => (
                                                    <DropdownItem key={index} className="flex gap-3">
                                                        {' '}
                                                        <Icon icon={`${action.icon}`} height={18} />
                                                        <span>{action.listtitle}</span>
                                                    </DropdownItem>
                                                ))}
                                            </Dropdown>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <div className="flex overflow-x-auto sm:justify-center">
                            <Pagination
                                currentPage={currentPage}
                                previousLabel='Anterior'
                                nextLabel='Siguiente'
                                totalPages={totalPages}
                                onPageChange={onPageChange}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}