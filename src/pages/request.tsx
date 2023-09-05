import { faCapsules, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useRouter } from "next/router";
import { useState } from "react";
import { api } from "~/utils/api";
import { UploadDropzone } from "~/utils/uploadthing";

const Request = () => {
    const router = useRouter();

    const { mutate: addRequest, isLoading } = api.request.add.useMutation({
        onSuccess: async (e) => {
            await router.push(`request/${e.id}`);
        }
    });

    const { mutate: deleteImage } = api.uploadthing.delete.useMutation({
        onSuccess: () => {
            setImage('');
        }
    });

    const [medicine, setMedicine] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [image, setImage] = useState<string>('');
    const [city, setCity] = useState<string>('');
    const [neighborhood, setNeighborhood] = useState<string>('');

    const handelSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        addRequest({
            medicine, description, image, city, neighborhood
        })
    }

    return (
        <section className="w-3/5 mx-auto my-8 py-8 min-h-screen max-lg:w-4/5">
            <header className="header-color font-bold text-3xl flex">
                <FontAwesomeIcon icon={faCapsules} className="w-10 ml-2" />
                <h1>طلب دواء</h1>
            </header>

            <section className="mt-4 mb-8">
                <form onSubmit={handelSubmit}>
                    <section className="my-4">
                        <label htmlFor="medicine" className="text-[#7D8597] font-semibold text-lg">اسم الدواء</label>
                        <input 
                            type="text" name="medicine" 
                            required placeholder="اسم الدواء"
                            className={`
                                w-full p-4 border-2 border-[#7D8597] 
                                bg-transparent my-2 rounded-md
                                text-[#023E8A]
                                focus-visible:border-[#00B4D8] focus-visible:outline-none
                            `}
                            value={medicine}
                            onChange={e => setMedicine(e.target.value)}
                        />
                    </section>

                    <section className="my-4">
                        <label htmlFor="description" className="text-[#7D8597] font-semibold text-lg">وصف الدواء</label>
                        <textarea 
                            name="description" 
                            required placeholder="وصف الدواء"
                            className={`
                                w-full p-4 border-2 border-[#7D8597] 
                                bg-transparent my-2 rounded-md resize-none
                                text-[#023E8A]
                                focus-visible:border-[#00B4D8] focus-visible:outline-none
                            `}
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                    </section>

                    {
                        !image &&
                        <section className="">
                            <label htmlFor="image" className="text-[#7D8597] font-semibold text-lg">صورة الدواء</label>
                            <label htmlFor="image"> ( عنداختيار صورة اضغط على Upload file )</label>
                            <section className="border p-2 rounded-lg text-center m-auto px-48 my-4 max-sm:px-0">
                                <UploadDropzone endpoint="imageUploader"
                                    onClientUploadComplete={(res) => {
                                        // Do something with the response
                                        if (res) {
                                            if (res[0])
                                                setImage(res[0]?.fileUrl)
                                        }
                                        alert("Upload Completed");
                                    }}
                                    onUploadError={(error: Error) => {
                                        // Do something with the error.
                                        alert(`ERROR! ${error.message}`);
                                    }}
                                />
                            </section>
                        </section>
                    }

                    {
                        image && 
                        <section>
                            <p className="text-[#7D8597] font-semibold text-lg">صورة الدواء</p>
                            <img src={image} alt={medicine} className="m-auto" />
                            <section 
                                onClick={() => {
                                    deleteImage({
                                        image
                                    })
                                }}
                                className="hover:text-[#00B4D8] my-2 flex"
                            >
                                <FontAwesomeIcon icon={faTrash} className="w-4 ml-2"/>
                                <p>حذف الصورة</p>
                            </section>
                        </section>
                    }

                    <section className="grid grid-cols-2 gap-8 max-sm:grid-cols-1 max-sm:gap-0">
                        <section className="my-4">
                            <label htmlFor="city" className="text-[#7D8597] font-semibold text-lg">المدينة</label>
                            <input 
                                type='text' name="city" 
                                required placeholder="المدينة"
                                className={`
                                    w-full p-4 border-2 border-[#7D8597] 
                                    bg-transparent my-2 rounded-md
                                    text-[#023E8A]
                                    focus-visible:border-[#00B4D8] focus-visible:outline-none
                                `}
                                value={city}
                                onChange={e => setCity(e.target.value)}
                            />
                        </section>
                        
                        <section className="my-4">
                            <label htmlFor="neighborhood" className="text-[#7D8597] font-semibold text-lg">الحي</label>
                            <input 
                                type='text' name="neighborhood" 
                                required placeholder="الحي"
                                className={`
                                    w-full p-4 border-2 border-[#7D8597] 
                                    bg-transparent my-2 rounded-md
                                    text-[#023E8A]
                                    focus-visible:border-[#00B4D8] focus-visible:outline-none
                                `}
                                value={neighborhood}
                                onChange={e => setNeighborhood(e.target.value)}
                            />
                        </section>
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
                            value='طلب'
                        />
                    </section>
                </form>
            </section>
        </section>
    )
}

export default Request