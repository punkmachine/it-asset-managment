import type { TAdminsList } from '@/entities/types/backend/response/admins';
import type { IPagination } from '@/entities/types/backend/response/pagination';
import { AdminRoles, AdminState } from '@/entities/types/backend/response/admins';

// eslint-disable-next-line max-lines-per-function
export const fetchAdmins = (): IPagination<TAdminsList> => {
  return {
    "data": [
      {
        "_id": "661164546d661c805904e33c",
        "createdDate": "2024-04-06T15:03:48.691Z",
        "updatedDate": "2024-04-06T15:03:48.691Z",
        "firstName": "SUPERRRRRRRRRRR",
        "lastName": "ADMIN",
        "login": "login",
        "avatar": '',
        "password": "$2b$07$vgO1ycGdvq5TiOYghS5vOeNJdJl0TMX2pqaaFh0w43UJ/I/40.DvG",
        "state": AdminState.active,
        "role": AdminRoles.superAdmin,
      },
      {
        "_id": "661164646d661c805904e349",
        "createdDate": "2024-04-06T15:04:04.832Z",
        "updatedDate": "2024-04-06T15:04:04.832Z",
        "firstName": "user1",
        "lastName": "family1",
        "login": "user1",
        "avatar": '',
        "password": "$2b$07$It3IpskB0nyHBzcskgH0Xu04JHLAQcIKm9SzBGWIfcr8heIe07c7K",
        "state": AdminState.active,
        "role": AdminRoles.admin,
      },
      {
        "_id": "661164716d661c805904e34c",
        "createdDate": "2024-04-06T15:04:17.657Z",
        "updatedDate": "2024-04-06T15:04:17.657Z",
        "firstName": "user2",
        "lastName": "family2",
        "login": "user2",
        "avatar": '',
        "password": "$2b$07$f5PzD7MEDVCGcHXfLly4I.xrTrW09gBhg3aauE2A18NP/hX007USe",
        "state": AdminState.active,
        "role": AdminRoles.admin,
      }
    ],
    "totalCount": 3,
    "currentPage": 1,
    "totalPages": 1
  }
}
