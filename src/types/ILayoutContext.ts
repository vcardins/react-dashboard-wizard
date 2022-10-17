import { ReactNode } from 'react';
import type { SvgIconTypeMap } from '@mui/material';
import type { OverridableComponent } from '@mui/material/OverridableComponent';

import { INavItem } from './INavItem';
import { KeyedRoute, IRoute } from './IRoute';

export interface IAppLayoutProps {
	name: string;
	title?: string;
	subTitle?: string;
	Icon?: OverridableComponent<SvgIconTypeMap> | JSX.Element;
	routes: KeyedRoute;
	activeRoute: IRoute;
	navigation?: {
		side?: INavItem[];
		top?: INavItem[];
	};
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

export interface IAppLayoutContext extends Omit<IAppLayoutProps, 'routes' | 'name'>, ILayoutProps {}
