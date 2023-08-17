import { faCapsules } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link";
import type { Request } from '~/types';

const RecentRequests = (props: { requests: Request[] | undefined }) => {
    const { requests } = props;

    return (
        <article className="page">
            <header className=" font-bold text-3xl mt-14 flex">
                <FontAwesomeIcon icon={faCapsules} className="w-10 ml-2" />
                <h1>أحدث الطلبات</h1>
            </header>

            <section className="my-5 grid grid-cols-4 gap-8 max-sm:grid-cols-1 max-lg:grid-cols-2">
                {
                    requests?.map(e => {
                        return (
                            <Link href={`request/${e.id}`} className="border-2 my-4 text-center hover:border-[#00B4D8] rounded-md shadow p-4" key={e.id}>
                                <section className="w-32 h-32 m-auto">
                                    <img src={e.image} alt="medicine" />
                                </section>
                                
                                <section className="flex flex-col justify-between w-full mt-4">
                                    <section className="py-2 px-4">
                                        <header className="font-semibold text-xl header-color mt-2 mb-1">
                                            <h1>{e.medicine}</h1>
                                        </header>

                                        <p className="my-1">{e.description}</p>

                                        <p>{e.city} - {e.neighborhood}</p>
                                    </section>

                                    <section className="mt-4">
                                        <button 
                                            className="bg-[#00B4D8] text-sky-100 hover:bg-[#ADE8F4] hover:text-[#023E8A] w-24 p-3 text-md cursor-pointer rounded-md font-semibold text-center w-full"
                                        >
                                            استطيع تقديم المساعدة
                                        </button>
                                    </section>
                                </section>
                            </Link>
                        )
                    })
                }
            </section>
        </article>
    )
}

export default RecentRequests;