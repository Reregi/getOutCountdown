function setTime () {
  const time = document.querySelector('#timeInput').value
  if (new Date(time) == 'Invalid Date') {
    alert('请输入正确时间')
    return
  }
  localStorage.setItem('endTime', time)
  countdown()
  if (new Date(localStorage.getItem('endTime')) > new Date()) {
    chrome.runtime.sendMessage({ cmd: 'setTime', time: time })
  }
}

function countdown () {
  const date = new Date(localStorage.getItem('endTime'))
  const diffTime = (date.getTime() - new Date().getTime()) / 1000
  if (diffTime > 0 || diffTime == 0) {
    document.querySelector('#day').innerHTML = `${parseInt(diffTime / 86400)}`.padStart(2, '0')
    document.querySelector('#hour').innerHTML = `${parseInt(diffTime % 86400 / 3600)}`.padStart(2, '0')
    document.querySelector('#minute').innerHTML = `${parseInt(diffTime % 86400 % 3600 / 60)}`.padStart(2, '0')
    document.querySelector('#second').innerHTML = `${parseInt(diffTime % 86400 % 3600 % 60)}`.padStart(2, '0')
  }
  if (diffTime > 0) {
    setTimeout(countdown, 1000)
  } else if (diffTime == 0) {
    alert('时间到了')
  } else {
    alert('时间已经过去了')
  }
}

function init () {
  document.querySelector('#button').addEventListener('click', setTime)
  if (localStorage.getItem('endTime') && localStorage.getItem('endTime') != null) {
    document.querySelector('#timeInput').value = localStorage.getItem('endTime')
    if (new Date(localStorage.getItem('endTime')) > new Date()) {
      countdown()
    }
  }
}

init()