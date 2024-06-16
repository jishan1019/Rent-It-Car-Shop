import { z } from "zod";

const authValidationSchema = z.object({
  body: z.object({
    email: z.string({ required_error: "Email is required." }).email(),
    password: z.string({ required_error: "password is required." }),
  }),
});

export { authValidationSchema };
