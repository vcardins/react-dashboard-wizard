import { AppBar, Toolbar, Box, styled } from '@mui/material';

import { MenuDropdown, MenuButton, MenuBarToggle } from './Navigation';
import { Title } from './Title';

import { useLayoutContext } from 'context';

export const StyledAppBar = styled(AppBar)(({ theme }) => `
	background-color: ${theme.palette.common.white};
	color: ${theme.palette.common.black};
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
				{navigation?.toolbar ? (
					<>
						<Box sx={{ flexGrow: 1 }} />
						<ActionBar sx={{ display: { xs: 'none', md: 'flex' } }}>
							{navigation.toolbar.map((item) =>
								item.children?.length ? (
									<MenuDropdown key={item.id} item={item} />
								) : (
									<MenuButton key={item.id} item={item} />
								),
							)}
						</ActionBar>
					</>
				) : null}
			</Toolbar>
		</StyledAppBar>
	);
};
