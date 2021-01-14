import React from 'react';
import Head from 'next/head';
import App from 'next/app';

import { DataContextProvider } from '../contexts/data/data.context';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/main.css';

class MyApp extends App {
	static async getInitialProps({ Component, ctx, query }) {
		let pageProps = {};

		if (Component.getInitialProps) {
			pageProps = await Component.getInitialProps(ctx);
		}

		return { pageProps };
	}

  actions() {
    if (process.env.NODE_ENV === 'production') {

      if (location.protocol !== 'https:') {
       location.href = 'https:' + window.location.href.substring(window.location.protocol.length);
      }

      (function(h,o,t,j,a,r){
          h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
          h._hjSettings={hjid:1980111,hjsv:6};
          a=o.getElementsByTagName('head')[0];
          r=o.createElement('script');r.async=1;
          r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
          a.appendChild(r);
      })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');

      window.intercomSettings = { app_id: "umhxelhx" };
      (function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',w.intercomSettings);}else{var d=document;var i=function(){i.c(arguments);};i.q=[];i.c=function(args){i.q.push(args);};w.Intercom=i;var l=function(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/umhxelhx';var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);};if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})();
      
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'UA-177625134-1');
    }
  }

	render() {
		const { Component, pageProps } = this.props;
		return (
			<DataContextProvider>
				<Head>
					<title>Music Plate</title>
					<link rel="icon" href="/favicon.ico" />
          <script async src="https://www.googletagmanager.com/gtag/js?id=UA-177625134-1"/>
          {/* <script async src="https://js.convertflow.co/production/websites/18543.js"></script> */}
          <script>{ process.browser && this.actions() }</script>
				</Head>
				<Component {...pageProps}/>
			</DataContextProvider>
		);
	}
}

export default MyApp;
