import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCapsules, faHandHoldingHeart, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useState } from "react";
import Loading from "~/components/Loading";
import RecentDonations from "~/components/RecentDonations";
import RecentRequests from "~/components/RecentRequests";
import { api } from "~/utils/api";
import type { Donation, Request } from "~/types";

const getDate = (date: Date) => {
    return `${new Date(date).getDay()}/${new Date(date).getMonth() + 1}/${new Date(date).getFullYear()}`;
}

export default function Home() {
    const [search, setSearch] = useState<string>('');
    const [visibleSearch, setVisibleSearch] = useState<boolean>(false);

    const { data: requests, isLoading: loadingRequests } = api.request.get.useQuery();
    const { data: donations, isLoading: loadingDonations } = api.donation.get.useQuery();

    const { data: searchRequest } = api.request.search.useQuery({
        search
    });

    const { data: searchDonations } = api.donation.search.useQuery({
        search
    });

    return (
        <>
            {
                loadingRequests && loadingDonations && <Loading />
            }

            {
                !loadingRequests && !loadingDonations &&
                <main className="bg-image min-h-screen ">

                {/* Search section */}
                <section className="page relative">
                    <form>
                        <section className="w-full p-4 flex border-2 border-[#ADE8F4] rounded-md mt-8">
                            <FontAwesomeIcon icon={faMagnifyingGlass} className="w-4 mx-3" />
                            <input 
                                name='search' type='search' placeholder="البحث عن دواء" 
                                className={` 
                                    w-full
                                    bg-transparent
                                    focus-visible:outline-none
                                `}
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onMouseOver={() => setVisibleSearch(true)}
                            />
                        </section>
                    </form>

                    {
                        visibleSearch && search && (searchRequest ?? searchDonations) &&
                        <section className="p-4 border rounded-md shadow my-3 absolute w-full bg-slate-50 top-18 h-[40vh] overflow-y-scroll" onMouseLeave={() => setVisibleSearch(false)}>
                            {
                                searchRequest && 
                                <article className="border-b py-2">
                                    <header className="header-color font-semibold text-xl">
                                        <h1>الطلبات</h1>
                                    </header>
                                    {
                                        searchRequest.length === 0 &&
                                        <section className="text-center text-2xl font-semibold py-4">
                                            <p>لا توجد طلبات</p>
                                        </section>
                                    }
                                    {
                                        searchRequest?.map((e: Request) => {
                                            return (
                                                <Link href={`request/${e.id}`} id={`donation-${e.id}`} className="flex justify-between border-2 my-4 hover:border-[#00B4D8] rounded-md shadow p-4" key={e.id}>
                                                    <section className="w-32 h-32 m-auto">
                                                        <img src={e.image} alt="medicine" />
                                                    </section>
                                                    
                                                    <section className="flex flex-col justify-between w-full">
                                                        <section className="py-2 px-4">
                                                            <header className="font-semibold text-xl header-color mt-2 mb-1">
                                                                <h1>{e.medicine}</h1>
                                                            </header>

                                                            <p className="my-1">{e.description}</p>

                                                            <p>{e.city} - {e.neighborhood}</p>
                                                        </section>
                                                    </section>
                                                </Link>
                                            )
                                        })
                                    }
                                </article>
                            }
                            {
                                searchDonations && 
                                <article className="border-b py-2">
                                    <header className="header-color font-semibold text-xl">
                                        <h1>التبرعات</h1>
                                    </header>
                                    {
                                        searchDonations.length === 0 &&
                                        <section className="text-center text-2xl font-semibold py-4">
                                            <p>لا توجد تبرعات</p>
                                        </section>
                                    }
                                    {
                                        searchDonations?.map((e: Donation) => {
                                            return (
                                                <Link href={`donation/${e.id}`} id={`donation-${e.id}`} className="flex justify-between border-2 my-4 hover:border-[#00B4D8] rounded-md shadow p-4" key={e.id}>
                                                    <section className="w-32 h-32 m-auto">
                                                        <img src={e.image} alt="medicine" />
                                                    </section>
                                                    
                                                    <section className="flex flex-col justify-between w-full">
                                                        <section className="py-2 px-4">
                                                            <header className="font-semibold text-xl header-color mt-2 mb-1">
                                                                <h1>{e.medicine}</h1>
                                                            </header>

                                                            <p className="my-1">{e.description}</p>

                                                            <section className="flex max-lg:flex-col">
                                                                <p className="ml-4 max-lg:my-2">الكمية: {e.quantity}</p>
                                                                <p>تاريخ إنتهاء الدواء: {getDate(e.expiry_Date)}</p>
                                                            </section>

                                                            <p>{e.city} - {e.neighborhood}</p>
                                                        </section>
                                                    </section>
                                                </Link>
                                            )
                                        })
                                    }
                                </article>
                            }
                        </section>
                    }
                </section>

                {/* Fast Access */}
                <section className="page grid grid-cols-2 gap-4 pt-8">
                    <Link href='request' className="linear-bg h-48 flex flex-col justify-center rounded-lg max-lg:h-32">
                        <section className="flex justify-center">
                            <FontAwesomeIcon icon={faCapsules} className="ml-3 w-24 max-lg:w-10"/>
                            <p className="text-3xl font-bold mt-5 max-lg:mt-0 max-lg:text-xl">طلب دواء</p>
                        </section>
                    </Link>

                    <Link href='donations' className="linear-bg h-48 flex flex-col justify-center rounded-lg max-lg:h-32">
                        <section className="flex justify-center">
                            <FontAwesomeIcon icon={faHandHoldingHeart} className="ml-3 w-24 max-lg:w-10"/>
                            <p className="text-3xl font-bold mt-5 max-lg:mt-0 max-lg:text-xl">التبرع بدواء</p>
                        </section>
                    </Link>
                </section>

                {
                    requests && requests.length > 0 &&
                    <RecentRequests requests={requests} />
                }

                <section className="pt-8 my-8">
                    <p className="page linear-bg p-8 text-center font-semibold text-2xl rounded-md mt-8 max-sm:text-xl">
                        بتبرعك تخفف عنهم ما أصابهم وتكون خير عونٍ لهم
                    </p>
                </section>

                {
                    donations && donations.length > 0 && 
                    <RecentDonations donations={donations} />
                }

                </main>
            }
        </>
    );
}
