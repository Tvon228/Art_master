import classes from "./App.module.sass"
import Home from "./pages/home/page"
import { Router, Route } from "@solidjs/router"
import Contacts from "./pages/contacts/page"
import Reviews from "./pages/reviews/page"
import Animators from "./pages/animators/page"

export default function App() {
	return (
		<div class={classes.App}>
			<Router>
				<Route path="/" component={Home} />
				<Route path="/contacts" component={Contacts} />
				<Route path="/reviews" component={Reviews} />
				<Route path="/animators" component={Animators} />
			</Router>
		</div>
	)
}
