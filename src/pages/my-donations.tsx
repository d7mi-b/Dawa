import { faHandHoldingHeart, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import Loading from "~/components/Loading";
import { api } from "~/utils/api";

const getDate = (date: Date) => {
    return `${new Date(date).getDay()}/${new Date(date).getMonth() + 1}/${new Date(date).getFullYear()}`;
}

const UserDonations = () => {
    const { data: donations, isLoading } = api.donation.user.useQuery();
    const { mutate: deleteDonation, isLoading: loadingDelete } = api.donation.delete.useMutation({
        onSuccess: e => {
            const donation: HTMLElement = document.getElementById(`donation-${e.id}`)!;

            donation.remove();
        }
    })

    if (isLoading)
        return <Loading />

    return (
        <section className="page py-10 min-h-screen">
            <header className="header-color font-bold text-3xl flex">
                <FontAwesomeIcon icon={faHandHoldingHeart} className="w-10 ml-2" />
                <h1>تبرعاتي</h1>
            </header>

            <section className="my-5">
                {
                    donations && donations.length > 0 &&
                    donations.map(e => {
                        return (
                            <Link href={`donation/${e.id}`} id={`donation-${e.id}`} className="flex justify-between border-2 my-4 hover:border-[#00B4D8] rounded-md shadow p-4 max-sm:flex-col max-sm:text-center" key={e.id}>
                                <section className="w-32 h-32 m-auto">
                                    <img src={e.image} alt="medicine" />
                                </section>
                                
                                <section className="flex flex-col justify-between w-full max-sm:mt-4">
                                    <section className="py-2 px-4">
                                        <header className="font-semibold text-xl header-color mt-2 mb-1">
                                            <h1>{e.medicine}</h1>
                                        </header>

                                        <p className="my-1">{e.description}</p>

                                        <section className="flex max-sm:flex-col">
                                            <p className="ml-4">الكمية: {e.quantity}</p>
                                            <p>تاريخ إنتهاء الدواء: {getDate(e.expiry_Date)}</p>
                                        </section>

                                        <p>{e.city} - {e.neighborhood}</p>
                                    </section>
                                </section>

                                <section className="w-14 flex flex-col justify-center text-center max-sm:mx-auto max-sm:my-4">
                                    {
                                        !loadingDelete &&
                                        <FontAwesomeIcon 
                                            icon={faTrash} 
                                            className="w-5 cursor-pointer hover:text-[#ADE8F4] max-sm:mx-auto" 
                                            onClick={() => deleteDonation({
                                                id: e.id
                                            })}
                                        />
                                    }
                                </section>
                            </Link>
                        )
                    })
                }
            </section>

            {
                donations && donations.length === 0 &&
                <section className="text-center h-64 font-semibold text-xl flex flex-col justify-center">
                    <p>لا يوجد لديك تبرعات</p>
                </section>
            }
        </section>
    )
}

export default UserDonations;