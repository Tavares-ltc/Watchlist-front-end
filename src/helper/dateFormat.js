export function formatDate(date, format = "en-Us") {
    if (date) {
      const arrDate = date.split("-");
  
      if (format === "pt-BR") return `${arrDate[2]}/${arrDate[1]}/${arrDate[0]}`;
      return `${arrDate[1]}/${arrDate[2]}/${arrDate[0]}`;
    }
  }