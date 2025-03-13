import classes from "./SortingSection.module.sass"

import { SortingSettings, SortType, SortDirection } from "../../../types/types"

interface SortingSectionProps {
	settings: SortingSettings
	onSettingsChange: (settings: SortingSettings) => void
	openedDropdown: "price" | "alphabet" | null
	onDropdownToggle: (type: "price" | "alphabet" | null) => void
}

export default function SortingSection(props: SortingSectionProps) {
	let priceDropdownRef: HTMLDivElement | undefined
	let alphabetDropdownRef: HTMLDivElement | undefined

	const handleSortTypeClick = (type: SortType) => {
		if (type === props.settings.type) {
			// Переключение направления если тип уже выбран
			const newDirection =
				props.settings.direction === "asc" ? "desc" : "asc"
			props.onSettingsChange({
				...props.settings,
				direction: newDirection,
			})
		} else {
			// Выбор нового типа с направлением по умолчанию
			props.onSettingsChange({
				type: type,
				direction: "asc",
			})
		}

		if (type === props.openedDropdown) {
			props.onDropdownToggle(null)
		} else {
			props.onDropdownToggle(
				type === "price" || type === "alphabet" ? type : null
			)
		}
	}

	const handleDirectionChange = (direction: SortDirection) => {
		props.onSettingsChange({
			...props.settings,
			direction: direction,
		})
		props.onDropdownToggle(null)
	}

	return (
		<div class={classes.sorting}>
			<h3 class={classes.sortingTitle}>Сортировка:</h3>
			<div class={classes.sortingControls}>
				<div class={classes.sortTypeGroup}>
					{/* Популярность */}
					<div
						class={classes.sortType}
						classList={{
							[classes.active]:
								props.settings.type === "popularity" &&
								props.settings.direction !== "asc",
						}}
						onClick={() => handleSortTypeClick("popularity")}
					>
						Популярности
						
					</div>

					{/* Цена */}
					<div class={classes.sortTypeWrapper} ref={priceDropdownRef}>
						<div
							class={classes.sortType}
							classList={{
								[classes.active]:
									props.settings.type === "price",
							}}
							onClick={() => handleSortTypeClick("price")}
						>
							Цене
							{props.settings.type === "price" && (
								<span class={classes.directionIndicator}>
									{props.settings.direction === "asc"
										? "↑"
										: "↓"}
								</span>
							)}
						</div>
						{props.openedDropdown === "price" && (
							<div class={classes.directionSelector}>
								<div
									class={classes.directionButton}
									classList={{
										[classes.active]:
											props.settings.direction === "asc",
									}}
									onClick={() => handleDirectionChange("asc")}
								>
									По возрастанию
								</div>
								<div
									class={classes.directionButton}
									classList={{
										[classes.active]:
											props.settings.direction === "desc",
									}}
									onClick={() =>
										handleDirectionChange("desc")
									}
								>
									По убыванию
								</div>
							</div>
						)}
					</div>

					{/* Алфавит */}
					<div
						class={classes.sortTypeWrapper}
						ref={alphabetDropdownRef}
					>
						<div
							class={classes.sortType}
							classList={{
								[classes.active]:
									props.settings.type === "alphabet",
							}}
							onClick={() => handleSortTypeClick("alphabet")}
						>
							Алфавиту
							{props.settings.type === "alphabet" && (
								<span class={classes.directionIndicator}>
									{props.settings.direction === "asc"
										? "А-Я"
										: "Я-А"}
								</span>
							)}
						</div>
						{props.openedDropdown === "alphabet" && (
							<div class={classes.directionSelector}>
								<div
									class={classes.directionButton}
									classList={{
										[classes.active]:
											props.settings.direction === "asc",
									}}
									onClick={() => handleDirectionChange("asc")}
								>
									От А до Я
								</div>
								<div
									class={classes.directionButton}
									classList={{
										[classes.active]:
											props.settings.direction === "desc",
									}}
									onClick={() =>
										handleDirectionChange("desc")
									}
								>
									От Я до А
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}
