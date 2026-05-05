import { scheduleFetchByDay } from "../../services/schedule-fetch-by-day";
import { hoursLoad } from "../form/hours-load";
import { schedulesShow } from "./show";
import { filterByPeriodInit, getActivePeriod } from "./filter-by-period";
import { filterByServiceInit, getActiveService } from "./filter-by-service";
import { apiConfig } from "../../services/api-config";

const selectedDate = document.getElementById("date");

let cachedServices = []

async function fetchServices() {
  try {
    const response = await fetch(`${apiConfig.baseURL}/services`)
    return await response.json()
  } catch (error) {
    console.log(error)
    return []
  }
}

async function loadAndRender() {
  const date = selectedDate.value
  const dailySchedules = await scheduleFetchByDay({ date })
  schedulesShow({ dailySchedules, services: cachedServices })
  hoursLoad({ date, dailySchedules })
}

export async function schedulesDay() {
  const date = selectedDate.value
  const dailySchedules = await scheduleFetchByDay({ date })

  schedulesShow({ dailySchedules, services: cachedServices })
  hoursLoad({ date, dailySchedules })
}

export async function initFilters() {
  cachedServices = await fetchServices()

  filterByPeriodInit(() => schedulesDay())
  filterByServiceInit(cachedServices, () => schedulesDay())
}
