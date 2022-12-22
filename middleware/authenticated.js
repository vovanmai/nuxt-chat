export default function ({ store, redirect, app }) {
  // If the user is not authenticated
  if (!store.state.auth.loggedIn) {
    let locale = app.i18n.locale === app.i18n.defaultLocale ? '' : '/' + app.i18n.locale;
    return redirect(`${locale}/login`)
  }
}
