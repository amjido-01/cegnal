import { SignupForm } from "@/components/signup-form"


export default function CreateAccountPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12">
      <div className="">
        <div className="bg-white py-8 px-4 border sm:rounded-lg">
          <SignupForm />
        </div>
      </div>
    </div>
  )
}
