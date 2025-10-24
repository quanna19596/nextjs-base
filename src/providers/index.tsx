import NextAuthProvider from "./NextAuthProvider";
import NextIntlProvider from "./NextIntlProvider";
import ReactQueryProvider from "./ReactQueryProvider";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <NextIntlProvider>
      <ReactQueryProvider>
        <NextAuthProvider>{children}</NextAuthProvider>
      </ReactQueryProvider>
    </NextIntlProvider>
  );
};

export default Providers;
