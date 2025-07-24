import Image from "next/image"

export function TradingIllustration() {
  return (
    <div className="w-full flex justify-center">
      <Image
        src="/wallet.svg" // replace with your actual SVG path
        alt="Trading Illustration"
        width={300}
        height={300}
        priority
      />
    </div>
  )
}
