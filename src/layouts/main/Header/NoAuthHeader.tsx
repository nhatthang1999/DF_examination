import { NextIntlClientProvider, useMessages } from "next-intl";
import NavBar from "./Navbar";
import LanguageChange from "./LanguageChange";
import DarkLightTheme from "./DarkLightTheme";
import LoginButton from "./LoginButton";

export default function NoAuthHeader() {
  const messages = useMessages();
  return (
    <NextIntlClientProvider messages={messages}>
      <header className="header dark:header py-5">
        <div className="lg:container mx-auto">
          <div className="flex justify-end items-center space-x-10">
            <LanguageChange />
            <DarkLightTheme />
            <LoginButton />
          </div>
        </div>
      </header>
    </NextIntlClientProvider>
  );
}
