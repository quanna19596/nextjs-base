import ReactQueryProvider from "./ReactQueryProvider";
import NextAuthProvider from "./NextAuthProvider";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReactQueryProvider>
      <NextAuthProvider>{children}</NextAuthProvider>
    </ReactQueryProvider>
  );
};

export default Providers;
