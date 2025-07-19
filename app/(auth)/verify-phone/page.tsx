import { PhoneVerificationForm } from "@/components/phone-verification-form"

export default function VerifyPhonePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 border sm:rounded-lg sm:px-10">
          <PhoneVerificationForm />
        </div>
      </div>
    </div>
  )
}
