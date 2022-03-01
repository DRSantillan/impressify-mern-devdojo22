import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Users from '../../pages/users/Users.page';
import Places from '../../pages/places/Places.page';
import AddNewPlace from '../../pages/places/add-new-place/AddNewPlace.page';
import Navigation from '../../components/ui/navigation/Navigation.component';
import './App.css';

function App() {
	return (
		<Router>
			<Navigation />
			<main>
				<Routes>
					<Route path='/' element={<Users />} />
					<Route path='/places' element={<Places />} />
					<Route path='/places/new' element={<AddNewPlace />} />
				</Routes>
			</main>
		</Router>
	);
}

export default App;
