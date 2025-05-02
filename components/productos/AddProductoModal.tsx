'use client';

import { IProducto } from "@/types/Producto";
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from "react";
import { Button, HelperText, Modal, ModalBody, ModalHeader, Select, TextInput } from "flowbite-react";


interface AddProductoModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (productoData: IProducto) => void;
    initialData?: IProducto;
    mode: 'create' | 'edit';
}

// Interfaz para los datos del formulario
interface FormData {
    descripcion: string;
    codigoPrincipal: string;
    codigoAuxiliar: string;
    tipoProducto: string;
    tarifaIva: string;
    valorUnitario: number;
}

// Lista de tipos de producto
const productoTypes = [
    { value: 'B', label: 'Bien' },
    { value: 'S', label: 'Servicio' },
];

const ivaTypes = [
    { value: '0', label: '0%' },
    { value: '4', label: '15%' },
    { value: '6', label: 'No Objeto de Impuesto' },
    { value: '7', label: 'Excento de IVA' },
];

//Esquema de validación con yup
const validationSchema = yup.object().shape({
    descripcion: yup.string()
        .required('La descripción es obligatoria')
        .min(3, 'La descripción debe tener al menos 3 caracteres'),
    codigoPrincipal: yup.string()
        .required('El código principal es obligatorio')
        .min(3, 'El código principal debe tener al menos 3 caracteres'),
    codigoAuxiliar: yup.string()
        .required('El código auxiliar es obligatorio'),
    tipoProducto: yup.string()
        .required('El tipo de producto es obligatorio'),
    tarifaIva: yup.string()
        .required('La tarifa de IVA es obligatoria'),
    valorUnitario: yup.number()
        .required('El valor unitario es obligatorio')
        .positive('El valor unitario debe ser un número positivo')
});

export default function AddProductoModal({ isOpen, onClose, onSave, initialData, mode }: AddProductoModalProps) {
    // Inicializa el formulario con react-hook-form
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<FormData>({
        resolver: yupResolver(validationSchema),
        defaultValues: initialData ? {
            descripcion: initialData.descripcion,
            codigoPrincipal: initialData.codigoPrincipal,
            codigoAuxiliar: initialData.codigoAuxiliar,
            tipoProducto: initialData.tipoProducto,
            tarifaIva: initialData.tarifaIva,
            valorUnitario: initialData.valorUnitario,
        } : {
            descripcion: '',
            codigoPrincipal: '',
            codigoAuxiliar: '',
            tipoProducto: 'B',
            tarifaIva: '0',
            valorUnitario: 0,
        }
    });

    // Actualiza los valores del formulario cuando initialData cambie
    useEffect(() => {
        if (initialData) {
            reset({
                descripcion: initialData.descripcion || '',
                codigoPrincipal: initialData.codigoPrincipal || '',
                codigoAuxiliar: initialData.codigoAuxiliar || '',
                tipoProducto: initialData.tipoProducto || 'B',
                tarifaIva: initialData.tarifaIva || '0',
                valorUnitario: initialData.valorUnitario || 0,
            });
        }
        else {
            reset({
                descripcion: '',
                codigoPrincipal: '',
                codigoAuxiliar: '',
                tipoProducto: 'B',
                tarifaIva: '0',
                valorUnitario: 0,
            });
        }
    }, [initialData, reset]);

    // Función para manejar el envío del formulario
    const onSubmit = (data: FormData) => {
        onSave({
            _id: initialData ? initialData._id : undefined,
            activo: true,
            descripcion: data.descripcion,
            codigoPrincipal: data.codigoPrincipal,
            codigoAuxiliar: data.codigoAuxiliar,
            tipoProducto: data.tipoProducto,
            tarifaIva: data.tarifaIva,
            valorUnitario: data.valorUnitario
        });
        // reset();
        // onClose();
    };

    return (
        <Modal show={isOpen} onClose={onClose}>
            <ModalHeader>{mode === 'create' ? 'Añadir Producto' : 'Editar Producto'}</ModalHeader>
            <ModalBody>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Descripción
                        </label>
                        <TextInput
                            type='text'
                            {...register('descripcion')}
                            placeholder="Descripción"
                            autoComplete="off"
                            color={errors.descripcion ? 'failure' : 'gray'}
                            className="form-control form-rounded-xl"
                        />
                        {errors.descripcion && (
                            <HelperText>
                                <span className="font-medium text-red-400">{errors.descripcion?.message?.toString()}</span>
                            </HelperText>
                        )}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Código Principal
                        </label>
                        <TextInput
                            type='text'
                            {...register('codigoPrincipal')}
                            placeholder="Código Principal"
                            autoComplete="off"
                            color={errors.codigoPrincipal ? 'failure' : 'gray'}
                            className="form-control form-rounded-xl"
                        />
                        {errors.codigoPrincipal && (
                            <HelperText>
                                <span className="font-medium text-red-400">{errors.codigoPrincipal?.message?.toString()}</span>
                            </HelperText>
                        )}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Código Auxiliar
                        </label>
                        <TextInput
                            type='text'
                            {...register('codigoAuxiliar')}
                            placeholder="Código Auxiliar"
                            autoComplete="off"
                            color={errors.codigoAuxiliar ? 'failure' : 'gray'}
                            className="form-control form-rounded-xl"
                        />
                        {errors.codigoAuxiliar && (
                            <HelperText>
                                <span className="font-medium text-red-400">{errors.codigoAuxiliar?.message?.toString()}</span>
                            </HelperText>
                        )}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Tipo Producto
                        </label>
                        <Select
                            {...register('tipoProducto')}
                            color={errors.tipoProducto ? 'failure' : 'gray'}
                            className="form-control form-rounded-xl"
                        >
                            <option value="">Seleccione un tipo</option>
                            {productoTypes.map((type) => (
                                <option key={type.value} value={type.value}>
                                    {type.label}
                                </option>
                            ))}
                        </Select>
                        {errors.tipoProducto && (
                            <HelperText>
                                <span className="font-medium text-red-400">{errors.tipoProducto?.message?.toString()}</span>
                            </HelperText>
                        )}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Tarifa IVA
                        </label>
                        <Select
                            {...register('tarifaIva')}
                            color={errors.tarifaIva ? 'failure' : 'gray'}
                            className="form-control form-rounded-xl"
                        >
                            <option value="">Seleccione una tarifa</option>
                            {ivaTypes.map((type) => (
                                <option key={type.value} value={type.value}>
                                    {type.label}
                                </option>
                            ))}
                        </Select>
                        {errors.tarifaIva && (
                            <HelperText>
                                <span className="font-medium text-red-400">{errors.tarifaIva?.message?.toString()}</span>
                            </HelperText>
                        )}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Valor Unitario
                        </label>
                        <TextInput
                            type='number'
                            {...register('valorUnitario')}
                            placeholder="Valor Unitario"
                            autoComplete="off"
                            color={errors.valorUnitario ? 'failure' : 'gray'}
                            className="form-control form-rounded-xl"
                        />
                        {errors.valorUnitario && (
                            <HelperText>
                                <span className="font-medium text-red-400">{errors.valorUnitario?.message?.toString()}</span>
                            </HelperText>
                        )}
                    </div>
                    <div className="flex justify-end">
                        <Button type="button" color="gray" onClick={onClose} className="mr-2 rounded-xl">
                            Cancelar
                        </Button>
                        <Button type="submit" color="primary" className='bg-primary text-white rounded-xl'>
                            {mode === 'create' ? 'Guardar' : 'Actualizar'}
                        </Button>
                    </div>
                </form>
            </ModalBody>
        </Modal>
    );
}