export const appMenu = value => ({
  type: 'APP_MENU',
  value,
})

export default function(state = { appMenu: false }, action) {
  const { type, value } = action
  switch (type) {
    case 'APP_MENU':
      return { ...state, appMenu: value }
    default:
      return state
  }
}
