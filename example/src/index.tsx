import React from 'react';
import { Global } from '@emotion/react';

import { mount } from '../../src'; //'react-pages-layouts'; LayoutProvider,

import { pages, navigation, buildTheme, styles } from './app'; // Providers,
import metadata from './manifest.json';

mount({
	theme: buildTheme(),
	metadata,
	navigation,
	pages,
	version: process?.env?.['VERSION'],
	Providers: ({ children }) => (
		<>
			<Global styles={styles} />
			{children}
		</>
	),
	onRouteChange: (route) => {
		console.log(route);
	},
	// container?: string;
	// basename?: string;
	// App?: () => ReactElement;
	// isProtected?: boolean;
	// version?: string | ReactElement;
});

// import ReactDOM from 'react-dom/client';
// import { BrowserRouter as Router } from 'react-router-dom';

// const container = document.getElementById('root') as HTMLElement;
// const root = ReactDOM.createRoot(container);

// root.render(
// 	// <React.StrictMode>
// 	<Router>
// 		<Providers pages={pages} navigation={navigation}>
// 			{(routes, activeRoute) => (
// 				<LayoutProvider
// 					theme={buildTheme()}
// 					name={metadata.short_name}
// 					title={metadata.name}
// 					subTitle={metadata.description}
// 					routes={routes}
// 					activeRoute={activeRoute}
// 					navigation={navigation}
// 				/>
// 			)}
// 		</Providers>
// 	</Router>,
// 	// </React.StrictMode>,
// );
