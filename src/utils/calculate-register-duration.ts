export const calculateDuration = (startDate: string, endDate: string) => {
	const start = new Date(startDate);
	const end = new Date(endDate);
	const diffTime = Math.abs(end.getTime() - start.getTime());
	const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
	const diffHours = Math.floor(
		(diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
	);

	if (diffDays > 0) {
		return `${diffDays}d ${diffHours}h`;
	}

	return `${diffHours}h`;
};
