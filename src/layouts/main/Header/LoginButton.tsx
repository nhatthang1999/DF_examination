import { Button } from "@/components/ui/button";
import { IconUser } from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function LoginButton() {
  const t = useTranslations("button");
  return (
    <Button variant="outline" asChild>
      <Link href={"/login"}>
        <IconUser size={18} className="me-2" />
        <p className="text-base font-normal">{t("login")}</p>
      </Link>
    </Button>
  );
}
