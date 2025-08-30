import PaymentComponent from "@/components/payment-component";
import { zones, Zone } from "@/lib/zones";

export default async function PaymentPage({
  params,
}: {
  params: Promise<{ zoneId: string }>;
}) {
  const resolvedParams = await params;
  const zoneId = Number(resolvedParams.zoneId);
  
  const zone: Zone | undefined = zones.find((z) => z.id === zoneId);

  if (!zone) {
    return <div className="p-6 text-red-500">Zone not found 🚫</div>;
  }

  return <PaymentComponent zone={zone} />;
}