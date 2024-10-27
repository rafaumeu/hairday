import dayjs from "dayjs";
import { scheduleNew } from "../../services/schedule-new";
import { schedulesDay } from "../schedules/load";

const form = document.querySelector('form');
const selectedDate = document.getElementById("date");
const clientName = document.getElementById("client");

const inputToday = dayjs(new Date()).format("YYYY-MM-DD");

selectedDate.value = inputToday
selectedDate.min = inputToday
form.onsubmit = async (event) => {
  event.preventDefault()
  try {
    const name = clientName.value.trim()
    if(!name) {
      alert("Por favor, informe o nome do cliente")
    }
    const hourSelected = document.querySelector('.hour-selected')
    
    if(!hourSelected) {
      alert("Por favor, selecione um horário")
    }
    const [hour] = hourSelected.innerText.split(':')
    
    const when = dayjs(selectedDate.value).add(hour, 'hour')
    
    const id = new Date().getTime().toString()

    await scheduleNew({ id, name, when })
    await schedulesDay()
    clientName.value = ''
  }catch (error) {
    alert("Não foi possível realizar o agendamento")
    console.log(error)
  }
}