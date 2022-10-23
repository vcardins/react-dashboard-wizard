import { ReactNode } from 'react';
import type { SvgIconTypeMap } from '@mui/material';
import type { OverridableComponent } from '@mui/material/OverridableComponent';

import { IRoute, IAppConfig } from './';

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
	isNavPanelOpen?: boolean;
	toggleNavPanel?: (value: boolean) => void;
}

export interface ILayoutProps {
	id: string;
	activeRoute: IRoute;
	renderedRoutes: ReactNode;
}

export interface IAppLayoutContext extends Omit<IAppLayoutProps, 'pages' | 'name' | 'theme'>, ILayoutProps {}
