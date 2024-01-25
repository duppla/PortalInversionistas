import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {

  useEffect(() => {
    smartlook('init', '0ed319a59b519e257c52daf7074436d3994fea98', { region: 'eu' });
  }, []);
  
 
  useEffect(() => {
    const loadSmartlookScript = async () => {
      if (!window.smartlook) {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
       
        script.src = 'https://web-sdk.smartlook.com/recorder.js';
        document.head.appendChild(script);
        await new Promise(resolve => script.onload = resolve);
      }
      window.smartlook('init', '0ed319a59b519e257c52daf7074436d3994fea98', { region: 'eu' });
    };
  
    loadSmartlookScript();
  }, []);
  

 
  return <Component {...pageProps} />;
}

export default MyApp; 
