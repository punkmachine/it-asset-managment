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
          actions-col-visible
          @edit="handleEdit"
          @delete="handleDelete"
        />

        <div class="flex justify-end mt-5 mr-5">
          <UIPagination :count="rows.length" />
        </div>
      </div>

      <UIModal ref="deleteModal">
        <template #body>
          Вы точно хотите удалить сотрудника "{{ currentBranch?.title }}"?
        </template>

        <template #footer>
          <DeleteModalFooter
            @cancel="deleteModal?.hide()"
            @delete="deleteBranchClick"
          />
        </template>
      </UIModal>

      <UIModal ref="editModal">
        <template #body>
          <h2 class="users__modal-title">
            Редактирование филиала "{{ currentBranch?.title }}"
          </h2>
          <!--
            @todo: костыль с currentBranch, потому что он технически может быть null,
            но физически в этой форме ну реально никак, а TS ругается
          -->
          <form v-if="currentBranch">
            <FormEditBranch
              :edited-branch="currentBranch"
              @edit-branch="(newBranch) => currentBranch = newBranch"
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
          <h2 class="users__modal-title">
            Создание филиала
          </h2>
          <form>
            <FormAddBranch
              :added-branch="newBranch"
              @updateAddedBranch="(branch) => newBranch = branch"
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
import { ref, watch, onMounted, onBeforeUnmount } from 'vue';
import { debounce } from "debounce";

import type { Ref } from 'vue'
import type { IBranch } from '@/entities/types/backend/branches';
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

import {
  fetchBranches,
  deleteBranch,
  editBranch,
  postBranch,
} from '@/api/branches';
import { getTableRows } from '@/utils/adapters/branchesAdapterFromTable';

import { useEscapeClick } from '@/vue-features/composables/useEscapeClick';

import { columnsSettings, initialBranch } from '@/views/branches/settings';

const deleteModal: Ref<InstanceType<typeof UIModal> | null> = ref(null);
const editModal: Ref<InstanceType<typeof UIModal> | null> = ref(null);
const addModal: Ref<InstanceType<typeof UIModal> | null> = ref(null);

const currentBranch: Ref<IBranch | null> = ref(null);
const branches: Ref<IBranch[]> = ref([]);
const filteredBranches: Ref<IBranch[]> = ref([]);
const newBranch: Ref<INewBranch> = ref({ ...initialBranch });
const searchText: Ref<string> = ref('');

const rows: Ref<TRows[]> = ref([]);
const columns: Ref<IColumn[]> = ref(columnsSettings);

function getCurrentBranchById(id: string): IBranch | null {
  return branches.value.find(branch => branch.id.toString() === id) ?? null;
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
  fetchBranches()
    .then(data => {
      branches.value = [...data];
      filteredBranches.value = [...data];
      rows.value = getTableRows(filteredBranches.value);
    });
}

function deleteBranchClick() {
  deleteBranch()
    .then(() => {
      getBranchesAndRowsTable();
      currentBranch.value = null;

      deleteModal.value?.hide();
    });
}

function saveEditBranchClick() {
  if (currentBranch.value) {
    editBranch(currentBranch.value)
      .then(data => {
        branches.value = branches.value.map(branch => {
          if (branch.id === data.id) {
            return {
              ...data,
            };
          }

          return branch;
        });

        editModal.value?.hide();
      });
  }
}

function saveAddBranchClick() {
  if (newBranch.value.title && newBranch.value.description) {
    postBranch(newBranch.value)
      .then(data => {
        branches.value = [
          ...branches.value,
          data
        ];

        rows.value = getTableRows(branches.value);
        newBranch.value = { ...initialBranch };

        addModal.value?.hide();
      });
  }
}

function keyDownEscape() {
  deleteModal.value?.hide();
  editModal.value?.hide();
  addModal.value?.hide();
}

function searchBranch(text: string) {
  searchText.value = text;
}

const { addEventEscape, removeEventEscape } = useEscapeClick(keyDownEscape);

const searchTextWatcher = debounce(() => {
  if (searchText.value) {
    const text = searchText.value;

    filteredBranches.value = branches.value
      .filter(branch => branch.title.includes(text) || branch.description.includes(text));

    rows.value = getTableRows(filteredBranches.value);
  } else {
    filteredBranches.value = [...branches.value];
    rows.value = getTableRows(filteredBranches.value);
  }
}, 300);

watch(searchText, searchTextWatcher);

onMounted(() => {
  getBranchesAndRowsTable();
});

onBeforeUnmount(() => {
  removeEventEscape();
});
</script>

<style scoped>
.branches {
  /* 100vh - header height - search section - .users__head */
  --height-table-wrapper: calc(100vh - var(--header-height) - 74px - 72px);
}

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
}
</style>
