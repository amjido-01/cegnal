import { UpdatePasswordForm } from "@/components/update-password"

export default function UpdatePasswordPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 sm:px-10">
          <UpdatePasswordForm />
        </div>
      </div>
    </div>
  )
}
