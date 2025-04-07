import classes from "./Portfolio.module.sass"
import { createEffect, createSignal, onCleanup, For } from "solid-js"
import Img1 from "../../assets/slider/yrodi.jpg"
import Img2 from "../../assets/slider/yrodi2.jpg"

export default function PortfolioSlider() {
	const SlidesData = [
		{ img: Img1 },
		{ img: Img2 },
		{ img: Img1 },
		{ img: Img2 },
		{ img: Img1 },
		{ img: Img2 },
		{ img: Img1 },
		{ img: Img2 },
		{ img: Img1 },
		{ img: Img2 },
		{ img: Img1 },
		{ img: Img2 },
		{ img: Img1 },
		{ img: Img2 },
	]

	const MAX_VISIBLE_DOTS = 5
	const DOT_WIDTH = 24 // 8px точка + 8px промежуток
	const [currentIndex, setCurrentIndex] = createSignal(0)
	const [offset, setOffset] = createSignal(0)
	const [touchStart, setTouchStart] = createSignal(0)
	const [timerId, setTimerId] = createSignal<NodeJS.Timeout | null>(null)

	// Расчет смещения для 5 видимых точек
	createEffect(() => {
		const total = SlidesData.length
		if (total <= MAX_VISIBLE_DOTS) return

		const centerPosition = Math.floor(MAX_VISIBLE_DOTS / 2)
		let newOffset = currentIndex() - centerPosition
		newOffset = Math.max(0, Math.min(newOffset, total - MAX_VISIBLE_DOTS))
		setOffset(newOffset)
	})

	// Автопрокрутка
	const startTimer = () => {
		const id = setInterval(() => {
			setCurrentIndex((prev) => (prev + 1) % SlidesData.length)
		}, 5000)
		setTimerId(id)
		return id
	}

	createEffect(() => {
		const id = startTimer()
		onCleanup(() => clearInterval(id))
	})

	// Свайп-обработчики
	const handleTouchStart = (e: TouchEvent) => {
		setTouchStart(e.touches[0].clientX)
	}

	const handleTouchEnd = (e: TouchEvent) => {
		const diff = touchStart() - e.changedTouches[0].clientX
		if (Math.abs(diff) < 50) return

		setCurrentIndex((prev) => {
			const newIndex = prev + (diff > 0 ? 1 : -1)
			return (newIndex + SlidesData.length) % SlidesData.length
		})
		resetTimer()
	}

	const resetTimer = () => {
		timerId() && clearInterval(timerId()!)
		setTimerId(startTimer())
	}

	onCleanup(() => timerId() && clearInterval(timerId()!))

	return (
		<div
			class={classes.container}
			onTouchStart={handleTouchStart}
			onTouchEnd={handleTouchEnd}
		>
			<div class={classes.Img}>
				<img
					class={classes.image}
					src={SlidesData[currentIndex()].img}
					alt={`Slide ${currentIndex() + 1}`}
				/>
			</div>

			<div class={classes.dotsWrapper}>
				<div
					class={classes.dotsContainer}
					style={{
						transform: `translateX(-${offset() * DOT_WIDTH}px)`,
						transition: "transform 0.3s ease",
					}}
				>
					<For each={SlidesData}>
						{(_, i) => (
							<button
								classList={{
									[classes.dot]: true,
									[classes.active]: i() === currentIndex(),
								}}
								onClick={() => {
									setCurrentIndex(i())
									resetTimer()
								}}
							/>
						)}
					</For>
				</div>
			</div>
		</div>
	)
}
