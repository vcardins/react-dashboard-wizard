import { MouseEvent } from 'react';
import type { SvgIconTypeMap } from '@mui/material';
import type { OverridableComponent } from '@mui/material/OverridableComponent';

import { IBadge } from './IBadge';
import { IRoute } from './IRoute';

export interface INavItem {
	id: string;
	label?: string;
	tooltip?: string;
	Icon?: OverridableComponent<SvgIconTypeMap> | JSX.Element;
	badge?: IBadge;
	route?: IRoute;
	disabled?: boolean;
	selected?: boolean;
	onClick?: (e: MouseEvent<HTMLElement>, item: INavItem) => void;
	target?: string;
	href?: string;
	children?: INavItem[];
	order?: number;
}

export interface ISubNavItem extends Omit<INavItem, 'children'> {
	children?: INavItem;
}
