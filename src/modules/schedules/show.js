import dayjs from "dayjs";
import { getActivePeriod } from "./filter-by-period";
import { getActiveService } from "./filter-by-service";

const periodMorning = document.getElementById('period-morning');
const periodAfternoon = document.getElementById('period-afternoon');
const periodNight = document.getElementById('period-night');
const appointmentCount = document.getElementById('appointment-count');

export function schedulesShow({ dailySchedules, services }) {
  try {
    periodMorning.innerHTML = ''
    periodAfternoon.innerHTML = ''
    periodNight.innerHTML = ''

    const servicesMap = {}
    if (services) {
      services.forEach((s) => { servicesMap[s.id] = s })
    }

    const activePeriod = getActivePeriod()
    const activeService = getActiveService()

    let filtered = dailySchedules

    // Filter by period
    if (activePeriod !== "all") {
      filtered = filtered.filter((schedule) => {
        const hour = dayjs(schedule.when).hour()
        if (activePeriod === "morning") return hour >= 6 && hour < 12
        if (activePeriod === "afternoon") return hour >= 12 && hour < 18
        if (activePeriod === "night") return hour >= 18 && hour < 22
        return true
      })
    }

    // Filter by service
    if (activeService !== "all") {
      filtered = filtered.filter((schedule) => {
        return String(schedule.serviceId) === String(activeService)
      })
    }

    // Update count
    if (appointmentCount) {
      appointmentCount.textContent = filtered.length
    }

    filtered.forEach((schedule) => {
      const item = document.createElement('li')
      const time = document.createElement('strong')
      const name = document.createElement('span')
      const serviceInfo = document.createElement('em')
      const cancelIcon = document.createElement('img')

      item.setAttribute("data-id", schedule.id)

      time.textContent = dayjs(schedule.when).format('HH:mm')
      name.textContent = schedule.name
      cancelIcon.classList.add('cancel-icon')
      cancelIcon.setAttribute('src', './src/assets/cancel.svg')
      cancelIcon.setAttribute('alt', 'Cancelar')

      const service = servicesMap[schedule.serviceId]
      if (service) {
        serviceInfo.textContent = `${service.name} · ${service.duration}min`
        serviceInfo.classList.add('service-info')
      }

      const hour = dayjs(schedule.when).hour()
      item.append(time, name, serviceInfo, cancelIcon)

      if (hour >= 6 && hour < 12) {
        periodMorning.appendChild(item)
      } else if (hour >= 12 && hour < 18) {
        periodAfternoon.appendChild(item)
      } else {
        periodNight.appendChild(item)
      }
    })
  } catch (error) {
    alert("Não foi possível exibir os agendamentos")
    console.log(error)
  }
}
