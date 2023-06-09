const global = () => {
  const dateFormatter = (date) => {
    if (date) {
      const objDate = new Date(date)
      return objDate.toLocaleDateString('it-IT')
    }
    return
  }

  const dateTimeFormatter = (date) => {
    if (date) {
      const objDate = new Date(date)
      const format = Intl.DateTimeFormat('it-IT', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: false
      }).format(objDate)
      return format
    }
    return
  }

  return {
    dateFormatter,
    dateTimeFormatter
  }
}

export default global
