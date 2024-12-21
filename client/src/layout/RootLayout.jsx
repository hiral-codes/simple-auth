import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
function RootLayout() {
  return (
    <React.Suspense
      fallback={
        <div className="h-screen flex items-center justify-center bg-black">
          Loading....
        </div>
      }
    >
      <Header />
      <Outlet />
    </React.Suspense>
  );
}

export default RootLayout;
