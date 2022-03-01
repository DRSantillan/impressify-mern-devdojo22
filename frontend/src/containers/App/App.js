import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Users from '../../pages/users/Users.page';
import Places from '../../pages/places/Places.page';
import AddNewPlace from '../../pages/places/add-new-place/AddNewPlace.page'
import './App.css';

function App() {
	return (
		<Router>
			<div className='App'>Impressify</div>
			<Routes>
				<Route path='/' element={<Users />} />
				<Route path='/places' element={<Places />} />
				<Route path='/places/new' element={<AddNewPlace />} />
			</Routes>
		</Router>
	);
}

export default App;
