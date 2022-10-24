import { memo } from 'react';
import { Theme, useMediaQuery, useTheme, Drawer as MuiDrawer, styled } from '@mui/material';

import { MenuItemsList } from './MenuItemsList';
import { MenuBarToggle } from './MenuBarToggle';

import { useLayoutContext } from '../../../../context';

const getTransition = (theme: Theme, tag: 'enteringScreen' | 'leavingScreen') =>
	theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration[tag] as number,
	});

export const StyledNavigation = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'isOpened' })<{
	isOpened: boolean;
}>(({ isOpened, theme }) => ({
	width: isOpened ? (theme.mixins.navbar?.width ?? '220px') : theme.spacing(7),
	height: '100%',
	overflow: 'auto',
	transition: getTransition(theme, isOpened ? 'enteringScreen' : 'leavingScreen'),
	'& .MuiDrawer-paper': {
		backgroundColor: theme.mixins.navbar?.backgroundColor ?? theme.palette.primary.main,
		color: theme.mixins.navbar?.color ?? theme.palette.common.white,
		position: 'static',
		overflow: 'hidden',
	},
}));

export const MenuBar = memo(() => {
	const { isNavPaneOpen, toggleNavPane, navigation, settings } = useLayoutContext();
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up('sm'));

	if (!navigation?.navbar?.length || !settings.navbar.display) {
		return null;
	}

	return (
		<StyledNavigation
			variant={isLargeScreen ? 'permanent' : 'temporary'}
			open={!isLargeScreen && isNavPaneOpen ? true : false}
			onClose={() => toggleNavPane?.(!isNavPaneOpen)}
			isOpened={!!isNavPaneOpen}
		>
			<MenuItemsList />
			<MenuBarToggle source="drawer" />
		</StyledNavigation>
	);
});
