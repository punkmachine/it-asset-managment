<template>
  <div class="admins">
    <HeadAdminsPage @addAdmin="handleAdd" />

    <div class="admins__content">
      <SearchAdmin @searchInput="searchAdmin" />

      <div class="divider"></div>

      <div class="admins__table-wrapper">
        <UITable
          :columns="columns"
          :rows="rows"
          :loading="loading"
          delete-button-visible
          edit-button-visible
          @edit="handleEdit"
          @delete="handleDelete"
        />

        <div class="mr-5 mt-5 flex justify-end ">
          <UIPagination
            v-model:current-page="currentPage"
            v-model:visible-items="visibleTableItems"
            :total-pages="totalPages"
            :count="totalCount"
          />
        </div>
      </div>

      <UIModal ref="deleteModal">
        <template #body>
          Вы точно хотите удалить сотрудника "{{ currentAdmin?.lastName }} {{ currentAdmin?.firstName }}"?
        </template>

        <template #footer>
          <DeleteModalFooter
            @cancel="deleteModal?.hide()"
            @delete="deleteUserClick"
          />
        </template>
      </UIModal>

      <UIModal ref="editModal">
        <template #body>
          <h2 class="modal__title">
            Редактирование пользователя "{{ currentAdmin?.lastName }} {{ currentAdmin?.firstName }}"
          </h2>
          <!-- @todo: костыль с currentAdmin, потому что он технически может быть null,
            но физически в этой форме ну реально никак, а TS ругается
          -->
          <form v-if="currentAdmin">
            <FormEditAdmin
              :edited-admin="currentAdmin"
              @edit-admin="newAdmin => (currentAdmin = newAdmin)"
            />
          </form>
        </template>

        <template #footer>
          <EditModalFooter
            @cancel="editModal?.hide()"
            @save="saveEditAdminClick"
          />
        </template>
      </UIModal>

      <UIModal ref="addModal">
        <template #body>
          <h2 class="modal__title">Создание админа</h2>
          <form>
            <FormAddAdmin
              :added-admin="newAdmin"
              @updateAddedAdmin="admin => (newAdmin = admin)"
            />
          </form>
        </template>

        <template #footer>
          <AddModalFooter
            @cancel="addModal?.hide()"
            @add="saveAddUserClick"
          />
        </template>
      </UIModal>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';

import type { Ref } from 'vue';
import type { IColumn, TRows } from '@/entities/types/UI/table';
import type { IAdmin } from '@/entities/types/backend/response/admins';
import type { INewAdmin } from './types';

import UIPagination from '@/components/ui/UIPagination.vue';
import UITable from '@/components/ui/UITable.vue';
import UIModal from '@/components/ui/UIModal.vue';
import HeadAdminsPage from '@/views/admins/components/HeadAdminsPage.vue';
import SearchAdmin from '@/views/admins/components/SearchAdmin.vue';
import DeleteModalFooter from '@/views/admins/components/DeleteModalFooter.vue';
import EditModalFooter from '@/views/admins/components/EditModalFooter.vue';
import FormEditAdmin from '@/views/admins/components/FormEditAdmin.vue';
import FormAddAdmin from '@/views/admins/components/FormAddAdmin.vue';
import AddModalFooter from '@/views/admins/components/AddModalFooter.vue';

import { api } from '@/api';
import { getTableRows } from '@/utils/adapters/adminsAdapterFromTable';

import { useEscapeClick } from '@/vue-features/composables/useEscapeClick';
import { useSearch } from '@/vue-features/composables/useSearch';

import { columnsSettings, initialAdmin } from './settings';

const { searchText, setSearchText: searchAdmin } = useSearch(requestSearch, clearSearch);
const { addEventEscape, removeEventEscape } = useEscapeClick(keyDownEscape);

// @todo: эту штуку надо убрать на useCRUDModals
const deleteModal = ref<InstanceType<typeof UIModal> | null>(null);
const editModal = ref<InstanceType<typeof UIModal> | null>(null);
const addModal = ref<InstanceType<typeof UIModal> | null>(null);

