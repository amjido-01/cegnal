import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Star } from "lucide-react";
import { useZones } from "@/hooks/use-zone";
import Link from "next/link";
import { TopTradersSkeleton } from "./top-traders-skeleton";

export function Zones() {
  const { zones, zonesError, refetchZones, isFetchingZones } = useZones();
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 ${
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  if (isFetchingZones) return <TopTradersSkeleton />; // skeleton
  if (zonesError) return <div>Error loading products</div>;
  if (!zones || zones.length === 0) return <div>No products found</div>;

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Signal Zones</h3>
      </div>

      <div className="space-y-4">
        {zones.map((zone, idx) => (
          <Card key={idx} className="bg-white py-1 shadow-none">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={zone.avatarUrl} />
                    <AvatarFallback>{zone.zoneName[0]}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium text-gray-900">{zone.zoneName}</span>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">
                    1000 Reviews
                  </p>
                  <div className="flex gap-0.5 mt-1">
                    {renderStars(5)}
                  </div>
                </div>
              </div>

              <div className="bg-[#E7E7E7] rounded-[8px] p-2">
                <div className="grid grid-cols-3 gap-4 mb-4 p-3 divide-x divide-[#D1D1D1]">
                  <div className="text-center">
                    <p className="font-medium text-gray-900 text-sm">
                      {zone.price}
                    </p>
                    <p className="text-xs text-gray-600">Entry Fee</p>
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-gray-900 text-sm">
                      {zone.noOfMembers}
                    </p>
                    <p className="text-xs text-gray-600">Subscribers</p>
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-gray-900 text-sm">
                      {70}
                    </p>
                    <p className="text-xs text-gray-600">Win Rates</p>
                  </div>
                </div>

                <Link
                  href={`/zone/${zone.id}`}
                  className="w-full bg-[#454545] hover:bg-gray-900 text-white px-4 py-2 rounded-md text-center block"
                >
                  View Details
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// import { Card, CardContent } from "./ui/card";
// import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
// import Link from "next/link";
// import { useZones } from "@/hooks/use-zone";
// import { TopTradersSkeleton } from "./top-traders-skeleton";

// export function Zones() {
//   const { zones, zonesError, refetchZones, isFetchingZones } = useZones();

//   if (isFetchingZones) return <TopTradersSkeleton />; // skeleton
//   if (zonesError) return <div>Error loading zones</div>;
//   if (!zones || zones.length === 0) return <div>No zones found</div>;

//   return (
//     <div className="mb-6">
//       <div className="flex items-center justify-between mb-4">
//         <h3 className="text-lg font-semibold text-gray-900">Signal Zones</h3>
//       </div>

//       <div className="space-y-4">
//         {zones.map((zone) => (
//           <Card key={zone.id} className="bg-white py-1 shadow-none">
//             <CardContent className="p-4">
//               {/* Header */}
//               <div className="flex items-center justify-between mb-3">
//                 <div className="flex items-center gap-3">
//                   <Avatar className="w-10 h-10">
//                     <AvatarImage src={zone.avatarUrl} />
//                     <AvatarFallback>
//                       {zone.zoneName[0]}
//                     </AvatarFallback>
//                   </Avatar>
//                   <div>
//                     <span className="font-medium text-gray-900">
//                       {zone.zoneName}
//                     </span>
//                     <p className="text-xs text-gray-500">{zone.description}</p>
//                   </div>
//                 </div>
//                 <div className="text-right text-sm text-gray-600">
//                   By <span className="font-medium">{zone.createdBy}</span>
//                 </div>
//               </div>

//               {/* Stats */}
//               <div className="bg-[#E7E7E7] rounded-[8px] p-2">
//                 <div className="grid grid-cols-2 gap-4 mb-4 p-3 divide-x divide-[#D1D1D1]">
//                   <div className="text-center">
//                     <p className="font-medium text-gray-900 text-sm">
//                       {zone.noOfMembers}
//                     </p>
//                     <p className="text-xs text-gray-600">Members</p>
//                   </div>
//                   <div className="text-center">
//                     <p className="font-medium text-gray-900 text-sm">
//                       ${zone.price}
//                     </p>
//                     <p className="text-xs text-gray-600">Price</p>
//                   </div>
//                 </div>

//                 {/* CTA */}
//                 <Link
//                   href={`/zone/${zone.id}`}
//                   className="w-full bg-[#454545] hover:bg-gray-900 text-white px-4 py-2 rounded-md text-center block"
//                 >
//                   View Details
//                 </Link>
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// }
