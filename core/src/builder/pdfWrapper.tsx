import React, { ReactElement } from "react";
import { renderToStream } from "@react-pdf/renderer";

export type PDFWrapperData = <
  ContentData extends JSX.IntrinsicAttributes,
  RootData
>(
  content: {
    Content: (data: ContentData) => ReactElement;
    contentData: ContentData;
  },
  root: {
    Root: (data: RootData) => ReactElement;
    rootData: RootData;
  }
) => Promise<NodeJS.ReadableStream>;

/**
 * Renders a PDF using a root and content element with associated data
 * @param content PDF content
 * @param root PDF root
 * @returns PDF as a readable stream
 */
export const pdfWrapper: PDFWrapperData = (
  { Content, contentData },
  { Root, rootData }
) =>
  renderToStream(
    <Root {...rootData}>
      <Content {...contentData}></Content>
    </Root>
  );
