import { MouseEvent } from 'react';
import { ButtonProps } from '@mui/material';
import { INavItem, LabelPlacement } from '../../../../types';

export const getDefaultButtonProps = (item: INavItem, onClick?: (event: MouseEvent<HTMLButtonElement>) => void) => {
	const { id, label, disabled, labelPlacement, Icon } = item;

	const buttonProps = {
		id,
		disabled,
		size: 'small',
		'aria-label': label,
		'aria-controls': 'menu-button',
		color: 'inherit',
		children: label,
		sx: { textTransform: 'capitalize' },
		onClick,
	} as ButtonProps;

	if (Icon) {
		if (label) {
			const tag = labelPlacement === LabelPlacement.Left ? 'endIcon' : 'startIcon';
			buttonProps[tag] = <Icon />;
			buttonProps.children = item?.label;
		}
		else {
			buttonProps.children = <Icon fontSize="small"/>;
		}
	}

	return buttonProps;
};
