getAlarms();

setInterval(() => {
  dateTime = new Date();

  document.getElementById("hours").innerHTML = dateTime.getHours();
  document.getElementById("min").innerHTML = dateTime.getMinutes();
  document.getElementById("second").innerHTML = dateTime.getSeconds();

  hour = dateTime.getHours();
  minute = dateTime.getMinutes();
  second = dateTime.getSeconds();

  today = `${dateTime.getDate()}/${
    dateTime.getMonth() + 1
  }/${dateTime.getFullYear()}`;

  $("#ddmmyy").html(today);

  alarms = JSON.parse(localStorage.getItem("alarms"));

  if (alarms) {
    todayAlarm = alarms.filter((alarm) => {
      return alarm.hour == hour;
    });
    // console.log(todayAlarm);
  }

  for (let i = 0; i < todayAlarm.length; i++) {
    if (hour == todayAlarm[i].hour && minute == todayAlarm[i].minute) {
      // console.log("Alarm is running");
      $("#play").get(0).play();
    }
  }
}, 1000);

for (let i = 1; i <= 24; i++) {
  document.getElementById("hour").innerHTML += `
    <option value="${i}">${i}</option>
  `;
}

for (let i = 0; i <= 59; i++) {
  document.getElementById("minute").innerHTML += `
    <option value="${i}">${i}</option>
  `;
}

const setAlarm = () => {
  let hourInput = document.getElementById("hour").value;
  let minuteInput = document.getElementById("minute").value;

  if (hourInput == "" || minuteInput == "") {
    alert("Please select hour or minute!");
    return;
  }

  // console.log(hour, minute);

  if (hour == hourInput && minute == minuteInput) {
    alert("Please select valid time!");
    return;
  }

  if (minute > minuteInput) {
    alert("Please select valid time!!!");
    return;
  }

  if (hour < hourInput) {
    alert("Please select valid time!!!");
    return;
  }

  // console.log(Number(hour), Number(minute));

  let allAlarm = localStorage.getItem("alarms");

  if (allAlarm == null) {
    alarmArr = [];
  } else {
    alarmArr = JSON.parse(localStorage.getItem("alarms"));
  }

  let obj = {
    hour: hourInput,
    minute: minuteInput,
    date: today,
  };

  alarmArr.push(obj);

  localStorage.setItem("alarms", JSON.stringify(alarmArr));

  getAlarms();
};

function getAlarms() {
  let allAlarm = localStorage.getItem("alarms");

  if (allAlarm == null) {
    alarmArr = [];
  } else {
    alarmArr = JSON.parse(localStorage.getItem("alarms"));
  }

  // console.log(alarmArr);

  document.querySelector("tbody").innerHTML = "";

  for (let i = 0; i < alarmArr.length; i++) {
    $("tbody").append(
      `
          <tr>
            <td>${alarmArr[i].hour}</td>
            <td>${alarmArr[i].minute}</td>
            <td>${alarmArr[i].date}</td>
            <td id="${i}" onclick="deleteAlarm(${i})"><i class="las la-trash-alt text-danger" style="font-size:25px;"></i></td>
          </tr>
        `
    );
  }
}

function deleteAlarm(index) {
  alarmArr.splice(index, 1);

  localStorage.setItem("alarms", JSON.stringify(alarmArr));

  document.getElementById("play").pause();
  getAlarms();
}
