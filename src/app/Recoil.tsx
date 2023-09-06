"use client";

import { RecoilRoot } from "recoil";
import { ReactNode } from "react";

type RecoilProps = {
  children: ReactNode;
};

const Recoil = ({ children }: RecoilProps) => {
  return <RecoilRoot>{children}</RecoilRoot>
};

export default Recoil;