'use client';

import {
    Modal,
    Button,
    TextInput,
    ModalBody,
    ModalHeader,
    HelperText,
    Select
} from 'flowbite-react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ICliente } from '@/types/Cliente';
import { useEffect } from 'react';

interface AddClientModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (clientData: ICliente) => void; // Cambia el tipo según tu modelo de cliente
    initialData?: ICliente; // Datos iniciales para editar un cliente (opcional)
    mode: 'create' | 'edit'; // Modo del modal: 'create' para agregar, 'edit' para actualizar
}

// Interfaz para los datos del formulario
interface FormData {
    razonSocial: string;
    tipoIdentificacion: string;
    numeroIdentificacion: string;
    email: string;
    telefono: string;
}

// Lista de tipos de identificación
const identificationTypes = [
    { value: '04', label: 'Ruc' },
    { value: '05', label: 'Cédula' },
    { value: '06', label: 'Pasaporte' },
    { value: '08', label: 'Identificación del Exterior' },
    { value: '09', label: 'Placa' },
];

// Esquema de validación con yup
const schema = yup.object().shape({
    razonSocial: yup.string().required('La razón social es obligatoria'),
    tipoIdentificacion: yup.string().required('El tipo de identificación es obligatorio'),
    numeroIdentificacion: yup.string().required('La identificación es obligatoria'),
    email: yup.string().email('El correo no es válido').required('El correo es obligatorio'),
    telefono: yup.string().required('El teléfono es obligatorio'),
});

export default function AddClientModal({ isOpen, onClose, onSave, initialData, mode }: AddClientModalProps) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormData>({
        resolver: yupResolver(schema),
        defaultValues: {
            razonSocial: '',
            tipoIdentificacion: '',
            numeroIdentificacion: '',
            email: '',
            telefono: '',
        },
    });

    // Actualiza los valores del formulario cuando initialData cambie
    useEffect(() => {
        if (initialData) {
            reset({
                razonSocial: initialData.razonSocial || '',
                tipoIdentificacion: initialData.tipoIdentificacion || '',
                numeroIdentificacion: initialData.numeroIdentificacion || '',
                email: initialData.mail || '',
                telefono: initialData.telefono || '',
            });
        } else {
            reset({
                razonSocial: '',
                tipoIdentificacion: '',
                numeroIdentificacion: '',
                email: '',
                telefono: '',
            });
        }
    }, [initialData, reset]);

    // Manejar el envío del formulario
    const onSubmit = (data: FormData) => {
        onSave({
            _id: initialData ? initialData._id : undefined, // Si es un nuevo cliente, no se envía el ID
            activo: true,
            razonSocial: data.razonSocial,
            tipoIdentificacion: data.tipoIdentificacion,
            numeroIdentificacion: data.numeroIdentificacion,
            telefono: data.telefono,
            mail: data.email,
            direccion: ''
        }); // Llama a la función onSave con los datos del formulario
        // onClose(); // Cierra el modal
        // reset(); // Limpia el formulario
    };

    return (
        <Modal show={isOpen} onClose={onClose}>
            <ModalHeader>{mode === 'create' ? 'Añadir Cliente' : 'Editar Cliente'}</ModalHeader>
            <ModalBody>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Razón Social
                        </label>
                        <TextInput
                            type="text"
                            {...register('razonSocial')}
                            placeholder="Razón Social"
                            className='rounded-md'
                            autoComplete='off'
                            color={errors.razonSocial ? 'failure' : 'gray'}
                        />
                        {errors.razonSocial && (
                            <HelperText>
                                <span className="font-medium text-red-400">{errors.razonSocial?.message?.toString()}</span>
                            </HelperText>
                        )}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Tipo de Identificación
                        </label>
                        <Select
                            {...register('tipoIdentificacion')}
                            color={errors.tipoIdentificacion ? 'failure' : 'gray'}
                        >
                            <option value="">Seleccione un tipo</option>
                            {identificationTypes.map((type) => (
                                <option key={type.value} value={type.value}>
                                    {type.label}
                                </option>
                            ))}
                        </Select>
                        {errors.tipoIdentificacion && (
                            <HelperText>
                                <span className="font-medium text-red-400">{errors.tipoIdentificacion?.message?.toString()}</span>
                            </HelperText>
                        )}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Identificación
                        </label>
                        <TextInput
                            type="text"
                            {...register('numeroIdentificacion')}
                            placeholder="Identificación"
                            autoComplete='off'
                            color={errors.numeroIdentificacion ? 'failure' : 'gray'}
                        />
                        {errors.numeroIdentificacion && (
                            <HelperText>
                                <span className="font-medium text-red-400">{errors.numeroIdentificacion?.message?.toString()}</span>
                            </HelperText>
                        )}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Correo Electrónico
                        </label>
                        <TextInput
                            type="email"
                            {...register('email')}
                            placeholder="Correo Electrónico"
                            autoComplete='off'
                            color={errors.email ? 'failure' : 'gray'}
                        />
                        {errors.email && (
                            <HelperText>
                                <span className="font-medium text-red-400">{errors.email?.message?.toString()}</span>
                            </HelperText>
                        )}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Teléfono
                        </label>
                        <TextInput
                            type="text"
                            {...register('telefono')}
                            placeholder="Teléfono"
                            autoComplete='off'
                            color={errors.telefono ? 'failure' : 'gray'}
                        />
                        {errors.telefono && (
                            <HelperText>
                                <span className="font-medium text-red-400">{errors.telefono?.message?.toString()}</span>
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