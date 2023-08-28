import { useState } from 'react';
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { api } from "~/utils/api";

const ContactUs = () => {
    const { mutate: send, isLoading } = api.message.send.useMutation();

    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [message, setMessage] = useState<string>('');

    const handelSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        send({
            name, email, message
        })
    }

    return (
        <section className="w-3/5 mx-auto my-8 py-8 min-h-screen max-lg:w-4/5">
            <header className="header-color font-bold text-3xl flex mb-10">
                <FontAwesomeIcon icon={faMessage} className="w-10 ml-2" />
                <h1>تواصل معنا</h1>
            </header>

            <section className="mt-4 mb-8">
                <form onSubmit={handelSubmit}>
                    <section className="my-4">
                        <label htmlFor="name" className="text-[#7D8597] font-semibold text-lg">الأسم</label>
                        <input 
                            type="text" name="name" 
                            required placeholder="الأسم"
                            className={`
                                w-full p-4 border-2 border-[#7D8597] 
                                bg-transparent my-2 rounded-md
                                text-[#023E8A]
                                focus-visible:border-[#00B4D8] focus-visible:outline-none
                            `}
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </section>

                    <section className="my-4">
                        <label htmlFor="email" className="text-[#7D8597] font-semibold text-lg">البريد الإلكتروني</label>
                        <input 
                            type="email" name="email" 
                            required placeholder="البريد الإلكتروني"
                            className={`
                                w-full p-4 border-2 border-[#7D8597] 
                                bg-transparent my-2 rounded-md
                                text-[#023E8A]
                                focus-visible:border-[#00B4D8] focus-visible:outline-none
                            `}
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </section>

                    <section className="my-4">
                        <label htmlFor="message" className="text-[#7D8597] font-semibold text-lg">الرسالة</label>
                        <textarea 
                            name="message" 
                            required placeholder="الرسالة"
                            className={`
                                w-full p-4 border-2 border-[#7D8597] 
                                bg-transparent my-2 rounded-md resize-none
                                text-[#023E8A] h-48
                                focus-visible:border-[#00B4D8] focus-visible:outline-none
                            `}
                            value={message}
                            onChange={e => setMessage(e.target.value)}
                        />
                    </section>

                    <section className="mt-4 text-center">
                        <input 
                            type='submit'
                            disabled={isLoading}
                            className={`
                                bg-[#00B4D8] text-[#ADE8F4] hover:bg-[#ADE8F4] hover:text-[#023E8A]
                                w-24 p-6 text-xl cursor-pointer rounded-md font-semibold text-center w-full
                                disabled:bg-[#ADE8F4] disabled:text-[#023E8A]
                            `}
                            value='ارسال'
                        />
                    </section>
                </form>
            </section>
        </section>
    )
}

export default ContactUs;