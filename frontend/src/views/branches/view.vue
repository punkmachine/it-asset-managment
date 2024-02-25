<template>
  <div class="branches">
    <HeadBranchesPage @addBranch="handleAdd" />

    <div class="branches__content">
      <SearchBranch @searchInput="searchBranch" />

      <div class="divider"></div>

      <div class="branches__table-wrapper">
        <UITable
          :columns="columns"
          :rows="rows"
          delete-button-visible
          edit-button-visible
          @edit="handleEdit"
          @delete="handleDelete"
        />

        <div class="mr-5 mt-5 flex justify-end ">
          <UIPagination
            v-model:current-page="currentPage"
            v-model:visible-items="visibleTableItems"
            :count="rows.length"
          />
        </div>
      </div>

      <UIModal ref="deleteModal">
        <template #body>Вы точно хотите удалить сотрудника "{{ currentBranch?.title }}"?</template>

        <template #footer>
          <DeleteModalFooter
            @cancel="deleteModal?.hide()"
            @delete="deleteBranchClick"
          />
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
            <FormEditBranch
              :edited-branch="currentBranch"
              @edit-branch="newBranch => (currentBranch = newBranch)"
            />
          </form>
        </template>

        <template #footer>
          <EditModalFooter
            @cancel="editModal?.hide()"
            @save="saveEditBranchClick"
          />
        </template>
      </UIModal>

      <UIModal ref="addModal">
        <template #body>
          <h2 class="modal__title">Создание филиала</h2>
          <form>
            <FormAddBranch
              :added-branch="newBranch"
              @updateAddedBranch="branch => (newBranch = branch)"
            />
          </form>
        </template>

        <template #footer>
          <AddModalFooter
            @cancel="addModal?.hide()"
            @add="saveAddBranchClick"
          />
        </template>
      </UIModal>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

import type { Ref } from 'vue';
import type { IBranch } from '@/entities/types/backend/response/branches';
import type { IColumn, TRows } from '@/entities/types/UI/table';
import type { INewBranch } from './types';

import UIPagination from '@/components/ui/UIPagination.vue';
import UITable from '@/components/ui/UITable.vue';
import UIModal from '@/components/ui/UIModal.vue';
import HeadBranchesPage from '@/views/branches/components/HeadBranchesPage.vue';
import SearchBranch from '@/views/branches/components/SearchBranch.vue';
import DeleteModalFooter from '@/views/branches/components/DeleteModalFooter.vue';
import EditModalFooter from '@/views/branches/components/EditModalFooter.vue';
import AddModalFooter from '@/views/branches/components/AddModalFooter.vue';
import FormEditBranch from '@/views/branches/components/FormEditBranch.vue';
import FormAddBranch from '@/views/branches/components/FormAddBranch.vue';

import { api } from '@/api';
import { getTableRows } from '@/utils/adapters/branchesAdapterFromTable';

import { useEscapeClick } from '@/vue-features/composables/useEscapeClick';
import { useSearch } from '@/vue-features/composables/useSearch';
import { useCRUDModals } from '@/vue-features/composables/useCRUDModals';

import { columnsSettings, initialBranch } from '@/views/branches/settings';

const { addEventEscape, removeEventEscape } = useEscapeClick(keyDownEscape);
const { searchText, setSearchText: searchBranch } = useSearch(requestSearch, clearSearch);
const { addModal, editModal, deleteModal, handleModalWrapper } = useCRUDModals(handleModalCallback);

const currentBranch: Ref<IBranch | null> = ref(null);
const backupBranches: Ref<IBranch[]> = ref([]);
const branches: Ref<IBranch[]> = ref([]);
const filteredBranches: Ref<IBranch[]> = ref([]);
const newBranch: Ref<INewBranch> = ref({ ...initialBranch });
const currentPage: Ref<number> = ref(1);
const visibleTableItems: Ref<number> = ref(10);

const rows: Ref<TRows[]> = ref([]);
const columns: Ref<IColumn[]> = ref(columnsSettings);

function getCurrentBranchById(id: string): IBranch | null {
  return branches.value.find(branch => branch._id === id) ?? null;
}

function handleModalCallback(id: string | null) {
  if (id) {
    currentBranch.value = getCurrentBranchById(id);
    addEventEscape();
  }
}

function handleDelete(id: string) {
  handleModalWrapper(deleteModal, id);
}

function handleEdit(id: string) {
  handleModalWrapper(editModal, id);
}

function handleAdd() {
  handleModalWrapper(addModal, null);
}

function changeTargetBranch(data: IBranch) {
  branches.value = branches.value.map(branch => {
    if (branch._id === data._id) {
      return {
        ...data,
      };
    }

    return branch;
  });
}

function setNewDataBranch() {
  filteredBranches.value = [...branches.value];
  rows.value = getTableRows(filteredBranches.value);
  currentBranch.value = null;
}

function getBranchesAndRowsTable() {
  api.branches
    .fetchBranches()
    .then(data => {
      branches.value = [...data];
      filteredBranches.value = [...data];
      rows.value = getTableRows(filteredBranches.value);
    })
}

function deleteBranchClick() {
  if (currentBranch.value) {
    api.branches
      .deleteBranch(currentBranch.value._id)
      .then(data => {
        changeTargetBranch(data);
        deleteModal.value?.hide();
        setNewDataBranch();
      })
  }
}

function saveEditBranchClick() {
  if (currentBranch.value) {
    api.branches
      .updateBranch(currentBranch.value._id, currentBranch.value)
      .then(data => {
        changeTargetBranch(data);
        editModal.value?.hide();
        setNewDataBranch();
      })
  }
}

function saveAddBranchClick() {
  if (newBranch.value.title && newBranch.value.description) {
    api.branches
      .createBranch(newBranch.value)
      .then(data => {
        branches.value.push(data);
        rows.value = getTableRows(branches.value);
        newBranch.value = { ...initialBranch };

        addModal.value?.hide();
      })
  }
}

function keyDownEscape() {
  deleteModal.value?.hide();
  editModal.value?.hide();
  addModal.value?.hide();
}

function requestSearch() {
  backupBranches.value = [...branches.value];

  api.branches
    .searchBranch({ searchText: searchText.value })
    .then(data => {
      branches.value = [...data];
      filteredBranches.value = [...data];
      rows.value = getTableRows(filteredBranches.value);
    })
}

function clearSearch() {
  branches.value = [...backupBranches.value];
  filteredBranches.value = [...backupBranches.value];
  rows.value = getTableRows(filteredBranches.value);
}

onMounted(() => {
  getBranchesAndRowsTable();
});

onBeforeUnmount(() => {
  removeEventEscape();
});
</script>

<style scoped>
.branches__content {
  background-color: var(--bg-main);
}

.branches__table-wrapper {
  position: relative;
  overflow-x: auto;
  padding-top: 12px;
  min-height: var(--height-table-wrapper);
  max-height: var(--height-table-wrapper);
  max-width: calc(100vw - var(--menu-width));
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  padding-bottom: 16px;
}
</style>
