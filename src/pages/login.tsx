import { faCapsules, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useState } from "react";
import { useLogin } from "~/hooks/useLogin";

const Login = () => {
    const { login, isLoading, error } = useLogin();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handelLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        login(email, password);
    }

    return (
        <section id="loginPage" className="fixed top-0 w-full h-screen bg-slate-50 flex">
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
                <Link href='/' id="btnCloseLoginPage" className="w-4 absolute top-0 left-0 m-4 text-slate-400 hover:text-slate-600 cursor-pointer">
                    <FontAwesomeIcon icon={faXmark} />
                </Link>

                <section className="text-2xl max-md:text-xl">
                    <Link
                        href='signup'
                        className="mr-4 max-md:mx-auto p-2 pl-0 rounded-md font-bold text-slate-300 hover:bg-slate-100"
                        id="btnSignupFromLoginPage"
                    >
                        تسجيل
                    </Link>
                    <Link
                        href='login'
                        className="mr-4 p-2 pl-0 rounded-md font-bold hover:bg-slate-100"
                    >
                        تسجيل الدخول
                    </Link>
                </section>

                <form className="my-4" onSubmit={handelLogin}>
                    <section className="my-4">
                        <input 
                            type="email" name="email" 
                            required placeholder="ادخل البريد الإلكتروني"
                            className={`
                                w-full py-2 border-b-2 border-slate-700 
                                bg-transparent my-2
                                focus-visible:border-[#00B4D8] focus-visible:outline-none
                            `}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label htmlFor="email" className="text-slate-400 font-semibold uppercase">البريد الإلكتروني</label>
                    </section>

                    <section className="my-4">
                        <input 
                            type="password" name="password" 
                            required placeholder="ادخل كلمة المرور" 
                            className={`
                                w-full py-2 border-b-2 border-slate-700 
                                bg-transparent my-2
                                focus-visible:border-[#00B4D8] focus-visible:outline-none
                            `}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <section className="flex justify-between">
                            <label htmlFor="password" className="text-slate-400 font-semibold uppercase">كلمة المرور</label>
                            <Link href='/' className="text-sky-500 font-semibold hover:text-yellow-500">نسيت كلمة المرور؟</Link>
                        </section>
                    </section>
                    
                    {
                        error && <p className="text-red-400 font-semibold text-center my-4">{error}</p>
                    }

                    
                    <section>
                        <input 
                            type='submit' name="submit" value='تسجيل الدخول' 
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
                        ليس لديك حساب؟  <Link href='signup' id="btnCreateAccount" className="text-sky-500 font-semibold hover:text-yellow-500">إنشاء حساب</Link>
                    </p>
                </section>
            </section>
        </section>
    )
}

export default Login;