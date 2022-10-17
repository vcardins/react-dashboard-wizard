import { AppBar, Toolbar, Box, styled } from '@mui/material';

import { Dropdown } from './Dropdown';
import { Title } from './Title';
import { MenuBarToggle } from './MenuBarToggle';

import { useLayoutContext } from '../../../LayoutContext';

export const StyledAppBar = styled(AppBar)(
	({ theme }) => `
	background-color: ${theme.palette.primary.dark};
	color: ${theme.palette.secondary.contrastText};
`,
);

export const ActionBar = styled(Box)`
	gap: 10px;
	align-items: center;
`;

export const Header = () => {
	const { navigation } = useLayoutContext();

	return (
		<StyledAppBar>
			<Toolbar>
				<MenuBarToggle source='header' />
				<Title />
				{navigation?.top ? (
					<>
						<Box sx={{ flexGrow: 1 }} />
						<ActionBar sx={{ display: { xs: 'none', md: 'flex' } }}>
							{navigation.top.map((item) => (
								<Dropdown key={item.id} item={item} />
							))}
						</ActionBar>
					</>
				) : null}
			</Toolbar>
		</StyledAppBar>
	);
};
