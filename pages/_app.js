/* eslint-disable react/prop-types */
import { appWithTranslation } from '@/i18n';
import App from 'next/app';
import { RecoilRoot } from 'recoil';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { Normalize } from 'styled-normalize';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

const theme = {
  colors: {
    primary: '#0070f3'
  }
};

function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <GlobalStyle />
      <Normalize />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </RecoilRoot>
  );
}

MyApp.getInitialProps = async appContext => {
  const appProps = await App.getInitialProps(appContext);
  return { ...appProps };
};

export default appWithTranslation(MyApp);
