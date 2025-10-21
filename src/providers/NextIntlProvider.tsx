import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

const NextIntlProvider = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
};

export default NextIntlProvider;
