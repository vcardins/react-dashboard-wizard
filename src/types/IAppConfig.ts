import { PropsWithChildren, ReactElement } from 'react';

import { Theme } from '@mui/material';

import { IManifest, INavigationZone, IPageConfig, IRoute } from './';

export interface IAppConfig {
	container?: string;
	basename?: string;
	strictMode?: boolean;
	theme: Theme;
	metadata: IManifest;
	navigation?: INavigationZone;
	pages: IPageConfig[];
	App?: () => ReactElement;
	Providers?: (props: PropsWithChildren<unknown>) => ReactElement;
	version?: string | ReactElement;
	onRouteChange?: (route: IRoute) => void;
}
