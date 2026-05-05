const serviceSelect = document.getElementById("filter-service")

let activeService = "all"

export function getActiveService() {
  return activeService
}

export function filterByServiceInit(services, onFilterChange) {
  serviceSelect.innerHTML = '<option value="all">Todos os serviços</option>'

  services.forEach((service) => {
    const option = document.createElement("option")
    option.value = service.id
    option.textContent = `${service.name} (${service.duration}min)`
    serviceSelect.appendChild(option)
  })

  serviceSelect.addEventListener("change", () => {
    activeService = serviceSelect.value
    if (onFilterChange) onFilterChange()
  })
}
