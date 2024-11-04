const answer = document.querySelector('#answer1')
makeRichText(answer, {
  screenshotSaver: ({data, type}) =>
    new Promise(resolve => {
      const reader = new FileReader()
      reader.onload = evt => resolve(evt.target.result.replace(/^(data:image)(\/[^;]+)(;.*)/,'$1$3'))
      reader.readAsDataURL(new Blob([data], { type }))
    }),
  baseUrl: 'https://math-demo.abitti.fi',
  updateMathImg: ($img, latex) => {
    $img.prop({
      src: "data:image/svg+xml;base64," + getSvg(latex),
      alt: latex.replace(/</g, '\\lt ').replace(/>/g, '\\gt ')
    })
    $img.closest('[data-js="answer"]').trigger('input')
  }
})

const getSvg = function(latex) {
  const node = MathJax.tex2svg(latex);
  if (node.querySelector("[data-mjx-error]")) {
    return (window.btoa(`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg width="305px" height="20px" viewBox="0 0 305 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <title>Group 2</title>
  <defs></defs>
  <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
      <g transform="translate(-241.000000, -219.000000)">
          <g transform="translate(209.000000, 207.000000)">
              <rect x="-1.58632797e-14" y="0" width="80" height="40"></rect>
              <g transform="translate(32.000000, 12.000000)">
                  <polygon id="Combined-Shape" fill="#9B0000" fill-rule="nonzero" points="0 18 8.04006 2 16.08012 18"></polygon>
                  <polygon id="Combined-Shape-path" fill="#FFFFFF" points="7 14 9 14 9 16 7 16"></polygon>
                  <polygon id="Combined-Shape-path" fill="#FFFFFF" points="7 7 9 7 9 12 7 12"></polygon>
              </g>
          </g>
      </g>
  </g>
  <text x="25" y="16" fill="red">${currentLang === 'fi' ? 'Virhe LaTeX-koodissa' : 'Error in LaTeX code'}</text>
</svg>`));
  } else {
    return btoa(
      encodeURIComponent(node.firstChild.outerHTML).replace(/%([0-9A-F]{2})/g, (match, p1) =>
        String.fromCharCode('0x' + p1)
      )
    )
  }
}

const reader = new FileReader()
reader.onload = x => $('.answer').html(x.target.result)

document.getElementById("input").addEventListener("change", handleFiles, false)

function handleFiles() {
  const file = this.files[0]
  reader.readAsText(file)
}