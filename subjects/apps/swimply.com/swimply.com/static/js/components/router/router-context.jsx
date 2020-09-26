import React from 'react'

export const RouterContext = React.createContext({ region: 'us', showPopupCallback: () => {}, showIncompleteHostPopup: () => {}, hideIncompleteHostPopup: () => {} })
