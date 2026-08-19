import type { SandboxData } from "./types";

const daysAgo = (n: number) => {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString();
};
const daysAhead = (n: number) => daysAgo(-n);

export const SHOP = {
  name: "Northside Auto Care",
  address: "418 Rowan Street, Springfield, IL 62704",
  phone: "(217) 555-0142",
  email: "service@northsideauto.example",
  taxRate: 8.25,
  laborRate: 95,
};

export const seedData: SandboxData = {
  customers: [
    { id: "c1", name: "Marcus Ellery", email: "marcus.ellery@example.com", phone: "(217) 555-0181", address: "22 Larkspur Ave, Springfield", total_visits: 9, lifetime_value: 4820, last_visit: daysAgo(6) },
    { id: "c2", name: "Dana Whitfield", email: "dana.w@example.com", phone: "(217) 555-0114", address: "77 Chestnut St, Springfield", total_visits: 4, lifetime_value: 1935, last_visit: daysAgo(13) },
    { id: "c3", name: "Ruiz Landscaping LLC", email: "fleet@ruizland.example", phone: "(217) 555-0166", address: "1200 Industrial Pkwy, Springfield", total_visits: 22, lifetime_value: 18740, last_visit: daysAgo(2) },
    { id: "c4", name: "Priya Raghunathan", email: "priya.r@example.com", phone: "(217) 555-0173", address: "9 Foxglove Ct, Chatham", total_visits: 3, lifetime_value: 1120, last_visit: daysAgo(21) },
    { id: "c5", name: "Tom Barreto", email: "tbarreto@example.com", phone: "(217) 555-0129", address: "540 Oak Ridge Rd, Springfield", total_visits: 6, lifetime_value: 2760, last_visit: daysAgo(9) },
    { id: "c6", name: "Hollis Bakery", email: "ops@hollisbakery.example", phone: "(217) 555-0155", address: "310 Market St, Springfield", total_visits: 11, lifetime_value: 7310, last_visit: daysAgo(4) },
    { id: "c7", name: "Alina Kovač", email: "alina.kovac@example.com", phone: "(217) 555-0198", address: "63 Willow Bend, Sherman", total_visits: 2, lifetime_value: 640, last_visit: daysAgo(34) },
    { id: "c8", name: "Everett Sloan", email: "e.sloan@example.com", phone: "(217) 555-0102", address: "1487 Prairie View Dr, Springfield", total_visits: 7, lifetime_value: 3395, last_visit: daysAgo(17) },
  ],
  vehicles: [
    { id: "v1", customer_id: "c1", make: "Toyota", model: "Tacoma", year: "2019", license_plate: "IL 4KJ-221", color: "Silver", vin: "5TFAX5GN9KX061254" },
    { id: "v2", customer_id: "c1", make: "Honda", model: "Civic", year: "2015", license_plate: "IL 7BR-904", color: "Blue", vin: "19XFB2F53FE201776" },
    { id: "v3", customer_id: "c2", make: "Subaru", model: "Outback", year: "2021", license_plate: "IL 9WD-118", color: "Green", vin: "4S4BTACC6M3140912" },
    { id: "v4", customer_id: "c3", make: "Ford", model: "F-250", year: "2018", license_plate: "IL FLT-311", color: "White", vin: "1FT7W2BT4JEC08841" },
    { id: "v5", customer_id: "c3", make: "Ford", model: "Transit 250", year: "2020", license_plate: "IL FLT-312", color: "White", vin: "1FTBR1C85LKA33017" },
    { id: "v6", customer_id: "c4", make: "Hyundai", model: "Elantra", year: "2017", license_plate: "IL 2QP-778", color: "Grey", vin: "5NPD84LF9HH003912" },
    { id: "v7", customer_id: "c5", make: "Chevrolet", model: "Silverado 1500", year: "2016", license_plate: "IL 6MC-540", color: "Black", vin: "3GCUKREC8GG204418" },
    { id: "v8", customer_id: "c6", make: "Mercedes-Benz", model: "Sprinter 2500", year: "2019", license_plate: "IL HBK-002", color: "White", vin: "WD4PF1CD9KP061229" },
    { id: "v9", customer_id: "c7", make: "Volkswagen", model: "Jetta", year: "2014", license_plate: "IL 1ZZ-365", color: "Red", vin: "3VWD07AJ5EM388120" },
    { id: "v10", customer_id: "c8", make: "Jeep", model: "Grand Cherokee", year: "2020", license_plate: "IL 8TR-449", color: "Dark Grey", vin: "1C4RJFBG9LC201884" },
  ],
  mechanics: [
    { id: "m1", name: "Devon Marsh", specialization: "Diagnostics & electrical", phone: "(217) 555-0311", employment_type: "fulltime", is_active: true, labor_rate: 105 },
    { id: "m2", name: "Kelsey Nunez", specialization: "Brakes & suspension", phone: "(217) 555-0312", employment_type: "fulltime", is_active: true, labor_rate: 95 },
    { id: "m3", name: "Ibrahim Odeh", specialization: "Engine & drivetrain", phone: "(217) 555-0313", employment_type: "fulltime", is_active: true, labor_rate: 110 },
    { id: "m4", name: "Casey Lindgren", specialization: "Tyres & alignment", phone: "(217) 555-0314", employment_type: "contractor", is_active: false, labor_rate: 85 },
  ],
  parts: [
    { id: "p1", name: "Front brake pad set", part_number: "BP-4471", category: "Brakes", price: 68.4, quantity: 14, reorder_level: 6, vendor_name: "Midwest Parts Co." },
    { id: "p2", name: "Rear brake pad set", part_number: "BP-4472", category: "Brakes", price: 61.9, quantity: 9, reorder_level: 6, vendor_name: "Midwest Parts Co." },
    { id: "p3", name: "Brake rotor (vented, 320mm)", part_number: "RT-3200", category: "Brakes", price: 89.0, quantity: 8, reorder_level: 4, vendor_name: "Midwest Parts Co." },
    { id: "p4", name: "Full synthetic oil 5W-30 (1qt)", part_number: "OIL-530", category: "Fluids", price: 8.75, quantity: 96, reorder_level: 24, vendor_name: "Lubrix Supply" },
    { id: "p5", name: "Oil filter (spin-on)", part_number: "OF-1180", category: "Filters", price: 11.25, quantity: 31, reorder_level: 10, vendor_name: "Lubrix Supply" },
    { id: "p6", name: "Engine air filter", part_number: "AF-2205", category: "Filters", price: 19.4, quantity: 22, reorder_level: 8, vendor_name: "Lubrix Supply" },
    { id: "p7", name: "Cabin air filter", part_number: "CF-2206", category: "Filters", price: 16.8, quantity: 17, reorder_level: 8, vendor_name: "Lubrix Supply" },
    { id: "p8", name: "Spark plug (iridium)", part_number: "SP-7741", category: "Ignition", price: 14.6, quantity: 40, reorder_level: 16, vendor_name: "Delta Ignition" },
    { id: "p9", name: "Ignition coil", part_number: "IC-9012", category: "Ignition", price: 74.5, quantity: 5, reorder_level: 3, vendor_name: "Delta Ignition" },
    { id: "p10", name: "Serpentine belt", part_number: "BLT-6PK", category: "Engine", price: 34.9, quantity: 7, reorder_level: 4, vendor_name: "Midwest Parts Co." },
    { id: "p11", name: "Water pump assembly", part_number: "WP-5510", category: "Cooling", price: 142.0, quantity: 3, reorder_level: 2, vendor_name: "CoolFlow Distributors" },
    { id: "p12", name: "Thermostat & housing", part_number: "TH-2280", category: "Cooling", price: 47.25, quantity: 6, reorder_level: 3, vendor_name: "CoolFlow Distributors" },
    { id: "p13", name: "Coolant, extended life (1gal)", part_number: "CL-1G", category: "Fluids", price: 22.4, quantity: 18, reorder_level: 6, vendor_name: "CoolFlow Distributors" },
    { id: "p14", name: "Battery, 650 CCA", part_number: "BT-650", category: "Electrical", price: 164.0, quantity: 6, reorder_level: 3, vendor_name: "VoltLine" },
    { id: "p15", name: "Alternator, remanufactured", part_number: "ALT-8890", category: "Electrical", price: 248.0, quantity: 2, reorder_level: 2, vendor_name: "VoltLine" },
    { id: "p16", name: "Starter motor", part_number: "STR-4410", category: "Electrical", price: 196.5, quantity: 2, reorder_level: 2, vendor_name: "VoltLine" },
    { id: "p17", name: "Wheel bearing hub assembly", part_number: "HB-7723", category: "Suspension", price: 118.0, quantity: 4, reorder_level: 2, vendor_name: "Axis Chassis" },
    { id: "p18", name: "Front strut assembly", part_number: "ST-3341", category: "Suspension", price: 154.75, quantity: 4, reorder_level: 2, vendor_name: "Axis Chassis" },
    { id: "p19", name: "Stabiliser link kit", part_number: "SL-1120", category: "Suspension", price: 38.6, quantity: 10, reorder_level: 4, vendor_name: "Axis Chassis" },
    { id: "p20", name: "Tyre 225/65R17 (all season)", part_number: "TY-22565", category: "Tyres", price: 132.0, quantity: 12, reorder_level: 4, vendor_name: "Rollex Tyre" },
    { id: "p21", name: "Tyre 265/70R17 (all terrain)", part_number: "TY-26570", category: "Tyres", price: 187.0, quantity: 8, reorder_level: 4, vendor_name: "Rollex Tyre" },
    { id: "p22", name: "Wiper blade pair", part_number: "WB-2200", category: "Accessories", price: 27.5, quantity: 20, reorder_level: 8, vendor_name: "Midwest Parts Co." },
    { id: "p23", name: "Transmission fluid ATF (1qt)", part_number: "ATF-1Q", category: "Fluids", price: 12.9, quantity: 34, reorder_level: 12, vendor_name: "Lubrix Supply" },
    { id: "p24", name: "Cabin blower motor", part_number: "BM-4402", category: "HVAC", price: 128.4, quantity: 2, reorder_level: 1, vendor_name: "VoltLine" },
    { id: "p25", name: "AC compressor", part_number: "AC-9931", category: "HVAC", price: 312.0, quantity: 1, reorder_level: 1, vendor_name: "CoolFlow Distributors" },
  ],
  tasks: [
    { id: "t1", title: "Front brake pads & rotors — Tacoma", mechanic_id: "m2", vehicle_id: "v1", status: "in-progress", hours_estimated: 2.5, hours_spent: 1.5, labor_rate: 95 },
    { id: "t2", title: "Full service & oil change — Outback", mechanic_id: "m1", vehicle_id: "v3", status: "completed", hours_estimated: 1.5, hours_spent: 1.4, labor_rate: 105 },
    { id: "t3", title: "Fleet inspection (6 units) — Ruiz", mechanic_id: "m3", vehicle_id: "v4", status: "in-progress", hours_estimated: 6, hours_spent: 3.5, labor_rate: 110 },
    { id: "t4", title: "Misfire diagnosis — Civic", mechanic_id: "m1", vehicle_id: "v2", status: "pending", hours_estimated: 1, hours_spent: 0, labor_rate: 105 },
    { id: "t5", title: "Coolant leak, water pump replace — Silverado", mechanic_id: "m3", vehicle_id: "v7", status: "in-progress", hours_estimated: 4, hours_spent: 2, labor_rate: 110 },
    { id: "t6", title: "Alignment & tyre rotation — Elantra", mechanic_id: "m4", vehicle_id: "v6", status: "pending", hours_estimated: 1.5, hours_spent: 0, labor_rate: 85 },
    { id: "t7", title: "Sprinter B-service — Hollis Bakery", mechanic_id: "m3", vehicle_id: "v8", status: "completed", hours_estimated: 3, hours_spent: 3.2, labor_rate: 110 },
    { id: "t8", title: "Battery & charging system test — Jetta", mechanic_id: "m1", vehicle_id: "v9", status: "completed", hours_estimated: 0.5, hours_spent: 0.6, labor_rate: 105 },
    { id: "t9", title: "Rear strut replacement — Grand Cherokee", mechanic_id: "m2", vehicle_id: "v10", status: "pending", hours_estimated: 3, hours_spent: 0, labor_rate: 95 },
    { id: "t10", title: "AC not cooling — Transit 250", mechanic_id: "m1", vehicle_id: "v5", status: "in-progress", hours_estimated: 2, hours_spent: 0.8, labor_rate: 105 },
  ],
  invoices: [
    {
      id: "i1", number: "INV-1042", customer_id: "c1", vehicle_id: "v1", status: "in-progress",
      date: daysAgo(1), due_date: daysAhead(13), notes: "Customer reports grinding on braking.",
      tax_rate: 8.25, discount_type: "none", discount_value: 0,
      items: [
        { id: "i1a", type: "part", description: "Front brake pad set (BP-4471)", quantity: 1, price: 68.4 },
        { id: "i1b", type: "part", description: "Brake rotor (vented, 320mm)", quantity: 2, price: 89 },
        { id: "i1c", type: "labor", description: "Brake pads & rotors — Devon Marsh", quantity: 2.5, price: 95 },
      ],
      payments: [],
    },
    {
      id: "i2", number: "INV-1041", customer_id: "c2", vehicle_id: "v3", status: "paid",
      date: daysAgo(4), due_date: daysAgo(-10), notes: "",
      tax_rate: 8.25, discount_type: "none", discount_value: 0,
      items: [
        { id: "i2a", type: "part", description: "Full synthetic oil 5W-30 (1qt)", quantity: 6, price: 8.75 },
        { id: "i2b", type: "part", description: "Oil filter (spin-on)", quantity: 1, price: 11.25 },
        { id: "i2c", type: "part", description: "Cabin air filter", quantity: 1, price: 16.8 },
        { id: "i2d", type: "labor", description: "Full service — Devon Marsh", quantity: 1.4, price: 105 },
      ],
      payments: [{ id: "i2p1", amount: 246.63, method: "card", date: daysAgo(4) }],
    },
    {
      id: "i3", number: "INV-1040", customer_id: "c3", vehicle_id: "v4", status: "open",
      date: daysAgo(2), due_date: daysAhead(28), notes: "Fleet account — net 30 terms.",
      tax_rate: 8.25, discount_type: "percentage", discount_value: 10,
      items: [
        { id: "i3a", type: "labor", description: "Fleet inspection (6 units) — Ibrahim Odeh", quantity: 6, price: 110 },
        { id: "i3b", type: "part", description: "Engine air filter", quantity: 6, price: 19.4 },
        { id: "i3c", type: "part", description: "Wiper blade pair", quantity: 6, price: 27.5 },
      ],
      payments: [],
    },
    {
      id: "i4", number: "INV-1039", customer_id: "c5", vehicle_id: "v7", status: "in-progress",
      date: daysAgo(3), due_date: daysAhead(11), notes: "Water pump on order, arrives Thursday.",
      tax_rate: 8.25, discount_type: "none", discount_value: 0,
      items: [
        { id: "i4a", type: "part", description: "Water pump assembly", quantity: 1, price: 142 },
        { id: "i4b", type: "part", description: "Coolant, extended life (1gal)", quantity: 2, price: 22.4 },
        { id: "i4c", type: "labor", description: "Coolant leak repair — Ibrahim Odeh", quantity: 4, price: 110 },
      ],
      payments: [{ id: "i4p1", amount: 200, method: "cash", date: daysAgo(3), notes: "Deposit" }],
    },
    {
      id: "i5", number: "INV-1038", customer_id: "c6", vehicle_id: "v8", status: "paid",
      date: daysAgo(6), due_date: daysAgo(-8), notes: "",
      tax_rate: 8.25, discount_type: "none", discount_value: 0,
      items: [
        { id: "i5a", type: "labor", description: "Sprinter B-service — Ibrahim Odeh", quantity: 3.2, price: 110 },
        { id: "i5b", type: "part", description: "Full synthetic oil 5W-30 (1qt)", quantity: 12, price: 8.75 },
        { id: "i5c", type: "part", description: "Oil filter (spin-on)", quantity: 1, price: 11.25 },
      ],
      payments: [{ id: "i5p1", amount: 502.28, method: "bank-transfer", date: daysAgo(5) }],
    },
    {
      id: "i6", number: "INV-1037", customer_id: "c8", vehicle_id: "v10", status: "completed",
      date: daysAgo(8), due_date: daysAhead(6), notes: "Awaiting customer pickup.",
      tax_rate: 8.25, discount_type: "fixed", discount_value: 25,
      items: [
        { id: "i6a", type: "part", description: "Front strut assembly", quantity: 2, price: 154.75 },
        { id: "i6b", type: "part", description: "Stabiliser link kit", quantity: 1, price: 38.6 },
        { id: "i6c", type: "labor", description: "Strut replacement — Kelsey Nunez", quantity: 3, price: 95 },
      ],
      payments: [],
    },
    {
      id: "i7", number: "INV-1036", customer_id: "c7", vehicle_id: "v9", status: "paid",
      date: daysAgo(11), due_date: daysAgo(-3), notes: "",
      tax_rate: 8.25, discount_type: "none", discount_value: 0,
      items: [
        { id: "i7a", type: "part", description: "Battery, 650 CCA", quantity: 1, price: 164 },
        { id: "i7b", type: "labor", description: "Charging system test & fit — Devon Marsh", quantity: 0.6, price: 105 },
      ],
      payments: [{ id: "i7p1", amount: 245.75, method: "card", date: daysAgo(11) }],
    },
    {
      id: "i8", number: "INV-1035", customer_id: "c1", vehicle_id: "v2", status: "paid",
      date: daysAgo(14), due_date: daysAgo(0), notes: "",
      tax_rate: 8.25, discount_type: "none", discount_value: 0,
      items: [
        { id: "i8a", type: "part", description: "Spark plug (iridium)", quantity: 4, price: 14.6 },
        { id: "i8b", type: "part", description: "Ignition coil", quantity: 1, price: 74.5 },
        { id: "i8c", type: "labor", description: "Misfire diagnosis & repair — Devon Marsh", quantity: 2, price: 105 },
      ],
      payments: [{ id: "i8p1", amount: 361.99, method: "card", date: daysAgo(14) }],
    },
    {
      id: "i9", number: "INV-1034", customer_id: "c4", vehicle_id: "v6", status: "open",
      date: daysAgo(16), due_date: daysAgo(-2), notes: "Second reminder sent.",
      tax_rate: 8.25, discount_type: "none", discount_value: 0,
      items: [
        { id: "i9a", type: "part", description: "Tyre 225/65R17 (all season)", quantity: 2, price: 132 },
        { id: "i9b", type: "labor", description: "Alignment & rotation — Casey Lindgren", quantity: 1.5, price: 85 },
      ],
      payments: [],
    },
    {
      id: "i10", number: "INV-1033", customer_id: "c3", vehicle_id: "v5", status: "in-progress",
      date: daysAgo(19), due_date: daysAhead(11), notes: "AC diagnosis in progress.",
      tax_rate: 8.25, discount_type: "percentage", discount_value: 10,
      items: [
        { id: "i10a", type: "labor", description: "AC diagnosis — Devon Marsh", quantity: 0.8, price: 105 },
      ],
      payments: [],
    },
    {
      id: "i11", number: "INV-1032", customer_id: "c5", vehicle_id: "v7", status: "paid",
      date: daysAgo(23), due_date: daysAgo(-9), notes: "",
      tax_rate: 8.25, discount_type: "none", discount_value: 0,
      items: [
        { id: "i11a", type: "part", description: "Serpentine belt", quantity: 1, price: 34.9 },
        { id: "i11b", type: "labor", description: "Belt replacement — Kelsey Nunez", quantity: 1, price: 95 },
      ],
      payments: [{ id: "i11p1", amount: 140.61, method: "cash", date: daysAgo(23) }],
    },
    {
      id: "i12", number: "INV-1031", customer_id: "c6", vehicle_id: "v8", status: "paid",
      date: daysAgo(27), due_date: daysAgo(-13), notes: "",
      tax_rate: 8.25, discount_type: "none", discount_value: 0,
      items: [
        { id: "i12a", type: "part", description: "Cabin blower motor", quantity: 1, price: 128.4 },
        { id: "i12b", type: "labor", description: "Blower motor replacement — Ibrahim Odeh", quantity: 1.6, price: 110 },
      ],
      payments: [{ id: "i12p1", amount: 329.6, method: "bank-transfer", date: daysAgo(26) }],
    },
  ],
};

export const nextInvoiceNumber = (existing: { number: string }[]) => {
  const max = existing.reduce((acc, inv) => {
    const n = parseInt(inv.number.replace(/\D/g, ""), 10);
    return Number.isFinite(n) && n > acc ? n : acc;
  }, 1042);
  return `INV-${max + 1}`;
};