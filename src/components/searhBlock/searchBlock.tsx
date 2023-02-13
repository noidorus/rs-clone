import React, { useEffect, useState } from "react";
import { setDataUsers } from "../../firebase/services";
import { IUser } from "../../types/types";
import FoundUser from "../foundUser/foundUsers";
import { Search } from "../search/search";

function filteredUsers(users: IUser[], value: string) {
  const filteredUsers = value 
    ? users.filter((user) => user.username.toUpperCase().includes(value.toUpperCase())
                          || user.fullName.toUpperCase().includes(value.toUpperCase()))
    : [];
  return filteredUsers;
}

function SearchBlock() {
  const [value, setValue] = useState('');
  const [users, setUsers] = useState<IUser[]>([]);
  const [status, setStatus] = useState<'loading' | 'error' | 'success'>('success');

  useEffect(() => {
    setStatus('loading')
    setDataUsers().then((data) => {
      const usersArr = filteredUsers(data as IUser[], value);
      setStatus('success');
      setUsers(usersArr);
    })
    .catch((err) => {
      setStatus('error')})
  }, [value]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const inputText = event.target.value;
    setValue(inputText);
  }
  function clearInput() {
    setValue('')
  }
  return (
    <div>
      <div>
        <Search 
          value={value}
          handleChange={handleChange}
          clearInput = {clearInput}

        />
      </div>
      <div>
        {status === 'success' && (<ul>{users.map((user, index) => 
          {return (
              <FoundUser 
                key={user.userId}
                username={user.username}
                fullName ={user.fullName}/>
            )
          })}
        </ul>)}
        {status === 'loading' && (<div>loading</div>) }
        {status === 'error' && (<div>WTF?</div>) }
        </div>
    </div>
  )
}

export default SearchBlock;