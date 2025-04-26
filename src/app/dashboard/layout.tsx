export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <p>DashboardLayout</p>
      <div>{children}</div>
    </div>
  );
}
