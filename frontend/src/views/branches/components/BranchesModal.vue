<template>
  <UIModal ref="deleteModal">
    <template #body>Вы точно хотите удалить сотрудника "{{ currentBranch?.title }}"?</template>

    <template #footer>
      <DeleteModalFooter @cancel="deleteModal?.hide()" @delete="deleteBranchClick" />
    </template>
  </UIModal>

  <UIModal ref="editModal">
    <template #body>
      <h2 class="modal__title">Редактирование филиала "{{ currentBranch?.title }}"</h2>
      <!--
        @todo: костыль с currentBranch, потому что он технически может быть null,
        но физически в этой форме ну реально никак, а TS ругается
      -->
      <form v-if="currentBranch">
        <FormEditBranch :edited-branch="currentBranch" @edit-branch="editBranch" />
      </form>
    </template>

    <template #footer>
      <EditModalFooter @cancel="editModal?.hide()" @save="saveEditBranchClick" />
    </template>
  </UIModal>

  <UIModal ref="addModal">
    <template #body>
      <h2 class="modal__title">Создание филиала</h2>
      <form>
        <FormAddBranch :added-branch="newBranch" @update-added-branch="updateAddedBranch" />
      </form>
    </template>

    <template #footer>
      <AddModalFooter @cancel="addModal?.hide()" @add="saveAddBranchClick" />
    </template>
  </UIModal>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';

import type { IBranch } from '@/entities/types/backend/response/branches';
import type { INewBranch } from '../types';

import UIModal from '@/components/ui/UIModal.vue';
import DeleteModalFooter from '@/views/branches/components/DeleteModalFooter.vue';
import EditModalFooter from '@/views/branches/components/EditModalFooter.vue';
import AddModalFooter from '@/views/branches/components/AddModalFooter.vue';
import FormEditBranch from '@/views/branches/components/FormEditBranch.vue';
import FormAddBranch from '@/views/branches/components/FormAddBranch.vue';

interface IProps {
  currentBranch: IBranch | null
  deleteModal: InstanceType<typeof UIModal> | null,
  addModal: InstanceType<typeof UIModal> | null,
  editModal: InstanceType<typeof UIModal> | null,
  newBranch: INewBranch,
  saveAddBranchClick: () => void,
  saveEditBranchClick: () => void,
  updateAddedBranch: (branch: INewBranch) => void,
  editBranch: (branch: IBranch) => void,
  deleteBranchClick: () => void,
}

const props = defineProps<IProps>();
</script>

<style scoped></style>
