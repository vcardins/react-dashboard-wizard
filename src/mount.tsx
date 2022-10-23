import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';

import { IAppConfig } from './types';
import { LayoutProvider } from './context';

export const mount = (props: IAppConfig) => {
	const {
		container = 'root',
		basename,
		App,
		Providers = ({ children }) => <>{children}</>,
		strictMode,
		...rest
	} = props;
	const root = createRoot(document.getElementById(container) as HTMLElement);

	const node = (
		<Router basename={basename}>
			<Providers>{App ? <App /> : <LayoutProvider {...rest} />}</Providers>
		</Router>
	);

	root.render(strictMode ? <StrictMode>{node}</StrictMode> : node);
};
