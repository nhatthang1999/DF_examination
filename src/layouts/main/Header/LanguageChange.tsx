'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IconChevronDown } from "@tabler/icons-react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { useParams } from 'next/navigation'
import { useTransition } from "react";

import {useRouter, usePathname} from '@/navigation';

function LanguageChange() {
  const router = useRouter()
  const locale = useLocale()
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();

  // const { pathname, asPath, query, locale } = router;
  
  const changeLanguage = (e: string) => {
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        {pathname, params},
        {locale: e}
      );
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center cursor-pointer gap-x-2">
          <Image
            src={
              locale === "vi" ? "/access/vi-flag.png" : "/access/en-flag.png"
            }
            width={22}
            height={18}
            alt="flag"
          />
          <span>{locale === "vi" ? "Tiếng Việt" : "English"}</span>
          <IconChevronDown size={18} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 font-sans">
        <DropdownMenuRadioGroup
          value={locale}
          onValueChange={(e) => changeLanguage(e)}
        >
          <DropdownMenuRadioItem value="vi">
            <span className="cursor-pointer">Tiếng Việt</span>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="en">
            <span className="cursor-pointer">English</span>
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default LanguageChange;
