import { useNavigate } from 'react-router-dom'
import { useCreateUserMutation, useUploadAvatarMutation } from '../../features/api/apiSlice';
import Swal from 'sweetalert2'
import UserForm from './UserForm';
import { useState } from 'react';
import { HeroData } from '../../constants/index'


export default function UserFormCreate() {

    const navigate = useNavigate(); // Instanciamos la vaiable de useNavigate
    const [file, setFile] = useState(null)
    const [createUser] = useCreateUserMutation()
    const [uploadAvatar] = useUploadAvatarMutation()

    const handleChangeAvatar = (e) => {
        setFile(e.target.files)
        /* console.log(e.target.files); */
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newUser = {
            name: e.target.name.value,
            lastname: e.target.lastname.value,
            email: e.target.email.value,
            id: e.target.id.value,
            password: e.target.password.value,
        }
        try {
            const response = await createUser(newUser)
            if (response.data.status == "error") {
                console.log(response);
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "El usuario no pudo ser registrado, por favor verifique los datos",
                    showConfirmButton: false,
                    timer: 1500
                })
            } else {
                if (file) {
                    const formData = new FormData()
                    formData.append('file', file[0])
                    console.log(formData);
                    uploadAvatar({ _id: response.data._id, file: formData })
                }
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Usuario Creado Correctamente",
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
        <div className='hero flex min-h-screen items-center justify-center pt-20'>
            <div className='flex max-w-4xl flex-col items-center justify-center gap-6 pb-10'>
                <div className='space-y-4'>
                    <h1 className='m-4 text-center text-4xl text-white md:text-2xl lg:text-4xl'>
                        {
                            HeroData.title
                        }
                    </h1>
                    <p className='p-4 text-center text-slate-300 hidden md:flex'>
                        {HeroData.description}
                    </p>
                </div>
                <UserForm props={{ handleSubmit: handleSubmit, handleChangeAvatar: handleChangeAvatar, user: null }} />
            </div>
        </div>
    );
}