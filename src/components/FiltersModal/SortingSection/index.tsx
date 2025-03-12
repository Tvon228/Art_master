import classes from "./SortingSection.module.sass"
import { JSX } from "solid-js"

export interface SortingSettings {
	type: "popularity" | "price" | "alphabet"
	direction: "asc" | "desc"
}

interface SortingSectionProps {
	settings: SortingSettings
	onSettingsChange: (settings: SortingSettings) => void
	openedDropdown: "price" | "alphabet" | null
	onDropdownToggle: (type: "price" | "alphabet" | null) => void
}

export default function SortingSection(props: SortingSectionProps) {
	let priceDropdownRef: HTMLDivElement | undefined
	let alphabetDropdownRef: HTMLDivElement | undefined

	const handleSortTypeClick = (type: "popularity" | "price" | "alphabet") => {
		if (type === "popularity") {
			props.onSettingsChange({
				type: type, // Явное указание типа
				direction: "asc",
			})
			props.onDropdownToggle(null)
		} else {
			props.onSettingsChange({
				type: type,
				direction:
					props.settings.type === type
						? props.settings.direction
						: "asc",
			})
			props.onDropdownToggle(props.openedDropdown === type ? null : type)
		}
	}

	const handleDirectionChange = (direction: "asc" | "desc") => {
		props.onSettingsChange({ ...props.settings, direction })
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
								props.settings.type === "popularity",
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
