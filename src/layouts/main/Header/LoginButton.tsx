import { Button } from "@/components/ui/button";
import { StorageKeys } from "@/constant/storage-keys";
import { IconUser } from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import { cookies } from "next/headers";
import Link from "next/link";

export default function LoginButton() {
  const t = useTranslations("button");

  const isAuth = cookies().get(StorageKeys.AccessToken)?.value;

  if (!!isAuth) {
    return null;
  }

  return (
    <Button variant="outline" asChild>
      <Link href={"/login"}>
        <IconUser size={18} className="me-2" />
        <p className="text-base font-normal">{t("login")}</p>
      </Link>
    </Button>
  );
}
