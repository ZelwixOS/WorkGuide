import { Autocomplete } from '@mui/material'
import { Fragment, useEffect, useState } from 'react'
import { Search } from 'react-bootstrap-icons'
import { getUsersBySearch } from '../../Request/GetRequests'
import { makeStyles } from '../../theme'
import UserInfo from '../../Types/UserInfo'
import UserSearchCard from '../User/UserSearchCard'


const useStyles = makeStyles()((theme) => ({
  paper: {
    background: '#A370F780',
    width: 'fit-content',
    height: 'fit-content',
    overflowX: "hidden",
    marginTop: '1rem',
    transform: 'translate(-455px, 0px)'
  },
  noOptions: {
    background: '#A370F780'
  },
  searchBar: {
    borderRadius: '5px',
    width: '250px'
  },
  focusedBar: {
    opacity: 0.0,
  },
  unfocusedBar: {
    opacity: 1.0,
  },
  focusedIcon: {
    color: 'white',
  },
  unfocusedIcon: {
    color: 'black',
  }
}))

const SearchBar = () => {
  const { classes, cx } = useStyles()
  const [users, setUsers] = useState<readonly UserInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [focused, setFocus] = useState<boolean>(false);

  const itemsPerPage = 4;

  const loadUsers = async (searchValue: string) => {
    setLoading(true);

    if (!searchValue) {
      setUsers([]);
      setLoading(false);
      return;
    } else {
      const res = await getUsersBySearch(searchValue, itemsPerPage)
      setUsers(res);
      setLoading(false);
    }
  }

  const onButtonClick = () => {
    const el = document.getElementById("user-search-bar");
    el?.focus();
  }

  useEffect(() => {
    loadUsers(inputValue);
  }, [inputValue]);

  return (
    <>
      <Autocomplete
        noOptionsText={'Пользователи не найдены'}
        ListboxProps={{ style: { maxHeight: "1000px" } }}
        className={focused ? classes.focusedBar : classes.unfocusedBar}
        style={{ opacity: focused ? '1.0' : '0.0' }}
        onBlur={() => setFocus(false)}
        onFocus={() => setFocus(true)}
        forcePopupIcon={false}
        id="user-search-bar"
        getOptionLabel={(option) => `${option.firstName} ${option.secondName} ${option.phoneNumber} ${option.email}`}
        options={users}
        loading={loading}
        loadingText={'Загрузка...'}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        renderOption={(props, option) => (
          <Fragment key={option.id}>
            <div style={{ textOverflow: 'ellipsis', overflow: "hidden", whiteSpace: "nowrap" }}>
              <UserSearchCard user={option}></UserSearchCard>
            </div>
          </Fragment>
        )}
        classes={users.length > 0 ? { paper: classes.paper } : { paper: classes.noOptions }}
        renderInput={(params) => (
          <div ref={params.InputProps.ref}>
            <input placeholder='Найти пользователя...' {...params.inputProps} className={classes.searchBar} />
          </div>
        )}
      />
      <Search onClick={onButtonClick} className={`mx-2 ${focused ? classes.focusedIcon : classes.unfocusedIcon}`}/>
    </>
  )
}

export default SearchBar;
