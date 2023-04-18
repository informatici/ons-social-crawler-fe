import { useAuthStore } from '@/stores/auth'
import Swal from 'sweetalert2'
// import { useI18n } from "vue-i18n";
import { useRouter } from 'vue-router'

export default function alert() {
  // const { t } = useI18n();
  const router = useRouter()
  const store = useAuthStore()

  const operationConfirm = () => {
    return Swal.fire({
      text: 'common.operationconfirm',
      icon: 'success',
      buttonsStyling: false,
      confirmButtonText: 'common.ok',
      customClass: {
        confirmButton: 'btn fw-bold btn-light-primary'
      }
    })
  }

  const dangerAlert = (error) => {
    const status = error?.response?.status || 500
    if (status === 403 || status === 401) {
      setTimeout(() => {
        store.logout()
        router.push({ name: 'sign-in' })
      }, 150)
    } else {
      const text = error.response.data.message
      return Swal.fire({
        text: text,
        icon: 'error',
        buttonsStyling: false,
        confirmButtonText: 'common.ok',
        customClass: {
          confirmButton: 'btn fw-bold btn-light-primary'
        }
      })
    }
  }

  const warningAlert = (title, showCancelButton = true, confirmButtonText = 'common.confirm') => {
    return Swal.fire({
      text: title,
      icon: 'warning',
      buttonsStyling: false,
      showCancelButton,
      confirmButtonText,
      cancelButtonText: 'common.cancel',
      customClass: {
        confirmButton: 'btn fw-bold btn-primary',
        cancelButton: 'btn fw-bold btn-light'
      }
    })
  }

  return {
    operationConfirm,
    dangerAlert,
    warningAlert
  }
}
