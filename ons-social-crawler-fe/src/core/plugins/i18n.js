import { createI18n } from 'vue-i18n'

const messages = {
  it: {
    entities: {
      users: {
        add: 'Aggiungi',
        edit: 'Modifica Utente',
        detail: 'User Detail',
        name: 'User',
        email: 'E-mail',
        roles: 'Roles',
        password: 'Password',
        passwordConfirmation: 'Conferma Password',
        fullName: 'Nome Cognome',
        crmUserRoles: 'User Roles',
        passwordMinLength: 'La password deve contenere almeno 6 caratteri'
      }
    },
    common: {
      search: 'Search',
      confirm: 'Conferma',
      close: 'Chiudi',
      insertValue: 'Inserisci valore',
      requiredField: 'Campo obbligatorio',
      ok: 'Ok',
      operationconfirm: 'Operation succesfully complete!',
      cancel: 'Annulla',
      confirmMessage: 'Questa azione non è reversibile. Sei sicuro di voler procedere?',
      confirmMessageLight: 'Sei sicuro di voler procedere?',
      yes: 'Yes',
      no: 'No',
      signout: 'Sign Out',
      signin: 'Sign In',
      email: 'Email',
      continue: 'Continue',
      password: 'Password',
      tryAgain: 'Try again!',
      okLong: 'Ok, got it!',
      signinOk: 'You have successfully logged in!',
      signinError: 'Something is not right',
      validEmail: "L'email deve avere un formato valido",
      passwordsDoNotMatch: 'Le password non corrispondono',
      totalRows: 'Righe totali',
      selectDate: 'Select a date'
    }
  }
}

const i18n = createI18n({
  legacy: false,
  locale: 'it',
  globalInjection: true,
  messages
})

export default i18n
