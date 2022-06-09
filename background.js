chrome.runtime.onInstalled.addListener(() => {})

console.log(chrome)

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.cmd == 'setTime') {
    setTimeAlarm(request)
  }
})

// 监听alarms事件，触发就创建通知
chrome.alarms.onAlarm.addListener(function () {
  chrome.notifications.create('alarm', { type: 'basic', iconUrl: 'img/logo.png', title: '时间到', message: '落班了喂' })
  setTimeout(() => {
    chrome.notifications.clear('alarm')
  }, 3000)
})

function setTimeAlarm(request) {
  //清除之前的
  chrome.alarms.clearAll()
  //创建alarms事件
  chrome.alarms.create('setTime', {
    when: new Date(request.time).getTime(),
  })
}
