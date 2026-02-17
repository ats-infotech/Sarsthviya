import z from 'zod';

export const ReviewSchema = z.object({
  rating: z.number().min(1, { message: 'Please select a rating' }),
  title: z
    .string()
    .min(1, { message: 'Title is required' })
    .max(100, { message: 'Title must not be more than 100 characters' }),
  description: z.string().min(1, { message: 'Content is required' }),
  image: z.string().optional(),
  displayName: z.string().min(1, { message: 'Name is required' }),
  emailId: z.string().email('Invalid email')
});
