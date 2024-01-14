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

        <div class="flex justify-end mt-5 mr-5">
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
              @edit-user="(newUser) => currentUser = newUser"
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
          <h2 class="modal__title">
            Создание админа
          </h2>
          <form>
            <FormAddUser
              :added-user="newUser"
              @updateAddedUser="(user) => newUser = user"
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
import { ref, watch, onMounted, onBeforeUnmount } from 'vue';
import { debounce } from "debounce";

import type { Ref } from 'vue'
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

import { fetchUsers, deleteUser, editUser, postUser } from '@/api/users';
import { getTableRows } from '@/utils/adapters/usersAdapterFromTable';

import { useEscapeClick } from '@/vue-features/composables/useEscapeClick';

import { columnsSettings, initialUser } from './settings';

const deleteModal: Ref<InstanceType<typeof UIModal> | null> = ref(null);
const editModal: Ref<InstanceType<typeof UIModal> | null> = ref(null);
const addModal: Ref<InstanceType<typeof UIModal> | null> = ref(null);

const currentUser: Ref<IUser | null> = ref(null);
const users: Ref<IUser[]> = ref([]);
const filteredUsers: Ref<IUser[]> = ref([]);
const newUser: Ref<INewUser> = ref({...initialUser});
const searchText: Ref<string> = ref('');
const currentPage: Ref<number> = ref(1);
const visibleTableItems: Ref<number> = ref(10);

const columns: Ref<IColumn[]> = ref(columnsSettings);
const rows: Ref<TRows[]> = ref([]);

function getCurrentUserById(id: string): IUser | null {
  return users.value.find(user => user.id.toString() === id) ?? null;
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

function getUsersAndRowsTable() {
  fetchUsers()
    .then(data => {
      users.value = [...data];
      filteredUsers.value = [...data]
      rows.value = getTableRows(filteredUsers.value);
    });
}

function deleteUserClick() {
  deleteUser()
    .then(() => {
      getUsersAndRowsTable();
      currentUser.value = null;

      deleteModal.value?.hide();
    });
}

function saveEditUserClick() {
  if (currentUser.value) {
    editUser(currentUser.value)
      .then(data => {
        users.value = users.value.map(user => {
          if (user.id === data.id) {
            return {
              ...data,
            };
          }

          return user;
        });

        editModal.value?.hide();
      });
  }
}

function saveAddUserClick() {
  if (newUser.value.firstName && newUser.value.lastName) {
    postUser(newUser.value)
      .then(data => {
        users.value = [
          ...users.value,
          data
        ];

        rows.value = getTableRows(users.value);

        newUser.value = {...initialUser};

        addModal.value?.hide();
      });
  }
}

function keyDownEscape() {
  deleteModal.value?.hide();
  editModal.value?.hide();
  addModal.value?.hide();
}

function searchUser(text: string) {
  searchText.value = text;
}

const searchTextWatcher = debounce(() => {
  // @todo: запрос на бэкенд для поиска
}, 300);

const { addEventEscape, removeEventEscape } = useEscapeClick(keyDownEscape);

watch(searchText, searchTextWatcher);

onMounted(() => {
  getUsersAndRowsTable();
});

onBeforeUnmount(() => {
  removeEventEscape();
});
</script>

<style scoped>
.users {
  /* 100vh - header height - search section - .users__head */
  --height-table-wrapper: calc(100vh - var(--header-height) - 74px - 72px);
}

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
}
</style>
@/entities/types/backend/response/user
