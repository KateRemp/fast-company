import React, { useState } from "react";
import api from "../api"



const Users = () => {

	const [contacts, setContacts] = useState(() => api.users.fetchAll())
	console.log(contacts)

	const deleteContact = (contact) => {
		setContacts(prevContacts => prevContacts.filter(item => item !== contact));
		console.log(contact)
	};

	let counter = contacts.length


	const getCounterMessage = () => {
		let message = '';
		message = counter > 4 || counter === 1 ? counter + " Человек тусанёт с тобой сегодня" :
			counter === 0 ? "Никто с тобой не тусанёт" :
				counter + " Человека тусанёт с тобой сегодня"
		return message
	};

	const getCounterClasses = () => {
		let classes = "badge "
		classes += counter === 0 ? "bg-danger" : "bg-primary"
		return classes
	}


	const contactsTableBody = () => {
		return (
			counter !== 0 &&
			contacts.map((contact) => (
				<tr key={contact._id}>
					<td >{contact.name}</td>
					<td>{contact.qualities.map((qualitie) => <span className={"badge m-1 bg-" + qualitie.color} key={qualitie._id}>{qualitie.name}</span>)}</td>
					<td key={contact.profession._id}>{contact.profession.name}</td>
					<td>{contact.completedMeetings}</td>
					<td>{contact.rate}</td>
					<td><button className='btn btn-danger' onClick={() => deleteContact(contact)}>delete</button></td>
				</tr>
			))
		)
	}


	const contactsTableHead = () => {
		return (
			counter !== 0
			&& <tr>
				<th scope="col">Имя</th>
				<th scope="col">Качества</th>
				<th scope="col">Профессия</th>
				<th scope="col">Встретился,раз</th>
				<th scope="col">Оценка</th>
				<th scope="col"></th>
			</tr>
		)
	}

	return (
		<>
			<h1 ><span className={getCounterClasses()}>{getCounterMessage()}</span></h1>
			<table className="table">
				<thead>
					{contactsTableHead()}
				</thead>
				<tbody>
					{contactsTableBody()}
				</tbody>
			</table>
		</>
	)
}


export default Users

