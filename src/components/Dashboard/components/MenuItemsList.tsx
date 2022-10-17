import { useLocation } from 'react-router-dom';
import { List, Grid } from '@mui/material';

import { MenuItem } from './MenuItem';
import { useLayoutContext } from '../../../LayoutContext';

export const MenuItemsList = () => {
	const { isNavPanelOpen, navigation } = useLayoutContext();
	const { pathname } = useLocation();

	if (!navigation?.side?.length) return null;

	return (
		<Grid sx={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
			<List sx={{ p: 0 }}>
				{navigation.side.map((nav) => (
					<MenuItem
						{...nav}
						key={nav.route?.path}
						tooltip={
							!isNavPanelOpen ? `${nav.label}${nav.route?.disabled ? ' (Not Allowed)' : ''}` : undefined
						}
						selected={pathname === nav.route?.path}
					/>
				))}
			</List>
		</Grid>
	);
};
