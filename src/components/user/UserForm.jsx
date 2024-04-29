import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function UserForm({ props }) {
    const handleSubmit = props.handleSubmit;
    const user = props.user;
    const handleChangeAvatar = props.handleChangeAvatar;
    /*    console.log(props) */

    return (
        <div className="w-full  rounded-lg bg-black ">
            <form onSubmit={handleSubmit} className="shadow-md pt-6 pb-10 mb-4 px-10">
                <div className="grid gap-4 items-end sm:grid-cols-2 lg:grid-cols-3">
                    <div className="mb-4">
                        <Label className="block text-gray-300 font-bold mb-2" htmlFor="terms" >Name</Label>
                        <Input type="text" id="name" required name="name" placeholder="Name" defaultValue={user?.name} />
                    </div>
                    <div className="mb-4">
                        <Label className="block text-gray-300 font-bold mb-2" htmlFor="terms" >Last Name</Label>
                        <Input type="text" id="lastname" required name="lastname" placeholder="Last Name" defaultValue={user?.lastname} />
                    </div>
                    <div className="mb-4">
                        <Label className="block text-gray-300 font-bold mb-2" htmlFor="terms" >Email</Label>
                        <Input type="email" id="email" required name="email" placeholder="Email" defaultValue={user?.email} />
                    </div>
                    <div className="mb-4">
                        <Label className="block text-gray-300 font-bold mb-2" htmlFor="terms" >Identification</Label>
                        <Input type="number" id="id" required name="id" placeholder="Identification" defaultValue={user?.id} />
                    </div>
                    {user ? null :
                        (<div className="mb-4">
                            <Label className="block text-gray-300 font-bold mb-2" htmlFor="terms" >Password</Label>
                            <Input type="password" id="password" required name="password" placeholder="Password" />

                        </div>
                        )}
                    <div className="flex md:flex-row w-full md:justify-center gap-4 md:col-span-2 lg:col-span-3">
                        <div className="flex items-center justify-center w-full max-w-sm flex-col   ">
                            <Label className="block text-gray-300 font-bold mb-2" htmlFor="terms" >Foto avatar</Label>
                            <Label htmlFor="avatar" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                        <path stroke="currentColor" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                    </svg>
                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                </div>
                                {/* <input onChange={handleChangeAvatar} id="avatar" name="avatar" accept="image/png, image/jpeg" type="file" className="hidden" /> */}
                            </Label>
                        </div>
                    </div>
                    <div className="flex justify-center md:col-span-2 lg:col-span-3">
                        <Button variant="secondary" className="mt-4 w-full max-w-24">Save</Button>
                    </div>
                </div>
            </form>

        </div>
    );
}