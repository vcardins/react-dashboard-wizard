import { useMediaQuery, useTheme, Drawer as MuiDrawer, styled } from '@mui/material';

import { MenuItemsList } from './MenuItemsList';
import { MenuBarToggle } from './MenuBarToggle';

import { useLayoutContext } from '../../../LayoutContext';

export const StyledNavigation = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'isOpened' })<{ isOpened: boolean; }>(({ isOpened, theme }) => ({
	width: isOpened ? 240 : theme.spacing(7),
	height: '100%',
	overflow: 'auto',
	transition: isOpened
		? theme.transitions.create('width', {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.enteringScreen,
		})
		: theme.transitions.create('width', {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen,
		}),
	'& .MuiDrawer-paper': {
		position: 'static',
		overflow: 'hidden',
	},
}));

export const MenuBar = () => {
	const { isNavPanelOpen, toggleNavPanel, navigation } = useLayoutContext();
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up('sm'));

	if (!navigation?.side?.length) return null;

	return (
		<StyledNavigation
			variant={isLargeScreen ? 'permanent' : 'temporary'}
			open={!isLargeScreen && isNavPanelOpen ? true : false}
			onClose={() => toggleNavPanel?.(!isNavPanelOpen)}
			isOpened={!!isNavPanelOpen}
		>
			<MenuItemsList />
			<MenuBarToggle source='drawer' />
		</StyledNavigation>
	);
};
