import { NavLink } from 'react-router-dom';

import { ListItem, ListItemIcon, ListItemText, Tooltip, styled } from '@mui/material';
import { INavItem } from '../../../types';

const StyledNavLink = styled(NavLink)`
	text-decoration: none;
	color: inherit;
`;

export const MenuItem = (props: INavItem & { tooltip?: string }) => {
	const { id, route, label, selected, tooltip, onClick } = props;
	const Icon = (props.Icon ? (props.Icon as INavItem['Icon']) : null) as any;

	let link = (
		<ListItem
			id={id}
			button
			selected={selected}
			sx={{
				'&.Mui-selected': {
					backgroundColor: 'primary.light',
					'.MuiTypography-root': {
						color: 'common.white',
					},
				},
				':not(&.Mui-selected):hover': {
					color: 'primary.light',
				},
			}}
			onClick={(e) => onClick?.(e, props)}
		>
			{Icon ? (
				<ListItemIcon
					sx={[
						{ minWidth: 'auto' },
						(theme) => ({
							paddingRight: theme.spacing(2.5),
							color: selected ? theme.palette.common.white : theme.palette.primary.dark,
						}),
					]}
				>
					<Icon />
				</ListItemIcon>
			) : null}
			<ListItemText primary={label} sx={{ whiteSpace: 'nowrap', fontSize: '1.25rem' }} />
		</ListItem>
	);

	if (tooltip) {
		link = (
			<Tooltip title={tooltip} placement="right" arrow={true}>
				{link}
			</Tooltip>
		);
	}

	return route?.path ? (
		<StyledNavLink id={id} to={route.path}>
			{link}
		</StyledNavLink>
	) : (
		<span id={id}>{link}</span>
	);
};
