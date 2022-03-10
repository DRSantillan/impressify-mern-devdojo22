import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom';
import Users from '../../pages/users/Users.page';
import Places from '../../pages/places/places/Places.page';
import NewPlace from '../../pages/places/new/NewPlace.page';
import UpdatePlace from '../../pages/places/update/UpdatePlace.component';
import Navigation from '../../components/ui/navigation/Navigation.component';
import Authentication from '../../pages/auth/Authentication.page';
import { AuthenticationContext } from '../../context/auth/AuthenticationContext.context';
import useAuthorization from '../../hooks/auth/useAuthorization.hook';
import './App.css';

//


function App() {
	const {authToken, userId, loginUser, logoutUser} = useAuthorization()
	

	let routes;

	if (authToken) {
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
			value={{
				isLoggedIn: !!authToken,
				loginUser,
				logoutUser,
				userId,
				token: authToken,
			}}
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
