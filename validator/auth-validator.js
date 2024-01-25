const { z } = require("zod");
const signupSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid address" }),

  name: z
    .string({ required_error: "Name is required" })
    .trim()
    .max(100, { message: "Name must be not more than 100 character" }),

  phone: z
    .string({ required_error: "Phone is required" })
    .trim()
    .min(10, { message: "Phone must be at least of 10 characters" }),

  password: z
    .string({ required_error: "Email is required" })
    .trim()
    .min(8, { message: "Password must be at least of 8 characters" })
    .max(20, { message: "Password should not be more than 20 characters" }),
});

module.exports = signupSchema;
