/* global AppleID */
import { APPLE_CLIENT_ID } from '../config'

export default class AppleService {
  static initialization() {
    if (AppleID) {
      AppleID.auth.init({
        clientId : APPLE_CLIENT_ID,
        scope : 'email name',
        redirectURI : `${window.location.origin}/`,
        usePopup : true
      })
    }
  }
}
