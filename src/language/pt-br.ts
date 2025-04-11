const ptBr = [
	{
		key: "entry_type.with_the_same_name",
		label: "Já existe um tipo cadastrado com esse nome",
	},
	{
		key: "user.already_exists",
		label: "Entre em contato com os administradores",
	},
];

export const findLabelByKey = (key: string): string => {
	return ptBr.find((item) => item.key === key)?.label ?? key;
};
