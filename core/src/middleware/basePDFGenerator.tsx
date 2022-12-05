import { BaseRootContext } from "../rootContexts/baseRootContext";
import { pdfMiddlewareBuilder } from "../builder/pdfMiddlewareBuilder";

export const basePDFGenerator = pdfMiddlewareBuilder(
  BaseRootContext,
  () => ({})
);
