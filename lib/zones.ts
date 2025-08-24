export interface Zone {
  id: number
  name: string
  avatar: string
  reviews: number
  stars: number
  entryFee: string
  subscribers: string
  winRate: string
}

export const zones: Zone[] = [
  {
    id: 1,
    name: "Katforex",
    avatar: "/abstract-geometric-pattern.png",
    reviews: 200,
    stars: 3,
    entryFee: "10$",
    subscribers: "300k",
    winRate: "75%",
  },
  {
    id: 2,
    name: "FXPro",
    avatar: "/abstract-geometric-pattern.png",
    reviews: 150,
    stars: 4,
    entryFee: "15$",
    subscribers: "120k",
    winRate: "68%",
  },
  {
    id: 3,
    name: "PipMasters",
    avatar: "/abstract-geometric-pattern.png",
    reviews: 310,
    stars: 5,
    entryFee: "25$",
    subscribers: "500k",
    winRate: "82%",
  },
  {
    id: 4,
    name: "TradeZone",
    avatar: "/abstract-geometric-pattern.png",
    reviews: 98,
    stars: 3,
    entryFee: "5$",
    subscribers: "80k",
    winRate: "60%",
  },
  {
    id: 5,
    name: "SignalX",
    avatar: "/abstract-geometric-pattern.png",
    reviews: 410,
    stars: 5,
    entryFee: "30$",
    subscribers: "1M",
    winRate: "90%",
  },
  {
    id: 6,
    name: "ForexKings",
    avatar: "/abstract-geometric-pattern.png",
    reviews: 275,
    stars: 4,
    entryFee: "20$",
    subscribers: "350k",
    winRate: "78%",
  },
];
