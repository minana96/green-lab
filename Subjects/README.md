# Chosen subjects for experiment

The fields in .ods file have following meaning from left to right:
- **Ranking in Tranco list**
- **URL of a web app**
- **Performance score in Lighthouse**
- **FCP in Lighthouse**
- **TTI in Lighthouse**
- **Potential savings**: when blocking resources are elimenated, according to
  Lighthouse
- **Number of external .CSS files**: one star means that there is an external
  .CSS files outside of the head, two stars means that not all external css
  files were 
  visible in the source code, three stars means both
- **Asyncronously loaded or preloaded .CSS files**: a star means
  that it asynchronously loads other files (.JS files, images, fonts, etc.),
  two stars means that asynchronously loaded .CSS files are commented out
- **Inlined CSS**: a star means that content is inlined inside HTML elements,
  not inside the head
