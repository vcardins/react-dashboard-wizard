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
	width: isOpened ? 240 : theme.spacing(7),
	height: '100%',
	overflow: 'auto',
	transition: getTransition(theme, isOpened ? 'enteringScreen' : 'leavingScreen'),
	'& .MuiDrawer-paper': {
		position: 'static',
		overflow: 'hidden',
	},
}));

export const MenuBar = () => {
	const { isNavPaneOpen, toggleNavPane: toggleNavPane, navigation } = useLayoutContext();
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up('sm'));

	if (!navigation?.side?.length) return null;

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
};
