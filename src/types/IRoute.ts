import { RouteObject } from 'react-router-dom';

import { ILayout, UserRoles, IPageMetaData } from './';

export interface IRoute extends Omit<RouteObject, 'path'> {
	auth?: UserRoles[];
	path: string;
	metadata?: IPageMetaData;
	layout?: ILayout;
}

export type KeyedRoute = Record<string, IRoute>;
