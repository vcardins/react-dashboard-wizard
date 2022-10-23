import { MouseEvent } from 'react';
import type { SvgIconTypeMap } from '@mui/material';
import type { OverridableComponent } from '@mui/material/OverridableComponent';

import { IBadge } from './IBadge';
import { IRoute } from './IRoute';
import { LabelPlacement } from './LabelPlacement';

export interface INavItem {
	id: string;
	label?: string;
	labelPlacement?: LabelPlacement;
	tooltip?: string;
	Icon?: OverridableComponent<SvgIconTypeMap>;
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
