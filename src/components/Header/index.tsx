import classes from "./Header.module.sass"

import { cart } from "../../store/cart"

import { createSignal } from "solid-js"

import menu from "../../assets/menu.svg"
import logo from "../../assets/logo.webp"
import basket from "../../assets/basket.svg"
import Sidebar from "../Sidebar"

export default function Header() {
	const [isSidebarOpen, setIsSidebarOpen] = createSignal(false)

	const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen())
	const closeSidebar = () => setIsSidebarOpen(false)

	return (
		<div class={classes.container}>
			<Sidebar isOpen={isSidebarOpen()} onClose={closeSidebar} />
			<div class={classes.header}>
				<div class={classes.iconsHeader}>
					<img
						src={menu}
						width={26}
						height={26}
						onClick={toggleSidebar}
					/>
					<a href="/" class={classes.logoLink}>
						<img src={logo} alt="logo" class={classes.logoImg} />
					</a>
					<a href="/checkout" class={classes.logoLink}>
						<img
							src={basket}
							width={26}
							height={26}
							alt="basketIcon"
						/>
						<span class={classes.badge}>{cart.length}</span>
					</a>
				</div>
			</div>
			<div class={classes.headerText}>
				Организация детских праздников по всему Крыму
			</div>
		</div>
	)
}
