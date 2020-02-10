
export default [
    {
        url: "/dashboard",
        name: "Home",
        slug: "home",
        icon: "HomeIcon",
    },
    {
        url: "/dashboard/user",
        name: "User",
        slug: "user",
        icon: "UserIcon",
        i18n: "User",
        permission: 'browse-user'
    },
    {
        url: "/dashboard/project",
        name: "Project",
        slug: "Project",
        icon: "InboxIcon",
        i18n: "Project",
        permission: 'browse-project'
    },
    {
        url: "/dashboard/apartment",
        name: "Apartment",
        slug: "Apartment",
        icon: "ServerIcon",
        i18n: "Apartment",
        permission: 'browse-apartment'
    },
    {
        url: "/dashboard/customer",
        name: "Customer",
        slug: "Customer",
        icon: "UserIcon",
        i18n: "Customer",
        permission: 'browse-customer'
    },
    {
        url: "/dashboard/lead",
        name: "Lead",
        slug: "Lead",
        icon: "CheckIcon",
        i18n: "Lead",
        permission: 'browse-follow-up'
    },
    {
        url: "/dashboard/purchase",
        name: "Purchase",
        slug: "Purchase",
        icon: "TrendingUpIcon",
        i18n: "Purchase",
        permission: 'browse-purchase'
    },
    {
        name: "Settings",
        icon: "SettingsIcon",
        i18n: "Settings",
        submenu: [
            {
                url: '/dashboard/settings/role',
                name: "Roles & Permissions",
                slug: "role",
                i18n: "Roles",
                permission: "browse-role"
            }
        ]
    },
]
