const EmployeeModel = require("../models/Employee.js");

const employeeResolvers = {
  Query: {
    employees: async () => {
      try {
        const employees = await EmployeeModel.find();
        return employees;
      } catch (err) {
        throw err;
      }
    },
    employee: async (_, { id }) => {
      try {
        if (!id) {
          throw new Error("Employee ID is required");
        } else {
          const employee = await EmployeeModel.findById(id);
          if (!employee) {
            throw new Error("Employee not found");
          }
          return employee;
        }
      } catch (err) {
        throw err;
      }
    },
  },
  Mutation: {
    addEmployee: async (_, args) => {
      try {
        const employee = new EmployeeModel(args);
        const existingEmail = await EmployeeModel.findOne({
          email: args.email,
        });
        if (existingEmail) {
          return {
            status: false,
            message: "Employee with this email already exists",
          };
        } else {
          const savedEmployee = await employee.save();
          return {
            status: true,
            message: "Employee added successfully",
          };
        }
      } catch (err) {
        return {
          status: false,
          message: err.message,
        };
      }
    },
    updateEmployee: async (_, { id, ...updateData }) => {
      try {
        if (!id) {
          throw new Error("Employee ID is required");
        } else {
          const employee = await EmployeeModel.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
          );
          if (!employee) {
            throw new Error("Employee not found");
          }
          return {
            status: true,
            message: "Employee updated successfully",
          };
        }
      } catch (err) {
        throw err;
      }
    },
    deleteEmployee: async (_, { id }) => {
      try {
        if (!id) {
          throw new Error("Employee ID is required");
        } else {
          const employee = await EmployeeModel.findByIdAndDelete(id);
          if (!employee) {
            throw new Error("Employee not found");
          }
          return {
            status: true,
            id: employee.id,
            first_name: employee.first_name,
            last_name: employee.last_name,
            email: employee.email,
            gender: employee.gender,
            salary: employee.salary,
            message: "Employee deleted successfully",
          };
        }
      } catch (err) {
        throw err;
      }
    },    
  },
};

module.exports = employeeResolvers;
