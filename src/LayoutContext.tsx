import { useMemo, createContext, useContext, useEffect, useState } from 'react';
import { RouteObject, useRoutes } from 'react-router';

import { IRoute, IAppLayoutContext, IAppLayoutProps, Layouts } from './types';
import { AuthLayout, EmptyLayout, DashboardLayout } from './components';

export const LayoutMap = {
	[Layouts.Auth]: AuthLayout,
	[Layouts.Empty]: EmptyLayout,
	[Layouts.Dashboard]: DashboardLayout,
};

const LayoutContext = createContext<IAppLayoutContext>({
	id: '',
	renderedRoutes: null,
	activeRoute: {} as IRoute,
	isNavPanelOpen: false,
	toggleNavPanel: () => undefined,
});

export const AppLayoutProvider = (props: IAppLayoutProps) => {
	const { routes, children, name, activeRoute, ...rest } = props;
	const [isNavPanelOpen, toggleNavPanel] = useState(false);

	const routesValues = (Object.values(routes) || []) as RouteObject[];

	useEffect(() => {
		if (activeRoute) {
			document.title = `[${name}] - ${activeRoute.title}`;
		}

		return () => {
			document.title = '';
		};
	}, [name, activeRoute]);

	const renderedRoutes = useRoutes(
		routesValues.map(({ caseSensitive, path, element, children }) => ({ caseSensitive, path, element, children })),
	);

	const layoutStyle = activeRoute?.layout?.mode ?? Layouts.Empty;
	const PageLayout = LayoutMap[layoutStyle];
	const layoutId = `layout-${layoutStyle}`;

	const value = useMemo<IAppLayoutContext>(
		() => ({
			...rest,
			id: layoutId,
			renderedRoutes,
			activeRoute,
			isNavPanelOpen,
			toggleNavPanel,
		}),
		[rest, layoutId, renderedRoutes, activeRoute, isNavPanelOpen, toggleNavPanel],
	);

	return (
		<LayoutContext.Provider value={value}>
			<PageLayout id={layoutId} activeRoute={activeRoute} renderedRoutes={renderedRoutes} />
			{children}
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
