import { AppBar, Toolbar, Box, styled } from '@mui/material';

import { MenuDropdown, MenuButton, MenuBarToggle } from './Navigation';
import { Title } from './Title';

import { useLayoutContext } from '../../../context';

export const StyledAppBar = styled(AppBar)(({ theme }) => `
	background-color: ${theme.palette.primary.dark};
	color: ${theme.palette.secondary.contrastText};
`);

export const ActionBar = styled(Box)`
	gap: 10px;
	align-items: center;
`;

export const Header = () => {
	const { navigation } = useLayoutContext();

	return (
		<StyledAppBar>
			<Toolbar>
				<MenuBarToggle source="header" />
				<Title />
				{navigation?.top ? (
					<>
						<Box sx={{ flexGrow: 1 }} />
						<ActionBar sx={{ display: { xs: 'none', md: 'flex' } }}>
							{navigation.top.map((item) => (item.children?.length
								? <MenuDropdown key={item.id} item={item} />
								: <MenuButton key={item.id} item={item} />
							))}
						</ActionBar>
					</>
				) : null}
			</Toolbar>
		</StyledAppBar>
	);
};
