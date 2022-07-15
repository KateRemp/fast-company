import React, { useState } from "react";
import Qualitie from "./Qalitie";
import BookMark from "./Bookmark";

const User = (props) => {

	return (
		<>
			<tr key={props._id}>
				<td>{props.name}</td>
				<td>
					<Qualitie
						array={props.qualities}

					/>
				</td>
				<td>{props.profession.name}</td>
				<td>{props.completedMeetings}</td>
				<td>{props.rate} /5</td>
				<td><BookMark
					{...props}
				//status={props.bookmark}
				//toggleBookmark={props.onToggleBookMark}
				//userId={props._id}
				/>
				</td>
				<td>
					<button
						onClick={() => props.onDelete(props._id)}
						className="btn btn-danger"
					>
						delete
					</button>
				</td>
			</tr>
		</>
	);
};


export default User;