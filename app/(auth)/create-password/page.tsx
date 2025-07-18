import { CreatePasswordForm } from "@/components/create-password-form"

export default function CreatePasswordPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 border-2 sm:rounded-lg sm:px-10">
          <CreatePasswordForm />
        </div>
      </div>
    </div>
  )
}
