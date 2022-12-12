## Base Root

For simple usage, a base root context element and it's associated middleware are provided as `BaseRootContext` and `basePDFGenerator`

### Usage

**Certificate Element**

```ts
import React from "react";
import { Page, View, Text } from "@react-pdf/renderer";

export const Certificate = ({ name, age }: CertificateProps) => {
  return (
    <Page size="A4" orientation="landscape">
      <View>
        <Text>
          {name} - {age}
        </Text>
      </View>
    </Page>
  );
};
```

**Endpoint**

```ts
import { ProgramCertificate } from "./template";
import { basePDFGenerator } from "express-react-pdf";

router.get(
  "/certificate",
  basePDFGenerator(Certificate, (req) => ({
    name: req.query.name,
    age: req.query.age,
  }))
);
```

## Builder

The `pdfMiddlewareBuilder` can be used to create react-pdf middleware for your express server. This supports defining a new root context, as well as how to extract data from your request to populate your root.

### Example - Integrating Other Frameworks

_Note: this will soon be published as a package_

Custom root contexts can be defined to integrate other frameworks, for example the i18Next translation library

**Root Context**

```ts
export const I18NextRootContext = ({
  translate,
  children,
}: I18NextRootContextProps & PropsWithChildren) => {
  return (
    <I18nextProvider i18n={translate}>
      <Document>{children}</Document>
    </I18nextProvider>
  );
};
```

**Middleware**

```ts
export const i18NextPDFMiddleware = pdfMiddlewareBuilder(
  I18NextRootContext,
  (req) => ({
    translate: req.i18n,
  })
);
```
