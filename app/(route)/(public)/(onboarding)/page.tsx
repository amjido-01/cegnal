"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { motion } from "framer-motion";
import { Register } from "../_components/register-screen";
import { Login } from "../_components/login-screen";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  const [step, setStep] = useState<
    "loading" | "onboarding" | "role-selection" | "register" | "login" | "app"
  >("loading");
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const onboardingCompleted = localStorage.getItem(
          "onboarding_completed"
        );
        const userRegistered = localStorage.getItem("user_registered");
        const savedUserRole = localStorage.getItem("user_role");

        if (
          onboardingCompleted === "true" &&
          userRegistered === "true" &&
          savedUserRole
        ) {
          setUserRole(savedUserRole);
          router.push("/dashboard"); // Go directly to app if already registered
        } else if (onboardingCompleted === "true" && savedUserRole) {
          setUserRole(savedUserRole);
          setStep("login");
        } else {
          setStep("onboarding");
        }
      } catch (error) {
        console.error("Error reading localStorage:", error);
        setStep("onboarding");
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  const handleOnboardingComplete = (role: string) => {
    if (role === "existing_user") {
      setStep("login");
      return;
    }

    localStorage.setItem("user_role", role);
    setUserRole(role);
    setStep("register");
  };

  const handleRegisterSuccess = () => {
    router.push("/verify-email");
  };

  if (step === "loading") return <SplashScreen />;
  if (step === "onboarding")
    return <OnboardingFlow onComplete={handleOnboardingComplete} />;
  if (step === "role-selection")
    return <RoleSelectionScreen onComplete={handleOnboardingComplete} />;
  if (step === "register" && userRole)
    return (
      <Register userRole={userRole} onRegisterSuccess={handleRegisterSuccess} />
    );
  if (step === "login")
    return <Login onLoginSuccess={() => router.push("/dashboard")} />;
}

// Splash Screen
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

// Onboarding Flow
const onboardingSlides = [
  {
    id: 1,
    title: "Welcome to Cegnal",
    description:
      "Lorem ipsum dolor sit amet consectetur. Nec volutpat tellus lorem mauris odio.",
  },
  {
    id: 2,
    title: "Instant Signals from Top Traders",
    description: "Get real-time alerts from expert traders.",
  },
];

function OnboardingFlow({
  onComplete,
}: {
  onComplete: (role: string) => void;
}) {
  const [currentStep, setCurrentStep] = useState<
    "onboarding" | "role-selection"
  >("onboarding");
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < onboardingSlides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      setCurrentStep("role-selection");
    }
  };

  if (currentStep === "role-selection") {
    return <RoleSelectionScreen onComplete={onComplete} />;
  }

  return (
    <div className="min-h-screen bg-[#3D3D3D] text-white flex flex-col">
      <div className="flex-1 flex flex-col items-center justifycenter ">
        <div className="w-full max-w-sm rounded-b-[32px] bg-[#636262] border-red-500 px-6 py-8">
          <div className="">
            <div className="flex justify-center mb-8">
              <div className="w-64 h-64 flex items-center justify-center">
                {currentSlide === 0 ? (
                  <Image
                    src="/coin.svg"
                    alt="coin"
                    priority
                    width={1000}
                    height={1000}
                  />
                ) : (
                  <Image
                    src="/wallet.svg"
                    alt="wallet"
                    priority
                    width={300}
                    height={300}
                  />
                )}
              </div>
            </div>

            <div className="text-center mb-8 leading-[100%] tracking-[-2.8%]">
              <h1 className="text-4xl font-bold text-[#FEFEFE] mb-4">
                {onboardingSlides[currentSlide].title}
              </h1>
              <p className="text-[#F6F6F6] font-normal text-[16px]">
                {onboardingSlides[currentSlide].description}
              </p>
            </div>

            <div className="flex justify-center items-center gap-2 mb-8">
              {onboardingSlides.map((_, index) => (
                <motion.div
                  key={index}
                  initial={false}
                  animate={{
                    width: index === currentSlide ? 26 : 8,
                    height: index === currentSlide ? 4 : 8,
                    borderRadius: index === currentSlide ? 2 : 9999,
                    backgroundColor:
                      index === currentSlide ? "#5B8BFF" : "#D1D1D1",
                  }}
                  transition={{
                    duration: 0.3,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="w-full mt-8 px-6">
          <Button
            onClick={handleNext}
            className="w-full bg-[#2E5DFC] hover:bg-blue-700 text-white py-3 rounded-lg font-medium"
          >
            Get Started
          </Button>

          <div className="text-center mt-4">
            Have an account?
            <button
              onClick={() => onComplete("existing_user")}
              className="text-gray-400 ml-1 text-sm hover:text-white transition-colors"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Role Selection Screen
function RoleSelectionScreen({
  onComplete,
}: {
  onComplete: (role: string) => void;
}) {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-[24px] items-center">
            <Image
              src="/welcome.svg"
              className=""
              width={70}
              height={70}
              alt="logo"
            />
          </div>
          <h1 className="text-4xl font-bold text-[#000000] tracking-[-2.8%] leading-[40%]">
            Join Cegnal
          </h1>
        </div>

        <div className="space-y-4">
          <Button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-lg font-medium text-base"
            onClick={() => onComplete("trader")}
          >
            As a Forex Trader
          </Button>

          <Button
            variant="outline"
            className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 py-4 rounded-lg font-medium text-base"
            onClick={() => onComplete("analyst")}
          >
            As a Forex Analyst
          </Button>
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">
            Already have an account?{" "}
            <button
              className="text-blue-600 hover:text-blue-700 font-medium"
              onClick={() => onComplete("existing_user")}
            >
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
