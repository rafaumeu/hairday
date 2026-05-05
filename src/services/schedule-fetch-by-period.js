import dayjs from "dayjs"
import { apiConfig } from "./api-config"

const PERIOD_RANGES = {
  morning: { start: 6, end: 12 },
  afternoon: { start: 12, end: 18 },
  night: { start: 18, end: 22 }
}

export async function scheduleFetchByPeriod({ date, period }) {
  try {
    const response = await fetch(`${apiConfig.baseURL}/schedules`)
    const data = await response.json()

    const { start, end } = PERIOD_RANGES[period]

    const filteredSchedules = data.filter((schedule) => {
      const scheduleDate = dayjs(schedule.when)
      const isSameDay = dayjs(date).isSame(scheduleDate, "day")
      const hour = scheduleDate.hour()
      const isInRange = hour >= start && hour < end

      return isSameDay && isInRange
    })

    return filteredSchedules
  } catch (error) {
    console.log(error)
    alert("Não foi possível buscar os agendamentos pelo período.")
  }
}
