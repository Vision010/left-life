class Event {
  // 事件池
  events = {}

  on(eventName, fnc) {
    const callbacks = (this.events[eventName] = this.events[eventName] || [])
    if (callbacks.indexOf(fnc) === -1) {
      callbacks.push(fnc)
    }
    return this
  }

  off(eventName, fnc) {
    const callbacks = this.events[eventName]
    if (Array.isArray(eventName)) {
      if (fnc) {
        const index = callbacks.indexOf(fnc)
        if (index !== -1) {
          callbacks.splice(index, 1)
        }
      } else {
        callbacks.length = 0
      }
    }

    return this
  }

  emit(eventName, data) {
    const callbacks = this.events[eventName]
    if (Array.isArray(callbacks)) {
      callbacks.forEach((fnc) => fnc(data))
    }
    return this
  }
}
