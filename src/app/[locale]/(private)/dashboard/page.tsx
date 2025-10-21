"use client";

import { signOut } from "next-auth/react";

const DashboardPage1 = () => {
  return (
    <div>
      <span>DashboardPage1</span>
      <button
        onClick={() => {
          signOut();
        }}
      >
        Sign Out
      </button>
    </div>
  );
};

export default DashboardPage1;
