"use client"
import Link from 'next/link';
import { Upload } from 'lucide-react';
import { Shield } from 'lucide-react';
import { File } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { useState } from 'react';

function SideNav() {
  const [activeIndex, setActiveIndex] = useState(0);
  const menuList = [
    {
      id: 1,
      name: 'Upload',
      icon: Upload,
      path: '/upload',
    },
    {
      id: 2,
      name: 'Files',
      icon: File,
      path: '/files',
    },
    {
      id: 3,
      name: 'Upgrade',
      icon: Shield,
      path: '/comming-soon',
    }
  ];
  
  return (
    <div className='shadow-sm border-r h-full'>
      <div className='p-5 border-b'>
        <a href="/">
          <Image src='/logo.svg' width={60} height={80} className="text-primary" />
        </a>
      </div>
      <div className='flex flex-col float-left'>
        {menuList.map((item, index) => (
          <Link key={index} href={item.path} passHref>
            <button
              className={`flex gap-2 p-4 px-0 hover:bg-gray-100 w-full text-gray-500 ${activeIndex === index ? 'bg-blue-50 text-primary' : ''}`}
              onClick={() => setActiveIndex(index)}
            >
              <item.icon />
              <h2>{item.name}</h2>
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SideNav;