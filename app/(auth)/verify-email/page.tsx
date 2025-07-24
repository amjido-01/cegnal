import { EmailVerificationForm } from "@/components/email-verification-form"

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 sm:px-10">
          <EmailVerificationForm />
        </div>
      </div>
    </div>
  )
}
