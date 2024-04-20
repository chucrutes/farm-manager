"use client";
import { useState } from "react";
import { QueryStats } from "../Icons/QueryStats";
import { CollapseIcon } from "../Icons/CollapseIcon";

const LiveCattleInfo = () => {
	const [expanded, setExpanded] = useState(false);

	return (
		<div className="px-8 py-4">
			<button onClick={() => setExpanded(!expanded)}>
				{expanded ? <CollapseIcon /> : <QueryStats />}
			</button>
			{expanded && (
				<iframe
					src="/live-cattle-frame.html"
					width="400"
					height="130"
					title="CEPEA Widget"
				/>
			)}
		</div>
	);
};

export default LiveCattleInfo;
