import z from 'zod'

export const envSchema = z.object({
  PORT: z.string().min(4).default('3333'),
  DATABASE_URL: z.url(),
  BETTER_AUTH_SECRET: z.string().min(5),
  BETTER_AUTH_URL: z.url(),
})

export const env = envSchema.parse(process.env)
