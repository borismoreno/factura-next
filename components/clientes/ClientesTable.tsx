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
    TextInput,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Toast,
    ToastToggle
} from 'flowbite-react';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { Icon } from "@iconify/react";
import { useEffect, useState } from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import AddClientModal from './AddClientModal';
import { ICliente } from '@/types/Cliente';
import { createCliente, deleteCliente, getClientes, updateCliente } from '@/lib/cliente';
import Loader from '../ui/Loader/Loader';

interface ITableAction {
    icon: string;
    listtitle: string;
    action: (cliente: ICliente) => void;
}

interface IClientesTableProps {
    clientes: ICliente[];
}
export default function ClientesTable({ clientes: initialClientes }: IClientesTableProps) {
    const [clientes, setClientes] = useState<ICliente[]>(initialClientes);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [searchTerm, setSearchTerm] = useState<string>(''); // Estado para la búsqueda
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
    const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
    const [selectedClient, setSelectedClient] = useState<ICliente>();
    const [toastMessage, setToastMessage] = useState<string | null>(null);
    const [toastType, setToastType] = useState<'success' | 'error'>('success');
    const itemsPerPage = 5; // Cambia esto según tus necesidades

    // Función para obtener clientes desde el cliente
    const fetchClientes = async () => {
        setLoading(true);
        try {
            const updatedClientes = await getClientes(); // Llama a la función directamente
            setClientes(updatedClientes || []);
        } catch (error) {
            showToast('Error al obtener los clientes', 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setClientes(initialClientes);
    }, [initialClientes]);

    // Detecta si la pantalla es pequeña
    const isSmallScreen = useMediaQuery('(max-width: 640px)');

    // Mostrar Toast
    const showToast = (message: string, type: 'success' | 'error') => {
        setToastMessage(message);
        setToastType(type);
        setTimeout(() => setToastMessage(null), 3000); // Ocultar el Toast después de 3 segundos
    };

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

    const openCreateModal = () => {
        setModalMode('create');
        setSelectedClient(undefined);
        setIsModalOpen(true);
    };

    const openEditModal = (client: ICliente) => {
        setModalMode('edit');
        setSelectedClient(client);
        setIsModalOpen(true);
    };

    const openDeleteModal = (client: ICliente) => {
        setSelectedClient(client);
        setIsDeleteModalOpen(true);
    };

    const handleSaveClient = async (clientData: ICliente) => {
        if (modalMode === 'create') {
            const response = await createCliente(clientData);
            if (response) {
                showToast('Cliente creado con éxito', 'success');
            } else {
                showToast('Error al crear el cliente', 'error');
            }
            onSuccess();
        } else if (modalMode === 'edit') {
            const response = await updateCliente(clientData);
            if (response) {
                showToast('Cliente actualizado con éxito', 'success');
            } else {
                showToast('Error al crear el cliente', 'error');
            }
            onSuccess();
        }

    };
    async function onSuccess() {
        setIsModalOpen(false);
        setSelectedClient(undefined);
        setModalMode('create');
        setIsDeleteModalOpen(false);
        await fetchClientes();
    }

    const handleDeleteClient = async (client: ICliente) => {
        if (selectedClient) {
            await deleteCliente(selectedClient._id!);
            onSuccess();
            showToast('Cliente eliminado con éxito', 'success');
        }
    };

    // Acciones de la tabla con tipado estricto
    const tableActionData: ITableAction[] = [
        {
            icon: "solar:pen-new-square-broken",
            listtitle: "Editar",
            action: openEditModal,
        },
        {
            icon: "solar:trash-bin-minimalistic-outline",
            listtitle: "Eliminar",
            action: openDeleteModal,
        },
    ];

    if (loading) {
        return (
            <div className="flex justify-center items-center h-full">
                <Loader message="Cargando clientes..." />
            </div>
        );
    }

    return (
        <>
            <div className="rounded-xl dark:shadow-dark-md shadow-md bg-white dark:bg-darkgray p-6 relative w-full break-words">
                <div className="flex justify-between items-center mb-4">
                    <h5 className="card-title">Clientes</h5>
                    <Button
                        onClick={openCreateModal}
                        className="bg-primary text-white rounded-xl"
                    >
                        Añadir Cliente
                    </Button>
                </div>
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
                                                    <DropdownItem
                                                        key={index}
                                                        className="flex gap-3"
                                                        onClick={() => action.action(cliente)}
                                                    >
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
                        <div className="flex overflow-x-auto sm:justify-center my-4">
                            <Pagination
                                layout={isSmallScreen ? 'navigation' : 'pagination'}
                                currentPage={currentPage}
                                previousLabel='Anterior'
                                nextLabel='Siguiente'
                                totalPages={totalPages}
                                onPageChange={onPageChange}
                            />
                        </div>
                    </div>
                </div>
                {/* Modal para añadir o editar cliente */}
                <AddClientModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSave={handleSaveClient}
                    initialData={selectedClient}
                    mode={modalMode}
                />
                {/* Modal de confirmación de eliminación */}
                <Modal show={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
                    <ModalHeader>Confirmar Eliminación</ModalHeader>
                    <ModalBody>
                        {selectedClient && (
                            <p>
                                ¿Estás seguro de que deseas eliminar al cliente{' '}
                                <span className="font-bold">{selectedClient.razonSocial}</span>?
                            </p>
                        )}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="gray" className='rounded-xl' onClick={() => setIsDeleteModalOpen(false)}>
                            Cancelar
                        </Button>
                        <Button color="failure" className='bg-error text-white rounded-xl' onClick={() => handleDeleteClient(selectedClient!)}>
                            Eliminar
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
            {/* Toast para mensajes */}
            {toastMessage && (
                <div className="fixed bottom-4 right-4">
                    <Toast>
                        <div className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${toastType === 'success' ? 'bg-green-100 text-green-500' : 'bg-red-100 text-red-500'}`}>
                            {toastType === 'success' ? (
                                <Icon icon="solar:check-circle-bold" height={24} />
                            ) : (
                                <Icon icon="solar:danger-circle-bold" height={24} />
                            )}
                        </div>
                        <div className="ml-3 text-sm font-normal">{toastMessage}</div>
                        <ToastToggle />
                    </Toast>
                </div>
            )}
        </>
    );
}