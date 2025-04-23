import { getClientes } from "@/lib/cliente";
import { Badge, Progress, Dropdown, Table, TableHead, TableHeadCell, TableBody, TableRow, TableCell, DropdownItem } from 'flowbite-react';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { Icon } from "@iconify/react";

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

export default async function Clientes() {
    const clientes = await getClientes();
    return (
        <>
            <div className="rounded-xl dark:shadow-dark-md shadow-md bg-white dark:bg-darkgray p-6 relative w-full break-words">
                <h5 className="card-title">Clientes</h5>
                <div className="mt-3">
                    <div className="overflow-x-auto">
                        <Table hoverable>
                            <TableHead>
                                <TableHeadCell className="p-6 text-dark dark:text-lightgray">Nombre</TableHeadCell>
                                <TableHeadCell>Identificación</TableHeadCell>
                                <TableHeadCell>Mail</TableHeadCell>
                                <TableHeadCell>Teléfono</TableHeadCell>
                                <TableHeadCell></TableHeadCell>
                            </TableHead>
                            <TableBody className="divide-y divide-border dark:divide-darkborder">
                                {clientes?.map((cliente, index) => (
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
                                            // renderTrigger={() => (
                                            //     <span className="h-9 w-9 flex justify-center items-center rounded-full hover:bg-lightprimary hover:text-primary cursor-pointer">
                                            //         <HiOutlineDotsVertical />
                                            //     </span>
                                            // )}
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
                    </div>
                </div>
            </div>
        </>
    );
}