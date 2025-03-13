import classes from "./Animators.module.sass"
import { createSignal, For, Show } from "solid-js"

import { AnimatorCard, SortingSettings } from "../../types/types"

import Header from "../../components/Header"
import vk from "../../assets/vk.svg"
import inst from "../../assets/inst.svg"
import telegram from "../../assets/telegram.svg"
import animators from "../../assets/animators.png"
import img2 from "../../assets/img2_home.svg"
import { VsSettings } from "solid-icons/vs"

import FiltersModal from "../../components/FiltersModal"
import AnimatorCards from "../../components/Cards/Animators"


export default function Animators() {
	const [searchQuery, setSearchQuery] = createSignal("")
	const [isOpen, setIsOpen] = createSignal(false)
	
	const cardsData: AnimatorCard[] = [
		{
			id: 1,
			imageUrl: animators,
			text: "Цифровой цирк",
			gender: "boy",
			age: "5-10",
			price: 5000,
			popularity: 95,
		},
		{
			id: 2,
			imageUrl: animators,
			text: "Трансформеры",
			gender: "boy",
			age: "3-7",
			price: 4500,
			popularity: 105,
		},
		{
			id: 3,
			imageUrl: animators,
			text: "Принцессы",
			gender: "girl",
			age: "4-8",
			price: 4800,
			popularity: 55,
		},
	]


	const handleAddToCart = () => console.log("Добавлено в корзину")
	const handleDetails = () => console.log("Открыть модалку")

	const [appliedFilters, setAppliedFilters] = createSignal<{
		genders: ("boy" | "girl")[]
		age: number | null
		minPrice: number | null
		maxPrice: number | null
		sort: SortingSettings
	}>({
		genders: [],
		age: null,
		minPrice: null,
		maxPrice: null,
		sort: { type: "popularity", direction: "asc" },
	})

	const isAgeInRange = (cardAge: string, filterAge: number | null) => {
		if (filterAge === null) return true
		const [min, max] = cardAge.split("-").map(Number)
		return filterAge >= min && filterAge <= max
	}

	const sortedAndFilteredCards = () => {
		const filtered = cardsData.filter((card) => {
			const searchMatch = card.text
				.toLowerCase()
				.includes(searchQuery().toLowerCase())
			const genderMatch =
				appliedFilters().genders.length === 0 ||
				appliedFilters().genders.includes(card.gender)
			const ageMatch = isAgeInRange(card.age, appliedFilters().age)
			const priceMatch =
				(appliedFilters().minPrice === null ||
					card.price >= appliedFilters().minPrice!) &&
				(appliedFilters().maxPrice === null ||
					card.price <= appliedFilters().maxPrice!)

			return searchMatch && genderMatch && ageMatch && priceMatch
		})
		return [...filtered].sort((a, b) => {
			const { type, direction } = appliedFilters().sort
			const modifier = direction === "asc" ? 1 : -1

			switch (type) {
				case "price":
					return (a.price - b.price) * modifier
				case "alphabet":
					return a.text.localeCompare(b.text) * modifier
				case "popularity":
				default:
					return (b.popularity - a.popularity) * modifier
			}
		})
	}

	
	return (
		<div class={classes.container}>
			<Header />
			<span class={classes.subHeaderText}>Аниматоры</span>
			<div class={classes.search}>
				<input
					class={classes.inputSearch}
					placeholder="Поиск по названию"
					value={searchQuery()}
					onInput={(e) => setSearchQuery(e.currentTarget.value)}
				/>
				<VsSettings
					size={30}
					color="#E60B80"
					onClick={() => setIsOpen(true)}
				/>
			</div>
			<div class={classes.cardsContainer}>
				<div class={classes.cards}>
					<Show when={sortedAndFilteredCards().length > 0}>
						{/* Верхняя шапка */}
						<div class={classes.cardWrapper}>
							<img
								src={img2}
								class={classes.decorHeaderImage}
								alt="Верхний декор"
							/>
						</div>

						{/* Карточки */}
						<For each={sortedAndFilteredCards()}>
							{(card) => (
								<AnimatorCards
									imageUrl={card.imageUrl}
									text={card.text}
									onButton1Click={handleAddToCart}
									onButton2Click={handleDetails}
								/>
							)}
						</For>

						{/* Нижняя подложка */}
						<div class={classes.cardWrapper}>
							<img
								src={img2}
								class={classes.decorFooterImage}
								alt="Нижний декор"
							/>
						</div>
					</Show>
				</div>
				<div class={classes.footer}>
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
						<div class={classes.map} /> {/*добавить карту */}
						<div class={classes.textEnd}>
							адрес такой то там
						</div>{" "}
						{/*добавить адрес */}
					</div>
				</div>
			</div>
			<FiltersModal
				isOpen={isOpen()}
				onClose={() => setIsOpen(false)}
				initialFilters={appliedFilters()}
				onApply={setAppliedFilters}
			/>
		</div>
	)
}
