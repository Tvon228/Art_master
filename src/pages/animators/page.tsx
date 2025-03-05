import classes from "./Animators.module.sass"

import Header from "../../components/Header"
import vk from "../../assets/vk.svg"
import inst from "../../assets/inst.svg"
import telegram from "../../assets/telegram.svg"
import animators from "../../assets/animators.png"
import img2 from "../../assets/img2_home.svg"

import { VsSettings } from "solid-icons/vs"
import AnimatorCards from "../../components/Cards/Animators"

export default function Animators() {
    const handleAddToCart = () => console.log('Добавлено в корзину')
    const handleDetails = () => console.log('Открыть модалку')

	return (
		<div class={classes.container}>
			<Header />
			<span class={classes.subHeaderText}>Аниматоры</span>
			<div class={classes.search}>
				<input
					class={classes.inputSearch}
					placeholder="Поиск по названию"
				/>
				<VsSettings size={30} color="#E60B80" />
			</div>
			<AnimatorCards
				imageUrl={animators}
				text="Веселые пираты с сюрпризами"
				button1Label="В корзину"
				button2Label="Подробнее"
				onButton1Click={handleAddToCart}
				onButton2Click={handleDetails}
			/>
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
					<div class={classes.map} /> {/*добавить карту */}
					<div class={classes.textEnd}>адрес такой то там</div>{" "}
					{/*добавить адрес */}
				</div>
			</div>
		</div>
	)
}
