import classes from "./Dops.module.sass"
import { createSignal, For, Show, onMount, createEffect } from "solid-js"

import { SortingSettings, FiltersType, Dops } from "../../types/dops"


import Header from "../../components/Header"
import vk from "../../assets/vk.svg"
import inst from "../../assets/inst.svg"
import telegram from "../../assets/telegram.svg"
import img2 from "../../assets/img2_home.webp"

import { VsSettings } from "solid-icons/vs"
import { dopsData } from "../../data/dopsData"

import FiltersModal from "../../components/FiltersModal"
import DopsCards from "../../components/Cards/Dops"
import DopsDetailsModal from "../../components/Modals/DopsDetails"

const defaultFilters: FiltersType = {
	genders: [],
	age: null,
	minPrice: null,
	maxPrice: null,
	sort: { type: "popularity", direction: "asc" },
}

export default function DopsPage() {
	const [searchQuery, setSearchQuery] = createSignal("")
	const [isLoading, setIsLoading] = createSignal(true)
	const [isOpen, setIsOpen] = createSignal(false)

	const [_, setContentLoaded] = createSignal(false)
	const [selectedCard, setSelectedCard] = createSignal<Dops | null>(null)

	const handleAddToCart = () => console.log("Добавлено в корзину")
	const handleDetails = (cardId: number) => {
		const foundCard = dopsData.find((c) => c.id === cardId)
		setSelectedCard(foundCard || null)
	}

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

	onMount(() => {
		const loadData = async () => {
			try {
				// Имитация асинхронной загрузки данных
				await new Promise((resolve) => setTimeout(resolve, 5000))
			} finally {
				setIsLoading(false)
				setContentLoaded(true)
			}
		}

		// Запускаем загрузку сразу
		loadData()

		// Показываем основной контент через 500мс независимо от загрузки
		const contentTimer = setTimeout(() => {
			setContentLoaded(true)
		}, 1000)

		return () => clearTimeout(contentTimer)
	})

	const sortedAndFilteredCards = () => {
		const filtered = dopsData.filter((card) => {
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
		if (appliedFilters().sort.type === "none") {
			return filtered
		}
		return [...filtered].sort((a, b) => {
			const { type, direction } = appliedFilters().sort
			const modifier = direction === "asc" ? 1 : -1

			switch (type) {
				case "price":
					return (a.price - b.price) * modifier
				case "alphabet":
					return a.text.localeCompare(b.text) * modifier
				case "popularity":
					return (b.popularity - a.popularity) * modifier
				default:
					return 0
			}
		})
	}

	createEffect(() => {
		setIsLoading(true)
		setTimeout(() => setIsLoading(false), 1500)
	})

	return (
		<div class={classes.container}>
			<Header />
			<Show
				when={!isLoading()}
				fallback={
					<div class={classes.loadingOverlay}>
						<div class={classes.spinner}></div>
					</div>
				}
			>
				<span class={classes.subHeaderText}>Дополнительно</span>
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
					<Show when={!isLoading()}>
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
										<DopsCards
											id={card.id}
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
										loading="lazy"
									/>
								</div>
							</Show>
						</div>
						<DopsDetailsModal
							isOpen={!!selectedCard()}
							card={selectedCard()}
							onClose={() => setSelectedCard(null)}
						/>
						<div class={classes.footer}>
							<span class={classes.question}>Есть вопросы?</span>
							<div class={classes.telephone}>
								<span class={classes.textEnd}>
									задайте их по телефону
								</span>
								<a
									href="tel:+79781234567"
									class={classes.number}
								>
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
								<div class={classes.map} />{" "}
								{/*добавить карту */}
								<div class={classes.textEnd}>
									адрес такой то там
								</div>{" "}
								{/*добавить адрес */}
							</div>
						</div>
					</Show>
				</div>
				<FiltersModal
					isOpen={isOpen()}
					onClose={() => setIsOpen(false)}
					initialFilters={appliedFilters()}
					defaultFilters={defaultFilters}
					onApply={setAppliedFilters}
				/>
			</Show>
		</div>
	)
}
