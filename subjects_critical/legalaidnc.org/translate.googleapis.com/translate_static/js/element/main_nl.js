(function(){/*

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/
var d=this||self;function e(a,v){a=a.split(".");var b=d;a[0]in b||"undefined"==typeof b.execScript||b.execScript("var "+a[0]);for(var c;a.length&&(c=a.shift());)a.length||void 0===v?b[c]&&b[c]!==Object.prototype[c]?b=b[c]:b=b[c]={}:b[c]=v};var f={0:"Vertalen",1:"Annuleren",2:"Sluiten",3:function(a){return"Google heeft deze pagina automatisch vertaald in het: "+a},4:function(a){return"Vertaald in: "+a},5:"Fout: de server kan je verzoek niet verwerken. Probeer het later opnieuw.",6:"Meer informatie",7:function(a){return"Mogelijk gemaakt door "+a},8:"Translate",9:"Vertaling wordt verwerkt",10:function(a){return"Deze pagina vertalen in het "+(a+" via Google Translate?")},11:function(a){return"Deze pagina weergeven in het: "+a},12:"Origineel weergeven",
13:"De content van dit lokale bestand wordt via een beveiligde verbinding ter vertaling naar Google verzonden.",14:"De content van deze beveiligde pagina wordt via een beveiligde verbinding voor vertaling naar Google verzonden.",15:"De content van deze intranetpagina wordt via een beveiligde verbinding ter vertaling naar Google verzonden.",16:"Selecteer een taal",17:function(a){return"Vertaling uit het "+(a+" uitschakelen")},18:function(a){return"Uitschakelen voor: "+a},19:"Altijd verbergen",20:"Originele tekst:",
21:"Een betere vertaling bijdragen",22:"Bijdragen",23:"Alles vertalen",24:"Alles herstellen",25:"Alles annuleren",26:"Delen vertalen naar mijn taal",27:function(a){return"Alles vertalen naar het "+a},28:"Originele talen weergeven",29:"Opties",30:"Vertaling voor deze site uitschakelen",31:null,32:"Alternatieve vertalingen weergeven",33:"Klik op de bovenstaande woorden voor alternatieve vertalingen",34:"Gebruiken",35:"Sleep met de Shift-toets ingedrukt om de woordvolgorde te veranderen",36:"Klik voor alternatieve vertalingen",
37:"Houd de Shift-toets ingedrukt en sleep de bovenstaande woorden om ze in de gewenste volgorde te zetten.",38:"Bedankt dat je een suggestie voor de vertaling hebt verzonden naar Google Translate.",39:"Vertalingen beheren voor deze site",40:"Klik op een woord voor alternatieve vertalingen of dubbelklik op een woord om het rechtstreeks te bewerken",41:"Oorspronkelijke tekst",42:"Translate",43:"Vertalen",44:"Je correctie is verzonden.",45:"Fout: de taal van de webpagina wordt niet ondersteund.",46:"Widget Language Translate"};var g=window.google&&google.translate&&google.translate._const;
if(g){var h;a:{for(var k=[],l=["TE_20200928_00,0.01,20201002"],m=0;m<l.length;++m){var n=l[m].split(","),p=n[0];if(p){var q=Number(n[1]);if(!(!q||.1<q||0>q)){var r=Number(n[2]),t=new Date,u=1E4*t.getFullYear()+100*(t.getMonth()+1)+t.getDate();!r||r<u||k.push({version:p,ratio:q,a:r})}}}var w=0,x=window.location.href.match(/google\.translate\.element\.random=([\d\.]+)/),y=Number(x&&x[1])||Math.random();for(m=0;m<k.length;++m){var z=k[m];w+=z.ratio;if(1<=w)break;if(y<w){h=z.version;break a}}h="TE_20200506_00"}var A=
"/element/%s/e/js/element/element_main.js".replace("%s",h);if("0"==h){var B=" element %s e js element element_main.js".split(" ");B[B.length-1]="main_nl.js";A=B.join("/").replace("%s",h)}if(g._cjlc)g._cjlc(g._pas+g._pah+A);else{var C=g._pas+g._pah+A,D=document.createElement("script");D.type="text/javascript";D.charset="UTF-8";D.src=C;var E=document.getElementsByTagName("head")[0];E||(E=document.body.parentNode.appendChild(document.createElement("head")));E.appendChild(D)}e("google.translate.m",f);
e("google.translate.v",h)};}).call(window)