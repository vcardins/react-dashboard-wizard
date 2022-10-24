import { ReactNode } from 'react';
import type { SvgIconTypeMap } from '@mui/material';
import type { OverridableComponent } from '@mui/material/OverridableComponent';

import { IRoute, IAppConfig, INavigationZone, ISettings } from './';

export interface IAppLayoutProps
	extends Pick<IAppConfig, 'theme' | 'pages' | 'onRouteChange' | 'navigation' | 'metadata'> {
	Icon?: OverridableComponent<SvgIconTypeMap> | JSX.Element;
	children?: ReactNode;
	components?: {
		header?: ReactNode;
		footer?: ReactNode;
	};
	ids?: {
		title?: string;
		subTitle?: string;
		icon?: string;
	};
	isNavPaneOpen?: boolean;
	settings?: ISettings;
	navigation?: INavigationZone;
}

export interface ILayoutProps {
	id: string;
	activeRoute: IRoute;
	renderedRoutes: ReactNode;
}

export interface IAppLayoutContext extends Omit<IAppLayoutProps, 'pages' | 'name' | 'theme'>, ILayoutProps {
	toggleNavPane: (value: boolean) => void;
	updateNavigation: (value: INavigationZone) => void;
	updateSettings: (value: ISettings) => void;
}
