<script>
  import Field from "./Field.svelte"
  import { CoreDropzone } from "@budibase/bbui"
  import { getContext } from "svelte"

  export let field
  export let label
  export let disabled = false
  export let validation
  export let extensions
  export let onChange
  export let maximum = undefined

  let fieldState
  let fieldApi

  const { API, notificationStore } = getContext("sdk")
  const formContext = getContext("form")
  const BYTES_IN_MB = 1000000

  const handleFileTooLarge = fileSizeLimit => {
    notificationStore.actions.warning(
      `Files cannot exceed ${
        fileSizeLimit / BYTES_IN_MB
      } MB. Please try again with smaller files.`
    )
  }

  const handleTooManyFiles = fileLimit => {
    notificationStore.actions.warning(
      `Please select a maximum of ${fileLimit} files.`
    )
  }

  const processFiles = async fileList => {
    let data = new FormData()
    for (let i = 0; i < fileList.length; i++) {
      data.append("file", fileList[i])
    }
    try {
      return await API.uploadAttachment({
        data,
        tableId: formContext?.dataSource?.tableId,
      })
    } catch (error) {
      return []
    }
  }

  const handleChange = e => {
    fieldApi.setValue(e.detail)
    if (onChange) {
      onChange({ value: e.detail })
    }
  }
</script>

<Field
  {label}
  {field}
  {disabled}
  {validation}
  type="attachment"
  bind:fieldState
  bind:fieldApi
  defaultValue={[]}
>
  {#if fieldState}
    <CoreDropzone
      value={fieldState.value}
      disabled={fieldState.disabled}
      error={fieldState.error}
      on:change={handleChange}
      {processFiles}
      {handleFileTooLarge}
      {handleTooManyFiles}
      {maximum}
      {extensions}
    />
  {/if}
</Field>
