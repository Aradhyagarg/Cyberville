/*import { UserButton } from '@clerk/nextjs'
import { AlignJustify } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

function TopHeader() {
  return (
    <div className='flex p-5 border-b items-center justify-between md:justify-end'>
      <AlignJustify className='md:hidden'/>
      <Image src='/logo.svg' width={60} height={80} className="text-primary md:hidden"/>
      <UserButton/>
    </div>
  )
}

export default TopHeader*/

// TopHeader.js

import { UserButton } from '@clerk/nextjs';
import { AlignJustify } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
function TopHeader() {
  return (
    <div className='flex p-5 border-b items-center justify-between md:justify-end'>
      <AlignJustify className='md:hidden' />
      <a  href="/">
      <Image src='/logo.svg' width={60} height={80} className="text-primary md:hidden" />
      </a>
      <UserButton />
    </div>
  );
}

export default TopHeader;

