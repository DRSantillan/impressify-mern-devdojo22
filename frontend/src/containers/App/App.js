import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom';
import { useState, useCallback } from 'react';
import Users from '../../pages/users/Users.page';
import Places from '../../pages/places/places/Places.page';
import NewPlace from '../../pages/places/new/NewPlace.page';
import UpdatePlace from '../../pages/places/update/UpdatePlace.component';
import Navigation from '../../components/ui/navigation/Navigation.component';
import Authentication from '../../pages/auth/Authentication.page';
import { AuthenticationContext } from '../../context/auth/AuthenticationContext.context';
import './App.css';

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [userId, setUserId] = useState(null);
	const loginUser = useCallback(uid => {
		setIsLoggedIn(true);
		setUserId(uid);
	}, []);
	const logoutUser = useCallback(uid => {
		setIsLoggedIn(false);
		setUserId(null);
	}, []);
	let routes;

	if (isLoggedIn) {
		routes = (
			<>
				<Route path='/' element={<Users />} />
				<Route path='/:userId/places' element={<Places />} exact />
				<Route path='/places/new' element={<NewPlace />} />
				<Route path='/places/:placeId' element={<UpdatePlace />} />
				<Route path='/*' element={<Navigate to='/' />} />
			</>
		);
	} else {
		routes = (
			<>
				<Route path='/' element={<Users />} />
				<Route path='/:userId/places' element={<Places />} exact />
				<Route path='/authenticate' element={<Authentication />} />
				<Route path='/*' element={<Navigate to='/' />} />
			</>
		);
	}
	return (
		<AuthenticationContext.Provider
			value={{ isLoggedIn, loginUser, logoutUser, userId }}
		>
			<Router>
				<Navigation />
				<main>
					<Routes>
						{routes}
						{/* <Route path='/' element={<Users />} />
					<Route path='/:userId/places' element={<Places />} exact />
					<Route path='/places/new' element={<NewPlace />} />
					<Route path='/places/:placeId' element={<UpdatePlace />} />
					<Route path='/authenticate' element={<Authentication />} /> */}
					</Routes>
				</main>
			</Router>
		</AuthenticationContext.Provider>
	);
}

export default App;
