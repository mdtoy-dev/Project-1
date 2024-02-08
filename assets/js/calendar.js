var currentDate = document.querySelector(".current-date");
var days = document.querySelector(".days");
var icons = document.querySelectorAll(".fa");
var panelText = document.querySelector(".panel-text");
//var months = ["January", "February", "March", "April", "May", "June" , "July", "August", "September", "October", "November", "December"]
var date = dayjs();
var newDay = "";

function renderCalendar() {
  var daysInMonth = date.daysInMonth();
  var firstDay = date.startOf("month").$W;
  var lastDay = date.endOf("month").$W;
  var lastDayOfPreviousMonth = date.subtract(1, "month").endOf("month").$D;
  var listDay = "";

  for (var i = firstDay; i > 0; i--) {
    listDay += `<li class="inactive">${lastDayOfPreviousMonth - i + 1}</li>`;
  }

  for (var i = 1; i <= daysInMonth; i++) {
    if (i === dayjs().date() && date.month() === dayjs().month()) {
      listDay += `<li class="active" onclick="selectDay(${i}, this)">${i}</li>`;
    } else {
      listDay += `<li onclick="selectDay(${i}, this)">${i}</li>`;
    }
  }

  for (var i = lastDay; i < 6; i++) {
    listDay += `<li class="inactive">${i - lastDay + 1}</li>`;
  }

  currentDate.innerText = date.format("MMMM YYYY");
  days.innerHTML = listDay;
}

renderCalendar();

icons.forEach(function (icon, index) {
  icon.addEventListener("click", function () {
    changeMonth(index);
  });
});

function changeMonth(index) {
  if (icons[index].id === "left") {
    date = date.subtract(1, "month");
  } else {
    date = date.add(1, "month");
  }

  renderCalendar();
}

function selectDay(selectedDay, newDay) {
  date = date.date(selectedDay);
  if (document.querySelector(".active")) {
    document.querySelector(".active").classList.remove("active");
  }
  newDay.classList.add("active");
  console.log(`Selected day: ${selectedDay}`);
  console.log(date);
  panelText.textContent = date.format("DD MMMM YYYY");
  eventAppend();
  var bgNum = document.querySelector(".dayNum");
  bgNum.textContent = selectedDay
}
