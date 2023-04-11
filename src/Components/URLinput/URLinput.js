// import React from 'react';
// import './URLinput.css'

// const URLinput = ({onInputChange, onButtonSubmit}) => {
// 	return (
// 		<div className="urlinput">
// 			<p className="instructions">
// 				{'This App will detect faces in your pictures. Upload image URL below.'}
// 			</p>
// 			<div>
// 				<div className="form">
// 					<input type="text" placeholder="type URL here" onChange={onInputChange}/>
// 					<button onClick={onButtonSubmit}>Detect</button>	
// 					{/*HOW COME THIS BUTTON WORKS WITHOUT () => ?*/}
// 				</div>
// 			</div>
// 		</div>
// 	);
// }

// export default URLinput



import React from 'react';
import './URLinput.css'

const URLinput = ({onInputChange, onButtonSubmit}) => {
	return (
		<div className="urlinput">
			<p className="instructions">
				{'This App will detect faces in your pictures. Upload image URL below.'}
			</p>
			<div>
				<div className="form">
					<input type="text" placeholder="type URL here" onChange={onInputChange}/>
					<button onClick={onButtonSubmit}>Detect</button>	
					{/*HOW COME THIS BUTTON WORKS WITHOUT () => ?*/}
				</div>
			</div>
		</div>
	);
}

export default URLinput
