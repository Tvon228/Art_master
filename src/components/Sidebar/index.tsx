import { createSignal, JSX } from "solid-js"
import classes from "./Sidebar.module.sass"

import closeIcon from "../../assets/closeIcon.svg"
import logo from "../../assets/logo.webp"
import basket from "../../assets/basket.svg"
import vk from "../../assets/vk.svg"
import inst from "../../assets/inst.svg"
import telegram from "../../assets/telegram.svg"
import Map from "../../assets/map.png"
import { RiArrowsArrowDropRightLine } from "solid-icons/ri"

type SidebarProps = {
	isOpen: boolean
	onClose: () => void
}

export default function Sidebar(props: SidebarProps): JSX.Element {
	const [showServices, setShowServices] = createSignal(false)

	const handleServiceClick = () => {
		setShowServices(!showServices())
	}

	return (
		<>
			<div
				classList={{
					[classes.sidebar]: true,
					[classes.active]: props.isOpen,
				}}
			>
				<div class={classes.headerContainer}>
					<div class={classes.header}>
						<div class={classes.iconsHeader}>
							<img
								src={closeIcon}
								width={26}
								height={26}
								onClick={props.onClose}
							/>
							<img
								src={logo}
								width={190}
								height={36}
								alt="logo"
							/>
							<img
								src={basket}
								width={26}
								height={26}
								alt="basketIcon"
							/>
						</div>
					</div>
					<div class={classes.headerText}>
						Организация детских праздников по всему Крыму
					</div>
				</div>

				<nav class={classes.nav}>
					<div class={classes.services}>
						<a
							class={classes.menuItem}
							onClick={handleServiceClick}
						>
							Услуги
							<div
								classList={{
									[classes.arrow]: true,
									[classes.rotated]: showServices(),
								}}
							>
								<RiArrowsArrowDropRightLine size={30} />
							</div>
						</a>
						<div
							classList={{
								[classes.submenu]: true,
								[classes.submenuOpen]: showServices(),
							}}
						>
							<a href="/animators" onClick={props.onClose}>
								Аниматоры
							</a>
							<a href="/master-class" onClick={props.onClose}>
								Мастер-классы
							</a>
							<a href="/show-programs" onClick={props.onClose}>
								Шоу-программы
							</a>
							<a href="/additionally" onClick={props.onClose}>
								Дополнительно
							</a>
						</div>
					</div>
					<a
						href="/reviews"
						class={classes.menuItem}
						onClick={props.onClose}
					>
						Отзывы
					</a>
					<a
						href="/portfolio"
						class={classes.menuItem}
						onClick={props.onClose}
					>
						Портфолио
					</a>
					<a
						href="/contacts"
						class={classes.menuItem}
						onClick={props.onClose}
					>
						Контакты
					</a>
				</nav>
				<div class={classes.mapBlock}>
					<a
						class={classes.map}
						href={
							"https://yandex.eu/maps/146/simferopol/house/kyivska_vulytsia_190b/Z00YdgBkQEEOQFpufXV5dnlgZw==/?indoorLevel=1&ll=34.075511%2C44.986802&z=16.59"
						}
						style={{
							"background-image": `url(${Map})`,
							"background-size": "cover",
							"background-position": "center",
							"background-repeat": "no-repeat",
						}}
					/>
					{/*добавить карту */}
					<a
						href={
							"https://yandex.eu/maps/146/simferopol/house/kyivska_vulytsia_190b/Z00YdgBkQEEOQFpufXV5dnlgZw==/?indoorLevel=1&ll=34.075511%2C44.986802&z=16.59"
						}
						class={classes.textEnd}
					>
						Киевская 190Б, Симферополь
					</a>
				</div>
				<div class={classes.footer}>
					<a href="tel:+79781234567" class={classes.number}>
						+7978 123 45 67
					</a>
					<div class={classes.messangers}>
						{" "}
						{/*добавить соц сети*/}
						<a href="https://vk.com/im/convo/2000000195?entrypoint=list_all">
							<img
								src={vk}
								width={45}
								height={45}
								alt="menuIcon"
							/>
						</a>
						<a href="https://vk.com/im/convo/2000000195?entrypoint=list_all">
							<img
								src={inst}
								width={45}
								height={45}
								alt="menuIcon"
							/>
						</a>
						<a href="https://vk.com/im/convo/2000000195?entrypoint=list_all">
							<img
								src={telegram}
								width={45}
								height={45}
								alt="menuIcon"
							/>
						</a>
					</div>
				</div>
			</div>
			<div
				classList={{
					[classes.overlay]: true,
					[classes.active]: props.isOpen,
				}}
				onClick={props.onClose}
			/>
		</>
	)
}
