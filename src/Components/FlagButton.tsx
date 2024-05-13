"use client";

import React, { FC } from "react";
import Image from "next/image";
import Link from "next/link";

interface FlagButtonProps {
  href: string;
  ImageSrc: string;
}

const FlagButton: FC<FlagButtonProps> = ({ href, ImageSrc }) => {
  return (
    <Link href={href} className="cursor-pointer">
      <Image src={ImageSrc} alt="" width={220} height={110} />
    </Link>
  );
};

export default FlagButton;
