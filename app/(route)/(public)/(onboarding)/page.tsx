"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { BarChart3 } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { LoginForm } from "@/components/login-form";
import { SignupForm } from "@/components/signup-form";

export default function HomePage() {
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
        const savedUserRole = localStorage.getItem("user_role");

        if (onboardingCompleted === "true" && savedUserRole) {
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
  }, []);

  const handleOnboardingComplete = (role: string) => {
    if (role === "existing_user") {
      setStep("login");
      return;
    }

    localStorage.setItem("user_role", role);
    setUserRole(role);
    setStep("register");
  };

  const handleResetOnboarding = () => {
    localStorage.removeItem("onboarding_completed");
    localStorage.removeItem("user_role");
    setUserRole(null);
    setStep("onboarding");
  };

  if (step === "loading") return <SplashScreen />;
  if (step === "onboarding")
    return <OnboardingFlow onComplete={handleOnboardingComplete} />;
  if (step === "role-selection")
    return <RoleSelectionScreen onComplete={handleOnboardingComplete} />;
  if (step === "register" && userRole)
    return (
      <Register role={userRole} onRegisterSuccess={() => setStep("app")} />
    );
  if (step === "login") return <Login />;
  return (
    <MainApp userRole={userRole} onResetOnboarding={handleResetOnboarding} />
  );
}

// Splash Screen
function SplashScreen() {
  return (
    <div className="min-h-screen bg-[#151515] flex items-center justify-center">
      <motion.div
        initial={{ scale: 0.4, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
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
    <div className="min-h-screen bg-[#454545] text-white flex flex-col">
      <div className="flex-1 flex flex-col items-center justifycenter ">
        <div className="w-full max-w-sm rounded-b-[32px] bg-[#636262] border-red-500 px-6 py-8">

          <div className="">
            <div className="flex justify-center mb-8">
              <div className="w-64 h-64 flex items-center justify-center">
                {currentSlide === 0 ? (
                  <Image
                    src="/coin.svg"
                    alt="coin"
                    width={1000}
                    height={1000}
                  />
                ) : (
                  <Image
                    src="/wallet.svg"
                    alt="wallet"
                    width={1000}
                    height={1000}
                  />
                )}
              </div>
            </div>

            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold mb-4">
                {onboardingSlides[currentSlide].title}
              </h1>
              <p className="text-gray-400 text-sm leading-relaxed">
                {onboardingSlides[currentSlide].description}
              </p>
            </div>

            <div className="flex justify-center gap-2 mb-8">
              {onboardingSlides.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentSlide ? "bg-blue-500" : "bg-gray-600"
                  }`}
                />
              ))}
            </div>
          </div>

        </div>
        <div className="w-full mt-8 px-6">
                 <Button
            onClick={handleNext}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium"
          >
            {currentSlide === onboardingSlides.length - 1
              ? "Continue"
              : "Get Started"}
          </Button>

          <div className="text-center mt-4">
            <button
              onClick={() => setCurrentStep("role-selection")}
              className="text-gray-400 text-sm hover:text-white transition-colors"
            >
              Skip
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
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-900 rounded-lg flex items-center justify-center">
            <BarChart3 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Join Cegnal</h1>
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

// Register Form
function Register({
  role,
  onRegisterSuccess,
}: {
  role: string;
  onRegisterSuccess: () => void;
}) {
  const handleRegister = async (formData: any) => {
    const dataToSend = { ...formData, role };

    console.log("Registering with:", dataToSend);

    // Simulate API call
    setTimeout(() => {
      localStorage.setItem("onboarding_completed", "true");
      onRegisterSuccess();
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12">
      <div className="">
        <div className="bg-white py-8 px-4 border sm:rounded-lg">
          <SignupForm />
        </div>
      </div>
    </div>
  );
}

// Login Screen
function Login() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12">
      <div className="">
        <div className="bg-white py-8 px-4 border sm:rounded-lg">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}

// Main App
function MainApp({
  userRole,
  onResetOnboarding,
}: {
  userRole: string | null;
  onResetOnboarding: () => void;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center mr-3">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">Cegnal</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600 capitalize">
                {userRole === "trader"
                  ? "Forex Trader"
                  : userRole === "analyst"
                  ? "Forex Analyst"
                  : "User"}
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4">
            Welcome to Cegnal!
            {userRole === "trader" && " 📈"}
            {userRole === "analyst" && " 📊"}
          </h2>
          <p className="text-gray-600 mb-4">
            {userRole === "trader"
              ? "Start receiving instant signals from top traders."
              : userRole === "analyst"
              ? "Share your expertise and help traders."
              : "Welcome to your trading dashboard."}
          </p>
          <div className="flex gap-2">
            <Button>Get Started</Button>
            <Button variant="outline" onClick={onResetOnboarding}>
              Reset Onboarding
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
