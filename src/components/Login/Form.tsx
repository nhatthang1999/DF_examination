"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { login } from "@/services/auth";
import { StorageKeys } from "@/constant/storage-keys";
import { CookieStorage } from "@/helpers/cookie-storage";

const formSchema = z.object({
  email: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string(),
});

export const LoginForm = () => {
  const t = useTranslations();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const req: any = await login(values);
    CookieStorage.setCookieData(StorageKeys.AccessToken, req?.access_token);
    CookieStorage.setCookieData(StorageKeys.RefreshToken, req?.refresh_token);

    window.location.href = "/";
  }

  return (
    <Card className="">
      <CardHeader>
        <CardTitle>{t("Login.title")}</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <CardContent className="space-y-5">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("field.email")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("field.email")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("field.password")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("field.password")}
                      {...field}
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-center items-center">
            <Button type="submit">{t("button.login")}</Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};
