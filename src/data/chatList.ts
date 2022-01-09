export type Message = {
  id: number;
  role: "company" | "student";
  timestamp: string;
  message: string;
};

export type Chat = {
  id: number;
  messages: Message[];
};

export const chatList: Chat[] = [
  {
    id: 1,
    messages: [
      {
        id: 1,
        role: "company",
        timestamp: "2021/11/1 12:25",
        message: "はじめまして",
      },
      {
        id: 2,
        role: "student",
        timestamp: "2021/11/1 12:35",
        message: "はじめまして",
      },
    ],
  },
  {
    id: 2,
    messages: [
      {
        id: 1,
        role: "company",
        timestamp: "2021/11/2 14:05",
        message: "はじめまして",
      },
      {
        id: 2,
        role: "student",
        timestamp: "2021/11/1 16:21",
        message: "はじめまして",
      },
    ],
  },
];
