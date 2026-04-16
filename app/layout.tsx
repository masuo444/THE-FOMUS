// Root layout — minimal wrapper; locale-specific layout is in app/[locale]/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
