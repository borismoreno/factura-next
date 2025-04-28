'use client';

import { Modal, Button, TextInput, ModalBody, ModalHeader, HelperText } from 'flowbite-react';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

interface AddClientModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (clientData: any) => void; // Cambia el tipo según tu modelo de cliente
    initialData?: any; // Datos iniciales para editar un cliente (opcional)
    mode: 'create' | 'edit'; // Modo del modal: 'create' para agregar, 'edit' para actualizar
}

// Esquema de validación con yup
const schema = yup.object().shape({
    razonSocial: yup.string().required('La razón social es obligatoria'),
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
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: initialData || {
            razonSocial: '',
            numeroIdentificacion: '',
            email: '',
            telefono: '',
        },
    });
    // Manejar el envío del formulario
    const onSubmit = (data: any) => {
        onSave(data); // Llama a la función onSave con los datos del formulario
        onClose(); // Cierra el modal
        reset(); // Limpia el formulario
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
                        <Button type="button" color="gray" onClick={onClose} className="mr-2">
                            Cancelar
                        </Button>
                        <Button type="submit" color="primary">
                            {mode === 'create' ? 'Guardar' : 'Actualizar'}
                        </Button>
                    </div>
                </form>
            </ModalBody>
        </Modal>
    );
}