import { PropsWithChildren, ReactElement } from 'react';
// import type { SvgIconTypeMap } from '@mui/material';
// import type { OverridableComponent } from '@mui/material/OverridableComponent';

import { Theme } from '@mui/material';

import { IManifest, INavigation, IPageConfig, IRoute } from './';

export interface IAppConfig {
	container?: string;
	basename?: string;
	strictMode?: boolean;
	theme: Theme;
	Icon?: JSX.Element;
	metadata: IManifest;
	navigation?: INavigation;
	pages: IPageConfig[];
	App?: () => ReactElement;
	Providers?: (props: PropsWithChildren<unknown>) => ReactElement;
	version?: string | ReactElement;
	onRouteChange?: (route: IRoute) => void;
}
