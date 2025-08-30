export interface Zone {
  id: number;
  status: string;
  name: string;
  avatar: string;
  reviews: number;
  stars: number;
  entryFee: string;
  subscribers: string;
  winRate: string;
  lossRate: string;
  marketType: string;
}

export const zones: Zone[] = [
  {
    id: 1,
    status: "verified",
    name: "Katforex",
    avatar: "/user.jpg",
    reviews: 200,
    stars: 3,
    entryFee: "10$",
    subscribers: "300k",
    winRate: "75%",
    lossRate: "90%",
    marketType: "Spot",
  },
  {
    id: 2,
    status: "verified",
    name: "FXPro",
    avatar: "/abstract-geometric-pattern.png",
    reviews: 150,
    stars: 4,
    entryFee: "15$",
    subscribers: "120k",
    winRate: "68%",
    lossRate: "90%",
    marketType: "Spot",
  },
  {
    id: 3,
    status: "verified",
    name: "PipMasters",
    avatar: "/abstract-geometric-pattern.png",
    reviews: 310,
    stars: 5,
    entryFee: "25$",
    subscribers: "500k",
    winRate: "82%",
    lossRate: "90%",
    marketType: "Spot",
  },
  {
    id: 4,
    status: "verified",
    name: "TradeZone",
    avatar: "/abstract-geometric-pattern.png",
    reviews: 98,
    stars: 3,
    entryFee: "5$",
    subscribers: "80k",
    winRate: "60%",
    lossRate: "90%",
    marketType: "Spot",
  },
  {
    id: 5,
    status: "verified",
    name: "SignalX",
    avatar: "/abstract-geometric-pattern.png",
    reviews: 410,
    stars: 5,
    entryFee: "30$",
    subscribers: "1M",
    winRate: "90%",
    lossRate: "90%",
    marketType: "Spot",
  },
  {
    id: 6,
    status: "verified",
    name: "ForexKings",
    avatar: "/abstract-geometric-pattern.png",
    reviews: 275,
    stars: 4,
    entryFee: "20$",
    subscribers: "350k",
    winRate: "78%",
    lossRate: "90%",
    marketType: "Spot",
  },
];
