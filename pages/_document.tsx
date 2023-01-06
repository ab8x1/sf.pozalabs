import Document, { DocumentContext, Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: [initialProps.styles, sheet.getStyleElement()],
      }
    } finally {
      sheet.seal()
    }
  }
  render() {
    return (
      <Html>
        <Head>
            <meta property="og:title" content="Salary stream" />
            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://pozalabs.xyz/" />
            <meta property="og:image" content="https://pozalabs.xyz/social-card.png" />
            <meta name="twitter:image" content="https://pozalabs.xyz/social-card.png" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content="https://pozalabs.xyz/" />
            <meta name="twitter:title" content="Salary stream" />
            <meta name="twitter:description" content="Superfluid salary stream from POZALABS" />
            <meta name="twitter:site" content="Salary stream" />
            <link rel="shortcut icon" type="image" href="/favicon.ico" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}