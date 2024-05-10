import { useState } from "react";
import { useLoginMutation } from "../../features/api/apiSlice";
import Swal from 'sweetalert2'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loginSuccess } from "../../features/authSlice";

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Login() {

    const [login] = useLoginMutation();
    const [error, setError] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setError(false)
            const user = {
                email: e.target.email.value,
                password: e.target.password.value,
            }
            const response = await login(user)
            if (response.error && response.error.data.status == "error") {
                setError(true)
            } else {
                localStorage.setItem('sessionData', JSON.stringify(response.data))
                dispatch(loginSuccess(response.data))
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Bienvenido",
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    navigate('/user') // Hacemos la redireccion
                });
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="bg-background mx-auto px-5 py-5 min-h-screen flex justify-center items-center">
            <div className="w-full max-w-lg  rounded-lg bg-black p-8">
                <div className="flex flex-shrink-0 items-center justify-center p-8">
                    <img
                        className="mr-2 h-20 w-20"
                        src="/logo/color1.png"
                        alt="Logo"
                    />
                    <span className="text-white text-lg tracking-tight hover:text-neutral-500">Rentopia</span>
                </div>
                {!error ? null :
                    (<div className="flex justify-center bg-slate-100 text-red-500 font-bold">
                        Datos Invalidos
                    </div>
                    )}
                <form onSubmit={handleSubmit} className=" shadow-md rounded pt-6 pb-10 mb-4 px-10">
                    <div className="mb-4">
                        <Label className="block text-gray-300 font-bold mb-2" htmlFor="email" >Email</Label>
                        <Input
                            type="email"
                            required
                            name="email"
                            placeholder="Email"
                            id="email"
                        />
                    </div>
                    <div className="mb-4">
                        <Label className="block text-gray-300 font-bold mb-2" htmlFor="password" >Password</Label>
                        <Input
                            type="password"
                            required
                            name="password"
                            placeholder="password"
                            id="password"
                            minLength="3"
                        />
                    </div>
                    <div className="flex justify-center">
                        <Button type="submit" variant="secondary" className="mt-4 w-full max-w-24">Login In</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}