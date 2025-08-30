import TraderDetail from "@/components/zone-detail";
import { zones } from "@/lib/zones";

export default async function ZonePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const paramsId = Number(resolvedParams.id);
  
  const zone = zones.find((t) => t.id === paramsId);
  
  if (!zone) {
    return <div className="p-6 text-red-500">Zone not found 🚫</div>;
  }
  
  return <TraderDetail zoneId={paramsId} />;
}