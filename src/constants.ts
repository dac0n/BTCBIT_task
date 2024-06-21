export const restrictedPasswordsRegex = /^(?!incorrect-password$).*/;

export const restrictedEmailsRegex = /^(?!incorrect@email.com$).*/;

export const passwordRegex = /^(?=.*[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])(?=.{6,})/;

export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const CurrencyNames = {
    "1": "AUD", "2": "RSD", "3": "CHF", "4": "JPY", "5": "EUR", "6": "USD", "7": "DZD", "8": "ARS", "9": "AZN", "10": "BRL",
    "11": "CNY", "12": "GEL", "13": "INR", "14": "LVL", "15": "OMR", "16": "CUP", "17": "ZAR", "18": "ZWD", "19": "QAR", "20": "PLN",
    "21": "GBP", "22": "CAD", "23": "SEK", "24": "PHP", "25": "IDR"
  };