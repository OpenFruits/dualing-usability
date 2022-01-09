export type OptionType = {
  value: string;
  label: string;
};

export type SignUpForms = {
  firstName: string;
  lastName: string;
  firstKana: string;
  lastKana: string;
  email: string;
  phoneNumber: string;
  university: string;
  department: string;
  club: string;
  important: OptionType[];
  industries: OptionType[];
  occupations: OptionType[];
  locations: OptionType[];
  advantages: OptionType[];
  comment: string;
  password: string;
  confirmPassword: string;
};

export type EditForms = Omit<SignUpForms, "email" | "phoneNumber" | "password" | "confirmPassword">;

export type Notice = {
  id: string;
  title: string;
  body: string;
  isRead: boolean;
};

export type Student = {
  uid: number;
  firstName: string;
  lastName: string;
  firstKana: string;
  lastKana: string;
  university: string;
  department: string;
  club: string;
  important: string[];
  industries: string[];
  occupations: string[];
  locations: string[];
  advantages: string[];
  comment: string;
  vimeoUrl: string;
  thumbnailUrl: string;
  relation: "no" | "scout" | "match";
};

export type Company = {
  id: string;
  name: string;
  email: string;
  industry: string;
  occupations: string[];
  corporateUrl: string;
  recruitUrl: string;
};
