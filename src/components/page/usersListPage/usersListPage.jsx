import React, { useState, useEffect } from 'react';
import { paginate } from '../../../utils/paginate';
import Pagination from '../../common/pagination';
// import PropTypes from 'prop-types';
import GroupList from '../../common/groupList';
import api from '../../../api';
import SearchStatus from '../../ui/searchStatus';
import UserTable from '../../ui/usersTable';
import _ from 'lodash';

const UsersListPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [professions, setProfession] = useState();
  const [selectedProf, setSelectedProf] = useState();
  const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' });
  const [searchQuery, setSearchQuery] = useState('');
  const pageSize = 8;
  // Refactoring  Сортировка 9
  const [users, setUsers] = useState();
  const handleDelete = (userId) => {
    setUsers(users.filter((user) => user._id !== userId));
  };

  useEffect(() => {
    api.users.fetchAll().then((data) => setUsers(data));
  }, []);

  const handleToggleBookMark = (id) => {
    const userIndex = users.findIndex((user) => user._id === id);
    const newUsers = [...users];
    newUsers[userIndex].bookmark
      ? (newUsers[userIndex].bookmark = false)
      : (newUsers[userIndex].bookmark = true);
    setUsers(newUsers);
  };
  // -------------------
  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfession(data));
  }, []);
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProf, searchQuery]);

  const handleProfessionSelect = (item) => {
    if (searchQuery !== '') setSearchQuery('');
    setSelectedProf(item);
  };

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const handleSort = (item) => {
    setSortBy(item);
  };
  // ...loading, если users загрузились, то отображаем всё
  if (users) {
    const filteredUsers = selectedProf
      ? users.filter((user) => {
          // console.log(JSON.stringify(user.profession));
          return (
            JSON.stringify(user.profession) === JSON.stringify(selectedProf)
          );
          /* или отфильтровать по _id:
return (
JSON.stringify(user.profession._id) ===
JSON.stringify(selectedProf._id)
);
*/
        })
      : searchQuery
      ? users.filter((user) => {
          return user.name.toLowerCase().includes(searchQuery.toLowerCase());
        })
      : users;

    const count = filteredUsers.length;
    // Фильтруем продукты в порядке возрастания/убывания, метод orderBy() (_.orderBy(products, ["price"], ["asc"])) из lodash.
    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);

    // Пагинация
    const usersCrop = paginate(sortedUsers, currentPage, pageSize);
    // проверка на длину userCrop, длину массива когда удалены все юзеры из списка, если false, false то вызываем функцию
    usersCrop.length || count === 0 || handlePageChange(currentPage - 1);

    const clearFilter = () => {
      setSelectedProf();
    };

    const handleSearchQuery = ({ target }) => {
      setSelectedProf(undefined); // show all users
      setSearchQuery(target.value);
    };

    return (
      <div className="d-flex">
        {professions && (
          <div className="d-flex flex-column flex-shrink-0 p-3">
            <GroupList
              selectedItem={selectedProf}
              items={professions}
              onItemSelect={handleProfessionSelect}
            />
            <button className="btn btn-secondary mt-2" onClick={clearFilter}>
              Clear
            </button>
          </div>
        )}
        <div className="d-flex flex-column">
          <SearchStatus length={count} />
          <input
            type="text"
            placeholder="Search..."
            name="searchQuery"
            value={searchQuery}
            onChange={handleSearchQuery}
          />
          {count > 0 && (
            <UserTable
              users={usersCrop}
              selectedSort={sortBy}
              onSort={handleSort}
              onDelete={handleDelete}
              onToggleBookMark={handleToggleBookMark}
            />
          )}
          <div className="d-flex justify-content-center">
            <Pagination
              itemsCount={count}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    );
  }
  return 'loading...';
};

export default UsersListPage;
