import { useMemo, createContext, useContext, useEffect, useState } from 'react';
import { matchRoutes, RouteObject, useLocation, useRoutes } from 'react-router-dom';
import { ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material';
import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';

import { IRoute, IAppLayoutContext, IAppLayoutProps, Layouts } from '../types';
import { AuthLayout, EmptyLayout, DashboardLayout } from '../components';

export const LayoutMap = {
	[Layouts.Auth]: AuthLayout,
	[Layouts.Empty]: EmptyLayout,
	[Layouts.Dashboard]: DashboardLayout,
};

const LayoutContext = createContext<IAppLayoutContext>({
	id: '',
	renderedRoutes: null,
	metadata: {} as IAppLayoutProps['metadata'],
	activeRoute: {} as IRoute,
	isNavPanelOpen: false,
	toggleNavPanel: () => undefined,
});

export const LayoutProvider = (props: IAppLayoutProps) => {
	const { metadata, children, pages, theme, onRouteChange, ...rest } = props;
	const [isNavPanelOpen, toggleNavPanel] = useState(false);

	const location = useLocation();
	const routes = pages.flatMap(({ routes, auth, layout }) =>
		routes.map((route) => ({ auth, layout, ...route })),
	) as IRoute[];
	const activeRoute = matchRoutes(routes as RouteObject[], location)?.[0]?.route as IRoute;

	const routesValues = routes as RouteObject[];

	useEffect(() => {
		if (activeRoute) {
			document.title = `[${metadata.name}] - ${activeRoute.metadata?.title}`;
			onRouteChange?.(activeRoute);
		}

		return () => {
			document.title = '';
		};
	}, [metadata.name, activeRoute, onRouteChange]);

	const renderedRoutes = useRoutes(
		routesValues.map(({ caseSensitive, path, element, children }) => ({ caseSensitive, path, element, children })),
	);

	const layoutStyle = activeRoute?.layout?.mode ?? Layouts.Empty;
	const PageLayout = LayoutMap[layoutStyle];
	const layoutId = `layout-${layoutStyle}`;

	const value = useMemo<IAppLayoutContext>(
		() => ({
			...rest,
			metadata,
			id: layoutId,
			renderedRoutes,
			activeRoute,
			isNavPanelOpen,
			toggleNavPanel,
		}),
		[rest, layoutId, metadata, renderedRoutes, activeRoute, isNavPanelOpen, toggleNavPanel],
	);

	return (
		<LayoutContext.Provider value={value}>
			<MuiThemeProvider theme={theme}>
				<EmotionThemeProvider theme={theme}>
					<>
						<CssBaseline />
						<PageLayout id={layoutId} activeRoute={activeRoute} renderedRoutes={renderedRoutes} />
						{children}
					</>
				</EmotionThemeProvider>
			</MuiThemeProvider>
		</LayoutContext.Provider>
	);
};

export const useLayoutContext = () => {
	const context = useContext(LayoutContext);
	if (context === undefined) {
		throw new Error('LayoutContext not provided to calling context');
	}
	return context;
};
