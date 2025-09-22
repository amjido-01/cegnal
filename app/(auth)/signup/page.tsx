"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Register } from "@/app/(route)/(public)/_components/register-screen";
import { Login } from "@/app/(route)/(public)/_components/login-screen";

type Step =
  | "loading"
  | "onboarding"
  | "role-selection"
  | "register"
  | "login";

type UserRole = "trader" | "analyst" | null;

export default function SignupPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("loading");
  const [userRole, setUserRole] = useState<UserRole>(null);

  // Handle splash / resume previous state
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const onboardingCompleted = localStorage.getItem("onboarding_completed");
        const userRegistered = localStorage.getItem("user_registered");
        const savedUserRole = localStorage.getItem("user_role") as UserRole;

        if (onboardingCompleted === "true" && userRegistered === "true" && savedUserRole) {
          router.push("/dashboard");
        } else if (onboardingCompleted === "true" && savedUserRole) {
          setUserRole(savedUserRole);
          setStep("login");
        } else {
          setStep("onboarding");
        }
      } catch (err) {
        console.error("Error reading localStorage:", err);
        setStep("onboarding");
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  // Handle role choice
  const handleOnboardingComplete = (role: UserRole | "existing_user") => {
    if (role === "existing_user") {
      setStep("login");
      return;
    }

    if (role) {
      localStorage.setItem("user_role", role);
      setUserRole(role);
      setStep("register");
    }
  };

  // Handle success registration → OTP verify
  const handleRegisterSuccess = (email: string) => {
    localStorage.setItem("fromRegistration", "true");
    router.push(`/verify-email?email=${encodeURIComponent(email)}&verification_sent=1`);
  };

  // Flow rendering
  if (step === "loading") return <SplashScreen />;
  if (step === "onboarding") return <OnboardingFlow onComplete={handleOnboardingComplete} />;
  if (step === "role-selection") return <RoleSelectionScreen onComplete={handleOnboardingComplete} />;
  if (step === "register" && userRole)
    return <Register userRole={userRole} onRegisterSuccess={handleRegisterSuccess} />;
  if (step === "login") return <Login onLoginSuccess={() => router.push("/dashboard")} />;

  return null;
}

//
// Splash screen
//
function SplashScreen() {
  return (
    <div className="min-h-screen bg-[#151515] flex items-center justify-center">
      <motion.div
        initial={{ scale: 0.3 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="text-center"
      >
        <Image src="/logo.svg" height={200} width={200} alt="Logo" />
      </motion.div>
    </div>
  );
}

//
// Onboarding slides
//
const onboardingSlides = [
  {
    id: 1,
    title: "Welcome to Cegnal",
    description: "Lorem ipsum dolor sit amet consectetur. Nec volutpat tellus lorem mauris odio.",
  },
  {
    id: 2,
    title: "Instant Signals from Top Traders",
    description: "Get real-time alerts from expert traders.",
  },
];

function OnboardingFlow({ onComplete }: { onComplete: (role: UserRole | "existing_user") => void }) {
  const [currentStep, setCurrentStep] = useState<"onboarding" | "role-selection">("onboarding");
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < onboardingSlides.length - 1) {
      setCurrentSlide((s) => s + 1);
    } else {
      setCurrentStep("role-selection");
    }
  };

  if (currentStep === "role-selection") return <RoleSelectionScreen onComplete={onComplete} />;

  return (
    <div className="min-h-screen bg-[#3D3D3D] text-white flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="w-full max-w-sm rounded-b-[32px] bg-[#636262] px-6 py-8">
          <div className="flex justify-center mb-8">
            <div className="w-64 h-64 flex items-center justify-center">
              <Image
                src={currentSlide === 0 ? "/coin.svg" : "/wallet.svg"}
                alt={currentSlide === 0 ? "coin" : "wallet"}
                width={256}
                height={256}
              />
            </div>
          </div>
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">{onboardingSlides[currentSlide].title}</h1>
            <p className="text-base">{onboardingSlides[currentSlide].description}</p>
          </div>
          <div className="flex justify-center gap-2 mb-8">
            {onboardingSlides.map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  width: i === currentSlide ? 26 : 8,
                  height: i === currentSlide ? 4 : 8,
                  borderRadius: i === currentSlide ? 2 : 9999,
                  backgroundColor: i === currentSlide ? "#5B8BFF" : "#D1D1D1",
                }}
                transition={{ duration: 0.3 }}
              />
            ))}
          </div>
        </div>

        <div className="w-full mt-8 px-6">
          <Button
            onClick={handleNext}
            className="w-full bg-[#2E5DFC] hover:bg-blue-700 py-3"
          >
            Get Started
          </Button>
          <div className="text-center mt-4">
            Have an account?
            <button
              onClick={() => onComplete("existing_user")}
              className="text-gray-400 ml-1 hover:text-white text-sm"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

//
// Role selection
//
function RoleSelectionScreen({ onComplete }: { onComplete: (role: UserRole | "existing_user") => void }) {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm text-center">
        <div className="flex justify-center mb-6">
          <Image src="/welcome.svg" width={70} height={70} alt="logo" />
        </div>
        <h1 className="text-4xl font-bold mb-12">Join Cegnal</h1>

        <div className="space-y-4">
          <Button className="w-full bg-blue-600 py-4" onClick={() => onComplete("trader")}>
            As a Forex Trader
          </Button>
          <Button variant="outline" className="w-full py-4" onClick={() => onComplete("analyst")}>
            As a Forex Analyst
          </Button>
        </div>

        <p className="mt-8 text-gray-500 text-sm">
          Already have an account?{" "}
          <button
            className="text-blue-600 font-medium"
            onClick={() => onComplete("existing_user")}
          >
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
}
