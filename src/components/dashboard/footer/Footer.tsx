import React from "react";
import LeftFooter from "./left-footer";
import MidFooter from "./mid-footer";
import RightFooter from "./right-footer";
import BottomFooter from "./bottom-footer";

export default function Footer() {
  return (
    <footer className="page-footer bg-white dark:bg-jacarta-900 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]">
      <div className="px-4 py-4 xl:px-24">
        <div className="grid grid-cols-6 gap-x-7 gap-y-14 pt-24 pb-12 md:grid-cols-12">
          <LeftFooter />

          <MidFooter />

          <RightFooter />
        </div>
        <BottomFooter />
      </div>
    </footer>
  );
}
