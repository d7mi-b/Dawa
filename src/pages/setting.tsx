import { faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import { api } from "~/utils/api";

const Setting = () => {
    const { data: user } = api.user.data.useQuery();

    const { mutate: updateUser, isLoading, error } = api.user.update.useMutation();

    const [email, setEmail] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [phone, setPhone] = useState<number>(0);

    const handelUpdate = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        updateUser({
            name, email, phone, password
        })
    }

    useEffect(() => {
        if (user) {
            setEmail(user?.email);
            setName(user.name);
            setPhone(user.phone)
        }
    }, [user])

    return (
        <section className="w-3/5 my-8 mx-auto max-lg:w-4/5">
            <header className="text-2xl header-color flex font-semibold">
                <FontAwesomeIcon icon={faGear} className="w-8 ml-2" />
                <h1>الإعدادات</h1>
            </header>

            <form className="my-4" onSubmit={handelUpdate}>
                    <section className="my-4">
                        <label htmlFor="name" className="text-slate-400 font-semibold text-sm">الأسم</label>
                        <input 
                            type="text" name="name" 
                            required placeholder="عبدالرحمن"
                            className={`
                                w-full p-4 border-2 border-slate-700 
                                bg-transparent my-2 rounded-md
                                text-[#023E8A]
                                focus-visible:border-yellow-500 focus-visible:outline-none
                            `}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </section>

                    <section className="my-4">
                        <label htmlFor="phone" className="text-slate-400 font-semibold text-sm uppercase">الجوال</label>
                        <input 
                            type='tel' name="phone" 
                            required placeholder="+967777777777"
                            className={`
                                w-full p-4 border-2 border-slate-700 
                                bg-transparent my-2 rounded-md
                                text-[#023E8A]
                                focus-visible:border-yellow-500 focus-visible:outline-none
                            `}
                            value={phone}
                            onChange={(e) => setPhone(+e.target.value)}
                        />
                    </section>

                    <section className="my-4">
                        <label htmlFor="email" className="text-slate-400 font-semibold text-sm uppercase">البريد الإلكتروني</label>
                        <input 
                            type="email" name="email" 
                            required placeholder="email@dawa.com"
                            className={`
                                w-full p-4 border-2 border-slate-700 
                                bg-transparent my-2 rounded-md
                                text-[#023E8A]
                                focus-visible:border-yellow-500 focus-visible:outline-none
                            `}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </section>

                    <section className="my-4">
                        <label htmlFor="password" className="text-slate-400 font-semibold text-sm uppercase">كلمة المرور</label>
                        <input 
                            type="password" name="password" 
                            placeholder="********" 
                            className={`
                                w-full p-4 border-2 border-slate-700 
                                bg-transparent my-2 rounded-md
                                text-[#023E8A]
                                focus-visible:border-yellow-500 focus-visible:outline-none
                            `}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </section>

                    {
                        error && <p className="text-red-400 font-semibold text-center">{error.message}</p>
                    }

                    <section>
                        <input 
                            type='submit' name="submit" value='حفظ' 
                            disabled={isLoading}
                            className={`
                                bg-[#00B4D8] text-[#ADE8F4] hover:bg-[#ADE8F4] hover:text-[#023E8A]
                                w-24 p-6 text-xl cursor-pointer rounded-md font-semibold text-center w-full
                                disabled:bg-[#ADE8F4] disabled:text-[#023E8A]
                            `}
                        />
                    </section>
                </form>
        </section>
    )
}

export default Setting;