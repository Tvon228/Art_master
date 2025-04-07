import classes from "./Portfolio.module.sass"

import Header from "../../components/Header"
import vk from "../../assets/vk.svg"
import inst from "../../assets/inst.svg"
import telegram from "../../assets/telegram.svg"
import img2 from "../../assets/img2_home.webp"
import Map from "../../assets/map.png"

import PortfolioSlider from "../../components/Porfolio"

export default function Portfolio() {
	return (
		<div class={classes.container}>
			<Header />
			<div class={classes.content}>
				<div class={classes.cardWrapper}>
					<img
						src={img2}
						class={classes.decorHeaderImage}
						alt="Верхний декор"
					/>
				</div>
				<PortfolioSlider />
				<div class={classes.cardWrapper}>
					<img
						src={img2}
						class={classes.decorFooterImage}
						alt="Нижний декор"
						loading="lazy"
					/>
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
