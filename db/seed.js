import db from "#db/client";
import { createEmployee } from "#db/queries/employees";

await db.connect();
await seedEmployees();
await db.end();
console.log("🌱 Database seeded.");

async function seedEmployees() {
  const employees = [
    { name: "Alice Johnson", birthday: "1990-03-15", salary: 75000 },
    { name: "Bob Smith", birthday: "1985-07-22", salary: 68000 },
    { name: "Carol Davis", birthday: "1992-11-08", salary: 82000 },
    { name: "David Wilson", birthday: "1988-04-03", salary: 71000 },
    { name: "Emma Brown", birthday: "1991-09-17", salary: 79000 },
    { name: "Frank Miller", birthday: "1987-12-05", salary: 85000 },
    { name: "Grace Lee", birthday: "1993-06-28", salary: 73000 },
    { name: "Henry Taylor", birthday: "1989-01-14", salary: 77000 },
    { name: "Ivy Chen", birthday: "1994-08-31", salary: 81000 },
    { name: "Jack Anderson", birthday: "1986-10-19", salary: 76000 },
    { name: "Karen White", birthday: "1995-02-12", salary: 69000 },
    { name: "Leo Garcia", birthday: "1984-05-26", salary: 88000 }
  ];

  for (const employee of employees) {
    await createEmployee(employee);
  }
}
