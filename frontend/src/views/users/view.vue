<template>
  <div class="users">
    <HeadUsersPage @addUser="handleAdd" />

    <div class="users__content">
      <SearchUser @searchInput="searchUser" />

      <div class="divider"></div>

      <div class="users__table-wrapper">
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
        <template #body>
          Вы точно хотите удалить сотрудника "{{ currentUser?.lastName }} {{ currentUser?.firstName }}"?
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
            Редактирование пользователя "{{ currentUser?.lastName }} {{ currentUser?.firstName }}"
          </h2>
          <!-- @todo: костыль с currentUser, потому что он технически может быть null,
            но физически в этой форме ну реально никак, а TS ругается
          -->
          <form v-if="currentUser">
            <FormEditUser
              :edited-user="currentUser"
              @edit-user="newUser => (currentUser = newUser)"
            />
          </form>
        </template>

        <template #footer>
          <EditModalFooter
            @cancel="editModal?.hide()"
            @save="saveEditUserClick"
          />
        </template>
      </UIModal>

      <UIModal ref="addModal">
        <template #body>
          <h2 class="modal__title">Создание админа</h2>
          <form>
            <FormAddUser
              :added-user="newUser"
              @updateAddedUser="user => (newUser = user)"
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
import { ref, onMounted, onBeforeUnmount } from 'vue';

import type { Ref } from 'vue';
import type { IColumn, TRows } from '@/entities/types/UI/table';
import type { IUser } from '@/entities/types/backend/response/user';
import type { INewUser } from './types';

import UIPagination from '@/components/ui/UIPagination.vue';
import UITable from '@/components/ui/UITable.vue';
import UIModal from '@/components/ui/UIModal.vue';
import HeadUsersPage from '@/views/users/components/HeadUsersPage.vue';
import SearchUser from '@/views/users/components/SearchUser.vue';
import DeleteModalFooter from '@/views/users/components/DeleteModalFooter.vue';
import EditModalFooter from '@/views/users/components/EditModalFooter.vue';
import FormEditUser from '@/views/users/components/FormEditUser.vue';
import FormAddUser from '@/views/users/components/FormAddUser.vue';
import AddModalFooter from '@/views/users/components/AddModalFooter.vue';

import { api } from '@/api';
import { getTableRows } from '@/utils/adapters/usersAdapterFromTable';

import { useEscapeClick } from '@/vue-features/composables/useEscapeClick';
import { useSearch } from '@/vue-features/composables/useSearch';

import { columnsSettings, initialUser } from './settings';

const { searchText, setSearchText: searchUser } = useSearch(requestSearch, clearSearch);
const { addEventEscape, removeEventEscape } = useEscapeClick(keyDownEscape);

const deleteModal: Ref<InstanceType<typeof UIModal> | null> = ref(null);
const editModal: Ref<InstanceType<typeof UIModal> | null> = ref(null);
const addModal: Ref<InstanceType<typeof UIModal> | null> = ref(null);

const currentUser: Ref<IUser | null> = ref(null);
const users: Ref<IUser[]> = ref([]);
const backupUsers: Ref<IUser[]> = ref([]);
const filteredUsers: Ref<IUser[]> = ref([]);
const newUser: Ref<INewUser> = ref({ ...initialUser });
const currentPage: Ref<number> = ref(1);
const visibleTableItems: Ref<number> = ref(10);

const columns: Ref<IColumn[]> = ref(columnsSettings);
const rows: Ref<TRows[]> = ref([]);

function getCurrentUserById(id: string): IUser | null {
  return users.value.find(user => user._id === id) ?? null;
}

function handleModalWrapper(modal: Ref<InstanceType<typeof UIModal> | null>, id: string | null): void {
  if (id) {
    currentUser.value = getCurrentUserById(id);
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

function changeTargetUser(data: IUser) {
  currentUser.value = null;
  users.value = users.value.map(user => {
    if (user._id === data._id) {
      return {
        ...data,
      };
    }

    return user;
  });
}

function setInitialData(data: IUser[]) {
  users.value = [...data];
  filteredUsers.value = [...data];
  rows.value = getTableRows(filteredUsers.value);
}

function getUsersAndRowsTable() {
  api.users
    .fetchUsers()
    .then(setInitialData)
}

function deleteUserClick() {
  if (currentUser.value) {
    api.users.deleteUser(currentUser.value._id)
    .then(blockedUser => {
      changeTargetUser(blockedUser);
      deleteModal.value?.hide();
    });
  }
}

function saveEditUserClick() {
  if (currentUser.value) {
    api.users
      .updateUser(currentUser.value._id, currentUser.value)
      .then(data => {
        changeTargetUser(data);
        rows.value = getTableRows(users.value);

        editModal.value?.hide();
      })
  }
}

function newUserDataIsValid() {
  return newUser.value.firstName && newUser.value.lastName && newUser.value.login && newUser.value.password;
}

function saveAddUserClick() {
  if (newUserDataIsValid()) {
    api.users
      .createUser(newUser.value)
      .then(data => {
        users.value.push(data);
        rows.value = getTableRows(users.value);
        newUser.value = { ...initialUser };

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
  backupUsers.value = [...users.value];

  api.users
    .searchUser({ searchText: searchText.value })
    .then(setInitialData)
}

function clearSearch() {
  setInitialData(backupUsers.value);
}

onMounted(() => {
  getUsersAndRowsTable();
});

onBeforeUnmount(() => {
  removeEventEscape();
});
</script>

<style scoped>
.users__content {
  background-color: var(--bg-main);
}

.users__table-wrapper {
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
