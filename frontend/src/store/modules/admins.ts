import { ref } from 'vue';

import type { Ref } from 'vue';
import type { IAdmin } from '@/entities/types/backend/response/admins';

import { defineStore } from 'pinia';

import { api } from '@/api';

export const useAdminsStore = defineStore('admins', () => {
  const currentAdmin: Ref<IAdmin | null> = ref(null);
  const currentAdminId: Ref<string> = ref(localStorage.getItem('adminId') || '');

  function fetchCurrentAdmin() {
    if (currentAdminId.value) {
      api.admins
        .getAdminById(currentAdminId.value)
        .then(data => {
          currentAdmin.value = data;
        })
    }
  }

  function setCurrentAdminId(id: string) {
    currentAdminId.value = id;
    localStorage.setItem('adminId', currentAdminId.value);
  }

  return {
    currentAdmin,
    currentAdminId,
    fetchCurrentAdmin,
    setCurrentAdminId,
  };
});
