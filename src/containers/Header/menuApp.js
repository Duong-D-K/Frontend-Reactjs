export const adminMenu = [
    {   //quản lý người dùng
        name: "admin.menu.admin.manage-user",
        menus: [
            {
                name: "admin.menu.admin.crud", link: "/system/user-manage",
            },
            {
                name: "admin.menu.admin.crud-redux", link: "/system/user-redux",
            },
            {
                name: "admin.menu.admin.manage-doctor", link: "/system/manage-doctor",
                // subMenus: [
                //     {
                //         name: "menu.system.system-administrator.user-manage",
                //         link: "/system/user-manage",
                //     },
                //     {
                //         name: "menu.system.system-administrator.user-redux",
                //         link: "/system/user-redux",
                //     },

                // ],
            },
            // {
            //     name: "admin.menu.admin.manage-admin", link: "/system/user-admin",
            // },
            {   //quản lý kế hoạch khám bệnh của bác sĩ
                name: "admin.menu.doctor.manage-schedule", link: "/doctor/schedule-management",
            },
        ],
    },
    {   //quản lý phòng khám
        name: "admin.menu.admin.clinic",
        menus: [
            {
                name: "admin.menu.admin.manage-clinic", link: "/system/clinic-management",
            },

        ],
    },
    {   //quản lý chuyên khoa
        name: "admin.menu.admin.specialty",
        menus: [
            {
                name: "admin.menu.admin.manage-specialty", link: "/system/specialty-management",
            },

        ],
    },
    {   //quản lý cẩm nang
        name: "admin.menu.admin.handbook",
        menus: [
            {
                name: "admin.menu.admin.manage-handbook", link: "/system/manage-handbook",
            },

        ],
    },
];
export const doctorMenu = [
    {
        name: "admin.menu.admin.manage-user",
        menus: [
            {   //quản lý kế hoạch khám bệnh của bác sĩ
                name: "admin.menu.doctor.manage-schedule", link: "/doctor/schedule-management",
            },
        ],
    }
];