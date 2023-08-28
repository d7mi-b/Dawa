import { faCapsules, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useState } from "react";
import { useSignup } from "~/hooks/useSignup";
import type { Role } from "~/types";

const roles = [
    {
        id: 1,
        role: "User",
        title: "مستخدم"
    },
    {
        id: 2,
        role: "Pharmacy",
        title: "صيدلية"
    }
]


const Signup = () => {
    const { signup, isLoading, error } = useSignup();

    const [email, setEmail] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [phone, setPhone] = useState<number>(0);
    const [role, setRole] = useState<Role>("User");
    const [policy, setPolicy] = useState<boolean>(false);

    const handelSignUp = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        signup(name, email, password, phone, role);
    }
    
    return (
        <section id="signupPage" className="absolute top-0 w-full min-h-screen bg-slate-50 flex">
            <section className="w-2/4 linear-bg p-14 max-lg:hidden">
                <header>
                    <h1 className="flex text-4xl font-bold">
                        <FontAwesomeIcon icon={faCapsules} className=" ml-2 w-14"/>
                        <p>منصة دواء</p>
                    </h1>
                    <h3 className="text-xl my-2">بتبرعك تخفف عنهم ما أصابهم وتكون خير عونٍ لهم</h3>
                </header>
            </section>

            <section className="w-2/4 p-14 flex flex-col justify-center relative max-lg:w-full">
                <Link href='/' id="btnCloseSignupPage" className="w-4 absolute top-0 left-0 m-4 text-slate-400 hover:text-slate-600 cursor-pointer">
                    <FontAwesomeIcon icon={faXmark} />
                </Link>

                <section className="text-2xl">
                    <Link 
                        href='signup'
                        className="mr-4 p-2 pl-0 rounded-md font-bold hover:bg-slate-100"
                    >
                        تسجيل
                    </Link>
                    <Link
                        href='login'
                        className="mr-4 p-2 pl-0 rounded-md font-bold text-slate-300 hover:bg-slate-100"
                        id="btnLoginFromSignupPage"
                    >
                        تسجيل الدخول
                    </Link>
                </section>

                <form className="my-4" onSubmit={handelSignUp}>
                    <section className="my-4">
                        <label htmlFor="name" className="text-slate-400 font-semibold text-sm uppercase">الأسم</label>
                        <input 
                            type="text" name="name" 
                            required placeholder="عبدالرحمن"
                            className={`
                                w-full p-4 border-b-2 border-[#7D8597] 
                                bg-transparent my-2
                                focus-visible:border-[#00B4D8] focus-visible:outline-none
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
                                w-full p-4 border-b-2 border-[#7D8597] 
                                bg-transparent my-2
                                focus-visible:border-[#00B4D8] focus-visible:outline-none
                            `}
                            value={phone}
                            onChange={(e) => setPhone(+e.target.value)}
                        />
                    </section>

                    <section className="my-4">
                        <label htmlFor="role" className="text-slate-400 font-semibold text-sm uppercase">هل انت مستخدم ام صيدلية؟</label>
                        <select 
                            name="role" 
                            required
                            className={`
                                w-full p-4 border-b-2 border-[#7D8597] 
                                bg-transparent my-2
                                focus-visible:border-[#00B4D8] focus-visible:outline-none
                            `}
                            value={role}
                            onChange={(e) => setRole(() => {
                                if (e.target.value === 'User')
                                    return 'User';
                                else if (e.target.value === 'Pharmacy')
                                    return 'Pharmacy';
                                else
                                    return 'Admin'
                            })}
                        >
                            {
                                roles.map(e => <option key={e.id} value={e.role}>{e.title}</option>)
                            }
                        </select>
                    </section>

                    <section className="my-4">
                        <label htmlFor="email" className="text-slate-400 font-semibold text-sm uppercase">البريد الإلكتروني</label>
                        <input 
                            type="email" name="email" 
                            required placeholder="email@dawa.com"
                            className={`
                                w-full p-4 border-b-2 border-[#7D8597] 
                                bg-transparent my-2
                                focus-visible:border-[#00B4D8] focus-visible:outline-none
                            `}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </section>

                    <section className="my-4">
                        <label htmlFor="password" className="text-slate-400 font-semibold text-sm uppercase">كلمة المرور</label>
                        <input 
                            type="password" name="password" 
                            required placeholder="********" 
                            className={`
                                w-full p-4 border-b-2 border-[#7D8597] 
                                bg-transparent my-2
                                focus-visible:border-[#00B4D8] focus-visible:outline-none
                            `}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </section>

                    {
                        error && <p className="text-red-400 font-semibold text-center">{error}</p>
                    }
                    
                    <section className="my-4">
                        <input 
                            type='checkbox' name="privacy" required 
                            className="checked:bg-sky-500 w-4 h-4"
                            checked={policy}
                            onChange={e => setPolicy(e.target.checked)} 
                        />
                        <label htmlFor="privacy" className="text-center text-slate-500 mx-2 text-md">
                            أوافق على  <Link href='/' className="font-semibold text-[#00B4D8] hover:text-[#ADE8F4]">الشروط والأحكام </Link>
                        </label>
                    </section>

                    <section>
                        <input 
                            type='submit' name="submit" value='التسجيل' 
                            disabled={isLoading}
                            className={`
                                bg-[#00B4D8] text-[#ADE8F4] hover:bg-[#ADE8F4] hover:text-[#023E8A]
                                w-24 p-6 text-xl cursor-pointer rounded-md font-semibold text-center w-full
                                disabled:bg-[#ADE8F4] disabled:text-[#023E8A]
                            `}
                        />
                    </section>
                </form>

                <section className="p-4 border-2 border-slate-300 text-center font-semibold">
                    <p>
                        هل لديك حساب؟ <Link href='signup' id="btnHaveAccount" className="text-sky-500 font-semibold hover:text-yellow-500">تسجيل الدخول</Link>
                    </p>
                </section>
            </section>
        </section>
    )
}

export default Signup;