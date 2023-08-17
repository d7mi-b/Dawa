import { faCapsules, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router"
import Loading from "~/components/Loading";
import { api } from "~/utils/api";

const getDate = (date: Date) => {
    return `${new Date(date).getDay()}/${new Date(date).getMonth() + 1}/${new Date(date).getFullYear()}`;
}

const Request = () => {
    const router = useRouter();
    const id = router.query.id ? router.query.id : "";

    const { data: request, isLoading } = api.request.request.useQuery({ 
        id: typeof id === 'string' ? id : ''
    });

    const { data: checkOwner } = api.request.checkOwner.useQuery({
        id: typeof id === 'string' ? id : ''
    })

    const { data: donation_to_request, isLoading: loadingDonations } = api.donation_to_request.get.useQuery({
        request_id: typeof id === 'string' ? id : ''
    });

    const { data: check } = api.donation_to_request.check.useQuery({
        request_id: typeof id === 'string' ? id : ''
    });

    const { mutate: addDonation, isLoading: loadingAdd } = api.donation_to_request.add.useMutation();

    if (isLoading && loadingDonations)
        return <Loading />

    return (
        <section className="w-3/5 my-8 mx-auto min-h-[53vh] max-lg:w-4/5 max-lg:min-h-[65vh]">
            <section className="flex pb-2 border-b">
                <section>
                    <img src={request?.image} alt={request?.medicine} />
                </section>

                <article className="p-4 flex flex-col justify-center">
                    <header className="header-color font-bold text-3xl flex">
                        <FontAwesomeIcon icon={faCapsules} className="w-10 ml-2" />
                        <h1>{request?.medicine}</h1>
                    </header>

                    <section className="mt-2">
                        <p className="text-2xl">{request?.description}</p>

                        <p className="my-2 text-md">تاريخ الاعلان: {request?.createdAt ? getDate(request?.createdAt) : ''}</p>
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
                                    addDonation({
                                        request_id: typeof id === 'string' ? id : ''
                                    })
                                }}
                                disabled={loadingAdd}
                            >
                                استطيع تقديم المساعدة
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
                                <p>لقد قدمت المساعدة</p>
                            </section>
                        </section>
                    }
                </article>
            </section>

            {
                checkOwner && donation_to_request && donation_to_request.length > 0 &&
                <header className="text-xl font-semibold my-4 px-4 max-sm:text-lg  max-sm:text-center">
                    <h1>الأشخاص المستعدون لتقديم المساعدة</h1>
                </header>
            }

            <section className="my-4 px-4 grid grid-cols-2 gap-4 max-sm:grid-cols-1">
                {
                    checkOwner && donation_to_request && donation_to_request.length > 0 &&
                    donation_to_request.map(e => {
                        return (
                            <article className="p-4 text-lg border rounded-md shadow" key={`${e.request_id}-${e.user_id}`}>
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

export default Request;