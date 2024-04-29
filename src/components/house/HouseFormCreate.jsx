import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useState } from 'react';
import { useCreateHouseMutation, useUploadPhotoHouseMutation } from '../../features/api/apiHousesSlice';
import HouseForm from './HouseForm';
import { HeroData } from '../../constants/index'

export default function HouseFormCreate(){

    const navigate = useNavigate(); // Instanciamos la vaiable de useNavigate
    const [file, setFile] = useState(null);
    const [createHouse] = useCreateHouseMutation()
    const [uploadPhotoHouse] = useUploadPhotoHouseMutation()

    const handleChangePhoto = (e) => {
        setFile(e.target.files)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();        
       /*  console.log(e.target.department); */
        const newHouse = {
            address: e.target.address.value,
            city: e.target.city.value,
            state: e.target.department.value.split("-")[1],
            size:parseInt(e.target.size.value),
            type: e.target.type_house.value,
            zip_code:e.target.zip_code.value,
            rooms: parseInt(e.target.rooms.value),
            bathrooms: parseInt(e.target.bathrooms.value),
            parking:(e.target.parking.value.toLowerCase() === "true"),
            price: parseInt(e.target.price.value),
            code: e.target.code.value,
        }
        try {
            const response = await createHouse(newHouse)          
            if(response == "error"){
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "La casa no pudo ser registrado, por favor verifique los datos",
                    showConfirmButton: false,
                    timer: 1500
                })
            }else{
                if(file){
                    const formData = new FormData();
                    formData.append("file", file[0])
                    
                    uploadPhotoHouse({code: response.data.code, file: formData})
                }
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "House Creada Correctamente",
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    navigate('/house') // Hacemos la redireccion
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

            <HouseForm props={{handleSubmit: handleSubmit, 
                        handleChangeAvatar: handleChangePhoto, 
                        user:null}} />
         </div>
    </div>


        
    );
}