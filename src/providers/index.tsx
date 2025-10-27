import { JSX } from "react";
import NextAuthProvider from "./NextAuthProvider";
import NextIntlProvider from "./NextIntlProvider";
import ReactQueryProvider from "./ReactQueryProvider";

const Providers = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return (
    <NextIntlProvider>
      <ReactQueryProvider>
        <NextAuthProvider>{children}</NextAuthProvider>
      </ReactQueryProvider>
    </NextIntlProvider>
  );
};

export default Providers;
