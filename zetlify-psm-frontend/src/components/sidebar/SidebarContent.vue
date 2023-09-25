<script setup>
import { useRouter } from 'vue-router'
import { OverlayScrollbarsComponent } from 'overlayscrollbars-vue'
import SidebarLink from '@/components/sidebar/SidebarLink.vue'
import SidebarCollapsible from '@/components/sidebar/SidebarCollapsible.vue'
import SidebarCollapsibleItem from '@/components/sidebar/SidebarCollapsibleItem.vue'
import { Icon } from '@iconify/vue'
import { useAbility } from '@casl/vue'
const { can } = useAbility()

// Current Route
const isCurrentRoute = (routeName) => {
  return useRouter().currentRoute.value.name == routeName
}

// Route Path Starts With
const isCurrentPath = (path) => {
  return useRouter().currentRoute.value.path.startsWith(path)
}
</script>

<template>
  <OverlayScrollbarsComponent :options="{ overflow: { x: 'hidden' } }" class="grow" defer>
    <div class="flex flex-col gap-2 px-3">
      <!-- Link Item -->
      <SidebarLink
        title="Dashboard"
        :to="{ name: 'Dashboard' }"
        :active="isCurrentRoute('Dashboard')"
      >
        <template #icon>
          <Icon icon="ri:apps-2-line" class="sidebar-icon" />
        </template>
      </SidebarLink>
      <!-- Link Item -->
      <SidebarLink title="Users" :to="{ name: 'Users' }" :active="isCurrentRoute('Users')">
        <template #icon>
          <Icon icon="heroicons:users" class="sidebar-icon" />
        </template>
      </SidebarLink>
      <!-- Link Item -->
      <SidebarLink
        title="Role Permissions"
        :to="{ name: 'RolePermissions' }"
        :active="isCurrentRoute('RolePermissions')"
      >
        <template #icon>
          <Icon icon="fluent:shield-lock-24-regular" class="sidebar-icon" />
        </template>
      </SidebarLink>

      <!-- Collapsable Item -->
      <SidebarCollapsible title="Print Manager" :active="isCurrentPath('/dashboard/print-manager')">
        <template #icon>
          <Icon icon="ri:printer-line" class="sidebar-icon" />
        </template>
        <SidebarCollapsibleItem
          :to="{ name: 'PrintSetup' }"
          title="Print Setup"
          :active="isCurrentRoute('PrintSetup')"
        />
        <SidebarCollapsibleItem
          :to="{ name: 'BulkPrinting' }"
          title="Bulk Printing"
          :active="isCurrentRoute('BulkPrinting')"
        />
        <SidebarCollapsibleItem
          :to="{ name: 'Barcode' }"
          title="Barcode"
          :active="isCurrentRoute('Barcode')"
        />
      </SidebarCollapsible>
      <!-- Collapsable Item -->
      <SidebarCollapsible title="Products" :active="isCurrentPath('/dashboard/products')">
        <template #icon>
          <Icon icon="ri:box-3-line" class="sidebar-icon" />
        </template>
        <SidebarCollapsibleItem
          :to="{ name: 'CreateProduct' }"
          title="Create Product"
          :active="isCurrentRoute('CreateProduct')"
        />
        <SidebarCollapsibleItem
          :to="{ name: 'ProductList' }"
          title="Product List"
          :active="isCurrentRoute('ProductList')"
        />
      </SidebarCollapsible>
      <!-- Collapsable Item -->
      <SidebarCollapsible title="Settings" :active="isCurrentPath('/dashboard/settings')">
        <template #icon>
          <Icon icon="heroicons:cog-6-tooth" class="sidebar-icon" />
        </template>
        <SidebarCollapsibleItem
          :to="{ name: 'Appearance' }"
          title="Appearance"
          :active="isCurrentRoute('Appearance')"
        />
        <SidebarCollapsibleItem
          :to="{ name: 'Companies' }"
          title="Companies"
          :active="isCurrentRoute('Companies')"
        />
      </SidebarCollapsible>
    </div>
  </OverlayScrollbarsComponent>
</template>
