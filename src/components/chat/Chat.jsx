import { useEffect, useState } from "react";
import { io } from "socket.io-client"
import { useGetMessagesQuery } from "../../features/api/apiMessageSlice";
import { useSelector } from "react-redux";
import cn from 'classnames';

export default function Chat() {

    const { data, isLoading, isError, error } = useGetMessagesQuery();
    const user = useSelector((state) => state.auth.user)
    const [messages, setMessages] = useState([]);

    const socket = io('http://localhost:3000', {
            transports: ['websocket'],
        });
        socket.on('connect', function () {
            /* console.log('connect'); */
        })

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            "body": e.target.message.value,
            "from": user._id,
            "to": user._id//!NOTE: Id del destinatario, de deberia de obtenerlo de la base de datos
        }
        const data = JSON.stringify(payload);
        socket.emit('message', data);
        console.log(data);
        e.target.reset();
    }

    socket.on("message-receipt", function(data){
        const newMessage = {
            "_id": data._id,
            "body": data.body,
            "from": {_id:data.from},
            "to": {_id: data.to},
            "createdAt": data.createdAt,
        };
        setMessages([...messages, newMessage]);
    })

    useEffect(() => {
        
        if (data) {
            setMessages(data);
        }
    }, [data])

    if (isLoading) return <div role="status" className='flex justify-center'>
        <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
        </svg>
        <span className="sr-only">Loading...</span>
    </div>;
    else if (isError) return (<div>Error: {error.message} </div>)

   

    return (
        <div className="flex flex-col h-screen py-24 px-2  w-full max-w-5xl mx-auto">
            <div className="border-2 border-green-400 rounded-sm">

                <div className="bg-green-400 text-gray-900 p-4">
                    <h1 className="text-xl font-semibold">Chat</h1>
                </div>
                <div className="flex flex-col space-y-2 px-4 py-3 overflow-y-auto h-96">
                    {
                        messages.map((message, index) => (
                            <div key={index} className={cn({
                                'bg-pink-300 self-end': message.from && user._id === message.from._id,
                                'bg-blue-300 self-start': !(message.from && user._id === message.from._id),
                                'text-gray-700 py-2 px-4 rounded-lg max-w-xs': true
                            })}>
                                <p>{message.body}</p>
                                <span className="text-xs text-gray-100 self-end">{message.createdAt}</span>
                            </div>
                        ))
                    }
                </div>
                <hr />
                <form onSubmit={handleSubmit} className="bg-gray-200 p-4 rounded-sm">
                    <input type="text" name="message" placeholder="Escribe un mensaje..." className="w-full p-2 rounded-sm" />
                    <button className="bg-blue-400 text-white p-2 rounded-lg mt-5">Enviar</button>
                </form>
            </div>
        </div>
    )
}