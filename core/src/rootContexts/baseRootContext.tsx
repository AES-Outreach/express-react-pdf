import React, { PropsWithChildren } from "react";
import { Document } from "@react-pdf/renderer";

export const BaseRootContext = ({ children }: PropsWithChildren) => {
  return <Document>{children}</Document>;
};
