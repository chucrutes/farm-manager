// import { ChangeEvent, HTMLAttributes, useCallback, useState } from 'react';

import MuiSelect, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { ForwardedRef, forwardRef, useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import { IAddItem } from "../organisms/forms/AddItemForm/@types/types";

type SelectOption = {
	label: string;
	value: string;
};

type SelectProps = {
	options: SelectOption[];
	setValue: UseFormSetValue<IAddItem>;
};

const Select = forwardRef<HTMLSelectElement, SelectProps>((props, ref) => {
	const { options, setValue } = props;
	const [option, setOption] = useState<SelectOption>(options[0]);

	const onChange = ({ target: { value } }: SelectChangeEvent) => {
		console.log(value);
		console.log(options[0]);
		console.log(options[4]);

		const option = options.find((option) => option.value === value)!;
		setOption(option);
		setValue("type", value);
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
});

Select.displayName = "Select";

export default Select;
