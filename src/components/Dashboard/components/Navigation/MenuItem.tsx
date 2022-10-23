import { NavLink } from 'react-router-dom';
import { ListItem, ListItemIcon, ListItemText, Tooltip, styled } from '@mui/material';

import { INavItem, LabelPlacement } from '../../../../types';
import { useLayoutContext } from '../../../../context';

const StyledNavLink = styled(NavLink)`
	text-decoration: none;
	color: inherit;
`;

export const StyledListItem = styled(ListItem, { shouldForwardProp: (prop) => prop !== 'labelPlacement' })<{ labelPlacement?: LabelPlacement }>(({ labelPlacement, theme }) => `
	&.Mui-selected {
		background-color: ${theme.palette.primary.light};
		color: ${theme.palette.primary.dark};

		.MuiTypography-root {
			color: ${theme.palette.common.white};
		}
	}

	flex-direction: ${labelPlacement === LabelPlacement.Right
		? 'row-reverse'
		: labelPlacement === LabelPlacement.Left
			? 'row'
			: labelPlacement === LabelPlacement.Bottom
				? 'column'
				: labelPlacement === LabelPlacement.Top
					? 'column-reverse'
					: undefined
};

	gap: ${labelPlacement && [LabelPlacement.Right, LabelPlacement.Left].includes(labelPlacement) ? theme.spacing(2.5) : 0};

	&:not(&.Mui-selected):hover {
		background-color: ${theme.palette.primary.dark};
		* {
			color: ${theme.palette.common.white};
		}
	}
`);

const StyledListItemIcon = styled(ListItemIcon, { shouldForwardProp: (prop) => prop !== 'selected' })<{ selected?: boolean }>(({ selected, theme }) => `
	min-width: auto;
	color: ${selected ? theme.palette.common.white : theme.palette.primary.dark};
`);

const StyledListItemText = styled(ListItemText, { shouldForwardProp: (prop) => prop !== 'hidden' })<{ hidden?: boolean }>(({ hidden }) => `
	white-space: nowrap;
	visibility: ${hidden ? 'collapse' : 'visible'};
	transition: visibility ease 0.25s;
`);

export const MenuItem = (props: INavItem & { tooltip?: string }) => {
	const { isNavPanelOpen } = useLayoutContext();
	const { id, route, label, selected, tooltip, labelPlacement = LabelPlacement.Left, onClick } = props;
	const Icon = (props.Icon ? (props.Icon as INavItem['Icon']) : null) as any;

	let link = (
		<StyledListItem
			id={id}
			selected={selected}
			labelPlacement={labelPlacement}
			onClick={(e) => onClick?.(e, props)}
		>
			{Icon ? (
				<StyledListItemIcon selected={selected}>
					<Icon />
				</StyledListItemIcon>
			) : null}
			<StyledListItemText
				primary={label}
				hidden={!isNavPanelOpen}
			/>
		</StyledListItem>
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
