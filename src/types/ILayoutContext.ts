import { ReactNode } from 'react';

import { IRoute, IAppConfig, INavigation, ISettings } from './';

export interface IAppLayoutProps extends Pick<IAppConfig, 'theme' | 'navigation' | 'metadata' | 'Icon'> {
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
	navigation?: INavigation;
}

export interface ILayoutProps {
	id: string;
	activeRoute: IRoute;
	renderedRoutes: ReactNode;
}

export interface IAppLayoutContext extends Omit<IAppLayoutProps, 'name' | 'theme' | 'settings'>, ILayoutProps {
	settings: ISettings;
	toggleNavPane: (value: boolean) => void;
	updateNavigation: (value: INavigation) => void;
	updateSettings: (value: ISettings) => void;
}
