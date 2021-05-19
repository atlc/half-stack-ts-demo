import * as React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './views/Home';
import AllEmployees from './views/AllEmployees';
import SingleEmployee from './views/SingleEmployee';
import CreateEmployee from './views/CreateEmployee';

const App = () => {
	return (
		<BrowserRouter>
			<Navbar />
			<Switch>
				<Route exact path='/'>
					<Home />
				</Route>
				<Route exact path='/employees'>
					<AllEmployees />
				</Route>
				<Route exact path='/employees/create'>
					<CreateEmployee />
				</Route>
				<Route exact path='/employees/:id'>
					<SingleEmployee />
				</Route>
				<Route path='*'>
					<h1>404 idiot</h1>
				</Route>
			</Switch>
		</BrowserRouter>
	);
};


export default App;
