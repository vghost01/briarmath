window.MathJax = {
    options: {
      ignoreHtmlClass: 'tex2jax_ignore',
      processHtmlClass: 'tex2jax_process'
    },
    tex: {
      packages: ['base', 'ams', 'noerrors', 'noundefined', 'mhchem']
    },
    loader: {
      load: ['[tex]/noerrors', '[tex]/mhchem']
    }
  };