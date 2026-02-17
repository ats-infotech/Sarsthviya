import z from 'zod';

export const FormLoginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),

  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters long')
});

export const RegistrationSchema = z.object({
  number: z
    .string()
    .trim()
    .regex(/^[0-9]{10}$/, 'Enter a valid 10-digit phone number')
});

export const ContactUsSchema = z.object({
  name: z.string().min(1, 'Name is required'),

  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),

  phone: z
    .string()
    .trim()
    .regex(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits'),

  msg: z.string().min(1, 'Message is required')
});

export const ReturnExchangeSchema = z.object({
  orderNumber: z.string().trim().min(1, 'Order number is required'),

  phoneOrEmail: z
    .string()
    .trim()
    .min(1, 'Phone number or email is required')
    .refine(
      (value) =>
        /^[0-9]{10}$/.test(value) || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      {
        message: 'Enter a valid phone number or email'
      }
    )
});
