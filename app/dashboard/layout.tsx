"use client";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {/* <Sidebar /> */}

        <div
          className={`container mx-auto max-w-7xl px-4 md:px-6 lg:px-8 pb-12 mt-8`}
        >
          {children}
        </div>
      </main>
    </div>
  );
}
