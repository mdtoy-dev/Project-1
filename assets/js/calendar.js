var currentDate = document.querySelector(".current-date")
var days = document.querySelector(".days")
var icons = document.querySelectorAll(".fa")
//var months = ["January", "February", "March", "April", "May", "June" , "July", "August", "September", "October", "November", "December"]
var date = dayjs()

function renderCalendar() {
    var daysInMonth = date.daysInMonth()
    var firstDay = date.startOf("month").$W
    var lastDay = date.endOf("month").$W
    var lastDayOfPreviousMonth = date.subtract(1, "month").endOf("month").$D
    var listDay = ""
    
    for (var i = firstDay; i > 0; i--) {
        listDay += `<li class="inactive">${lastDayOfPreviousMonth - i + 1}</li>`
    }

    for (var i = 1; i <= daysInMonth; i++) {
        if (i === dayjs().date() && date.month() === dayjs().month()) {
            listDay += `<li class="active">${i}</li>`
        } else {
        listDay += `<li>${i}</li>`
        }
    }

    for (var i = lastDay; i < 6; i++) {
        listDay += `<li class="inactive">${i - lastDay + 1}</li>`
    }

    currentDate.innerText = date.format("MMMM YYYY")
    days.innerHTML = listDay
}

renderCalendar()

icons.forEach(function (icon, index) {
    icon.addEventListener("click", function () {
        changeMonth(index);
    });
});

function changeMonth(index) {
    if (icons[index].id === "left") {
        date = date.subtract(1, 'month');
    } else {
        date = date.add(1, 'month');
    }

    renderCalendar();
}