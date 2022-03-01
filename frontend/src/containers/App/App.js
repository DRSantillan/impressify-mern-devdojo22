import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Users from '../../pages/users/Users.page';
import Places from '../../pages/places/places/Places.page'
import NewPlace from '../../pages/places/new/NewPlace.page';
import Navigation from '../../components/ui/navigation/Navigation.component';
import './App.css';

function App() {
	return (
		<Router>
			<Navigation />
			<main>
				<Routes>
					<Route path='/' element={<Users />} />
					<Route path='/:userId/places' element={<Places />} exact/>
					<Route path='/places/new' element={<NewPlace />} />
				</Routes>
			</main>
		</Router>
	);
}

export default App;
