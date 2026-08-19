export type InvoiceStatus = "open" | "in-progress" | "completed" | "paid";
export type DiscountType = "none" | "percentage" | "fixed";
export type ItemType = "part" | "labor";

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  total_visits: number;
  lifetime_value: number;
  last_visit: string;
}

export interface Vehicle {
  id: string;
  customer_id: string;
  make: string;
  model: string;
  year: string;
  license_plate: string;
  color: string;
  vin: string;
}

export interface Mechanic {
  id: string;
  name: string;
  specialization: string;
  phone: string;
  employment_type: "fulltime" | "contractor";
  is_active: boolean;
  labor_rate: number;
}

export interface Part {
  id: string;
  name: string;
  part_number: string;
  category: string;
  price: number;
  quantity: number;
  reorder_level: number;
  vendor_name: string;
}

export interface Task {
  id: string;
  title: string;
  mechanic_id: string | null;
  vehicle_id: string | null;
  status: "pending" | "in-progress" | "completed";
  hours_estimated: number;
  hours_spent: number;
  labor_rate: number;
}

export interface InvoiceItem {
  id: string;
  type: ItemType;
  description: string;
  quantity: number;
  price: number;
}

export interface Payment {
  id: string;
  amount: number;
  method: "cash" | "card" | "bank-transfer" | "check" | "other";
  date: string;
  notes?: string;
}

export interface Invoice {
  id: string;
  number: string;
  customer_id: string;
  vehicle_id: string;
  status: InvoiceStatus;
  date: string;
  due_date: string;
  notes: string;
  tax_rate: number;
  discount_type: DiscountType;
  discount_value: number;
  items: InvoiceItem[];
  payments: Payment[];
}

export interface SandboxData {
  customers: Customer[];
  vehicles: Vehicle[];
  mechanics: Mechanic[];
  parts: Part[];
  tasks: Task[];
  invoices: Invoice[];
}