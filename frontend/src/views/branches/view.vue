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

      <BranchesModal
        :current-branch="currentBranch"
        :add-modal="addModal"
        :delete-modal="deleteModal"
        :edit-modal="editModal"
        :new-branch="newBranch"
        :save-add-branch-click="saveAddBranchClick"
        :save-edit-branch-click="saveEditBranchClick"
        :update-added-branch="branch => (newBranch = branch)"
        :edit-branch="newBranch => (currentBranch = newBranch)"
        :delete-branch-click="deleteBranchClick"
      />
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
import BranchesModal from './components/BranchesModal.vue';

import { api } from '@/api';
import { getTableRows } from '@/utils/adapters/branchesAdapterFromTable';

import { useEscapeClick } from '@/vue-features/composables/useEscapeClick';
import { useSearch } from '@/vue-features/composables/useSearch';

import { columnsSettings, initialBranch } from '@/views/branches/settings';

const { searchText, setSearchText: searchBranch } = useSearch(requestSearch, clearSearch);
const { addEventEscape, removeEventEscape } = useEscapeClick(keyDownEscape);

const deleteModal: Ref<InstanceType<typeof UIModal> | null> = ref(null);
const editModal: Ref<InstanceType<typeof UIModal> | null> = ref(null);
const addModal: Ref<InstanceType<typeof UIModal> | null> = ref(null);

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

function handleModalWrapper(modal: Ref<InstanceType<typeof UIModal> | null>, id: string | null): void {
  if (id) {
    currentBranch.value = getCurrentBranchById(id);
  }

  if (modal.value) {
    addEventEscape();
    modal.value.show();
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

function getBranchesAndRowsTable() {
  api.branches
    .fetchBranches()
    .then(data => {
      branches.value = [...data];
      filteredBranches.value = [...data];
      rows.value = getTableRows(filteredBranches.value);
    })
    .catch(error => {
      console.log('error >>>', error);
    });
}

function deleteBranchClick() {
  if (currentBranch.value) {
    api.branches
      .deleteBranch(currentBranch.value._id)
      .then(data => {
        branches.value = branches.value.map(branch => {
          if (branch._id === data._id) {
            return {
              ...data,
            };
          }

          return branch;
        });
        filteredBranches.value = [...branches.value];
        rows.value = getTableRows(filteredBranches.value);

        deleteModal.value?.hide();
        currentBranch.value = null;
      })
      .catch(error => {
        console.log('error >>>', error);
      });
  }
}

function saveEditBranchClick() {
  if (currentBranch.value) {
    api.branches
      .updateBranch(currentBranch.value._id, currentBranch.value)
      .then(data => {
        branches.value = branches.value.map(branch => {
          if (branch._id === data._id) {
            return {
              ...data,
            };
          }

          return branch;
        });

        filteredBranches.value = [...branches.value];
        rows.value = getTableRows(filteredBranches.value);

        editModal.value?.hide();
        currentBranch.value = null;
      })
      .catch(error => {
        console.log('error >>>', error);
      });
  }
}

function saveAddBranchClick() {
  if (newBranch.value.title && newBranch.value.description) {
    api.branches
      .createBranch(newBranch.value)
      .then(data => {
        branches.value = [...branches.value, data];
        rows.value = getTableRows(branches.value);
        newBranch.value = { ...initialBranch };

        addModal.value?.hide();
      })
      .catch(error => {
        console.log('error >>>', error);
      });
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
    .catch(error => {
      console.log('error >>>', error);
    });
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
