import { memo, useState, MouseEvent, useMemo, useRef, isValidElement } from 'react';

import {
	Popper,
	Fade,
	Paper,
	IconButton,
	Menu,
	MenuItem,
	Icon as MuiIcon,
	Tooltip,
	ClickAwayListener,
	SvgIconTypeMap,
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import type { OverridableComponent } from '@mui/material/OverridableComponent';

import { INavItem } from '../../../types';

export const Dropdown = memo(({ item }: { item: INavItem }) => {
	const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
	const arrowRef = useRef<HTMLElement | null>(null);

	const handleClick = (event: MouseEvent<HTMLButtonElement>, isDropDown = false) => {
		if (!isDropDown) {
			item.onClick?.(event, item);
		} else {
			setAnchorEl(event.currentTarget);
		}
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;

	const menu = useMemo(() => {
		const options = (item.children || []).map((child) => {
			const Icon = (
				isValidElement(child.Icon) ? (
					child.Icon
				) : (
					<MuiIcon component={child.Icon as OverridableComponent<SvgIconTypeMap>} />
				)
			) as any; // as INavItem['Icon'];

			return (
				<MenuItem key={child.id || child.label} onClick={(e) => child.onClick?.(e, child)}>
					{Icon && (
						<IconButton
							id={child.id}
							disabled={child.disabled}
							size="small"
							aria-label={child.label}
							aria-controls="menu-appbar"
							aria-haspopup="true"
							color="inherit"
						>
							<Icon />
						</IconButton>
					)}
					{child.label}
				</MenuItem>
			);
		});

		if (!options.length) {
			return null;
		}

		return (
			<Menu
				id={id}
				anchorEl={anchorEl}
				keepMounted={false}
				open={open}
				onClose={handleClose}
				PaperProps={{
					elevation: 0,
					sx: {
						overflow: 'visible',
						filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
						mt: 1.5,
						'& .MuiAvatar-root': {
							width: 32,
							height: 32,
							ml: -0.5,
							mr: 1,
						},
						'&:before': {
							content: '""',
							display: 'block',
							position: 'absolute',
							top: 0,
							right: 14,
							width: 10,
							height: 10,
							bgcolor: 'background.paper',
							transform: 'translateY(-50%) rotate(45deg)',
							zIndex: 0,
						},
					},
				}}
				transformOrigin={{ horizontal: 'right', vertical: 'top' }}
				anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
			>
				{options}
			</Menu>
		);
	}, [anchorEl, item, id, open]);

	const Icon = (item.Icon ?? MenuIcon) as any;

	return (
		<div>
			<Tooltip title={item?.label ?? ''} arrow={true}>
				<IconButton
					id={item.id}
					disabled={item.disabled}
					size="small"
					aria-label="hosted items"
					aria-controls="menu-appbar"
					aria-haspopup={!!menu}
					onClick={(e) => handleClick(e, !!menu)}
					color="inherit"
				>
					<Icon />
				</IconButton>
			</Tooltip>
			{menu ? (
				<Popper
					open={open}
					anchorEl={anchorEl}
					transition
					disablePortal={true}
					modifiers={[
						{
							name: 'flip',
							enabled: false,
							options: {
								altBoundary: true,
								rootBoundary: 'document',
								padding: 8,
							},
						},
						{
							name: 'preventOverflow',
							enabled: true,
							options: {
								altAxis: true,
								altBoundary: true,
								tether: true,
								rootBoundary: 'document',
								padding: 8,
							},
						},
						{
							name: 'arrow',
							enabled: true,
							options: {
								element: arrowRef.current,
							},
						},
					]}
				>
					{({ TransitionProps }) => (
						<Fade {...TransitionProps} timeout={350}>
							<Paper sx={{ boxShadow: 'none' }}>
								<ClickAwayListener onClickAway={handleClose}>
									<Paper>{menu}</Paper>
								</ClickAwayListener>
							</Paper>
						</Fade>
					)}
				</Popper>
			) : null}
		</div>
	);
});
