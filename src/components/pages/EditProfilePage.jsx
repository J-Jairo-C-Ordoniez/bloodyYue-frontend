'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ProfileHeader from '../organisms/ProfileHeader';
import Input from '../atoms/Input';
import Button from '../atoms/Button';
import Typography from '../atoms/Typography';
import Label from '../atoms/Label';
import Image from '../atoms/Image';
import Icon from '../atoms/Icon';
import useAuthStore from '../../store/auth.store';
import useUsers from '../../hooks/useUsers';

export default function EditProfilePage({ user }) {
    const router = useRouter();
    const [errors, setErrors] = useState(null)
    const [loading, setLoading] = useState(false);
    const setAuth = useAuthStore.getState().setAuth;
    const token = useAuthStore.getState().token;
    const { updateProfile, uploadMedia } = useUsers();

    const [formData, setFormData] = useState({
        name: user?.name || '',
        avatar: user?.avatar || '',
        poster: user?.poster || '',
        birthday: user?.birthday || '',
    });

    const handleFileChange = async (e, context) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const res = await uploadMedia({ file, context });
        if (!res.error) {
            setFormData(prev => ({ ...prev, [context]: res.data }));
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const res = await updateProfile(formData);

        if (res.error) {
            setErrors(res.message);
        } else {
            setAuth(token, { ...user, ...formData });
            router.push('/profile/home');
        }
    };

    return (
        <div className="bg-[#0B0B0E] min-h-screen pb-20">
            <ProfileHeader user={user} />
            <main className="container mx-auto px-6 mt-12 max-w-2xl">
                <Typography variant="h2" className="text-3xl font-bold text-white mb-8">
                    Editar Perfil
                </Typography>

                <form onSubmit={handleSubmit} className="space-y-6 bg-zinc-900/50 p-8 rounded-2xl border border-zinc-800">
                    <div className="flex flex-col gap-4">
                        <div className="w-full h-32 rounded-xl overflow-hidden bg-zinc-800 ring-2 ring-zinc-700 flex items-center justify-center relative group">
                            {formData.poster ? (
                                <Image src={formData.poster} alt="Poster Preview" width={600} height={200} className="w-full h-full object-cover" />
                            ) : (
                                <Icon name="Image" size={40} className="text-zinc-500" />
                            )}
                            <label className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                <Icon name="Upload" size={32} className="mb-2" />
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => handleFileChange(e, 'poster')}
                                />
                            </label>
                        </div>
                        <Typography variant="body" className="text-zinc-400 text-sm">
                            Banner del perfil (Recomendado 1500x500px)
                        </Typography>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="w-24 h-24 rounded-full overflow-hidden bg-zinc-800 ring-2 ring-zinc-700 flex items-center justify-center relative group">
                            {formData.avatar ? (
                                <Image src={formData.avatar} alt="Avatar Preview" width={96} height={96} className="w-full h-full object-cover" />
                            ) : (
                                <Icon name="User" size={40} className="text-zinc-500" />
                            )}
                            <label className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                <Icon name="Upload" size={32} className="mb-2" />
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => handleFileChange(e, 'avatar')}
                                />
                            </label>
                        </div>
                        <div className="flex-1">
                            <Typography variant="h4" className="text-lg font-medium text-white mb-2">
                                Foto de Perfil
                            </Typography>
                            <Typography variant="body" className="text-zinc-400 text-sm">
                                Haz click en la imagen para cambiar tu avatar.
                            </Typography>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="name" color="#A1A1AA">Nombre de usuario</Label>
                            <Input
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Tu nombre"
                                className="bg-zinc-950/50"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="birthday" color="#A1A1AA">Fecha de Cumpleaños</Label>
                            <Input
                                id="birthday"
                                name="birthday"
                                type="date"
                                value={formData.birthday}
                                onChange={handleChange}
                                className="bg-zinc-950/50"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-4 pt-4">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => router.back()}
                            className="text-zinc-400 hover:text-white hover:bg-zinc-800"
                        >
                            Cancelar
                        </Button>
                        <Button type="submit" disabled={loading} className="min-w-[120px]">
                            {loading ? 'Guardando...' : 'Guardar Cambios'}
                        </Button>
                    </div>
                </form>

                {errors && (
                    <article className="space-y-1">
                        <Typography variant="error">
                            {errors}
                        </Typography>
                    </article>
                )}
            </main>
        </div>
    );
}
