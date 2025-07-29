import express from "express";
import {
  getEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "#db/queries/employees";

const router = express.Router();

function isPositiveInteger(value) {
  if (!/^\d+$/.test(value)) {
    return false;
  }
  const num = parseInt(value, 10);
  return num >= 0;
}

function validateEmployeeData(data) {
  const { name, birthday, salary } = data;
  if (!name || !birthday || salary === undefined || salary === null) {
    return false;
  }
  return true;
}

router.get("/", async (req, res, next) => {
  try {
    const employees = await getEmployees();
    res.json(employees);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "Request body is required" });
    }

    if (!validateEmployeeData(req.body)) {
      return res.status(400).json({ error: "Missing required fields: name, birthday, salary" });
    }

    const { name, birthday, salary } = req.body;
    const newEmployee = await createEmployee({ name, birthday, salary });
    res.status(201).json(newEmployee);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!isPositiveInteger(id)) {
      return res.status(400).json({ error: "ID must be a positive integer" });
    }

    const employee = await getEmployee(id);
    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    res.json(employee);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!isPositiveInteger(id)) {
      return res.status(400).json({ error: "ID must be a positive integer" });
    }

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "Request body is required" });
    }

    if (!validateEmployeeData(req.body)) {
      return res.status(400).json({ error: "Missing required fields: name, birthday, salary" });
    }

    const { name, birthday, salary } = req.body;
    const updatedEmployee = await updateEmployee({ id, name, birthday, salary });
    
    if (!updatedEmployee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    res.json(updatedEmployee);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!isPositiveInteger(id)) {
      return res.status(400).json({ error: "ID must be a positive integer" });
    }

    const deletedEmployee = await deleteEmployee(id);
    if (!deletedEmployee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export default router;
