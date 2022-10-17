import { RouteObject } from 'react-router';

import { ILayout } from './ILayout';
import { UserRoles } from './UserRoles';

export interface IRoute extends Omit<RouteObject, 'path'> {
	auth?: UserRoles[];
	path?: string;
	title?: string;
	disabled?: boolean;
	layout?: ILayout;
	onClick?: () => void;
}

export type KeyedRoute = Record<string, IRoute>;
