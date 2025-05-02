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
import { createProducto, deleteProducto, getProductos, updateProducto } from "@/lib/producto";
import { IProducto } from "@/types/Producto";
import { useEffect, useState } from "react";
import { useMediaQuery } from '@/hooks/useMediaQuery';
import Loader from '../ui/Loader/Loader';
import AddProductoModal from './AddProductoModal';

interface ITableAction {
    icon: string;
    listtitle: string;
    action: (producto: IProducto) => void;
}

export default function ProductosTable() {
    const [searchTerm, setSearchTerm] = useState<string>(''); // Estado para la búsqueda
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [productos, setProductos] = useState<IProducto[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [toastMessage, setToastMessage] = useState<string | null>(null);
    const [toastType, setToastType] = useState<'success' | 'error'>('success');
    const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
    const [selectedProducto, setSelectedProducto] = useState<IProducto>();
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const itemsPerPage = 5;

    const isSmallScreen = useMediaQuery('(max-width: 640px)');

    const fetchProductos = async () => {
        setLoading(true);
        try {
            const updatedProductos = await getProductos(); // Llama a la función directamente
            setProductos(updatedProductos || []);
        } catch (error) {
            showToast('Error al obtener los clientes', 'error');
        } finally {
            setLoading(false);
        }
    }

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1); // Reiniciar a la primera página al buscar
    };

    useEffect(() => {
        fetchProductos();
    }, []);

    const showToast = (message: string, type: 'success' | 'error') => {
        setToastMessage(message);
        setToastType(type);
        setTimeout(() => setToastMessage(null), 3000); // Ocultar el Toast después de 3 segundos
    };

    const openCreateModal = () => {
        setModalMode('create');
        setSelectedProducto(undefined);
        setIsModalOpen(true);
    };

    const openEditModal = (producto: IProducto) => {
        setModalMode('edit');
        setSelectedProducto(producto);
        setIsModalOpen(true);
    };

    const openDeleteModal = (producto: IProducto) => {
        setSelectedProducto(producto);
        setIsDeleteModalOpen(true);
    };

    const handleDeleteProducto = async (producto: IProducto) => {
        if (selectedProducto) {
            await deleteProducto(selectedProducto._id!);
            onSuccess();
            showToast('Producto eliminado con éxito', 'success');
        }
    };

    // Filtrar clientes según el término de búsqueda
    const filteredProductos = productos.filter((productos) =>
        Object.values(productos).some((value) =>
            value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    async function onSuccess() {
        setIsModalOpen(false);
        setSelectedProducto(undefined);
        setModalMode('create');
        setIsDeleteModalOpen(false);
        await fetchProductos();
    }

    const handleSaveProducto = async (productoData: IProducto) => {
        if (modalMode === 'create') {
            const response = await createProducto(productoData);
            if (response) {
                showToast('Producto creado con éxito', 'success');
            } else {
                showToast('Error al crear el producto', 'error');
            }
            onSuccess();
        } else if (modalMode === 'edit') {
            const response = await updateProducto(productoData);
            if (response) {
                showToast('Producto actualizado con éxito', 'success');
            } else {
                showToast('Error al actualizar el producto', 'error');
            }
            onSuccess();
        }

    };

    const totalPages = Math.ceil(productos.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentProductos = filteredProductos.slice(startIndex, endIndex);

    const onPageChange = (page: number) => setCurrentPage(page);

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
                    <h5 className="card-title">Productos</h5>
                    <Button
                        onClick={openCreateModal}
                        className="bg-primary text-white rounded-xl"
                    >
                        Añadir Producto
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
                                    <TableHeadCell className="p-6 text-dark dark:text-lightgray">Descripción</TableHeadCell>
                                    <TableHeadCell>Código Principal</TableHeadCell>
                                    <TableHeadCell>Tipo Producto</TableHeadCell>
                                    <TableHeadCell>Tarifa IVA</TableHeadCell>
                                    <TableHeadCell>Valor unitario</TableHeadCell>
                                    <TableHeadCell></TableHeadCell>
                                </TableRow>
                            </TableHead>
                            <TableBody className="divide-y divide-border dark:divide-darkborder">
                                {currentProductos?.map((producto, index) => (
                                    <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800" key={index}>
                                        <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white capitalize">
                                            {producto.descripcion.toLocaleLowerCase()}
                                        </TableCell>
                                        <TableCell>
                                            {producto.codigoPrincipal}
                                        </TableCell>
                                        <TableCell>
                                            {producto.tipoProductoDescripcion}
                                        </TableCell>
                                        <TableCell>
                                            {producto.tarifaIvaDescripcion}
                                        </TableCell>
                                        <TableCell>
                                            {producto.valorUnitario.toFixed(2)}
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
                                                        onClick={() => action.action(producto)}
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
                <AddProductoModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSave={handleSaveProducto}
                    initialData={selectedProducto}
                    mode={modalMode}
                />
                {/* Modal de confirmación de eliminación */}
                <Modal show={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
                    <ModalHeader>Confirmar Eliminación</ModalHeader>
                    <ModalBody>
                        {selectedProducto && (
                            <p>
                                ¿Estás seguro de que deseas eliminar al cliente{' '}
                                <span className="font-bold">{selectedProducto.descripcion}</span>?
                            </p>
                        )}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="gray" className='rounded-xl' onClick={() => setIsDeleteModalOpen(false)}>
                            Cancelar
                        </Button>
                        <Button color="failure" className='bg-error text-white rounded-xl' onClick={() => handleDeleteProducto(selectedProducto!)}>
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