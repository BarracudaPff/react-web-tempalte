import { message } from 'antd'

/**
 * Calculate percentage
 * @example
 * totalPercentage(8589934592, 225492992)  // => 98
 */
export function totalPercentage(totalmem: number, freemem: number) {
  return Math.floor((totalmem - freemem) / totalmem * 100)
}

// full screen browser
export function fullscreen() {
  try {
    const docElm = document.documentElement as any
    if (docElm.requestFullscreen) {
      docElm.requestFullscreen()
    } else if (docElm.webkitRequestFullScreen) {
      docElm.webkitRequestFullScreen()
    } else if (docElm.mozRequestFullScreen) {
      docElm.mozRequestFullScreen()
    } else if (docElm.msRequestFullscreen) {
      docElm.msRequestFullscreen()
    }
  } catch {
    message.warn('The browser you are using does not support full screen')
  }
}

// Exit the full screen browser
export function exitFullscreen() {
  try {
    const doc = document as any
    if (doc.exitFullscreen) {
      doc.exitFullscreen()
    } else if (doc.mozCancelFullScreen) {
      doc.mozCancelFullScreen()
    } else if (doc.webkitCancelFullScreen) {
      doc.webkitCancelFullScreen()
    } else if (doc.msExitFullscreen) {
      doc.msExitFullscreen()
    }
  } catch {
    message.warn('The browser you are using does not support exiting full screen, please press ESC')
  }
}

// random string
export function randomCode(num = 4) {
  const CODE = 'qwertyuipasdfghjklxcvbnm13456789'
  let data = ''

  for (let i = 0; i < num; i++) {
    const random = Math.floor(Math.random() * CODE.length)
    data += CODE[random]
  }

  return data
}
