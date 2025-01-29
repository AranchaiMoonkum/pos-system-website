import UserForm from "@/app/(setting)/user/_components/UserForm"

const UserPage = () => {
    return (
        <div className="w-full">
            <div className="bg-white p-5 rounded-xl">
                <h1 className=" text-2xl font-semibold flex justify-center">
                    Profile
                </h1>
                <hr className="my-3" />

                <UserForm />
            </div>
        </div>
    )
}

export default UserPage
