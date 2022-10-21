/* eslint-disable react/display-name */
import { ReactElement, memo } from 'react';
import { useLocation, matchRoutes } from 'react-router-dom';
import { AgnosticRouteObject } from '@remix-run/router';

import { Global } from '@emotion/react';

import { INavigationZone, IRoute, IPageConfig } from '../../../src/types'; //'react-pages-layouts';

import { styles } from './styles';

interface IProviders {
	themeColor?: string;
	pages: IPageConfig[];
	navigation?: INavigationZone;
	children: ((routes: IRoute[], activeRoute: IRoute, navigation?: INavigationZone) => ReactElement) | ReactElement;
}

export const Providers = memo(({ pages, navigation, children }: IProviders) => {
	const location = useLocation();
	const routes = pages.flatMap(({ routes, auth, layout }) =>
		routes.map((route) => ({ auth, layout, ...route })),
	) as IRoute[];
	const activeRoute = matchRoutes(routes as AgnosticRouteObject[], location)?.[0]?.route as IRoute;

	return (
		<>
			<Global styles={styles} />
			{typeof children === 'function' ? children(routes, activeRoute, navigation) : children}
		</>
	);
});
