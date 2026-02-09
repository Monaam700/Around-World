import { Outlet } from "react-router-dom";

import Header from "../components/Header";
export default function Layout() {
  return (
    <div className="min-h-dvh bg-gray-100 dark:bg-gray-900 dark:text-gray-100">
      <Header />
      <div className="pd:mb-12 flex flex-col items-center pb-6">
        <Outlet />
      </div>
    </div>
  );
}
