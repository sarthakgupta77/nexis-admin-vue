<template>
    <q-page class="q-pa-md">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="head-btn-box shadowBoder">
                        <div class="row">
                            <q-btn flat round color="white" text-color="positive" class="q-mr-sm" icon="arrow_back"
                                id="back-btn" to="/manage-permisions">
                                <q-tooltip anchor="top start" self="center left" :offset="[10, 15]" transition-show="scale"
                                    transition-hide="scale">
                                    Back to Permissions
                                </q-tooltip>
                            </q-btn>
                            <h5 id="head-1">Manage Direct Permission - (Name of User) </h5>
                        </div>
                    </div>
                    <div>
                        <q-splitter v-model="splitterModel" style="height: 100%;">
                            <template v-slot:before>
                                <q-tabs v-for="role in data.roles" class="shadowBoder" v-model="tab" dense align="left"
                                    active-color="primary" vertical>
                                    <q-tab :name="role" :label="role" @click="showPermissions(group = role)" />
                                </q-tabs>
                            </template>
                            <template v-slot:after>
                                <h4 v-if="tab == ''" class="text-center text-primary w600"> Select A Permission To Manage</h4>
                                <div v-else class="row d-flex" style="padding: 4px 40px;">
                                    <div class="col-4 w600">Name</div>
                                    <div class="col-4 w600">About</div>
                                    <div class="col-4 w600">Action</div>
                                </div>
                                <q-tab-panels v-for="perm in data.permissions" v-model="tab" animated swipeable vertical
                                    transition-prev="jump-up" transition-next="jump-up">
                                    <q-tab-panel :name="perm.name.split('.')[0]">
                                        <div class="table-container shadowBoder">

                                            <div class="row d-flex" style="align-items: center;">
                                                <div class="col-4">{{ perm.name }}</div>
                                                <div class="col-4">{{ perm.about }}</div>
                                                <div class="col-4">
                                                    <q-toggle :false-value="null" :true-value="1" v-model="perm.active"
                                                        @click="assignPermission(id = perm.id, action = perm.active)" />
                                                </div>
                                            </div>
                                        </div>
                                    </q-tab-panel>
                                </q-tab-panels>
                            </template>
                        </q-splitter>
                    </div>
                </div>
            </div>
        </div>
    </q-page>
</template>
<script setup>
import { ref, onBeforeMount, reactive } from 'vue';
import { useRoute, useRouter } from "vue-router";
import { LocalStorage, Notify } from "quasar";
import { Loading, QSpinnerPie } from 'quasar'
import { api } from "../../../boot/axios";

const route = useRoute();
const router = useRouter();
const assignUser = ref(false)
const permissionName = ref('')
const permissionType = ref('')
const about = ref('')
const searchName = ref('')
const searchEmail = ref('')
const val = ref([])

const access = LocalStorage.getItem('access_key')
const state = reactive({
    create: ref(false),
    edit: ref(false),
    delete: ref(false),
    status: ref(false),
    update: ref(false),
})
const tab = ref('');
const splitterModel = ref(30);

const data = reactive({
    permissions: [],
    roles: [],
    users: [],
    activeUsers: [],
    usersId: [],
    filteredData: []
});

// const roleId = window.location.href.slice(-1)

const showPermissions = (group) => {
    api.get("permission-groups", { params: { action: 1, role_id: route.params.id, group: group } }).then(response => {
        data.permissions = response.data.permissions;
    });
}

const assignPermission = (id, action) => {
    if (action == null) {
        action = 0
    }

    api.post('assign-permission', {
        permission_id: id,
        action: action,
        role_id: route.params.id
    }).then((response) => {
        Notify.create({
            timeout: 2000,
            position: 'top-right',
            color: 'amber-7',
            message: response.data.msg
        })
        fullHeight.value = false
    }).catch((error) => {
        console.log('Error', error)
    })
}

