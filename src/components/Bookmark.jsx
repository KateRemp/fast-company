import React from "react";

const BookMark = ({ status, ...rest }) => {
	return (
		<>
			<button {...rest}>
				<i className={status ? "bi bi-bookmark" : "bi bi-bookmark-fill"}></i>
			</button>
		</>
	)
};

export default BookMark


