export const adminMenu = [
    {   //quản lý người dùng
        name: "admin.menu.admin.doctor",
        menus: [
            {
                name: "admin.menu.admin.doctor-management", link: "/system/doctor-management",
            },
            {
                name: "admin.menu.admin.crud-redux", link: "/system/user-redux",
            },
            {
                name: "admin.menu.admin.doctor-introduction", link: "/system/doctor-introduction",
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
            {   //quản lý kế hoạch khám bệnh của bác sĩ
                name: "admin.menu.doctor.schedule-management", link: "/doctor/schedule-management",
            },
            {   //quản lý bệnh nhân của bác sĩ
                name: "admin.menu.doctor.patient-management", link: "/doctor/patient-management",
            },
        ],
    },
    {   //quản lý phòng khám
        name: "admin.menu.admin.clinic",
        menus: [
            {
                name: "admin.menu.admin.clinic-management", link: "/system/clinic-management",
            },

        ],
    },
    {   //quản lý chuyên khoa
        name: "admin.menu.admin.specialty",
        menus: [
            {
                name: "admin.menu.admin.specialty-management", link: "/system/specialty-management",
            },

        ],
    },
    {   //quản lý cẩm nang
        name: "admin.menu.admin.handbook",
        menus: [
            {
                name: "admin.menu.admin.handbook-management", link: "/system/manage-handbook",
            },

        ],
    },
];
export const doctorMenu = [
    {
        name: "admin.menu.admin.manage-user",
        menus: [
            { name: "admin.menu.doctor.schedule-management", link: "/doctor/schedule-management", },
            { name: "admin.menu.doctor.patient-management", link: "/doctor/patient-management", },

        ],
    }
];