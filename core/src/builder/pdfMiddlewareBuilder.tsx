import { Request, RequestHandler } from "express";
import { ReactElement } from "react";
import { pdfWrapper } from "./pdfWrapper";

/**
 * Purpose: extract data needed for the root node from the request
 * Uses the generic types of the Request and RequestHandler from express
 */
export type RootDataExtractor<Data> = <
  Params,
  ReqBody,
  ResBody,
  QueryParams,
  Locals extends Record<string, unknown>
>(
  req: Request<Params, ReqBody, ResBody, QueryParams, Locals>
) => Data & JSX.IntrinsicAttributes;

/**
 * Purpose: ensure type safety between the content being passed in and the dataExtractor function
 * Uses the generic types of the Request and RequestHandler from express
 */
export type PDFGenerator = <
  ContentData,
  Params,
  ReqBody,
  ResBody,
  QueryParams,
  Locals extends Record<string, unknown>
>(
  Content: (data: ContentData) => ReactElement,
  contentDataExtractor: (
    req: Request<Params, ReqBody, ResBody, QueryParams, Locals>
  ) => ContentData & JSX.IntrinsicAttributes,
  fileName?: string
) => RequestHandler<Params, ReqBody, ResBody, QueryParams, Locals>;

/**
 * Purpose: build a PDFGenerator middleware from a root node and data extractor
 */
export type PDFMiddlewareBuilder = <RootData>(
  Root: (data: RootData) => ReactElement,
  rootDataExtractor: RootDataExtractor<RootData>
) => PDFGenerator;

/**
 * Builds pdf middleware using the provided root node and data extractor
 * Sets up the correct headers and returns data from the pdf wrapper
 * @param Root Root node
 * @param rootDataExtractor Extracts data needed for the root node from the request
 * @returns pdf generator middleware
 */
export const pdfMiddlewareBuilder: PDFMiddlewareBuilder = (
  Root,
  rootDataExtractor
) => {
  return (Content, contentDataExtractor, fileName = "export.pdf") => {
    return async (req, res, next) => {
      const result = await pdfWrapper(
        { Content, contentData: contentDataExtractor(req) },
        {
          Root,
          rootData: rootDataExtractor(req),
        }
      );

      // Setting up the response headers
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", `attachment; filename=${fileName}`);

      // Streaming our resulting pdf back to the user
      result.pipe(res);
      next();
    };
  };
};
