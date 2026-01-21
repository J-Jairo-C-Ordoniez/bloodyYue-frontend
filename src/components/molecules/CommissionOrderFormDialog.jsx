import { useState } from 'react';
import cart from '../../api/cart/index';
import Dialog from '../atoms/Dialog';
import Button from '../atoms/Button';
import Input from '../atoms/Input';
import validatorInput from '../../utils/validatorsInputs';
import Typography from '../atoms/Typography';

export default function CommissionOrderFormDialog({ isOpen, onClose, commissionId, title, price }) {
    const [errors, setErrors] = useState(null);
    const [formData, setFormData] = useState({
        commissionId: commissionId,
        priceAtMoment: price,
        quantity: 1,
        details: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        let nam = name === 'commissionId' ? 'number'
            : name === 'priceAtMoment' ? 'price'
                : name === 'quantity' ? 'number'
                    : name === 'details' ? 'text'
                        : name;

        let error = validatorInput(nam, value);

        setErrors(error);

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await cart.cartItemsPost({ data: formData });

        if (res.error) {
            setErrors(res.message || 'Error al agregar al carrito');
        } else {
            setErrors(null);
            onClose();
        }
    };

    const inputs = [
        {
            id: 'commissionId',
            name: 'commissionId',
            label: 'Id de la comisión',
            type: 'number',
            min: '1',
            value: formData.commissionId,
            required: true,
            placeholder: '1',
            disabled: true,
            colSpan: 'col-span-1'
        },
        {
            id: 'priceAtMoment',
            name: 'priceAtMoment',
            label: 'Precio al momento de ordenar',
            type: 'number',
            min: '1',
            value: formData.priceAtMoment,
            required: true,
            placeholder: '1',
            disabled: true,
            colSpan: 'col-span-1'
        },
        {
            id: 'quantity',
            name: 'quantity',
            label: 'Cantidad',
            type: 'number',
            min: '1',
            value: formData.quantity,
            onChange: handleChange,
            required: true,
            placeholder: '1',
            colSpan: 'col-span-2'
        },
        {
            id: 'details',
            name: 'details',
            label: 'Detalles / Agregados',
            type: 'text',
            value: formData.details,
            onChange: handleChange,
            required: true,
            placeholder: 'Describe los detalles para tu pedido...',
            colSpan: 'col-span-2'
        }
    ]

    return (
        <Dialog
            isOpen={isOpen}
            onClose={onClose}
            title={`Ordenar: ${title}`}
            className="bg-[#121212] m-auto!"
        >
            <form onSubmit={handleSubmit} method="post" className="space-y-6">
                <div className="grid grid-cols-2 gap-5">
                    {inputs.map((input) => {
                        const Component = input.type === 'checkbox' ? Checkbox : Input;
                        return (
                            <div key={input.id} className={input.colSpan}>
                                <Component
                                    id={input.id}
                                    name={input.name}
                                    label={input.label}
                                    type={input.type}
                                    placeholder={input.placeholder}
                                    value={input.value}
                                    checked={input.checked}
                                    onChange={input.onChange}
                                    disabled={input.disabled}
                                />
                            </div>
                        );
                    })}
                </div>

                <Button
                    type="submit"
                    variant="submit"
                    size="large"
                >
                    Confirmar Pedido
                </Button>
            </form>

            {errors && (
                <article className="space-y-1 mt-10">
                    <Typography variant="error">
                        {errors}
                    </Typography>
                </article>
            )}
        </Dialog>
    );
}
