"use client"
import React from 'react';
import SideNav from './_components/SideNav';
import TopHeader from './_components/TopHeader';
import "./style.css";
import { usePathname } from 'next/navigation';
import CommingSoon from './comming-soon/page';

function Layout({ children }) {
  const PathName = usePathname();

  return (
    <div>
      {PathName !== "/comming-soon" ? (
        <>
          <div className='h-full w-64 flex-col fixed inset-y-0 z-50 md:flex hidden'>
            <SideNav />
          </div>
          <div className='md:ml-64'>
            <TopHeader />
            {children}
          </div>
        </>
      ) : <CommingSoon/>}
    </div>
  );
}

export default Layout;