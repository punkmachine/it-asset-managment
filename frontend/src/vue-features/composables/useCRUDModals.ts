import { ref } from 'vue';
import type { Ref } from 'vue';

import UIModal from '@/components/ui/UIModal.vue';

type TModal = Ref<InstanceType<typeof UIModal> | null>

export const useCRUDModals = (handleModalCallback: (id: string | null) => void) => {
  const deleteModal: TModal = ref(null);
  const editModal: TModal = ref(null);
  const addModal: TModal = ref(null);

  function handleModalWrapper(modal: TModal, id: string | null): void {
    handleModalCallback(id);

    if (modal.value) {
      modal.value.show();
    }
  }

  return {
    deleteModal, editModal, addModal,
    handleModalWrapper,
  }
}
