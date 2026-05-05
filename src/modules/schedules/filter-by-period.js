const periodButtons = document.querySelectorAll(".filter-period-btn")

let activePeriod = "all"

export function getActivePeriod() {
  return activePeriod
}

export function filterByPeriodInit(onFilterChange) {
  periodButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      periodButtons.forEach((b) => b.classList.remove("filter-active"))
      btn.classList.add("filter-active")
      activePeriod = btn.dataset.period
      if (onFilterChange) onFilterChange()
    })
  })
}
