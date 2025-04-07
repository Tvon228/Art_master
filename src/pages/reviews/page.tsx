import classes from "./Reviews.module.sass"

import vk from "../../assets/vk.svg"
import inst from "../../assets/inst.svg"
import telegram from "../../assets/telegram.svg"
import img2 from "../../assets/img2_home.webp"
import Map from "../../assets/map.png"

import Header from "../../components/Header"

import user1 from "../../assets/user.webp"
import user2 from "../../assets/user.webp"
import user3 from "../../assets/user.webp"
import { createSignal, onCleanup, onMount } from "solid-js"

const reviews = [
	{
		id: 1,
		text: "Лучшие аниматоры! Дети в восторге, все организовано профессионально.",
		photo: user1,
	},
	{
		id: 2,
		text: "Спасибо за незабываемый день рождения! Все прошло идеально.",
		photo: user2,
	},
	{
		id: 3,
		text: "Организация на высшем уровне. Рекомендую всем родителям!",
		photo: user3,
	},
]

export default function Reviews() {
	const [activeIndex, setActiveIndex] = createSignal(0)
	const [animate, setAnimate] = createSignal(true)
	let intervalId: ReturnType<typeof setInterval> | undefined

	const startCarousel = () => {
		intervalId = setInterval(() => {
			setAnimate(false)
			setTimeout(() => {
				setActiveIndex((prev) => (prev + 1) % reviews.length)

				setAnimate(true)
			}, 500)
		}, 5000)
	}

	onMount(() => {
		startCarousel()
	})

	onCleanup(() => {
		clearInterval(intervalId)
	})

	return (
		<div class={classes.container}>
			<Header />
			<div class={classes.main}>
				<img src={img2} class={classes.img2} alt="image2" />
				<div class={classes.subMain}>
					<div
						classList={{
							[classes.reviewBlock]: true,
							[classes.animate]: animate(),
						}}
					>
						<div class={classes.reviewContent}>
							{reviews[activeIndex()].text}
						</div>
					</div>
					<div
						classList={{
							[classes.photoBlock]: true,
							[classes.animate]: animate(),
						}}
					>
						<img
							src={reviews[activeIndex()].photo}
							class={classes.userPhoto}
							alt="Фото клиента"
						/>
					</div>
				</div>
			</div>
			<div class={classes.footer}>
				<span class={classes.question}>Есть вопросы?</span>
				<div class={classes.telephone}>
					<span class={classes.textEnd}>задайте их по телефону</span>
					<a href="tel:+79781234567" class={classes.number}>
						+7978 123 45 67
					</a>
				</div>
				<div class={classes.socialMedia}>
					<span class={classes.textEnd}>
						или напишите нам в соцсетях
					</span>
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
				<div class={classes.mapBlock}>
					<span class={classes.textEnd}>мы на карте</span>
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
			</div>
		</div>
	)
}
