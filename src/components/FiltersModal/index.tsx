import classes from "./FiltersModal.module.sass"

import { Show, createEffect, onCleanup, createSignal, onMount } from "solid-js"
import { Portal } from "solid-js/web"

import closeModal from "../../assets/closeIcon.svg"

interface FiltersModalProps {
	isOpen: boolean
	onClose: () => void
}

export default function FiltersModal(props: FiltersModalProps) {
	const [selectedGenders, setSelectedGenders] = createSignal<
		("boy" | "girl")[]
	>([])
	const [sortSettings, setSortSettings] = createSignal<{
		type: "popularity" | "price" | "alphabet"
		direction: "asc" | "desc"
	}>({ type: "popularity", direction: "asc" })

	const [minPrice, setMinPrice] = createSignal("")
	const [maxPrice, setMaxPrice] = createSignal("")

	const [openedDropdown, setOpenedDropdown] = createSignal<
		"price" | "alphabet" | null
	>(null)

	let priceDropdownRef: HTMLDivElement | undefined
	let alphabetDropdownRef: HTMLDivElement | undefined
	let modalRef: HTMLDivElement | undefined

	const handleClickOutside = (event: MouseEvent) => {
		if (
			openedDropdown() === "price" &&
			!priceDropdownRef?.contains(event.target as Node)
		) {
			setOpenedDropdown(null)
		}
		if (
			openedDropdown() === "alphabet" &&
			!alphabetDropdownRef?.contains(event.target as Node)
		) {
			setOpenedDropdown(null)
		}
	}

	const toggleGender = (gender: "boy" | "girl") => {
		setSelectedGenders((prev) =>
			prev.includes(gender)
				? prev.filter((g) => g !== gender)
				: [...prev, gender]
		)
	}

	onMount(() => {
		document.addEventListener("click", handleClickOutside)
	})

	onCleanup(() => {
		document.removeEventListener("click", handleClickOutside)
		document.body.style.overflow = "auto"
	})

	createEffect(() => {
		if (props.isOpen) {
			document.body.style.overflow = "hidden"
		} else {
			document.body.style.overflow = "auto"
		}
	})

	onCleanup(() => {
		document.body.style.overflow = "auto"
	})

	const handleSave = () => {
		// Здесь можно добавить логику сохранения фильтров
		props.onClose()
	}

	return (
		<Show when={props.isOpen}>
			<Portal>
				<div
					class={classes.modalOverlay}
					classList={{ [classes.active]: props.isOpen }}
				>
					<div class={classes.modalContent}>
						<img
							src={closeModal}
							class={classes.closeIcon}
							onClick={props.onClose}
						/>

						<div class={classes.genderSection}>
							<button
								classList={{
									[classes.genderButton]: true,
									[classes.active]:
										selectedGenders().includes("boy"),
								}}
								onClick={() => toggleGender("boy")}
							>
								для мальчика
							</button>
							<button
								classList={{
									[classes.genderButton]: true,
									[classes.active]:
										selectedGenders().includes("girl"),
								}}
								onClick={() => toggleGender("girl")}
							>
								для девочки
							</button>
						</div>
						<div class={classes.filterGroup}>
							<h3 class={classes.filterTitle}>возраст:</h3>
							<div class={classes.ageInputContainer}>
								<input
									type="text"
									class={classes.ageInput}
									placeholder="0-1 год"
								/>
								<div class={classes.underline}></div>
							</div>
						</div>
						<div class={classes.filterGroup}>
							<h3 class={classes.filterTitle}>цена:</h3>
							<div class={classes.priceRange}>
								<input
									type="number"
									placeholder="от"
									class={classes.input}
									value={minPrice()}
									onInput={(e) =>
										setMinPrice(e.currentTarget.value)
									}
								/>
								<input
									type="number"
									placeholder="до"
									class={classes.input}
									value={maxPrice()}
									onInput={(e) =>
										setMaxPrice(e.currentTarget.value)
									}
								/>
							</div>
						</div>
						<div class={classes.sorting}>
							<h3 class={classes.sortingTitle}>Сортировка:</h3>
							<div class={classes.sortingControls}>
								<div class={classes.sortTypeGroup}>
									<div
										class={classes.sortType}
										classList={{
											[classes.active]:
												sortSettings().type ===
												"popularity",
										}}
										onClick={() => {
											setSortSettings({
												type: "popularity",
												direction: "asc",
											})
											setOpenedDropdown(null)
										}}
									>
										Популярности
									</div>

									{/* Сортировка по цене */}
									<div
										class={classes.sortTypeWrapper}
										ref={(el) => (priceDropdownRef = el)}
									>
										<div
											class={classes.sortType}
											classList={{
												[classes.active]:
													sortSettings().type ===
													"price",
											}}
											onClick={() => {
												if (
													sortSettings().type !==
													"price"
												) {
													setSortSettings({
														type: "price",
														direction: "asc",
													})
												}
												setOpenedDropdown((prev) =>
													prev === "price"
														? null
														: "price"
												)
											}}
										>
											Цене
											{sortSettings().type ===
												"price" && (
												<span
													class={
														classes.directionIndicator
													}
												>
													{sortSettings()
														.direction === "asc"
														? "↑"
														: "↓"}
												</span>
											)}
										</div>
										{openedDropdown() === "price" && (
											<div
												class={
													classes.directionSelector
												}
											>
												<div
													class={
														classes.directionButton
													}
													classList={{
														[classes.active]:
															sortSettings()
																.direction ===
															"asc",
													}}
													onClick={() => {
														setSortSettings(
															(prev) => ({
																...prev,
																direction:
																	"asc",
															})
														)
														setOpenedDropdown(null)
													}}
												>
													По возрастанию
												</div>
												<div
													class={
														classes.directionButton
													}
													classList={{
														[classes.active]:
															sortSettings()
																.direction ===
															"desc",
													}}
													onClick={() => {
														setSortSettings(
															(prev) => ({
																...prev,
																direction:
																	"desc",
															})
														)
														setOpenedDropdown(null)
													}}
												>
													По убыванию
												</div>
											</div>
										)}
									</div>

									{/* Сортировка по алфавиту */}
									<div
										class={classes.sortTypeWrapper}
										ref={(el) => (alphabetDropdownRef = el)}
									>
										<div
											class={classes.sortType}
											classList={{
												[classes.active]:
													sortSettings().type ===
													"alphabet",
											}}
											onClick={() => {
												// Устанавливаем тип сортировки в alphabet если еще не установлен
												if (
													sortSettings().type !==
													"alphabet"
												) {
													setSortSettings((prev) => ({
														...prev,
														type: "alphabet",
														direction: "asc", // Устанавливаем направление по умолчанию
													}))
												}
												// Переключаем видимость выпадающего списка
												setOpenedDropdown((prev) =>
													prev === "alphabet"
														? null
														: "alphabet"
												)
											}}
										>
											Алфавиту
											{sortSettings().type ===
												"alphabet" && (
												<span
													class={
														classes.directionIndicator
													}
												>
													{sortSettings()
														.direction === "asc"
														? "А-Я"
														: "Я-А"}
												</span>
											)}
										</div>

										{openedDropdown() === "alphabet" && (
											<div
												class={
													classes.directionSelector
												}
											>
												<div
													class={
														classes.directionButton
													}
													classList={{
														[classes.active]:
															sortSettings()
																.direction ===
															"asc",
													}}
													onClick={() => {
														setSortSettings(
															(prev) => ({
																...prev,
																direction:
																	"asc",
															})
														)
														setOpenedDropdown(null) // Закрываем выпадающий список после выбора
													}}
												>
													От А до Я
												</div>
												<div
													class={
														classes.directionButton
													}
													classList={{
														[classes.active]:
															sortSettings()
																.direction ===
															"desc",
													}}
													onClick={() => {
														setSortSettings(
															(prev) => ({
																...prev,
																direction:
																	"desc",
															})
														)
														setOpenedDropdown(null)
													}}
												>
													От Я до А
												</div>
											</div>
										)}
									</div>
								</div>
							</div>
						</div>
						<div class={classes.actionsContainer}>
							<button
								class={classes.secondaryButton}
								onClick={props.onClose}
							>
								Выйти
							</button>
							<button
								class={classes.primaryButton}
								onClick={handleSave}
							>
								Сохранить
							</button>
						</div>
					</div>
				</div>
			</Portal>
		</Show>
	)
}
