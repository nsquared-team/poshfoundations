/*!
 * Color switcher
 *
 */

const colorSwitcher = {
  // Config
  _scheme: "auto",
  buttonsTarget: "button[data-color-switcher]",
  buttonAttribute: "data-color-switcher",
  rootAttribute: "href",
  localStorageKey: "picoPreferredColorScheme",

  // Init
  init() {
    this.scheme = this.schemeFromLocalStorage;
    this.initSwitchers();
  },

  // Get color scheme from local storage
  get schemeFromLocalStorage() {
    return window.localStorage?.getItem(this.localStorageKey) ?? this._scheme;
  },

  // Init switchers
  initSwitchers() {
    const buttons = document.querySelectorAll(this.buttonsTarget);
    buttons.forEach((button) => {
      button.addEventListener(
        "click",
        (event) => {
          event.preventDefault();
          // Set scheme
          this.scheme = button.getAttribute(this.buttonAttribute);
          buttons.forEach(btn => btn.removeAttribute('aria-current'));
          button.setAttribute('aria-current', true);
        },
        false
      );
    });
  },

  // Set scheme
  set scheme(scheme) {
    this._scheme = scheme;
    this.applyScheme();
    this.schemeToLocalStorage();
  },

  // Get scheme
  get scheme() {
    return this._scheme;
  },

  // Apply scheme
  applyScheme() {
    document.getElementById('color')?.setAttribute(this.rootAttribute, 'css/' + this.scheme + '.css');
  },

  // Store scheme to local storage
  schemeToLocalStorage() {
    window.localStorage?.setItem(this.localStorageKey, this.scheme);
  },
};

// Init
colorSwitcher.init();
