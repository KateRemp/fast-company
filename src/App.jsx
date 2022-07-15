import React, { useState } from "react";
import Users from "./components/Users";
import SearchStatus from "../src/components/SearchStatus";
import api from "./api";


const App = () => {

	const [users, setUsers] = useState(api.users.fetchAll());

	const handleDelete = (userId) => {
		setUsers(users.filter((user) => user._id !== userId));
	};

	const handleToggleBookMark = (id) => {

		const userIndex = users.findIndex((user) => user._id === id);
		console.log(userIndex)
		const newUsers = [...users];
		console.log(newUsers)
		const a = newUsers[userIndex].bookmark
		a ? newUsers[userIndex].bookmark = false : newUsers[userIndex].bookmark = true
		console.log(a)
		setUsers(newUsers);


	}


	return (
		<>
			<SearchStatus length={users.length} />
			<Users users={users} onDelete={handleDelete} onToggleBookMark={handleToggleBookMark} />
		</>
	);
}

export default App;