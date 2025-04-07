import classes from "./home.module.sass"

import img1 from "../../assets/img1_home.webp"
import img2 from "../../assets/img2_home.webp"
import Map from "../../assets/map.png"
import vk from "../../assets/vk.svg"
import inst from "../../assets/inst.svg"
import telegram from "../../assets/telegram.svg"
import Header from "../../components/Header"

export default function Home() {
	return (
		<div class={classes.container}>
			<div class={classes.content}>
				<Header />
				<div class={classes.subheader}>
					<img src={img1} class={classes.img1} alt="image1" />
					<div class={classes.infoMain}>
						<img src={img2} class={classes.img2} alt="image2" />
						<div class={classes.info}>
							<span class={classes.infoText}>
								С нами вы можете быть уверены в качестве
								анимационной программы. Детские праздники под
								ключ, организация и проведение, аниматоры на
								день рождения, выпускные, мастер-классы,
								захватывающие шоу-программы для любых
								мероприятий! Все актеры, приезжающие к Вам на
								праздник - выпускники и студенты театральных
								ВУЗов!
							</span>
							<button class={classes.holidayBtn}>
								<a href="/animators">Устроить праздник!</a>
							</button>
						</div>
					</div>
				</div>
				<div class={classes.end}>
					<span class={classes.question}>Есть вопросы?</span>
					<div class={classes.telephone}>
						<span class={classes.textEnd}>
							задайте их по телефону
						</span>
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
		</div>
	)
}
