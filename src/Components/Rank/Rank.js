import React from 'react';
import './Rank.css';

const Rank = ({userName, userEntries}) => {
	console.log('rankinfo', userName, userEntries)
	return (
		<div className="rankcontainer">
			<div>
				{`${userName}, your current entry count is...`}
			</div>
			<div>
				{userEntries}
			</div>
		</div>
	);
}

export default Rank