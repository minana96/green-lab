/* HiDPI Gravatar Loader � 2012-2015 by Robert Chapin, license: GPL */
if ((window.devicePixelRatio || window.screen.deviceXDPI / window.screen.logicalXDPI) > 1.4) {
 if (document.cookie.indexOf('miqro_srcset=') < 0) {
  miqro_srcset_detection();
 } else if (document.cookie.indexOf('miqro_srcset=no') >= 0) {
  miqro_hidpi_gravatars();
 }
 document.cookie = 'miqro_hidpi=yes';
}
function miqro_hidpi_gravatars() {
 avatars = document.getElementsByClassName('avatar');
 for (var i = 0; i < avatars.length; i++) {
  if (avatars[i].tagName != 'IMG') continue;
  lodpi = avatars[i].src;
  if (lodpi.indexOf('.gravatar.com') < 1) continue;
  temp = lodpi.indexOf('&s=');
  if (temp < 9) temp = lodpi.indexOf('?s=');
  if (temp < 9) continue;
  temp += 3;
  size = parseInt(lodpi.substr(temp));
  hidpi = lodpi.substr(0, temp) + size * 2 + lodpi.substr(temp + String(size).length);
  temp = hidpi.indexOf('%3Fs%3D');
  if (temp < 9) temp = hidpi.indexOf('%26s%3D');
  if (temp > 9) {
   temp += 7;
   size = parseInt(hidpi.substr(temp));
   hidpi = hidpi.substr(0, temp) + size * 2 + hidpi.substr(temp + String(size).length);
  }
  avatars[i].src = hidpi;
 }
}
function miqro_srcset_detection() {
 testimg = document.createElement("IMG");
 supported = '' == testimg.srcset;
 if ( supported ) {
  document.cookie = 'miqro_srcset=yes';
 } else {
  miqro_hidpi_gravatars();
  document.cookie = 'miqro_srcset=no';
 }
}