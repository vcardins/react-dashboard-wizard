import { IRoute } from './IRoute';
import { Layouts } from './Layouts';
import { UserRoles } from './UserRoles';

export interface IPageConfig {
	auth?: UserRoles[];
	routes: IRoute[];
	layout: Layouts;
}
