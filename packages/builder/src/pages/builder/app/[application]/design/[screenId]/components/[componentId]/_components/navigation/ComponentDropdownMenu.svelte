<script>
  import { store } from "builderStore"
  import ConfirmDialog from "components/common/ConfirmDialog.svelte"
  import { ActionMenu, MenuItem, Icon, notifications } from "@budibase/bbui"

  export let component

  let confirmDeleteDialog

  $: definition = store.actions.components.getDefinition(component?._component)
  $: noChildrenAllowed = !component || !definition?.hasChildren
  $: noPaste = !$store.componentToPaste

  // "editable" has been repurposed for inline text editing.
  // It remains here for legacy compatibility.
  // Future components should define "static": true for indicate they should
  // not show a context menu.
  $: showMenu = definition?.editable !== false && definition?.static !== true

  const moveUpComponent = async () => {
    try {
      await store.actions.components.moveUp(component)
    } catch (error) {
      notifications.error("Error moving component up")
    }
  }

  const moveDownComponent = async () => {
    try {
      await store.actions.components.moveDown(component)
    } catch (error) {
      notifications.error("Error moving component down")
    }
  }

  const duplicateComponent = () => {
    storeComponentForCopy(false)
    pasteComponent("below")
  }

  const deleteComponent = async () => {
    try {
      await store.actions.components.delete(component)
    } catch (error) {
      notifications.error("Error deleting component")
    }
  }

  const storeComponentForCopy = (cut = false) => {
    store.actions.components.copy(component, cut)
  }

  const pasteComponent = mode => {
    try {
      store.actions.components.paste(component, mode)
    } catch (error) {
      notifications.error("Error saving component")
    }
  }
</script>

{#if showMenu}
  <ActionMenu>
    <div slot="control" class="icon">
      <Icon size="S" hoverable name="MoreSmallList" />
    </div>
    <MenuItem icon="Delete" on:click={confirmDeleteDialog.show}>
      Delete
    </MenuItem>
    <MenuItem noClose icon="ChevronUp" on:click={moveUpComponent}>
      Move up
    </MenuItem>
    <MenuItem noClose icon="ChevronDown" on:click={moveDownComponent}>
      Move down
    </MenuItem>
    <MenuItem noClose icon="Duplicate" on:click={duplicateComponent}>
      Duplicate
    </MenuItem>
    <MenuItem icon="Cut" on:click={() => storeComponentForCopy(true)}>
      Cut
    </MenuItem>
    <MenuItem icon="Copy" on:click={() => storeComponentForCopy(false)}>
      Copy
    </MenuItem>
    <MenuItem
      icon="LayersBringToFront"
      on:click={() => pasteComponent("above")}
      disabled={noPaste}
    >
      Paste above
    </MenuItem>
    <MenuItem
      icon="LayersSendToBack"
      on:click={() => pasteComponent("below")}
      disabled={noPaste}
    >
      Paste below
    </MenuItem>
    <MenuItem
      icon="ShowOneLayer"
      on:click={() => pasteComponent("inside")}
      disabled={noPaste || noChildrenAllowed}
    >
      Paste inside
    </MenuItem>
  </ActionMenu>
  <ConfirmDialog
    bind:this={confirmDeleteDialog}
    title="Confirm Deletion"
    body={`Are you sure you wish to delete this '${definition?.name}' component?`}
    okText="Delete Component"
    onOk={deleteComponent}
  />
{/if}

<style>
  .icon {
    display: grid;
    place-items: center;
  }
</style>
