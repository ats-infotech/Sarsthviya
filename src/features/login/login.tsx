"use client";

import { FormLoginSchema } from "@/lib/validation/auth.schema"
import { TLoginFormValues } from "@/types/auth"
import { useForm } from "react-hook-form"
import { Form } from "@/components/ui/form";
import { zodResolver } from '@hookform/resolvers/zod';
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { FormInput } from "@/components/form-input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import storage from "@/lib/storage";

export default function Login() {
    const form = useForm<TLoginFormValues>({
        resolver: zodResolver(FormLoginSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    })
    const router = useRouter()

    const { trigger, control } = form

    const onSubmit = async (data: TLoginFormValues) => {
        const isValid = await trigger()
        if (isValid) {
            if (data?.email === 'admin@gmail.com' && data?.password === 'Test@123') {
                const fakeToken = crypto.randomUUID();
                storage.setToken(fakeToken);
                toast.success('Login successful')
                router.push('/dashboard')
            } else {
                toast.error('Invalid credentials')
            }
        }
    }

    return (
        <div className="h-screen flex justify-center items-center">
            <Card className='w-full max-w-100 p-5'>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormInput
                            name="email"
                            control={control}
                            label='Email address'
                            placeholder='Enter email'
                            type='email'
                        />
                        <FormInput
                            name="password"
                            control={control}
                            label='Password'
                            placeholder='Enter password'
                            type='password'
                            className="my-5"
                        />
                        <div className="w-full flex justify-center">
                            <Button
                                type="submit"
                                className="w-50 border border-black"
                            >
                                Login
                            </Button>
                        </div>
                    </form>
                </Form>
            </Card>
        </div>
    )
}