import classes from "./FiltersModal.module.sass"

import { Show, createSignal } from "solid-js"
import { Portal } from "solid-js/web"

import GenderSection from "./GenderSection"
import AgeFilter from "./AgeFilter"
import PriceFilter from "./PriceFilter"
import SortingSection from "./SortingSection"
import { SortingSettings } from "./SortingSection"
import ActionsSection from "./ActionsSection"

import closeModal from "../../assets/closeIcon.svg"

interface FiltersModalProps {
	isOpen: boolean
	onClose: () => void
}

export default function FiltersModal(props: FiltersModalProps) {
	const [_, setSelectedAge] = createSignal("")
	const [selectedGenders, setSelectedGenders] = createSignal<
		("boy" | "girl")[]
	>([])
	const [sortSettings, setSortSettings] = createSignal<SortingSettings>({
		type: "popularity",
		direction: "asc",
	})
	const [minPrice, setMinPrice] = createSignal("")
	const [maxPrice, setMaxPrice] = createSignal("")
	const [openedDropdown, setOpenedDropdown] = createSignal<
		"price" | "alphabet" | null
	>(null)

	return (
		<Show when={props.isOpen}>
			<Portal>
				<div class={classes.modalOverlay}>
					<div class={classes.modalContent}>
						<img
							src={closeModal}
							class={classes.closeIcon}
							onClick={props.onClose}
						/>

						<GenderSection
							selected={selectedGenders()}
							onToggle={setSelectedGenders}
						/>

						<AgeFilter onAgeChange={(age) => setSelectedAge(age)} />

						<PriceFilter
							min={minPrice()}
							max={maxPrice()}
							onMinChange={setMinPrice}
							onMaxChange={setMaxPrice}
						/>

						<SortingSection
							settings={sortSettings()}
							onSettingsChange={setSortSettings}
							openedDropdown={openedDropdown()}
							onDropdownToggle={setOpenedDropdown}
						/>

						<ActionsSection
							onClose={props.onClose}
							onSave={() => {
								props.onClose()
								// Здесь позже добавим логику применения фильтров
							}}
						/>
					</div>
				</div>
			</Portal>
		</Show>
	)
}