const onReset = () => {
    permissionName.value = ''
    permissionType.value = ''
    about.value = ''
    fullHeight.value = false
}
const createPermission = () => {
    const name = permissionType.value + '.' + permissionName.value.toLocaleLowerCase()
    if (permissionName.value == '' || permissionType.value == '') {
        Notify.create({
            timeout: 2000,
            position: 'top-right',
            color: 'red',
            message: 'Please fill the required fields'
        })
    }
    else {
        api.post('create-permission', {
            name: name,
            about: about.value
        }).then((response) => {
            Notify.create({
                timeout: 2000,
                position: 'top-right',
                color: 'amber-7',
                message: response.data.msg
            })
        }).finally(() => {
            onReset()
        }).catch((error) => {
            console.log(error)
        })
    }
}

const assignModal = () => {
    api.get("users").then(response => {
        data.activeUsers = response.data.users.filter(user => user.status == 1);
    }).finally(() => {
        assignUser.value = true
    });
}

const addRoleUsers = () => {
    val.value.forEach((ele) => {
        data.usersId.push(ele)
    })
    api.post('assign-users-role', {
        users: data.usersId,
        role_id: route.params.id
    }).then((response) => {
        Notify.create({
            timeout: 2000,
            position: 'top-right',
            color: 'green',
            message: response.data.msg
        })
    }).catch((error) => {
        console.log(error)
    })
}

const removeUserRole = (id) => {
    api.post('remove-users-role', {
        user_id: id,
        role_id: route.params.id
    }).then((response) => {
        Notify.create({
            timeout: 2000,
            position: 'top-right',
            color: 'red',
            message: response.data.msg
        })
    }).catch((error) => {
        console.log(error)
    })
}

function checkName(user) {
    let name = user.name.toLocaleLowerCase()
    return name.includes(searchName.value.toLocaleLowerCase())
}

const filterByName = () => {
    if (searchName.value.length > 2) {
        data.filteredData = data.activeUsers.filter(checkName)
    }
    else {
        api.get("users").then(response => {
            data.filteredData = response.data.users.filter(user => user.status == 1);
        })
    }
}

function checkEmail(user) {
    let email = user.email.toLocaleLowerCase()
    return email.includes(searchEmail.value.toLocaleLowerCase())
}

const filterByEmail = () => {
    if (searchEmail.value.length > 2) {
        data.filteredData = data.activeUsers.filter(checkEmail)
    }
    else {
        api.get("users").then(response => {
            data.filteredData = response.data.users.filter(user => user.status == 1);
        })
    }
}

onBeforeMount(() => {
    Loading.show({
        spinner: QSpinnerPie,
        spinnerColor: 'primary',
        messageColor: 'black',
        backgroundColor: 'white',
        message: 'Loading Page Data. Please Wait!'
    })

    api.get("permission-groups", { params: { action: 0 } }).then(response => {
        data.roles = response.data.groups;
        Loading.hide()
    });

    api.get('users-in-role', { params: { role_id: route.params.id } }).then((response) => {
        data.users = response.data.users
        Loading.hide()
    })
});
const rights = access.filter(checkEvent);
rights.forEach(function (el) {
    let key = el.split('.')[1]
    if (el.includes('roles')) {
        state[key] = true
    }
});

function checkEvent(keys) {
    return keys.includes('roles');
}
</script>
<style lang="scss" scoped>
.head-btn-box {
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;

    #back-btn:hover {
        color: #7b94e6 !important;
    }

    h5 {
        margin: 0;
        font-weight: 500;
    }

    #head-1 {
        padding-top: 4px;
    }
}

.container {
    width: auto;
    height: 100%;
}

.create-header {
    width: 100%;
    align-items: center;
    justify-content: space-between;
}

.select-type {
    height: 40px;
    margin-bottom: 20px;

    :active {
        color: $primary !important;
        border-color: $primary !important;
    }
}

.table-container {
    background-color: #fff;
    padding: 15px;
    width: auto;

    td,
    th {
        padding: 10px;
    }
}

.modal-table {
    max-height: calc(100vh - 280px);
    overflow-y: auto;
}

.table-head {
    justify-content: space-between;
}
</style>
