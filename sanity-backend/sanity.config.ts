import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'

export default defineConfig({
  name: 'default',
  title: 'Curtains and Covers CMS',

  projectId: 'idc6hzzx',
  dataset: 'production',
  apiVersion: '2025-02-19',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
}) 