export function getTitle(error) {
  if (!error) return ''
  switch (error.status) {
    case 400:
    case 422:
      return error.statusText
    case 401:
      return 'Authorization Error'
    default:
      return error.statusText
  }
}

export function getDescription(error) {
  if (!error) return ''
  switch (error.status) {
    case 400:
    case 422:
      console.error(error.data)
      return 'Your provided data is not valid, please try again later, we are working on this issue'
    case 401:
      return "We couldn't find your email and password, please try again or reset your password."
    default:
      return 'Unexpected error: please try again it later, our support team has notified'
  }
}