const currentAdmin = ref<IAdmin | null>(null);
const admins = ref<IAdmin[]>([]);
const filteredAdmins = ref<IAdmin[]>([]);
const newAdmin = ref<INewAdmin>({ ...initialAdmin });
const loading = ref<boolean>(false);

const currentPage = ref<number>(1);
const visibleTableItems = ref<number>(10);
const totalPages = ref<number>(1);
const totalCount = ref<number>(0);

const columns = ref<IColumn[]>(columnsSettings);
const rows = ref<TRows[]>([]);

watch(() => visibleTableItems.value, () => {
  getAdminsAndRowsTable();
});

watch(() => currentPage.value, () => {
  getAdminsAndRowsTable();
});

function getCurrentUserById(id: string): IAdmin | null {
  return admins.value.find(admin => admin._id === id) ?? null;
}

function handleModalWrapper(modal: Ref<InstanceType<typeof UIModal> | null>, id: string | null): void {
  if (id) {
    currentAdmin.value = getCurrentUserById(id);
  }

  if (modal.value) {
    addEventEscape();
    modal.value.show();
  }
}

function handleEdit(id: string) {
  handleModalWrapper(editModal, id);
}

function handleDelete(id: string) {
  handleModalWrapper(deleteModal, id);
}

function handleAdd() {
  handleModalWrapper(addModal, null);
}

function changeTargetUser(data: IAdmin) {
  currentAdmin.value = null;
  admins.value = admins.value.map(admin => {
    if (admin._id === data._id) {
      return {
        ...data,
      };
    }

    return admin;
  });
}

function setInitialData(data: IAdmin[]) {
  admins.value = [...data];
  filteredAdmins.value = [...data];
  rows.value = getTableRows(filteredAdmins.value);
}

function getAdminsAndRowsTable() {
  const query = {
    page: currentPage.value,
    limit: visibleTableItems.value,
  };

  loading.value = true;
  api.admins
    .fetchAdmins(query)
    .then(data => {
      setInitialData(data.data);
      totalPages.value = data.totalPages;
      totalCount.value = data.totalCount;
    })
    .finally(() => {
      loading.value = false;
    });
}

function deleteUserClick() {
  if (currentAdmin.value) {
    api.admins.deleteAdmin(currentAdmin.value._id)
    .then(blockedUser => {
      changeTargetUser(blockedUser);
      deleteModal.value?.hide();
    });
  }
}

function saveEditAdminClick() {
  if (currentAdmin.value) {
    api.admins
      .updateAdmin(currentAdmin.value._id, currentAdmin.value)
      .then(data => {
        changeTargetUser(data);
        rows.value = getTableRows(admins.value);

        editModal.value?.hide();
      })
  }
}

function newAdminDataIsValid() {
  return newAdmin.value.firstName && newAdmin.value.lastName && newAdmin.value.login && newAdmin.value.password;
}

function saveAddUserClick() {
  if (newAdminDataIsValid()) {
    api.admins
      .createAdmin(newAdmin.value)
      .then(data => {
        admins.value.push(data);
        rows.value = getTableRows(admins.value);
        newAdmin.value = { ...initialAdmin };

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
  const query = {
    searchText: searchText.value,
    page: currentPage.value,
    limit: visibleTableItems.value,
  };

  loading.value = true;
  api.admins
    .searchAdmin(query)
    .then(data => {
      setInitialData(data.data);
      totalPages.value = data.totalPages;
      totalCount.value = data.totalCount;
    })
    .finally(() => {
      loading.value = false;
    });
}

function clearSearch() {
  getAdminsAndRowsTable();
}

onMounted(() => {
  getAdminsAndRowsTable();
});

onBeforeUnmount(() => {
  removeEventEscape();
});
</script>

<style scoped>
.admins__content {
  background-color: var(--bg-main);
}

.admins__table-wrapper {
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
