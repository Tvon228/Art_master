import classes from "./App.module.sass"
import Home from "./pages/home/page"
import { Router, Route } from "@solidjs/router"
import Contacts from "./pages/contacts/page"

export default function App() {
	return (
		<div class={classes.App}>
			<Router>
				<Route path="/" component={Home} />
				<Route path="/contacts" component={Contacts} />
			</Router>
		</div>
	)
}
