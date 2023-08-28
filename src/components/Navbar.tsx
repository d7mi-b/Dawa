import { faBars, faCapsules } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useAuth } from "~/hooks/useAuth";
import { useLogout } from "~/hooks/useLogout";

const Navbar = () => {
    const { user } = useAuth();
    const { logout } = useLogout();

    return (
        <nav className="p-4 px-8 border-b">
            {
                user &&
                <section className="flex justify-between">
                    <ul className="flex">
                        <li>
                            <section className="header-color flex text-2xl">
                                <FontAwesomeIcon icon={faCapsules} className="my-1 ml-2 w-8"/>
                                <p>دواء</p>
                            </section>
                        </li>
                        <section className="flex group max-lg:relative w-full">
                            <li className="header-color flex flex-col justify-center lg:hidden">
                                <FontAwesomeIcon icon={faBars} className="my-1 mr-4 w-5" />
                            </li>
                            <section 
                                className={`
                                    flex max-lg:hidden max-lg:group-hover:flex max-lg:absolute max-lg:flex-col 
                                    max-lg:p-4 max-lg:text-center max-lg:bg-slate-50 max-lg:w-96 max-lg:top-8 
                                    max-lg:font-semibold max-lg:text-xl max-lg:z-50
                                `}
                            >
                                <li className="flex flex-col justify-center mr-10 text-[#00B4D8] hover:text-sky-300 max-lg:mx-auto max-lg:my-4">
                                    <Link href='/'>الرئيسية</Link>
                                </li>
                                <li className="flex flex-col justify-center mx-5 text-[#00B4D8] hover:text-sky-300 max-lg:mx-auto max-lg:my-4">
                                    <Link href='my-requests'>طلباتي</Link>
                                </li>
                                <li className="flex flex-col justify-center ml-5 text-[#00B4D8] hover:text-sky-300 max-lg:mx-auto max-lg:my-4">
                                    <Link href='my-donations'>تبرعاتي</Link>
                                </li>
                                <li className="flex flex-col justify-center text-[#00B4D8] hover:text-sky-300 max-lg:mx-auto max-lg:my-4">
                                    <Link href='setting'>الإعدادات</Link>
                                </li>
                            </section>
                        </section>
                    </ul>

                    <section>
                        <button 
                            className="btn" id="btnLogin" 
                            onClick={() => logout()}
                        >
                            تسجيل الخروج
                        </button>
                    </section>
                </section>
            }

            {
                !user && 
                <section className="flex justify-between">
                    <section className="header-color flex text-2xl">
                        <FontAwesomeIcon icon={faCapsules} className="my-1 ml-2 w-8"/>
                        <p>دواء</p>
                    </section>
                    
                    <section>
                        <Link href='/login' className="btn" id="btnLogin">
                            تسجيل الدخول
                        </Link>
                        <Link href='signup' className="btn linear-bg" id="btnSignup">
                            تسجيل 
                        </Link>
                    </section>
                </section>
            }
        </nav>
    )
}

export default Navbar;