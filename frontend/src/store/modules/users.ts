import { ref, watch, computed } from 'vue';

import type { Ref } from 'vue';
import type { IUser } from '@/entities/types/backend/response/user';

import { defineStore } from 'pinia';

import { api } from '@/api';

export const useUsersStore = defineStore('users', () => {
  const currentUser: Ref<IUser | null> = ref(null);
  const currentUserId: Ref<string> = ref(localStorage.getItem('userId') || '');

  function fetchCurrentUser() {
    if (currentUserId.value) {
      api.users
        .getUserById(currentUserId.value)
        .then(data => {
          currentUser.value = data;
        })
        .catch(error => {
          console.log('error >>>', error);
        });
    }
  }

  function setCurrentUserId(id: string) {
    currentUserId.value = id;
    localStorage.setItem('userId', currentUserId.value);
  }

  return {
    currentUser,
    currentUserId,
    fetchCurrentUser,
    setCurrentUserId,
  };
});
