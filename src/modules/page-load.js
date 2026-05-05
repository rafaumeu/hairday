import { schedulesDay, initFilters } from "./schedules/load"

document.addEventListener("DOMContentLoaded", () => {
  schedulesDay()
  initFilters()
})
