import { Card, CardHeader, CardTitle } from "@/components/ui/card";

import {
  NextIntlClientProvider,
  useMessages,
  useTranslations,
} from "next-intl";

import { LoginForm } from "@/components/Login/Form";
import { unstable_setRequestLocale } from "next-intl/server";

type Props = {
  params: { locale: string };
};

export default function Page({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);

  const t = useTranslations("Login");
  const messages = useMessages();

  return (
    <div className="container max-w-xl py-20">
      <NextIntlClientProvider messages={messages}>
        <LoginForm />
      </NextIntlClientProvider>
    </div>
  );
}
