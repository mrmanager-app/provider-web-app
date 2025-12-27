import Header from "@/components/shared/header";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      {children}
    </div>
  );
};

export default Layout;
