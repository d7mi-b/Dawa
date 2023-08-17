import { faCapsules, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router"
import Loading from "~/components/Loading";
import { api } from "~/utils/api";

const getDate = (date: Date) => {
    return `${new Date(date).getDay()}/${new Date(date).getMonth() + 1}/${new Date(date).getFullYear()}`;
}

const Donation = () => {
    const router = useRouter();
    const id = router.query.id ? router.query.id : "";

    const { data: donation, isLoading } = api.donation.donation.useQuery({ 
        id: typeof id === 'string' ? id : ''
    });

    const { data: checkOwner } = api.donation.checkOwner.useQuery({
        id: typeof id === 'string' ? id : ''
    })

    const { data: request_to_donation, isLoading: loadingRequests } = api.request_to_donation.get.useQuery({
        donation_id: typeof id === 'string' ? id : ''
    });

    const { data: check } = api.request_to_donation.check.useQuery({
        donation_id: typeof id === 'string' ? id : ''
    });

    const { mutate: addRequest, isLoading: loadingAdd } = api.request_to_donation.add.useMutation();

    if (isLoading && loadingRequests)
        return <Loading />

    return (
        <section className="w-3/5 my-8 mx-auto min-h-[53vh] max-lg:w-4/5 max-lg:min-h-[65vh]">
            <section className="flex pb-2 border-b">
                <section>
                    <img src={donation?.image} alt={donation?.medicine} />
                </section>

                <article className="p-4 flex flex-col justify-center">
                    <header className="header-color font-bold text-3xl flex">
                        <FontAwesomeIcon icon={faCapsules} className="w-10 ml-2" />
                        <h1>{donation?.medicine}</h1>
                    </header>

                    <section className="mt-2">
                        <p className="text-2xl max-sm:text-xl">{donation?.description}</p>
                        
                        <section className="flex text-xl my-2 max-sm:flex-col max-sm:text-lg">
                            <p>الكمية: {donation?.quantity}</p>
                            <p className="mr-4 max-sm:mr-0">تاريخ إنتهاء الدواء: {donation?.expiry_Date ? getDate(donation?.expiry_Date) : ''}</p>
                        </section>

                        <p className="my-2 text-md max-sm:text-sm">تاريخ الاعلان: {donation?.createdAt ? getDate(donation?.createdAt) : ''}</p>
                    </section>

                    {
                        !check && !checkOwner &&
                        <section className="mt-4">
                            <button 
                                className={`
                                    bg-[#00B4D8] text-[#ADE8F4] hover:bg-[#ADE8F4] hover:text-[#023E8A] w-24 p-3 
                                    text-md cursor-pointer rounded-md font-semibold text-center w-full
                                    disabled:bg-[#ADE8F4] disabled:text-[#023E8A] 
                                `}
                                onClick={() => {
                                    addRequest({
                                        donation_id: typeof id === 'string' ? id : ''
                                    })
                                }}
                                disabled={loadingAdd}
                            >
                                طلب المساعدة
                            </button>
                        </section>
                    }

                    {
                        check && !checkOwner &&
                        <section className="mt-4">
                            <section 
                                className={`
                                    bg-[#ADE8F4] text-[#023E8A] w-24 p-3 flex
                                    text-md cursor-pointer rounded-md font-semibold text-center w-full
                                    disabled:bg-[#ADE8F4] disabled:text-[#023E8A] 
                                `}
                            >
                                <FontAwesomeIcon icon={faCheckCircle} className="w-5 ml-2"/>
                                <p>لقد طلبت المساعدة</p>
                            </section>
                        </section>
                    }
                </article>
            </section>

            {
                checkOwner && request_to_donation && request_to_donation.length > 0 &&
                <header className="text-xl font-semibold my-4 px-4 max-sm:text-lg  max-sm:text-center">
                    <h1>الأشخاص المحتاجون لتقديم المساعدة</h1>
                </header>
            }

            <section className="my-4 px-4 grid grid-cols-2 max-sm:grid-cols-1 max-lg:grid-cols-2">
                {
                    checkOwner && request_to_donation && request_to_donation.length > 0 &&
                    request_to_donation.map(e => {
                        return (
                            <article className="p-4 text-lg border rounded-md shadow" key={`${e.donation_id}-${e.user_id}`}>
                                <header className="header-color mb-2 font-semibold">
                                    <h1>{e.user.name}</h1>
                                </header>

                                <section>
                                    <p>البريد الالكتروني: <a href={`mailto:${e.user.email}`} className="hover:text-[#00B4D8]">{e.user.email}</a></p>
                                    <p>الهاتف: <a href={`tel:${e.user.phone}`} className="hover:text-[#00B4D8]">{e.user.phone}</a></p>
                                </section>

                                <section className="text-sm text-left">
                                    <p>{getDate(e.createdAt)}</p>
                                </section>
                            </article>
                        )
                    })
                }
            </section>
        </section>
    )
}

export default Donation;