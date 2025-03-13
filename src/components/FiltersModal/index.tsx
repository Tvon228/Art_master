import classes from "./FiltersModal.module.sass"

import { Show, createSignal, createEffect } from "solid-js"
import { Portal } from "solid-js/web"

import GenderSection from "./GenderSection"
import AgeFilter from "./AgeFilter"
import PriceFilter from "./PriceFilter"
import SortingSection from "./SortingSection"
import { FiltersType } from "../../types/types"
import ActionsSection from "./ActionsSection"

import closeModal from "../../assets/closeIcon.svg"

const defaultFilters: FiltersType = {
	genders: [],
	age: null,
	minPrice: null,
	maxPrice: null,
	sort: { type: "none", direction: "asc" }, 
}

interface FiltersModalProps {
	isOpen: boolean
	onClose: () => void
	initialFilters: FiltersType
	onApply: (filters: FiltersType) => void
	defaultFilters: FiltersType
}

export default function FiltersModal(props: FiltersModalProps) {
	const [localFilters, setLocalFilters] = createSignal(props.initialFilters)
	const [openedDropdown, setOpenedDropdown] = createSignal<
		"price" | "alphabet" | null
	>(null)

	createEffect(() => {
		if (props.isOpen) {
			setLocalFilters(props.initialFilters)
		}
	})

	const handleSave = () => {
		props.onApply(localFilters())
		props.onClose()
	}

	const handleReset = () => {
		props.onApply(props.defaultFilters)
		props.onClose()
	}

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
							selected={localFilters().genders}
							onToggle={(genders) =>
								setLocalFilters((p) => ({ ...p, genders }))
							}
						/>

						<AgeFilter
							age={localFilters().age}
							onAgeChange={(age) =>
								setLocalFilters((p) => ({ ...p, age }))
							}
						/>

						<PriceFilter
							minPrice={localFilters().minPrice}
							maxPrice={localFilters().maxPrice}
							onMinChange={(min) =>
								setLocalFilters((p) => ({
									...p,
									minPrice: min,
								}))
							}
							onMaxChange={(max) =>
								setLocalFilters((p) => ({
									...p,
									maxPrice: max,
								}))
							}
						/>

						<SortingSection
							settings={localFilters().sort}
							onSettingsChange={(sort) =>
								setLocalFilters((p) => ({ ...p, sort }))
							}
							openedDropdown={openedDropdown()}
							onDropdownToggle={setOpenedDropdown}
						/>

						<ActionsSection
							onReset={handleReset}
							onSave={handleSave}
						/>
					</div>
				</div>
			</Portal>
		</Show>
	)
}
