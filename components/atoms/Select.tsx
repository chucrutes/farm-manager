// import { ChangeEvent, HTMLAttributes, useCallback, useState } from 'react';

import MuiSelect, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { ForwardedRef, forwardRef, useState } from "react";

type SelectOption = {
	label: string;
	value: string;
};

type SelectProps = {
	options: SelectOption[];
};

const Select = forwardRef(
	(props: SelectProps, ref: ForwardedRef<HTMLSelectElement>) => {
		const { options } = props;
		const [option, setOption] = useState<SelectOption>(options[0]);

		const onChange = ({ target: { value } }: SelectChangeEvent) => {
			const option = options.find((option) => option.value === value)!;
			setOption(option);
		};

		return (
			<MuiSelect ref={ref} value={option.value} onChange={onChange}>
				{options.map((option) => (
					<MenuItem key={option.value} value={option.value}>
						{option.label}
					</MenuItem>
				))}
			</MuiSelect>
		);
	},
);

Select.displayName = "Input";

export default Select;
