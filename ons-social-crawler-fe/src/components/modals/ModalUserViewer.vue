<template>
  <div
    class="modal fade"
    tabindex="-1"
    id="kt_modal_user_viewer"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
  >
    <div class="modal-dialog modal-xl modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="modal-title">{{ $t("entities.users.detail") }}</h2>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>

        <div class="modal-body">
          <DigiViewer :fields="fields" />
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-light" data-bs-dismiss="modal">
            {{ $t("common.close") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useLoadingStore } from "@/stores/loading";
import ApiService from "@/core/services/ApiService";
import { getModalInstance } from "@/core/helpers/dom";
import DigiViewer from "@/components/digi-unit/DigiViewer.vue";
import alert from "@/core/helpers/alert";

export default defineComponent({
  name: "modal-user-viewer",
  components: {
    DigiViewer,
  },
  props: {
    id: { type: Number, default: 0 },
  },
  emits: ["closeModal"],
  setup(props, context) {
    const { dangerAlert } = alert();
    const { t } = useI18n();
    const loading = useLoadingStore();
    const id = computed(() => props.id);
    const fields = ref([
      {
        col: "",
        label: "",
        id: "id",
        type: "",
        value: "",
      },
      {
        col: "col-12 col-md-6",
        label: t("entities.users.name"),
        id: "name",
        type: "text",
        value: "",
      },
      {
        col: "col-12 col-md-6",
        label: t("entities.users.email"),
        id: "email",
        type: "text",
        value: "",
      },
      {
        col: "col-12 col-md-6",
        label: t("entities.users.roles"),
        id: "CrmRoles",
        type: "text",
        value: "",
      },
    ]);

    onMounted(() => {
      const modal = getModalInstance("kt_modal_user_viewer");
      modal!.addEventListener("show.bs.modal", async () => {
        await init();
      });
      modal!.addEventListener("hide.bs.modal", () => {
        context.emit("closeModal");
      });
    });

    const getRoles = (roles) => {
      const strRoles = roles.map((x) => x.RoleName);
      return strRoles.join(", ");
    };

    const init = async () => {
      loading.show();
      try {
        if (id.value > 0) {
          const data = await ApiService.get("/user", "" + id.value);
          for (const f in data.data) {
            const index = fields.value.findIndex(
              (x) => x.id.toLowerCase() == f.toLowerCase()
            );
            if (index >= 0) {
              if (f === "CrmRoles") {
                fields.value[index].value = getRoles(data.data[f]);
              } else {
                fields.value[index].value = data.data[f];
              }
            }
          }
        }
      } catch (e) {
        dangerAlert(e);
      } finally {
        loading.hide();
      }
    };

    return {
      fields,
    };
  },
});
</script>
