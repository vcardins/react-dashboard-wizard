import { Box, IconButton, styled } from '@mui/material';
import {
	Menu as MenuIcon,
	ChevronRight as ChevronRightIcon,
	ChevronLeft as ChevronLeftIcon,
} from '@mui/icons-material';

import { useLayoutContext } from '../../../../context';

export const MenuBarToggleContainer = styled(Box)`
	padding-left: 10px;
	margin-top: auto;
`;

export const MenuBarToggle = ({ source }: { source: 'drawer' | 'header' }) => {
	const { isNavPanelOpen, toggleNavPanel, navigation } = useLayoutContext();

	if (!navigation?.side?.length) {
		return null;
	}

	const ExpandIcon = source === 'header' ? MenuIcon : ChevronRightIcon;

	return (
		<Box sx={source === 'header' ? { mr: 2 } : { ml: 1 }}>
			<IconButton
				edge={source === 'header' ? 'start' : undefined}
				color="inherit"
				onClick={() => toggleNavPanel?.(!isNavPanelOpen)}
			>
				{isNavPanelOpen ? <ChevronLeftIcon /> : <ExpandIcon />}
			</IconButton>
		</Box>
	);
};
