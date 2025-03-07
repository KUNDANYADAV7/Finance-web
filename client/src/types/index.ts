export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: string;
}

export interface Account {
  id: string;
  name: string;
  balance: number;
  transactions: Transaction[];
}

export interface CreditCard {
  id: string;
  name: string;
  number: string;
  expiryDate: string;
  cvv: string;
  limit: number;
  balance: number;
  transactions: Transaction[];
}

export interface DebitCard {
  id: string;
  name: string;
  number: string;
  expiryDate: string;
  cvv: string;
  linkedAccount: string;
  transactions: Transaction[];
}

export interface Investment {
  id: string;
  name: string;
  type: string;
  amount: number;
  returnRate: number;
  startDate: string;
}

export interface BudgetCategory {
  id: string;
  name: string;
  allocated: number;
  spent: number;
}

export interface Budget {
  id: string;
  month: string;
  year: number;
  categories: BudgetCategory[];
}

export interface MonthlyExpense {
  id: string;
  category: string;
  amount: number;
  date: string;
}

export interface EMI {
  id: string;
  name: string;
  amount: number;
  startDate: string;
  endDate: string;
  remainingPayments: number;
  totalPayments: number;
  nextPaymentDate: string;
  autopay: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  isLoggedIn: boolean;
}