import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useLoginMutation, useUpdateUserMutation } from "../../features/api/apiSlice";
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';


export default function ChangePassword() {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [notEqualPassword, setNotEqualPassword] = useState(false);
    const user = useSelector((state) => state.auth.user);

    const [isError, setIsError] = useState(false);
    const [login] = useLoginMutation();
    const [updateUser] = useUpdateUserMutation();

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsError(false);
        const userValidate = {
            "email": user.email,
            "password": currentPassword
        }
        const response = await login(userValidate);
        if (response.error && response.error.data.status == "error") {
            setIsError(true);
        } else {
            if (!notEqualPassword) {
                console.log(e.target['new-password'].value);
                const newUser = {
                    _id: user._id,
                    password: e.target['new-password'].value,
                }
                const response = await updateUser(newUser);
                if (response.data.status == "error") {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Error while changing password",
                        showConfirmButton: false,
                        timer: 1500
                    })
                } else {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Password changed successfully",
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            }
        }
    }

    return (
        <div className="hero bg-gradient-to-r from-slate-900 to-slate-900 w-full mx-auto px-5 py-5 min-h-screen flex justify-center items-center">
            <div className="w-full max-w-lg  rounded-lg bg-black p-8">
                <div className="flex flex-shrink-0 items-center justify-center p-8 flex-col">
                    <span className="text-lg md:text-2xl tracking-tight hover:text-neutral-500 text-teal-600">Change password</span>
                </div>
                {/*  {!error ? null :
                    (<div className="flex justify-center bg-slate-100 text-red-500 font-bold">
                        Datos Invalidos
                    </div>
                    )} */}
                <form onSubmit={handleSubmit} className=" shadow-md rounded pt-6 pb-10 mb-4 px-10">
                    <div className="mb-4">
                        <Label className="block text-gray-300 font-bold mb-2" htmlFor="current-password" >Current password</Label>
                        <Input
                            type="password"
                            required
                            name="current-password"
                            placeholder="Current password"
                            id="current-password"
                            minLength="3"
                            onChange={(e) => setCurrentPassword(e.target.value)}
                        />
                        {
                            isError ?
                                <span className="min-h-2 text-red-600">Password does not match</span>
                                :
                                <span className="min-h-2 text-black">.</span>
                        }
                    </div>
                    <div className="mb-4">
                        <Label className="block text-gray-300 font-bold mb-2" htmlFor="new-password" >New password</Label>
                        <Input
                            type="password"
                            required
                            name="new-password"
                            placeholder="New password"
                            id="new-password"
                            minLength="3"
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <Label className="block text-gray-300 font-bold mb-2" htmlFor="confirm-new-password" >Confirm New Password</Label>
                        <Input
                            type="password"
                            required
                            name="confirm-new-password"
                            placeholder="Confirm New Password"
                            id="confirm-new-password"
                            minLength="3"
                            onChange={(e) => {
                                setConfirmNewPassword(e.target.value);
                                setNotEqualPassword(!(newPassword == e.target.value));
                            }}
                        />
                        {
                            notEqualPassword ?
                                <span className="min-h-2 text-red-600">New password are not the same</span>
                                :
                                <span className="min-h-2 text-black">.</span>
                        }
                    </div>
                    <div className="flex justify-center">
                        <Button type="submit" variant="secondary" className="mt-4 w-full max-w-24">Change</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}