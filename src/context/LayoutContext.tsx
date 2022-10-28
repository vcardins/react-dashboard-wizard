import { useMemo, createContext, useContext, useState, useCallback } from 'react';
import { ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material';
import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';

import {
	IRoute,
	IAppLayoutContext,
	IAppLayoutProps,
	LayoutStyle,
	INavigation,
	ISettings,
	Positioning,
} from '../types';
import { useRoutingContext } from './RoutingContext';

import { CenteredBoxLayout, EmptyLayout, DashboardLayout, TwoColumnLayout } from '../components';

export const LayoutMap = {
	[LayoutStyle.CenteredBox]: CenteredBoxLayout,
	[LayoutStyle.Empty]: EmptyLayout,
	[LayoutStyle.Dashboard]: DashboardLayout,
	[LayoutStyle.TwoColumn]: TwoColumnLayout,
};

const defaultSettings: ISettings = {
	containerWidth: '1570px',
	navbar: {
		display: true,
		iconPositioning: Positioning.Left,
		position: Positioning.Left,
		fontSize: '14px',
	},
	toolbar: {
		display: true,
		iconPositioning: Positioning.Left,
		fontSize: '14px',
	},
};

const LayoutContext = createContext<IAppLayoutContext>({
	id: '',
	renderedRoutes: null,
	metadata: {} as IAppLayoutProps['metadata'],
	activeRoute: {} as IRoute,
	isNavPaneOpen: false,
	settings: defaultSettings,
	toggleNavPane: () => undefined,
	updateNavigation: (_value: INavigation) => undefined,
	updateSettings: (_value: ISettings) => undefined,
});

export const LayoutContextProvider = (props: IAppLayoutProps) => {
	const { metadata, children, theme, ...rest } = props;
	const [isNavPaneOpen, toggleNavPane] = useState(!!rest.isNavPaneOpen);
	const [settings, setSettings] = useState({ ...defaultSettings, ...rest.settings });
	const [navigation, setNavigation] = useState(rest.navigation);
	const { renderedRoutes, activeRoute } = useRoutingContext();

	const layoutStyle = activeRoute?.layout?.style ?? LayoutStyle.Empty;
	const PageLayout = LayoutMap[layoutStyle];
	const layoutId = `layout-${layoutStyle}`;

	const updateSettings = useCallback((value: Partial<ISettings>) => {
		setSettings((prevValue) => ({
			...prevValue,
			...value,
		}));
	}, []);

	const updateNavigation = useCallback((value: Partial<INavigation>) => {
		setNavigation((prevValue) => ({
			navbar: [
				...(prevValue?.navbar ?? []),
				...(value.navbar ?? []),
			],
			toolbar: [
				...(prevValue?.toolbar ?? []),
				...(value.toolbar ?? []),
			],
		}));
	}, []);

	const value = useMemo<IAppLayoutContext>(
		() => ({
			...rest,
			metadata,
			id: layoutId,
			renderedRoutes,
			activeRoute,
			settings,
			navigation,
			isNavPaneOpen,
			toggleNavPane,
			updateSettings,
			updateNavigation,
		}),
		[
			rest,
			layoutId,
			metadata,
			renderedRoutes,
			activeRoute,
			isNavPaneOpen,
			navigation,
			settings,
			toggleNavPane,
			updateSettings,
			updateNavigation,
		],
	);

	return (
		<LayoutContext.Provider value={value}>
			<MuiThemeProvider theme={theme}>
				<EmotionThemeProvider theme={theme}>
					<>
						<CssBaseline />
						<PageLayout
							id={layoutId}
							activeRoute={activeRoute}
							renderedRoutes={renderedRoutes}
						/>
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
