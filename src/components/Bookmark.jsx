import React from "react";

const BookMark = ({ ...user }) => {
	console.log(user)
	return (

		<>

			<i className={user.bookmark ? "bi bi-bookmark" : "bi bi-bookmark-fill"} onClick={() => user.onToggleBookMark(user._id)} ></i>


		</>
	)

};

export default BookMark


