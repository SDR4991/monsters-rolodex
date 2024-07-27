import { useEffect, useState } from 'react';

import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';
import './App.css';

const App = () =>{

	const [searchField, setSearchField] = useState('');
	const [monsters,setMonsters] = useState([]);
	const [filteredMonsters, setFilterMonsters] = useState(monsters);

	useEffect(()=>{
		fetch('https://jsonplaceholder.typicode.com/users')
			.then((response) => response.json())
			.then((users)=> setMonsters(users));
	},[]);

	useEffect(()=>{
		const newFilteredMonsters = monsters.filter(monster =>{
			return monster.name.toLocaleLowerCase().includes(searchField)
		});

		setFilterMonsters(newFilteredMonsters);
	
	},[monsters,searchField]);

	const onSearchChange = (e)=>{
		const searchFieldString = e.target.value.toLocaleLowerCase();
		setSearchField(searchFieldString);
	}


	return (
		<div className="App">
			<h1 className='app-title'>Monster Rolodex</h1>

			<SearchBox 
				className='search-box'
				placeholder='search monster'
				onChangeHandler={onSearchChange}
			/>
			<CardList monsters={filteredMonsters}/>
		</div>
	);
}

export default App;
