
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  // Coloca tu script en useEffect para asegurarte de que se ejecute solo una vez
  useEffect(() => {
    window.smartlook ||
      (function (d) {
        var o = (window.smartlook = function () {
          o.api.push(arguments);
        }),
          h = d.getElementsByTagName('head')[0];
        var c = d.createElement('script');
        o.api = new Array();
        c.async = true;
        c.type = 'text/javascript';
        c.charset = 'utf-8';
        c.src = 'https://web-sdk.smartlook.com/recorder.js';
        h.appendChild(c);

        o('init', '0ed319a59b519e257c52daf7074436d3994fea98', { region: 'eu' });
      })(document);
  }, []); 

  // Renderiza tu componente principal
  return <Component {...pageProps} />;
}

export default MyApp;
