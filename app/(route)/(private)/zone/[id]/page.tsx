import TraderDetail from "@/components/trader-detail";
import { zones } from "@/lib/zones";

export default function TraderPage({
  params,
}: {
  params: { id: string };
}) {
  const paramsId = Number(params.id); // ✅ Convert from string

  const zone = zones.find((t) => t.id === paramsId);

  if (!zone) {
    return <div className="p-6 text-red-500">Zone not found 🚫</div>;
  }

  // ✅ Only pass the id
  return <TraderDetail zoneId={paramsId} />;
}
