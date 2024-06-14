import { useEffect, FormEventHandler, useState } from 'react';
import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthLayout from "@/Layouts/AuthLayout";
import { IoAtOutline, IoEyeOffOutline, IoEyeOutline, IoLockClosedOutline } from "react-icons/io5";

export default function Login({ status, canResetPassword }: { status?: string, canResetPassword: boolean }) {
    const[showPassword, setShowPassword] = useState<boolean>(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('login'));
    };

    return (
        <AuthLayout>
            <Head title="Entrar" />

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

            <form onSubmit={submit}>
                <div className="relative">
                    <IoAtOutline size={22} className="absolute top-2.5 left-1 text-gray-400" />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 pl-8 block w-full text-sm p-2.5"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                        placeholder="E-mail"
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-6 relative">
                    <IoLockClosedOutline size={22} className="absolute top-2.5 left-1 text-gray-400" />
                    <TextInput
                        id="password"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={data.password}
                        className="mt-1 pl-8 block w-full text-sm p-2.5"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                        placeholder="Senha"
                    />
                    {showPassword 
                    ? <IoEyeOffOutline size={22} className="absolute top-2.5 right-1 text-gray-400 cursor-pointer" onClick={() => setShowPassword(false)} />
                    : <IoEyeOutline size={22} className="absolute top-2.5 right-1 text-gray-400 cursor-pointer" onClick={() => setShowPassword(true)} />
                    }
                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="flex items-center justify-between mt-6">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                        />
                        <span className="ms-2 text-sm text-gray-600">Lembrar</span>
                    </label>
                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Perdeu sua senha?
                        </Link>
                    )}
                </div>

                <div className="flex items-center justify-center mt-4">

                    <PrimaryButton className="w-full" disabled={processing}>
                        Entrar
                    </PrimaryButton>
                </div>
            </form>
        </AuthLayout>
    );
}
